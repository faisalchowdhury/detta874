// import { Button, Form, Input, Select } from 'antd';
// import React from 'react'
// import PageHeading from '../../../Components/PageHeading';
// import { IoLinkOutline } from 'react-icons/io5';

// const EditAffilationLink = () => {
//     const onFinish = (values) => {
//         console.log('Success:', values);
//     };
//     return (
//         <div className='max-w-xl py-[16px]'>
//             <PageHeading title={"Edit link"} />
//             <Form
//                 name="basic"
//                 layout='vertical'
//                 labelCol={{
//                     span: 24,
//                 }}
//                 wrapperCol={{
//                     span: 24,
//                 }}
//                 requiredMark={false}
//                 initialValues={{

//                 }}
//                 onFinish={onFinish}
//                 autoComplete="off"
//                 className='mt-8'
//             >
//                 <Form.Item
//                     label={<span className='text-base font-medium'>Category Name</span>}
//                     name="name"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input your category name!',
//                         },
//                     ]}
//                 >
//                     <Select
//                         placeholder="Select"
//                         optionFilterProp="label"
//                         size='large'
//                         filterSort={(optionA, optionB) =>
//                             (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
//                         }
//                         options={[
//                             {
//                                 value: '1',
//                                 label: 'Not Identified',
//                             },
//                             {
//                                 value: '2',
//                                 label: 'Closed',
//                             },
//                             {
//                                 value: '3',
//                                 label: 'Communicated',
//                             },
//                             {
//                                 value: '4',
//                                 label: 'Identified',
//                             },
//                             {
//                                 value: '5',
//                                 label: 'Resolved',
//                             },
//                             {
//                                 value: '6',
//                                 label: 'Cancelled',
//                             },
//                         ]}
//                     />
//                 </Form.Item>
//                 <Form.Item
//                     label={<span className='text-base font-medium'>Manager Name</span>}
//                     name="manager"
//                 // rules={[
//                 //   {
//                 //     required: true,
//                 //     message: 'Please input your category name!',
//                 //   },
//                 // ]}
//                 >
//                     <Input size='large' />
//                 </Form.Item>
//                 <Form.Item
//                     label={<span className='text-base font-medium'>Business Name</span>}
//                     name="business"
//                 >
//                     <Input size='large' />
//                 </Form.Item>
//                 <Form.Item
//                     label={<span className='text-base font-medium'>Email</span>}
//                     name="child"

//                 >
//                     <Input size='large' placeholder="eg@gmail.com" />
//                 </Form.Item>
//                 <Form.Item
//                     label={<span className='text-base font-medium'>Affiliation Link</span>}
//                     name="link"
//                 >
//                     <Input prefix={<IoLinkOutline size={20} />} size='large' />
//                 </Form.Item>
//                 <Form.Item label={null}>
//                     <Button className='w-full rounded-md mt-1' size="large" type="primary" htmlType="submit">
//                         Save Link
//                     </Button>
//                 </Form.Item>
//             </Form>
//         </div>
//     )
// }

// export default EditAffilationLink

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import PageHeading from "../../../Components/PageHeading";
import { IoLinkOutline } from "react-icons/io5";

const EditAffilationLink = () => {
  // Expect route: /affiliation/:categoryId/:partnerId
  const { categoryId, partnerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch partner details and prefill form fields
  useEffect(() => {
    if (!partnerId) return;
    const fetchPartner = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }/affilate-partner?partnerId=${partnerId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await res.json();
        console.log(result, "result");
        if (result?.data && result.data.length > 0) {
          const partner = result.data[0];
          form.setFieldsValue({
            category: capitalizeWords(partner.category || ""),
            manager: partner.name,
            business: partner.businessName,
            email: partner.email,
            link: partner.affiliationLink,
          });
        }
      } catch (error) {
        console.error("Error fetching partner details:", error);
        message.error("Failed to fetch partner details.");
      } finally {
        setLoading(false);
      }
    };

    fetchPartner();
  }, [partnerId, form]);

  // Submit form and update partner details
  const onFinish = async (values) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/affilate-partner/edit?id=${partnerId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: values.manager,
            businessName: values.business,
            email: values.email,
            affiliationLink: values.link,
          }),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to update partner");
      }
      message.success("Partner updated successfully!");
      navigate(`/affiliation/${categoryId}`);
    } catch (error) {
      console.error("Error updating partner:", error);
      message.error("Failed to update partner.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-36">
        <div className="w-20 h-20 border-8 border-blue-500 border-dashed rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-xl py-4">
      <PageHeading title={"Edit Link"} />
      <Form
        form={form}
        name="editAffiliationLink"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        autoComplete="off"
        className="mt-8"
      >
        {/* Fixed Category */}
        <Form.Item
          label={<span className="text-base font-medium">Category</span>}
          name="category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Input size="large" disabled />
        </Form.Item>
        {/* Manager Name */}
        <Form.Item
          label={<span className="text-base font-medium">User Name</span>}
          name="manager"
          rules={[{ required: true, message: "Please input User Name" }]}
        >
          <Input size="large" />
        </Form.Item>
        {/* Business Name */}
        <Form.Item
          label={<span className="text-base font-medium">Business Name</span>}
          name="business"
          rules={[{ required: true, message: "Please input Business Name" }]}
        >
          <Input size="large" />
        </Form.Item>
        {/* Email */}
        <Form.Item
          label={<span className="text-base font-medium">Email</span>}
          name="email"
          rules={[{ required: true, message: "Please input Email" }]}
        >
          <Input size="large" placeholder="eg@gmail.com" />
        </Form.Item>
        {/* Affiliation Link */}
        <Form.Item
          label={
            <span className="text-base font-medium">Affiliation Link</span>
          }
          name="link"
          rules={[{ required: true, message: "Please input Affiliation Link" }]}
        >
          <Input prefix={<IoLinkOutline size={20} />} size="large" />
        </Form.Item>
        {/* Save Button */}
        <Form.Item>
          <Button
            className="w-full rounded-md mt-1 bg-primary"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Save Link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditAffilationLink;

const capitalizeWords = (str) =>
  str
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
