// import { Button, Checkbox, Input } from "antd";
// import Form from "antd/es/form/Form";
// import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import OTPInput from "react-otp-input";
// import Swal from "sweetalert2";
// import { useVerifyEmailMutation } from "../../redux/features/Auth/authApi";
// // import { useVerifyEmailMutation } from "../../redux/features/Auth/authApi";

// const VerifyEmail = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [otp, setOtp] = useState("");
//   const [mutation, { isLoading }] = useVerifyEmailMutation();
//   const onFinish = async (values) => {
//     try {
//       if (isNaN(otp) || otp.length < 6) {
//         throw new Error("Please enter 6 digits OTP number!!");
//       }
//       // const response = await mutation({
//       //   id,
//       //   otp,
//       // }).unwrap();
//       // sessionStorage.setItem(
//       //   "verify-token",
//       //   JSON.stringify({ token: response?.data, email: id })
//       // );
//       navigate(`/auth/reset-password`);
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed!!",
//         text:
//           (error.message || error?.data?.message || "Something went wrong.") +
//           " Please try again later.",
//       });
//     }
//   };
//   return (
//     <div className="bg-[#111111E5] text-white rounded-[16px] max-w-2xl w-full border border-[#5E8AE2]">
//       <div className="w-full px-14 py-[80px]">
//         <div className="pb-4 text-center space-y-2">
//           <h1 className="font-extrabold text-4xl">Heirloom</h1>
//           <h1 className="text-4xl font-semibold pb-4">Verify Email</h1>
//           <p className="text-light-gray">Please enter your OTP.</p>
//         </div>
//         <Form
//           name="normal_login"
//           layout="vertical"
//           requiredMark={false}
//           initialValues={{}}
//           onFinish={onFinish}
//           className="space-y-[24px]"
//         >
//           <div className="py-3 text-2xl font-semibold flex justify-center">
//             <OTPInput
//               value={otp}
//               onChange={setOtp}
//               numInputs={6}
//               inputStyle={{
//                 height: "70px",
//                 width: "70px",
//                 margin: "10px",
//                 background: "none",
//                 borderBottom: "1px solid #808080",
//                 // marginRight: "auto",
//                 outline: "none",
//                 // borderRadius: "16px",
//                 color: "#ffffff",
//                 // caretColor: "#5E8AE2",
//               }}
//               renderSeparator={<span> </span>}
//               renderInput={(props) => <input {...props} />}
//             />
//           </div>
//           <Form.Item>
//             <Button
//               size="large"
//               type="primary"
//               htmlType="submit"
//               className="w-full mt-1"
//             >
//               Verify
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default VerifyEmail;

import { Button } from "antd";
import Form from "antd/es/form/Form";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import OTPInput from "react-otp-input";
import Swal from "sweetalert2";
import {
  useVerifyEmailMutation,
  useLazyResendOTPQuery,
} from "../../redux/features/Auth/authApi";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(180);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const [triggerResendOTP, { isLoading: resendLoading }] =
    useLazyResendOTPQuery();

  // Setup or retrieve expiration timestamp on mount
  useEffect(() => {
    const storedExpire = sessionStorage.getItem("otpExpire");
    let expireTime;
    if (storedExpire) {
      expireTime = parseInt(storedExpire, 10);
    } else {
      expireTime = Date.now() + 180 * 1000;
      sessionStorage.setItem("otpExpire", expireTime.toString());
    }

    const updateTimer = () => {
      const remaining = Math.floor((expireTime - Date.now()) / 1000);
      if (remaining <= 0) {
        setTimer(0);
        sessionStorage.removeItem("otpExpire");
      } else {
        setTimer(remaining);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle Resend OTP functionality
  const handleResend = async () => {
    try {
      // Retrieve token for resend OTP from session storage
      const token = sessionStorage.getItem("resend-token");
      if (!token) {
        throw new Error("Resend token not found. Please try again later.");
      }
      await triggerResendOTP({ token }).unwrap();
      Swal.fire({
        icon: "success",
        title: "OTP Resent!",
        timer: 1000,
        showConfirmButton: false,
      });
      // Reset timer: update expiration in sessionStorage and set state to 180 sec
      const newExpire = Date.now() + 180 * 1000;
      sessionStorage.setItem("otpExpire", newExpire.toString());
      setTimer(180);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to resend OTP",
        text:
          (error.message || error?.data?.message || "Something went wrong.") +
          "Please try again later.",
      });
    }
  };

  const onFinish = async () => {
    try {
      if (isNaN(otp) || otp.length < 6) {
        throw new Error("Please enter a valid 6-digit OTP!");
      }
      const token = sessionStorage.getItem("resend-token");
      const response = await verifyEmail({ id, otp, token }).unwrap();
      sessionStorage.setItem(
        "verify-token",
        JSON.stringify({ token: response?.data, email: id })
      );
      navigate(`/auth/reset-password`);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!!",
        text:
          (error.message || error?.data?.message || "Something went wrong.") +
          " Please try again later.",
      });
    }
  };

  return (
    <div className="bg-[#111111E5] text-white rounded-[16px] max-w-2xl w-full border border-[#5E8AE2]">
      <div className="w-full px-14 py-[80px]">
        <div className="pb-4 text-center space-y-2">
          <h1 className="font-extrabold text-4xl">Heirloom</h1>
          <h1 className="text-4xl font-semibold pb-4">Verify Email</h1>
          <p className="text-light-gray">Please enter your OTP.</p>
        </div>
        <Form
          name="verify_email"
          layout="vertical"
          requiredMark={false}
          onFinish={onFinish}
          className="space-y-[24px]"
        >
          <div className="py-3 text-2xl font-semibold flex justify-center">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              inputStyle={{
                height: "70px",
                width: "70px",
                margin: "10px",
                background: "none",
                borderBottom: "1px solid #808080",
                outline: "none",
                color: "#ffffff",
              }}
              renderSeparator={<span> </span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>
          <div className="flex justify-center items-center">
            {timer > 0 ? (
              <span className="text-lg text-red-700">
                Resend OTP in {timer} second{timer > 1 && "s"}
              </span>
            ) : (
              <Button
                type="link"
                onClick={handleResend}
                loading={resendLoading}
              >
                Resend OTP
              </Button>
            )}
          </div>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full mt-1"
              loading={isLoading}
            >
              Verify
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default VerifyEmail;
