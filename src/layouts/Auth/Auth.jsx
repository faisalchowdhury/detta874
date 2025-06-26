import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import bg from "../../assets/images/auth-bg.png";
import { ConfigProvider } from "antd";

const Auth = () => {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1E90FF",
          colorInfo: "#61D0FF",
        },
        components: {
          Input: {
            colorBgContainer: "none",
            controlHeightLG: 56,
            borderRadiusLG: 4,
            colorBorder: "#FEFEFE",
            colorText:"#ffffff",
            colorTextPlaceholder: "#bcaaaa"
          },
          Button: {
            controlHeightLG: 48,
            borderRadiusLG:12,
            primaryShadow: "0 0px 0 rgba(5, 145, 255, 0.1)",
          },
        },
      }}
    >
      <div
        style={{
          background: `linear-gradient(90deg ,rgba(17, 17, 17, 0.7), rgba(17, 17, 17, 0.7)), url(${bg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
        className="bg-playground h-screen w-full flex justify-center items-center"
      >
        <Outlet />
      </div>
    </ConfigProvider>

  )
};

export default Auth;