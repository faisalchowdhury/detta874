import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, message, Select } from "antd";
import PageHeading from "../../../Components/PageHeading";
import { IoLinkOutline } from "react-icons/io5";

const capitalizeWords = (str) =>
  str
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

const AddAffilationLink = () => {
  // Expect route: /affiliation/:id/add-new where id is the categoryId
  const { id: categoryId } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [categoryName, setCategoryName] = useState("");

  // Fetch category details to get the category name
  useEffect(() => {
    if (!categoryId) return;
    const fetchCategory = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/category?categoryId=${categoryId}`
        );
        const result = await res.json();
        console.log(result);
        if (result?.data && result.data.length > 0) {
          // Set the category name (capitalize it for display)
          setCategoryName(result.data[0].name);
          // Optionally, prefill the form's category field:
          form.setFieldsValue({
            category: capitalizeWords(result.data[0].name),
          });
        }
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
    fetchCategory();
  }, [categoryId, form]);

  const onFinish = async (values) => {
    const token = localStorage.getItem("token");
    const body = {
      categoryId, // Fixed from route
      name: values.manager,
      businessName: values.business,
      email: values.email,
      affiliationLink: values.link,
    };

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/affilate-partner/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to add partner");
      }
      message.success("Partner added successfully!");
      navigate(`/affiliation/${categoryId}`);
    } catch (error) {
      console.error("Error adding partner:", error);
      message.error("Failed to add partner.");
    }
  };

  return (
    <div className="max-w-xl py-[16px]">
      <PageHeading title={"Add New Link"} />
      <Form
        form={form}
        name="addAffiliationLink"
        layout="vertical"
        requiredMark={false}
        onFinish={onFinish}
        autoComplete="off"
        className="mt-8"
        initialValues={{
          category: capitalizeWords(categoryName),
        }}
      >
        {/* Fixed Category Field */}
        <Form.Item
          label={<span className="text-base font-medium">Category</span>}
          name="category"
          rules={[{ required: true, message: "Category is required" }]}
        >
          <Input size="large" disabled />
        </Form.Item>

        <Form.Item
          label={<span className="text-base font-medium">User Name</span>}
          name="manager"
          rules={[{ required: true, message: "Please input User Name" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label={<span className="text-base font-medium">Business Name</span>}
          name="business"
          rules={[{ required: true, message: "Please input Business Name" }]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label={<span className="text-base font-medium">Email</span>}
          name="email"
          rules={[{ required: true, message: "Please input Email" }]}
        >
          <Input size="large" placeholder="eg@gmail.com" />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-base font-medium">Affiliation Link</span>
          }
          name="link"
          rules={[{ required: true, message: "Please input Affiliation Link" }]}
        >
          <Input prefix={<IoLinkOutline size={20} />} size="large" />
        </Form.Item>

        <Form.Item>
          <Button
            className="w-full rounded-md mt-1 bg-primary"
            size="large"
            type="primary"
            htmlType="submit"
          >
            Add Link
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddAffilationLink;
