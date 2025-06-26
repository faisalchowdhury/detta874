// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import PageHeading from "../../Components/PageHeading";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useEffect, useState } from "react";
// import {
//   useGetSettingQuery,
//   useUpdateSettingsMutation,
// } from "../../redux/features/settings/settingApi";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";
// import LoaderWraperComp from "../../Components/LoaderWraperComp";

// const EditTermsConditions = () => {
//   const navigate = useNavigate();
//   const [content, setContent] = useState("");
//   const { data, isLoading, isError } = useGetSettingQuery("terms");
//   const [mutation, { isLoading: muLoading }] = useUpdateSettingsMutation();

//   const handleUpdate = async () => {
//     try {
//       await mutation({
//         url: "terms/update",
//         body: { description: content },
//       }).unwrap();
//       navigate(-1);
//       toast.success("Terms updated successfully", {
//         pasition: "top-center",
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: "error",
//         title: "Error...",
//         text:
//           error?.data?.message || error?.message || "Something went wrong!!",
//         footer: '<a href="#">Why do I have this issue?</a>',
//       });
//     }
//   };
//   useEffect(() => {
//     if (data?.data[0]?.description) {
//       setContent(data?.data[0]?.description);
//     }
//   }, [data]);
//   return (
//     <div className="min-h-[75vh] flex flex-col justify-between gap-6">
//       <div className="space-y-6">
//         <PageHeading title={"Edit Terms & Conditions"} backPath={-1} />
//         <LoaderWraperComp isLoading={isLoading} isError={isError}>
//           <div className="h-full">
//             <ReactQuill
//               placeholder="Enter your update terms & conditions..."
//               theme="snow"
//               value={content}
//               onChange={(value) => setContent(value)}
//               className="h-[50vh]"
//             />
//           </div>
//         </LoaderWraperComp>
//       </div>
//       <div className="flex justify-end">
//         <Button
//           onClick={handleUpdate}
//           loading={muLoading}
//           size="large"
//           type="primary"
//           htmlType="submit"
//           className="px-8 w-[250px]"
//         >
//           Save Changes
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default EditTermsConditions;
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState } from "react";
import {
  useGetSettingQuery,
  useUpdateSettingsMutation,
} from "../../redux/features/settings/settingApi";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import LoaderWraperComp from "../../Components/LoaderWraperComp";

const EditTermsConditions = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const { data, isLoading, isError } = useGetSettingQuery("terms");
  const [updateSettings, { isLoading: muLoading }] = useUpdateSettingsMutation();

  const handleUpdate = async () => {
    try {
      await updateSettings({
        url: "/terms/update",
        body: { description: content },
      }).unwrap();
      navigate(-1);
      toast.success("Terms updated successfully", {
        position: "top-center",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error...",
        text:
          error?.data?.message || error?.message || "Something went wrong!!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data.data.description);
    }
  }, [data]);

  return (
    <div className="min-h-[75vh] flex flex-col justify-between gap-6">
      <div className="space-y-6">
        <PageHeading title={"Edit Terms & Conditions"} backPath={-1} />
        <LoaderWraperComp isLoading={isLoading} isError={isError}>
          <div className="h-full">
            <ReactQuill
              placeholder="Enter your updated terms & conditions..."
              theme="snow"
              value={content}
              onChange={(value) => setContent(value)}
              className="h-[50vh]"
            />
          </div>
        </LoaderWraperComp>
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleUpdate}
          loading={muLoading}
          size="large"
          type="primary"
          htmlType="submit"
          className="px-8 w-[250px]"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default EditTermsConditions;
