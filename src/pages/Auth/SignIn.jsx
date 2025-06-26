// export default SignIn;

import { Button, Checkbox, Input } from "antd";
import Form from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { usePostLoginMutation } from "../../redux/features/Auth/authApi";
import Swal from "sweetalert2";
import { setLogin } from "../../redux/features/Auth/authSlice";
import { EyeTwoTone, EyeInvisibleOutlined } from "@ant-design/icons";
const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [remember, setRemember] = useState(null);
  const [mutation, { isLoading }] = usePostLoginMutation();

  const onFinish = async (values) => {
    try {
      // Call the login API ("/auth/admin-login")
      const response = await mutation(values).unwrap();
      // Store the token and update Redux state with user details
      localStorage.setItem("token", response?.data?.token);
      dispatch(
        setLogin({
          user: { ...response?.data?.user, _id: response?.data?.user?.id },
          token: response?.data?.token,
        })
      );
      // Navigate to the intended route or homepage
      navigate(location.state ? location.state : "/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login Failed!!",
        text:
          (error.message || error?.data?.message || "Something went wrong.") +
          " Please try again later.",
      });
    }
  };

  const rememberHandler = () => {
    setRemember((c) => !c);
    if (remember) {
      sessionStorage.removeItem("remember-me");
    } else {
      sessionStorage.setItem("remember-me", true);
    }
  };

  useEffect(() => {
    setRemember(!!sessionStorage.getItem("remember-me"));
  }, []);

  return (
    <div className="bg-[#111111E5] text-white rounded-[16px] max-w-2xl w-full border border-[#5E8AE2]">
      <div className="w-full px-14 py-[80px]">
        <div className="pb-6 text-center space-y-2">
          <h1 className="font-extrabold text-4xl">Heirloom</h1>
          <h1 className="text-4xl font-semibold pb-4">Welcome back!</h1>
          <p className="text-light-gray">Please enter your details</p>
        </div>
        <Form
          name="normal_login"
          layout="vertical"
          requiredMark={false}
          initialValues={{}}
          onFinish={onFinish}
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
            <Input size="large" placeholder="Enter e-mail address" />
          </Form.Item>
          <Form.Item
            label={<span className="text-[#FEFEFE] text-base">Password</span>}
            name="password"
            rules={[
              {
                required: true,
                message: "Password is required!",
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Enter password"
              name="password"
              iconRender={(visible) =>
                visible ? (
                  <EyeTwoTone style={{ color: "#fff" }} />
                ) : (
                  <EyeInvisibleOutlined style={{ color: "#fff" }} />
                )
              }
            />
          </Form.Item>
          <div className="flex justify-between items-center">
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox className="text-base font-medium text-[#FEFEFE]">
                Remember me
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                onClick={() => navigate("/auth/forgot-password")}
                type="link"
                className="text-base font-medium text-[#FEFEFE]"
              >
                Forget password?
              </Button>
            </Form.Item>
          </div>
          <Form.Item>
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              className="w-full"
              loading={isLoading}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;
