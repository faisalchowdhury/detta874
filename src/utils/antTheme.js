import { DatePicker } from "antd";

export const mainTheme = {
  token: {
    colorPrimary: "#6A0DAD",
    colorInfo: "#2C3233",
    colorBgBase: "#FAEFD7",
    colorTextBase: "#2C3233",
    colorBgContainer: "#FFFFFF",
  },
  components: {
    Button: {
      colorLinkHover: "#6A0DAD",
      controlHeightLG: 52,
      borderRadiusLG: 30,
      borderRadius: 8,
      primaryShadow: "0 0px 0 rgba(106, 13, 173, 0.1)",
    },
    Input: {
      controlHeightLG: 56,
      borderRadiusLG: 16,
      colorBorder: "#6A0DAD",
      colorBorderLG: "#6A0DAD",
    },
    DatePicker: {
      colorBorder: "#6A0DAD",
      colorTextPlaceholder: "#2C3233",
    },
    Select: {
      controlHeightLG: 56,
      colorBorder: "#6A0DAD",
      borderRadiusLG: "16px",
      colorTextPlaceholder: "#2C3233",
    },
    Table: {
      colorTextHeading: "#6A0DAD",
      colorBgContainer: "#FFFFFF",
      colorText: "#2C3233",
      headerBg: "#6A0DAD",
      headerColor: "#FFFFFF",
      headerBorderRadius: 0,
      borderRadius: 0,
      headerSplitColor: "none",
    },
  },
};
