import React, { useState } from "react";
import { Button, DatePicker, Input, Table } from "antd";
import DashboardModal from "../../../Components/DashboardModal";
import { IoSearch } from "react-icons/io5";
import { cn } from "../../../lib/utils";
import {
  useGetWithdrawRequestQuery,
  usePaymentMutation,
} from "../../../redux/features/transaction/transactionApi";
import LoaderComponent from "../../../Components/LoaderWraperComp";
import { useSearchParams } from "react-router-dom";
import { dateFormaterFunc } from "../../../utils/impFunction";
import Swal from "sweetalert2";

const Withdraw = () => {
  const [searchQuery, setSearchQuery] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [paymentMu, { isLoading: payLoading }] = usePaymentMutation();
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 15,
  });
  const paramsObject = Object.fromEntries(searchParams.entries());
  const { data, isLoading, isError } = useGetWithdrawRequestQuery([
    ...Object.entries(paramsObject).map(([key, value]) => ({
      name: key,
      value,
    })),
  ]);
  const handleSearchFunc = (...rest) => {
    const newParams = rest.reduce((acc, item) => {
      acc[Object.keys(item)[0]] = Object.values(item)[0];
      return acc;
    }, {});
    setSearchParams({ ...newParams });
  };
  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };
  const handlePay = async (id) => {
    try {
      await paymentMu({ id });
      setIsModalOpen(false);
      setModalData({});
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Request accepted!!",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!!",
        text:
          (error.message || error?.data?.message || "Something went wrong.") +
          " Please try again later.",
      });
    }
  };
  const columns = [
    {
      title: "#SI",
      dataIndex: "key",
      key: "key",
      render: (_text, _record, index) => (
        <p>{(searchParams.get("page") - 1) * 15 + (index + 1)}</p>
      ),
    },
    {
      title: "Host Name",
      render: (record) => <p>{record.userId?.name || "N/A"}</p>,
    },
    {
      title: "Email",
      render: (_text, record) => <p>{record.userId?.email || "N/A"}</p>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span>{text}$</span>,
    },
    // {
    //   title: "Your Per(%)",
    //   dataIndex: "perPercent",
    //   key: "perPercent",
    //   render: (text) => <span className="pl-4">{text}</span>,
    // },

    {
      title: "Request Date",
      dataIndex: "createdAt",
      render: (text) => <span>{new Date(text).toDateString()}</span>,
    },
    {
      title: "Action",
      dataIndex: "isWithdrawRequested",
      align: "center",
      render: (text, record) => (
        <Button
          type={text === "pending" ? "primary" : "text"}
          onClick={() => {
            if (text === "pending") showModal(record);
          }}
          className={cn("w-24")}
        >
          {text === "pending" ? "Pay Now" : "Paid"}
        </Button>
      ),
    },
  ];
  return (
    <div className="bg-white rounded-lg py-[16px]">
      {/* <div className="w-screen overflow-x-auto"> */}
      <div className="">
        <div className="px-6 pb-5 pt-1 flex justify-between items-center">
          <h3 className="text-2xl font-sans">{"Withdraw request"}</h3>
          <div className="flex justify-end gap-x-4">
            <DatePicker
              onChange={(date, _dateString) => {
                setSearchQuery({
                  ...searchQuery,
                  date: dateFormaterFunc(date),
                });
              }}
              placeholder="Date"
              style={{ width: "150px" }}
              className="custom-datepicker rounded-full text-[#222222] px-3.5 text-sm"
            />
            <Input
              onChange={(e) =>
                setSearchQuery({ ...searchQuery, name: e.target.value })
              }
              className="focus:outline-none outline-none rounded-full placeholder:text-[#222222] px-3.5 text-sm w-[170px]"
              placeholder="User Name"
            />
            <Button
              onClick={() => {
                handleSearchFunc(
                  ...Object.entries(searchQuery).map(
                    (item) => item[1] && { [item[0]]: item[1] }
                  ),
                  { page: 1 }
                );
              }}
              className="bg-primary text-white border-none"
              type="primary"
              shape="circle"
              icon={<IoSearch className="" />}
            />
          </div>
        </div>
        <LoaderComponent isError={isError}>
          <Table
            loading={isLoading}
            columns={columns}
            dataSource={data?.data?.withdrawals}
            pagination={{
              position: ["bottomCenter"],
              showQuickJumper: true,
              showSizeChanger: false,
              total: data?.data?.pagination?.totalPendingWithdrawals || 0,
              defaultCurrent: 1,
              current: searchParams.get("page") || 1,
              onChange: (page) => handleSearchFunc({ page }),
              pageSize: 15,
            }}
          />
        </LoaderComponent>
      </div>
      <DashboardModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        maxWidth={"850px"}
      >
        <div className="flex flex-col justify-between text-hash font-sans">
          <h6 className="font-sans text-center text-2xl pt-[15px]">
            Withdraw Request Details
          </h6>
          <div className="space-y-[18px] divide-y divide-gray-100 border-b border-gray-100 pb-5 px-2">
            <div className="flex justify-between pt-[18px]">
              <p>Host Name :</p>
              <p className="">{modalData.userId?.name}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Email :</p>
              <p className="">{modalData.userId?.email}</p>
            </div>
            {/* <div className="flex justify-between pt-[18px]">
              <p>Acconut Number :</p>
              <p className="">{"****  ****  ****  *545"}</p>
            </div> */}
            {/* <div className="flex justify-between pt-[18px]">
              <p>Account Holder Name :</p>
              <p className="">Victor</p>
            </div> */}
            <div className="flex justify-between pt-[18px]">
              <p>Amount Requested :</p>
              <p className="">${modalData.amount}</p>
            </div>
            <div className="flex justify-between pt-[18px]">
              <p>Date :</p>
              <p className="">{new Date(modalData.createdAt).toDateString()}</p>
            </div>
          </div>
          <div className="flex justify-center py-4 px-11 gap-x-6 mt-5">
            <Button
              loading={payLoading}
              onClick={() => handlePay(modalData._id)}
              style={{
                background: "#3A7D99",
              }}
              size="middle"
              type="primary"
              className="w-52 rounded-lg "
            >
              Accept
            </Button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Withdraw;
