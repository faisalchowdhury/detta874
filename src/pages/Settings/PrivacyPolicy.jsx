// import { Button } from "antd";
// import { useNavigate } from "react-router-dom";
// import PageHeading from "../../Components/PageHeading";
// import { useGetSettingQuery } from "../../redux/features/settings/settingApi";
// import LoaderWraperComp from "../../Components/LoaderWraperComp";

// const PrivacyPolicy = () => {
//   const navigate = useNavigate();
//   const { data, isLoading, isError } = useGetSettingQuery("privacy");
//   return (
//     <div className="min-h-[70vh] flex flex-col justify-between">
//       <div className="space-y-4">
//         <PageHeading title={"Privacy Policy"} disbaledBackBtn={true} />
//         <div className="w-full  min-h-[60vh] py-6 px-2">
//           <LoaderWraperComp isError={isError} isLoading={isLoading}>
//             <div  className="no-tailwind"
//               dangerouslySetInnerHTML={{ __html: data?.data[0]?.description }}
//             ></div>
//           </LoaderWraperComp>
//         </div>
//         <div className="flex justify-end pt-5">
//           <Button
//             onClick={() => navigate("edit")}
//             size="large"
//             htmlType="submit"
//             type="primary"
//             className="px-8 w-[250px]"
//           >
//             Edit
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PrivacyPolicy;


import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import PageHeading from "../../Components/PageHeading";
import { useGetSettingQuery } from "../../redux/features/settings/settingApi";
import LoaderWraperComp from "../../Components/LoaderWraperComp";

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetSettingQuery("privacy");
  
  return (
    <div className="min-h-[70vh] flex flex-col justify-between">
      <div className="space-y-4">
        <PageHeading title={"Privacy Policy"} disbaledBackBtn={true} />
        <div className="w-full min-h-[60vh] py-6 px-2">
          <LoaderWraperComp isError={isError} isLoading={isLoading}>
            <div
              className="no-tailwind"
              dangerouslySetInnerHTML={{ __html: data?.data?.description }}
            ></div>
          </LoaderWraperComp>
        </div>
        <div className="flex justify-end pt-5">
          <Button
            onClick={() => navigate("edit")}
            size="large"
            htmlType="submit"
            type="primary"
            className="px-8 w-[250px]"
          >
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
