// import React, { useState } from "react";
// import { Button, Form, Input } from "antd";
// import dashProfile from "../../assets/images/guest-status.png";
// import { useNavigate } from "react-router-dom";
// import PhoneCountryInput from "../../Components/PhoneCountryInput";
// import PageHeading from "../../Components/PageHeading";
// import { PiCameraPlus } from "react-icons/pi";
// import { useSelector } from "react-redux";
// import Swal from "sweetalert2";
// import { useUpadateProfileMutation } from "../../redux/features/Users/usersApi";
// import toast from "react-hot-toast";

// const EditMyProfile = () => {
//   const navigate = useNavigate();
//   // const { user } = useSelector((state) => state.auth);
//   const user = {
//     name: "Mr Henry",
//     email: "henry@gmail.com",
//     phone: "+88 01454545445",
//   }

//   const [imageFile, setImageFile] = useState();
//   const [phoneNumber, setPhoneNumber] = useState(user?.phone);
//   const [mutation, { isLoading }] = useUpadateProfileMutation();
//   const onFinish = async (values) => {
//     try {
//       const bodyDatas = { ...values, phone: phoneNumber };
//       const formData = new FormData();
//       if (imageFile) {
//         formData.append("image", imageFile);
//       }
//       for (const [key, value] of Object.entries(bodyDatas)) {
//         formData.append(key, value);
//       }
//       await mutation(formData,
//       ).unwrap();
//       navigate(-1);
//       setImageFile(null);
//       toast.success("Update Successful!", {
//         position: "top-center",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Update Failed!!",
//         text:
//           (error.message || error?.data?.message || "Something went wrong.") +
//           " Please try again later.",
//       });
//     }
//   };

//   return (
//     <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
//       <PageHeading
//         title={"Edit Personal information "}
//         className={"px-10 border-b border-[#CEF0FF] py-6"}
//       />
//       <div className="w-full">
//         <Form
//           name="basic"
//           layout="vertical"
//           className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
//           onFinish={onFinish}
//           autoComplete="off"
//           initialValues={{
//             name: user.name,
//             email: user.email,
//           }}
//         >
//           <div className="col-span-3 space-y-6 ">
//             <div className="col-span-4 min-h-[365px] flex flex-col items-center justify-center bg-[#E9F4F3] p-8 rounded-lg border border-primary space-y-4 shadow-inner">
//               <label htmlFor="profileImage">
//                 <div className="my-3 relative h-[144px] w-[144px] overflow-hidden ">
//                   <div className="h-full w-full absolute inset-0 bg-[#222222bb] rounded-full flex justify-center items-center text-white cursor-pointer">
//                     <PiCameraPlus size={34} />
//                   </div>
//                   <img
//                     // src={dashProfile}
//                     src={
//                       imageFile
//                         ? URL.createObjectURL(imageFile)
//                         : user?.image?.publicFileURL
//                           ? `${import.meta.env.VITE_IMAGE_URL}` +
//                           user?.image?.publicFileURL
//                           : dashProfile
//                     }
//                     alt=""
//                     className="rounded-full w-full h-full object-cover"
//                   />
//                 </div>
//               </label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 id="profileImage"
//                 name="profileImage"
//                 multiple={false}
//                 style={{ display: "none" }}
//                 onChange={(e) => {
//                   if (e.target.files) {
//                     setImageFile(e.target.files[0]);
//                   }
//                 }}
//               />
//               <h5 className="text-lg text-[#222222]">{"Profile"}</h5>
//               <h4 className="text-2xl text-[#222222]">{"Admin"}</h4>
//             </div>
//           </div>
//           <div className="col-span-9 space-y-[24px]">
//             <Form.Item
//               className="text-lg text-[#1F8D84] font-medium"
//               label="Name"
//               name="name"
//             >
//               <Input
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
//               <PhoneCountryInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
//             </Form.Item>
//             <Form.Item className="flex justify-end pt-4">
//               <Button
//                 htmlType="submit"
//                 loading={isLoading}
//                 size="large"
//                 type="primary"
//                 className="px-8 w-[250px]"
//               >
//                 Save Change
//               </Button>
//             </Form.Item>
//           </div>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default EditMyProfile;

import React, { useState, useEffect } from "react";
import { Button, Form, Input } from "antd";
import dashProfile from "../../assets/images/guest-status.png";
import { useNavigate } from "react-router-dom";
import PhoneCountryInput from "../../Components/PhoneCountryInput";
import PageHeading from "../../Components/PageHeading";
import { PiCameraPlus } from "react-icons/pi";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useGetUserByTokenQuery, useUpadateProfileMutation,  } from "../../redux/features/Auth/authApi";




const EditMyProfile = () => {
  const navigate = useNavigate();

  // Fetch real profile data
  const { data, error, isLoading: isProfileLoading } = useGetUserByTokenQuery();
  const userData = data?.data || {};

  // Local state for image file and phone number
  const [imageFile, setImageFile] = useState();
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone || "");

  // RTK Query mutation hook for profile update
  const [updateProfile, { isLoading: isUpdating }] = useUpadateProfileMutation();

  // Update phone number if profile data changes
  useEffect(() => {
    if (userData?.phone) {
      setPhoneNumber(userData.phone);
    }
  }, [userData]);

  // Handle form submission
  const onFinish = async (values) => {
    try {
      // Combine form values with phone number (if PhoneCountryInput is used separately)
      const bodyData = {
        name: values.name,
        email: values.email,
        address: values.address,
        phone: phoneNumber,
      };

      // Create FormData to send multipart/form-data
      const formData = new FormData();

      // Append the image if a new one was selected (it will be sent under the field name "image")
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Append all text fields explicitly
      formData.append("name", bodyData.name);
      formData.append("email", bodyData.email);
      formData.append("address", bodyData.address);
      formData.append("phone", bodyData.phone);

      // Send the request
      await updateProfile(formData).unwrap();

      // On success, navigate back and display a success toast
      navigate(-1);
      setImageFile(null);
      toast.success("Update Successful!", { position: "top-center" });
    } catch (error) {
      // Handle errors via SweetAlert2
      Swal.fire({
        icon: "error",
        title: "Update Failed!!",
        text:
          (error.message || error?.data?.message || "Something went wrong.") +
          " Please try again later.",
      });
    }
  };

  if (isProfileLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user profile</div>;

  return (
    <div className="space-y-[24px] min-h-[83vh] bg-light-gray rounded-2xl">
      <PageHeading
        title={"Edit Personal Information"}
        className={"px-10 border-b border-[#CEF0FF] py-6"}
      />
      <div className="w-full">
        <Form
          name="editProfile"
          layout="vertical"
          className="w-full grid grid-cols-12 gap-x-10 px-14 py-8"
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{
            name: userData?.name || "",
            email: userData?.email || "",
            address: userData?.address || "",
          }}
        >
          <div className="col-span-3 space-y-6">
            <div className="min-h-[365px] flex flex-col items-center justify-center bg-[#E9F4F3] p-8 rounded-lg border border-primary space-y-4 shadow-inner">
              {/* Image Upload Field */}
              <label htmlFor="profileImage">
                <div className="my-3 relative h-[144px] w-[144px] overflow-hidden">
                  <div className="h-full w-full absolute inset-0 bg-[#222222bb] rounded-full flex justify-center items-center text-white cursor-pointer">
                    <PiCameraPlus size={34} />
                  </div>
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : userData?.image
                        ? `${import.meta.env.VITE_IMAGE_URL}${userData?.image}`
                        : dashProfile
                    }
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="profileImage"
                name="profileImage"
                multiple={false}
                style={{ display: "none" }}
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImageFile(e.target.files[0]);
                  }
                }}
              />
              <h5 className="text-lg text-[#222222]">Profile</h5>
              <h4 className="text-2xl text-[#222222]">
                {userData?.role || "User"}
              </h4>
            </div>
          </div>
          <div className="col-span-9 space-y-[24px]">
            <Form.Item
              label="Name"
              name="name"
              className="text-lg text-[#1F8D84] font-medium"
            >
              <Input size="large" className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              className="text-lg text-[#1F8D84] font-medium"
            >
              <Input readOnly size="large" className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3" />
            </Form.Item>
            <Form.Item
              label="Phone Number"
              name="phone"
              className="text-lg text-[#222222] font-medium"
            >
              <PhoneCountryInput phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />
            </Form.Item>
            <Form.Item
              label="Address"
              name="address"
              className="text-lg text-[#222222] font-medium"
            >
              <Input size="large" className="h-[56px] rounded-lg bg-[#EFFAFF] mt-3" />
            </Form.Item>
            <Form.Item className="flex justify-end pt-4">
              <Button
                htmlType="submit"
                loading={isUpdating}
                size="large"
                type="primary"
                className="px-8 w-[250px]"
              >
                Save Change
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EditMyProfile;


