// import React, { useState } from "react";
// import { Button, Form, Input } from "antd";
// import dashProfile from "../../assets/images/guest-status.png";
// import { FiEdit } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import PageHeading from "../../Components/PageHeading";
// import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
// import { useSelector } from "react-redux";

// const MyProfile = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   // const { user } = useSelector((state) => state.auth);
//   const user = {
//     name: "Mr Henry",
//     email: "henry@gmail.com",
//     phone: "+88 01454545445",
//   }

//   return (
//     <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
//       <PageHeading
//         title={"Personal information"}
//         backPath={-1}
//         disbaledBackBtn={true}
//         className={"px-10 border-b border-[#CEF0FF] py-6"}
//       />
//       <div className="w-full">
//         <div className="py-4 px-8 flex justify-end items-center">
//           {/* <h6 className="text-2xl text-white">Personal Information</h6> */}
//           <Button
//             onClick={() => setIsModalOpen(true)}
//             size="large"
//             type="default"
//             className="px-8"
//           >
//             Change Password
//           </Button>
//         </div>
//         <Form
//           name="basic"
//           layout="vertical"
//           className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
//           autoComplete="off"
//           initialValues={{
//             name: user.name,
//             email: user.email,
//             phone: user.phone,
//           }}
//         >
//           <div className="col-span-3 space-y-6 ">
//             <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg border border-primary shadow-inner space-y-4">
//               <div className="my-3 ">
//                 <img
//                   src={
//                     user?.image?.publicFileURL
//                       ? `${import.meta.env.VITE_IMAGE_URL}` +
//                       user?.image?.publicFileURL
//                       : dashProfile
//                   }
//                   alt=""
//                   className="h-[144px] w-[144px] rounded-full"
//                 />
//               </div>
//               <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
//               <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
//             </div>
//             <Button
//               onClick={(e) => navigate(`edit`)}
//               size="large"
//               type="primary"
//               className="px-8 w-full"
//             >
//               <FiEdit /> Edit Profile
//             </Button>
//           </div>
//           <div className="col-span-9 space-y-[24px]">
//             <Form.Item
//               className="text-lg text-[#1F8D84] font-medium"
//               label="Name"
//               name="name"
//             >
//               <Input
//                 readOnly
//                 size="large"
//                 className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3"
//               />
//             </Form.Item>
//             <Form.Item
//               className="text-lg text-[#1F8D84] font-medium"
//               label="Email"
//               name="email"
//             >
//               <Input
//                 readOnly
//                 size="large"
//                 className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3"
//               />
//             </Form.Item>
//             <Form.Item
//               className="text-lg text-[#222222] font-medium"
//               label="Phone Number"
//               name="phone"
//             >
//               <Input
//                 readOnly
//                 size="large"
//                 className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3"
//               />
//             </Form.Item>
//           </div>
//         </Form>
//       </div>
//       <PasswordChangeModalForm
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//       />
//     </div>
//   );
// };

// export default MyProfile;


import React from "react";
import { Button } from "antd";
import dashProfile from "../../assets/images/guest-status.png";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import PasswordChangeModalForm from "../../Components/User/PasswordChangeModalForm";
import { useGetUserByTokenQuery } from "../../redux/features/Auth/authApi";

const MyProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // Automatically sends the token in the header and forces a refetch on mount
  const { data, error, isLoading } = useGetUserByTokenQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;

  // Fallback values for missing fields (show "N/A")
  const user = {
    name: data?.data?.name || "N/A",
    email: data?.data?.email || "N/A",
    phone: data?.data?.phone || "N/A",
    role: data?.data?.role || "N/A",
    image: data?.data?.image || null,
    address: data?.data?.address || "N/A",
  };

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
      <PageHeading
        title="Personal information"
        backPath={-1}
        disbaledBackBtn={true}
        className="px-10 border-b border-[#CEF0FF] py-6"
      />
      <div className="w-full">
        <div className="py-4 px-8 flex justify-end items-center">
          <Button
            onClick={() => setIsModalOpen(true)}
            size="large"
            type="default"
            className="px-8"
          >
            Change Password
          </Button>
        </div>
        <div className="w-full grid grid-cols-12 gap-x-10 px-14 py-8">
          {/* Left column: Profile image and edit button */}
          <div className="col-span-3 space-y-6">
            <div className="min-h-[365px] flex flex-col items-center justify-center p-8 rounded-lg border border-primary shadow-inner space-y-4">
              <div className="my-3">
                <img
                  src={
                    user?.image
                      ? `${import.meta.env.VITE_IMAGE_URL}${user.image}`
                      : dashProfile
                  }
                  alt="Profile"
                  className="h-[144px] w-[144px] rounded-full object-cover"
                />
              </div>
              <h5 className="text-lg text-[#222222]">Profile</h5>
              <h4 className="text-2xl text-[#222222]">
                {user.name} || {user.role}
              </h4>
            </div>
            <Button
              onClick={() => navigate("/settings/profile/edit")}
              size="large"
              type="primary"
              className="px-8 w-full bg-primary"
            >
              <FiEdit /> Edit Profile
            </Button>
          </div>
          {/* Right column: Display user details */}
          <div className="col-span-9 space-y-[24px]">
            <div className="space-y-4">
              <div>
                <p className="text-lg  font-medium mb-1">
                  Name
                </p>
                <div className="h-[56px] rounded-lg bg-[#EFFAFF] flex items-center px-4">
                  {user.name}
                </div>
              </div>
              <div>
                <p className="text-lg  font-medium mb-1">
                  Email
                </p>
                <div className="h-[56px] rounded-lg bg-[#EFFAFF] flex items-center px-4">
                  {user.email}
                </div>
              </div>
              <div>
                <p className="text-lg text-[#222222] font-medium mb-1">
                  Phone Number
                </p>
                <div className="h-[56px] rounded-lg bg-[#EFFAFF] flex items-center px-4">
                  {user.phone}
                </div>
              </div>
              <div>
                <p className="text-lg text-[#222222] font-medium mb-1">
                  Address
                </p>
                <div className="h-[56px] rounded-lg bg-[#EFFAFF] flex items-center px-4">
                  {user.address}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PasswordChangeModalForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default MyProfile;

