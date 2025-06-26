// import { Button, Checkbox, Input } from "antd";
// import Form from "antd/es/form/Form";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";
// import Swal from "sweetalert2";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
//   const onFinish = async (values) => {
//     try {
//       // await forgotPassword(values).unwrap();
//       navigate(`/auth/verify-email/${values.email}`);
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
//         <div className="pb-6 text-center space-y-2">
//           <h1 className="font-extrabold text-4xl">Heirloom</h1>
//           <h1 className="text-4xl font-semibold pb-4">Forgot Password</h1>
//           <p className="text-light-gray">Please enter your Email to reset your password.</p>
//         </div>
//         <Form
//           name="normal_login"
//           layout="vertical"
//           requiredMark={false}
//           initialValues={{}}
//           onFinish={onFinish}
//           className="space-y-[24px]"
//         >
//           <Form.Item
//             label={<span className="text-[#FEFEFE] text-base">Email</span>}
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 type: "email",
//                 message: "Email is required!",
//               },
//             ]}
//           >
//             <Input
//               size="large"
//               placeholder={"Enter your Email"}
//             />
//           </Form.Item>
//           <Form.Item>
//             <Button
//               size="large"
//               type="primary"
//               htmlType="submit"
//               className="w-full mt-1"
//             >
//             Done
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../redux/features/Auth/authApi";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const onFinish = async (values) => {
    try {
      // Execute the forgot password API call.
      const response = await forgotPassword(values).unwrap();
      // Save the token from the response to session storage for resend OTP functionality.
      sessionStorage.setItem("resend-token", response?.data?.token);
      navigate(`/auth/verify-email/${values.email}`);
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
        <div className="pb-6 text-center space-y-2">
          <h1 className="font-extrabold text-4xl">Heirloom</h1>
          <h1 className="text-4xl font-semibold pb-4">Forgot Password</h1>
          <p className="text-light-gray">
            Please enter your Email to reset your password.
          </p>
        </div>
        <Form
          name="normal_login"
          layout="vertical"
          requiredMark={false}
          initialValues={{}}
          onFinish={onFinish}
          className="space-y-[24px]"
        >
          <Form.Item
            label={<span className="text-[#FEFEFE] text-base">Email</span>}
            name="email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Email is required!",
              },
            ]}
          >
            <Input size="large" placeholder="Enter your Email" />
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full mt-1"
              loading={isLoading}
            >
              Done
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPassword;
