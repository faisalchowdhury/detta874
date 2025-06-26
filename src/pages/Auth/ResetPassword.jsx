// import { Button, Input } from "antd";
// import Form from "antd/es/form/Form";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useResetPasswordMutation } from "../../redux/features/Auth/authApi";
// import Swal from "sweetalert2";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [mutation, { isLoading }] = useResetPasswordMutation();

//   const onFinish = async (values) => {
//     try {
//       const { token, email } = JSON.parse(
//         sessionStorage.getItem("verify-token")
//       );
//       // await mutation({
//       //   id: email,
//       //   token: token,
//       //   data: values,
//       // }).unwrap();
//       // Swal.fire({
//       //   icon: "success",
//       //   title: "Password Updated!!",
//       //   showConfirmButton: false,
//       //   timer: 1000,
//       // });
//       navigate("/auth");
//       sessionStorage.removeItem("verify-token");
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Failed !!",
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
//           <h1 className="text-4xl font-semibold pb-4">Reset Password</h1>
//           <p className="text-light-gray">Your password must be 8-10 character long.</p>
//         </div>
//         <Form
//             name="normal_login"
//             layout="vertical"
//             initialValues={{
//               remember: true,
//             }}
//             requiredMark={false}
//             onFinish={onFinish}
//           >
//             <Form.Item
//               label={
//                 <span className="text-base text-[#FEFEFE]">New Password</span>
//               }
//               name="password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input new password!",
//                 },
//               ]}
//             >
//               <Input.Password size="large" placeholder="**********" />
//             </Form.Item>
//             <Form.Item
//               label={
//                 <span className="text-base text-[#FEFEFE]">
//                   Confirm New Password
//                 </span>
//               }
//               name="confirmPassword"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please Re-Enter the password!",
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error(
//                         "The new password that you entered do not match!"
//                       )
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password size="large" placeholder="**********" />
//             </Form.Item>
//             <div className="w-full flex justify-center pt-4 ">
//               <Button
//                 loading={isLoading}
//                 type="primary"
//                 size="large"
//                 htmlType="submit"
//                 className="w-full px-2 "
//               >
//                 Reset Password
//               </Button>
//             </div>
//           </Form>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;
import { Button, Input } from "antd";
import Form from "antd/es/form/Form";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../../redux/features/Auth/authApi";
import Swal from "sweetalert2";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const onFinish = async (values) => {
    try {
      // const { token, email } = JSON.parse(
      //   sessionStorage.getItem("resend-token")
      // );
      const token = sessionStorage.getItem("resend-token");
      // Call the API endpoint "/auth/reset-password"
      await resetPassword({
        // id: email,
        token,
        data: values,
      }).unwrap();

      Swal.fire({
        icon: "success",
        title: "Password Updated!!",
        showConfirmButton: false,
        timer: 1000,
      });

      sessionStorage.removeItem("verify-token");
      navigate("/auth");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed !!",
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
          <h1 className="text-4xl font-semibold pb-4">Reset Password</h1>
          <p className="text-light-gray">
            Your password must be 8-10 character long.
          </p>
        </div>
        <Form
          name="reset_password"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          requiredMark={false}
          onFinish={onFinish}
        >
          <Form.Item
            label={
              <span className="text-base text-[#FEFEFE]">New Password</span>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Please input new password!",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="**********"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone style={{ color: "#fff" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#fff" }} />
                )
              }
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-base text-[#FEFEFE]">
                Confirm New Password
              </span>
            }
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please Re-Enter the password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The new password that you entered do not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder="**********"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone style={{ color: "#fff" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#fff" }} />
                )
              }
            />
          </Form.Item>
          <div className="w-full flex justify-center pt-4">
            <Button
              loading={isLoading}
              type="primary"
              size="large"
              htmlType="submit"
              className="w-full px-2"
            >
              Reset Password
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
