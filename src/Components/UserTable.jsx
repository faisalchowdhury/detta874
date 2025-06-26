import React, { useState } from "react";
import { Table, Button, Spin } from "antd";
import { BsExclamationCircle } from "react-icons/bs";
import notFound from "../assets/images/guest-status.png";
import DashboardModal from "./DashboardModal";
import {
  useChangeRoleMutation,
  useDeleteAccountMutation,
  useGetAllUserQuery,
} from "../redux/features/Users/usersApi";

const UserTable = ({
  role = null,
  queryParams,
  page = 1,
  pagination = true,
}) => {
  // Helper function to map raw managerInfo.type to a cleaner business type

  // Fetch dynamic data from the API using dynamic query parameters
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = useGetAllUserQuery(queryParams);

  // Assuming your API returns an object with a `data` property that is an array
  const usersList = usersData?.data || [];
  // If more than five records are returned, only show the first five
  const data = usersList.slice(0, 5);
  // console.log(data);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  // Setup the managerApproveDeny mutation
  const [deleteAccount] = useDeleteAccountMutation();
  const [changeRole] = useChangeRoleMutation();

  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  // Updated handleRequest to call the managerApproveDeny mutation
  const handleDelete = (id) => {
    deleteAccount({ id })
      .unwrap()
      .then((res) => {
        setIsModalOpen(false);
        refetch();

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
        refetch();
        // Optionally, trigger a refetch or show a success message here
      })
      .catch((err) => {
        console.error("Error in manager approval/deny:");
      });
  };
  // For managers, show a "Request" column with Approve/Deny buttons.

  const columns = [
    {
      title: "#SI",
      render: (text, _record, index) => <p>{(page - 1) * 15 + index + 1}</p>,
    },
    {
      title: <span className="capitalize">{role} Name</span>,
      render: (data) => (
        <div className="flex gap-2 items-center">
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              src={
                data.image
                  ? `${import.meta.env.VITE_IMAGE_URL}${data.image}`
                  : notFound
              }
              alt="profile"
              className="rounded-full w-full h-full object-cover"
            />
          </div>
          <p className="text-sm">{data.name || "Unknown"}</p>
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
      title: "Date",
      key: "date",
      dataIndex: "createdAt",
      render: (text) => new Date(text).toLocaleDateString("en-GB"),
    },
    // ...dynamicField,
    {
      title: "Details",
      key: "Details",
      render: (data) => (
        <Button onClick={() => showModal(data)} type="text" shape="circle">
          <BsExclamationCircle className="text-hash" size={20} />
        </Button>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Spin size="large" />
      </div>
    );
  }
  if (isError) {
    return <p>Error loading data.</p>;
  }

  return (
    <div className="py-[20px]">
      <Table
        loading={false}
        columns={columns}
        dataSource={data.map((item, index) => ({
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
            pageSize: 5,
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

export default UserTable;
