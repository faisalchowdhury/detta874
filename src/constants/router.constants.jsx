import { CiUser } from "react-icons/ci";
import { RiDashboardHorizontalFill, RiSettings5Fill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Earnings from "../pages/Main/Earnings/Earnings";
import Users from "../pages/Main/Users/Users";
import MyProfile from "../pages/Profile/MyProfile";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import TermsConditions from "../pages/Settings/TermsConditions";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditAboutUs from "../pages/Settings/EditAboutUs";
import AboutUs from "../pages/Settings/AboutUs";
import Notifications from "../pages/Main/Notifications/Notifications";
import { FaRegMoneyBillAlt, FaUsers } from "react-icons/fa";
import { MdCategory, MdOutlineSecurityUpdateWarning } from "react-icons/md";
import { FaServicestack, FaUserShield } from "react-icons/fa6";
import { BiLayer, BiMessageSquareDetail, BiSupport } from "react-icons/bi";
import Managers from "../pages/Main/Managers/Managers";
import { SiWebmoney } from "react-icons/si";
import {
  AiOutlineMerge,
  AiOutlineNodeExpand,
  AiOutlinePartition,
} from "react-icons/ai";
import { TbAffiliateFilled } from "react-icons/tb";
import Category from "../pages/Main/Categories/Category";
import SubFiiters from "../pages/Main/Categories/SubFilters";
import Filters from "../pages/Main/Categories/Filters";
import Affiliation from "../pages/Main/Affiliations/Affiliation";
import AffilationLinks from "../pages/Main/Affiliations/AffilationLinks";
import AddAffilationLink from "../pages/Main/Affiliations/AddAffilationLink";
import EditAffilationLink from "../pages/Main/Affiliations/EditAffilationLink";
import Support from "../pages/Main/Support/Support";
import Report from "../pages/Main/Support/Report";
import { GoReport } from "react-icons/go";
import AdminRoutes from "../routes/AdminRoutes";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: (
      <AdminRoutes>
        <DashboardHome />
      </AdminRoutes>
    ),
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    name: "Users",
    path: "users",
    icon: FaUsers,
    element: (
      <AdminRoutes>
        <Users />
      </AdminRoutes>
    ),
  },
  {
    // name: "Managers",
    path: "managers",
    icon: FaUserShield,
    element: (
      <AdminRoutes>
        <Managers />
      </AdminRoutes>
    ),
  },
  // {
  //   name: "Earnings",
  //   rootPath: "earnings",
  //   icon: SiWebmoney,
  //   children: [
  //     {
  //       name: "All Earning",
  //       path: "earnings/all-earnings",
  //       icon: FaRegMoneyBillAlt,
  //       element: <Earnings />,
  //     },
  //   ],
  // },
  {
    // name: "Categories",
    path: "categories/category",
    icon: MdCategory,
    element: <Category />,
  },
  {
    // name: "Filters",
    path: "categories/filters/:filterId",
    // icon: AiOutlinePartition,
    element: <Filters />,
  },
  {
    name: "Support",
    path: "support",
    icon: BiSupport,
    element: (
      <AdminRoutes>
        <Support />
      </AdminRoutes>
    ),
  },
  {
    name: "Report",
    path: "report",
    icon: GoReport,
    element: (
      <AdminRoutes>
        <Report />
      </AdminRoutes>
    ),
  },
  {
    // name: "Affiliations",
    path: "affiliation",
    icon: TbAffiliateFilled,
    element: <Affiliation />,
  },
  {
    path: "affiliation/:id",
    element: <AffilationLinks />,
  },
  {
    path: "affiliation/:id/add",
    element: <AddAffilationLink />,
  },
  {
    path: "affiliation/:categoryId/:partnerId",
    element: <EditAffilationLink />,
  },

  {
    name: "Settings",
    rootPath: "settings",
    icon: RiSettings5Fill,
    children: [
      {
        name: "Profile",
        path: "settings/profile",
        icon: CiUser,
        element: (
          <AdminRoutes>
            <MyProfile />
          </AdminRoutes>
        ),
      },
      {
        path: "settings/profile/edit",
        element: (
          <AdminRoutes>
            <EditMyProfile />
          </AdminRoutes>
        ),
      },
      {
        name: "Terms & Services",
        icon: FaServicestack,
        path: "settings/terms-conditions",
        element: (
          <AdminRoutes>
            <TermsConditions />
          </AdminRoutes>
        ),
      },
      {
        path: "settings/terms-conditions/edit",
        element: (
          <AdminRoutes>
            <EditTermsConditions />
          </AdminRoutes>
        ),
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: (
          <AdminRoutes>
            <PrivacyPolicy />
          </AdminRoutes>
        ),
      },
      {
        path: "settings/privacy-policy/edit",
        element: (
          <AdminRoutes>
            <EditPrivacyPolicy />
          </AdminRoutes>
        ),
      },
      {
        name: "About Us",
        icon: BiMessageSquareDetail,
        path: "settings/about-us",
        element: (
          <AdminRoutes>
            <AboutUs />
          </AdminRoutes>
        ),
      },
      {
        path: "settings/about-us/edit",
        element: (
          <AdminRoutes>
            <EditAboutUs />
          </AdminRoutes>
        ),
      },
    ],
  },
];
