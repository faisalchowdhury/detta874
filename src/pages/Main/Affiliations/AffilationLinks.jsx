import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button, message } from "antd";
import { BiEdit, BiRightArrow } from "react-icons/bi";
import { TbTrash } from "react-icons/tb";
import { CgArrowLeft } from "react-icons/cg";
import PageHeading from "../../../Components/PageHeading";

const AffiliationLinks = () => {
  const { id: categoryId } = useParams(); // category id from URL
  const navigate = useNavigate();
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch affiliate partners for the given categoryId
  const fetchPartners = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/affilate-partner?categoryId=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await res.json();
      console.log(result, "result");
      if (result?.data) {
        setPartners(result.data);
      }
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) {
      fetchPartners();
    }
  }, [categoryId]);

  // Get category name from the first partner (if available)
  const categoryName =
    partners.length > 0 && partners[0].category
      ? partners[0].category
      : "";

  const handleDelete = async (partnerId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/affilate-partner/delete?id=${partnerId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) {
        throw new Error("Failed to delete partner");
      }
      message.success("Partner deleted successfully!");
      // Refresh the list
      fetchPartners();
    } catch (error) {
      console.error("Error deleting partner:", error);
      message.error("Failed to delete partner.");
    }
  };

  const columns = [
    {
      title: "#SI",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Category Name",
      dataIndex: "category",
      key: "category",
      render: (text) => capitalizeWords(text)
    },
    
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Business Name",
      dataIndex: "businessName",
      key: "businessName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Link",
      key: "affiliationLink",
      render: (record) => (
        <Button
          onClick={() => {
            navigator.clipboard.writeText(record.affiliationLink);
            message.success("Copied to clipboard!");
          }}
          size="small"
        >
          Copy Link
        </Button>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex space-x-2">
          <Button
            onClick={() => navigate(`/affiliation/${categoryId}/${record.id}`)}
            type="text"
            shape="circle"
          >
            <BiEdit size={20} />
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            type="text"
            shape="circle"
          >
            <TbTrash size={20} />
          </Button>
        </div>
      ),
      align: "center",
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center gap-3 mb-4">
      <PageHeading title={`${capitalizeWords(categoryName)} Affiliated  Partners List`} />

    
      </div>
      <div className="flex justify-end mb-4">
  <Button
    type="primary"
    onClick={() => navigate(`/affiliation/${categoryId}/add`)}
  >
    Add New Link
  </Button>
</div>

      <Table
        columns={columns}
        dataSource={partners}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 15,
          position: ["bottomCenter"],
          showQuickJumper: true,
        }}
      />
    </div>
  );
};

export default AffiliationLinks;


const capitalizeWords = (str) =>
  str
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
