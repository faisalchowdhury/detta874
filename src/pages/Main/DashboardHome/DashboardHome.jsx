// import React, { useEffect } from "react";
// import UserChart from "../../../Components/UserChart";
// import managers from "../../../assets/images/managers.png";
// import earnings from "../../../assets/images/earnings.png";
// import users from "../../../assets/images/users.png";
// import { useDashboardStatusQuery } from "../../../redux/features/transaction/transactionApi";
// import LoaderWraperComp from "../../../Components/LoaderWraperComp";
// import { Button, Skeleton } from "antd";
// import EventChart from "../../../Components/EventChart";
// import UserTable from "../../../Components/UserTable";
// import { Link } from "react-router-dom";

// const DashboardHome = () => {
//   const { data, isLoading, isError } = useDashboardStatusQuery(undefined);
//   const homeStatus = [
//     {
//       title: "Total users",
//       amount: 1140 || "N/A",
//       img: users,
//     },
//     {
//       title: "Total Managers",
//       amount: 50 || "N/A",
//       img: managers,
//     },
//     {
//       title: "Total Earnings",
//       amount: `$${12.1}K` || "N/A",
//       img: earnings,
//     },
//   ];
//   return (
//     <div className="space-y-[24px]">
//       {/* <LoaderWraperComp
//         isLoading={isLoading}
//         isError={isError}
//         loader={
//           <div className="w-full grid grid-cols-3 gap-10">
//             <Skeleton className="h-full w-full rounded-xl" />
//             <Skeleton className="h-full w-full rounded-xl" />
//             <Skeleton className="h-full w-full rounded-xl" />
//           </div>
//         }
//         className={"h-[190px]"}
//       > */}
//       <div className="flex gap-5 2xl:gap-10">
//         {homeStatus.map((item, inx) => (
//           <div
//             key={inx}
//             className="px-8 py-7 rounded-2xl flex justify-between items-center gap-4 shadow-sm border border-[#00921540] bg-white w-full max-w-sm"
//           >
//             <div>
//               <img className="w-[90px] h-[90px]" src={item.img} alt="" />
//             </div>
//             <div className="space-y-2">
//               <h3 className="text-5xl font-semibold">{item.amount}</h3>
//               <h3 className="text-lg text-[#808080]">{item.title}</h3>
//             </div>
//           </div>
//         ))}
//       </div>
//       {/* </LoaderWraperComp> */}
//       <div className="grid grid-cols-12 gap-5 2xl:gap-10">
//         <EventChart className={"col-span-8 shadow-sm border border-[#00921540] rounded-xl"} />
//         <UserChart className={"col-span-4 shadow-sm border border-[#00921540] rounded-xl"} />
//       </div>
//       <div>
//         <div className="pt-5 flex justify-between items-center">
//           <h3 className="text-2xl font-sans font-semibold">{"Pending Manager Requests"}</h3>
//           <Link to={"/managers"}>  <Button className="px-8 py-4">View All</Button></Link>
//         </div>
//         <UserTable role="manager" managerStatus={"pending"} pagination={false} />
//       </div>
//     </div>
//   );
// };

// export default DashboardHome;
import React from "react";
import UserChart from "../../../Components/UserChart";
import managers from "../../../assets/images/managers.png";
import earnings from "../../../assets/images/earnings.png";
import users from "../../../assets/images/users.png";

import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { Button, Skeleton } from "antd";
import EventChart from "../../../Components/EventChart";
import UserTable from "../../../Components/UserTable";
import { Link } from "react-router-dom";
import {
  useDashboardStatusQuery,
  useOverallStatsQuery,
} from "../../../redux/features/transaction/transactionApi";

const DashboardHome = () => {
  // Optionally, use dashboardStatus if needed:
  const {
    data: dashData,
    isLoading: dashLoading,
    isError: dashError,
  } = useDashboardStatusQuery(undefined);

  // Fetch overall statistics for users and managers.
  const {
    data: overallData,
    isLoading: overallLoading,
    isError: overallError,
  } = useOverallStatsQuery();

  // Prepare overall stats (fallback to zeros if not loaded or error)
  const totalUsers = overallData?.data?.totalUsers ?? 0;

  const homeStatus = [
    {
      title: "Total Users",
      amount: totalUsers || 0,
      img: users,
    },
    // {
    //   title: "Total Managers",
    //   amount: totalManagers || 0,
    //   img: managers,
    // },
  ];

  return (
    <div className="space-y-[24px]">
      <div className="flex justify-evenly gap-5 2xl:gap-10 mt-10">
        {homeStatus?.map((item, inx) => (
          <div
            key={inx}
            className="px-8 py-7 rounded-2xl flex justify-between items-center gap-4 shadow-sm border border-[#00921540] bg-white !w-full max-w-sm"
          >
            <div>
              <img
                className="w-[90px] h-[90px]"
                src={item.img}
                alt={item.title}
              />
            </div>
            <div className="space-y-2">
              <h3 className="text-5xl font-semibold">{item.amount}</h3>
              <h3 className="text-lg text-[#808080]">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
      {/* </LoaderWraperComp> */}
      {/* <div className="grid grid-cols-12 gap-5 2xl:gap-10">
        <EventChart className="col-span-8 shadow-sm border border-[#00921540] rounded-xl" />
        <UserChart className="col-span-4 shadow-sm border border-[#00921540] rounded-xl" />
      </div> */}
      <div>
        {/* Uncomment and update if you wish to display a header for the table */}
        {/* <div className="pt-5 flex justify-between items-center">
          <h3 className="text-2xl font-sans font-semibold">{"Pending Manager Requests"}</h3>
          <Link to={"/managers"}>
            <Button className="px-8 py-4">View All</Button>
          </Link>
        </div> */}
        <h1 className="font-bold text-2xl mt-2">Recent user</h1>
        <UserTable
          // role="manager"
          requestStatus={"send"}
          pagination={false}
          queryParams={{ role: "user", requestStatus: "send", limit: 5 }} // Dynamic query parameters passed here
        />
      </div>
    </div>
  );
};

export default DashboardHome;
