import React, { useState } from "react";
import { Table, Button } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import notFound from "../assets/images/guest-status.png";
import DashboardModal from "./DashboardModal";
import {
  useChangeRoleMutation,
  useDeleteAccountMutation,
} from "../redux/features/Users/usersApi";

const UserListTable = ({
  role = "user",
  data = [],
  refatch,
  pageSize = 10,
  pagination = true,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [deleteAccount] = useDeleteAccountMutation();
  const [changeRole] = useChangeRoleMutation();
  const showModal = (record) => {
    setModalData(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "#SI",
      render: (text, _record, index) => (
        <p>{(currentPage - 1) * pageSize + index + 1}</p>
      ),
    },
    {
      title: <span className="capitalize">{role} Name</span>,
      render: (record) => (
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              src={
                record.image
                  ? `${import.meta.env.VITE_IMAGE_URL}${record.image}`
                  : notFound
              }
              alt="profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <p className="text-sm">{record.name || "Unknown"}</p>
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
    },
    {
      title: "Join Date",
      key: "createdAt",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleDateString("en-GB"),
    },
    {
      title: "Details",
      key: "Details",
      render: (record) => (
        <Button onClick={() => showModal(record)} type="text" shape="circle">
          <BsExclamationCircle className="text-hash" size={20} />
        </Button>
      ),
    },
  ];
  const handleDelete = (id) => {
    deleteAccount({ id })
      .unwrap()
      .then((res) => {
        setIsModalOpen(false);
        refatch();

        // Optionally, trigger a refetch or show a success message here
      })
      .catch((err) => {
        console.error("Error in manager approval/deny:");
      });
  };
  const handleRole = (userId, role) => {
    changeRole({ userId, role })
      .unwrap()
      .then((res) => {
        setIsModalOpen(false);
        refatch();
        // Optionally, trigger a refetch or show a success message here
      })
      .catch((err) => {
        console.error("Error in manager approval/deny:");
      });
  };
  return (
    <div className="py-[20px]">
      <Table
        loading={false}
        columns={columns}
        dataSource={data?.map((item, index) => ({
          ...item,
          key: index + 1,
        }))}
        pagination={
          pagination && {
            position: ["bottomCenter"],
            showQuickJumper: true,
            showSizeChanger: false,
            total: data.length,
            defaultCurrent: 1,
            pageSize: pageSize,
            onChange: (page) => setCurrentPage(page),
          }
        }
      />

      <DashboardModal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
        <div className="flex flex-col justify-between text-base">
          <div className="space-y-7">
            <h6 className="font-medium text-center text-xl pb-1">
              Account Details
            </h6>
            <div className="flex justify-between">
              <p className="text-hash">Username</p>
              <p>{modalData.username || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Email</p>
              <p>{modalData.email}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Address</p>
           <p>{modalData.address || "N/A"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Role</p>
              <p>{modalData.role}</p>
            </div>

            <div className="flex justify-between mb-5">
              <p className="text-hash">Join Date:</p>
              <p>{new Date(modalData.createdAt).toLocaleDateString("en-GB")}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Report count</p>
              <p>{modalData.reportCount || 0}</p>
            </div>
            <div className="flex justify-evenly">
              <p className="">
                <button
                  className="btn bg-red-500 text-white px-4 py-1 rounded-md"
                  onClick={() => handleDelete(modalData?._id)}
                >
                  Delete
                </button>
              </p>
              <p>
                <button
                  onClick={() =>
                    handleRole(
                      modalData?._id,
                      modalData?.role === "user" ? "admin" : "user"
                    )
                  }
                  className="btn bg-green-500 text-white px-4 py-1 rounded-md"
                >
                  Make {modalData?.role === "user" ? "Admin" : "User"}
                </button>
              </p>
            </div>
          </div>
          {/* You can add action buttons here if needed */}
        </div>
      </DashboardModal>
    </div>
  );
};

export default UserListTable;
