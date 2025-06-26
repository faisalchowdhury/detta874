import React, { useState } from "react";

import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { Button, DatePicker, Input, Skeleton, Table } from "antd";
import { json, useSearchParams } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { dateFormaterFunc } from "../../../utils/impFunction";
import PageHeading from "../../../Components/PageHeading";
import { BsExclamationCircle } from "react-icons/bs";
import { MdOutlineContentPaste } from "react-icons/md";
import toast from "react-hot-toast";
import DashboardModal from "../../../Components/DashboardModal";


const Earnings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({});
  const [searchQuery, setSearchQuery] = useState({});
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    limit: 15,
  });
  const paramsObject = Object.fromEntries(searchParams.entries());
  // const { data, isLoading, isError } = useGetTransactionsQuery([
  //   ...Object.entries(paramsObject).map(([key, value]) => ({
  //     name: key,
  //     value,
  //   })),
  // ]);
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
  const columns = [
    {
      title: "#Tr.ID",
      dataIndex: "transactionId",
      // key: "transactionId",
      render: (text) => (
        <button
          onClick={(e) => {
            navigator.clipboard.writeText(e.target.innerText);
            toast.success("Copied to clipboard!", {
              position: "bottom-center",
            });
          }}
          className="outline-none active:text-blue-600 transition-all"
        >
          {text}
        </button>
      ),
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Business Name",
      dataIndex: "business",
      key: "business",
    },
    {
      title: "Clicks",
      dataIndex: "click",
      key: "click",
      align: "center"
    },
    {
      title: "Conversion Rate",
      dataIndex: "rate",
      // key: "rate",
      render: (text) => <span>{text}%</span>,
      align: "center"
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span>${text}</span>,
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      // key: "createdAt",
      render: (text) => <span>{new Date(text).toDateString()}</span>,
    },
    {
      title: "Affiliation Link",
      key: "affiliation",
      render: (data) => (
        <Button
          onClick={(e) => {

            navigator.clipboard.writeText(data.affiliation);
            toast.success("Copied to clipboard!", {
              position: "bottom-center",
            });
          }}
          type="default"
          size="small"
        >
          Copy Link <MdOutlineContentPaste className="text-gray-500" />
        </Button>
      ),
    },
    {
      title: "Action",
      key: "Action",
      render: (data) => (
        <Button
          onClick={() => showModal(data)}
          type="text"
          shape="circle"
        >
          <BsExclamationCircle className="text-hash" size={20} />
        </Button>
      ),
    },
  ];
  const data = [];
  for (let index = 0; index < 20; index++) {
    data.push({
      name: "Mr. Henry",
      click: 5,
      email: "henry@gmail.com",
      amount: "9.99",
      rate: "2",
      business: "Raida beautician",
      createdAt: "02-01-2025",
      transactionId: "65456456454" + index,
      affiliation: "https://www.merriam-webster.com/dictionary/affiliation"
    });
    // const element = array[index];
  }
  return (
    <div className="space-y-[24px]">
      <div className="pb-5 pt-1 flex justify-between items-center">
        <PageHeading title={"Earnings"} />
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
            style={{ background: "#1E90FF" }}
            type="primary"
            shape="circle"
            icon={<IoSearch className="" />}
          />
        </div>
      </div>
      <LoaderWraperComp isError={false}>
        <Table
          // loading={isLoading}
          columns={columns}
          // dataSource={[]}
          dataSource={data}
          pagination={{
            position: ["bottomCenter"],
            showQuickJumper: true,
            showSizeChanger: false,
            total: 100 || 0,
            defaultCurrent: 1,
            // current: searchParams.get("page") || 1,
            // onChange: (page) => handleSearchFunc({ page }),
            pageSize: 15,
          }}
        />
      </LoaderWraperComp>
      <DashboardModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div className="flex flex-col justify-between text-base">
          <div className="space-y-7">
            <h6 className="font-medium text-center text-xl pb-1">Transaction Details</h6>
            <div className="flex justify-between">
              <p className="text-hash">Transaction ID : </p>
              <p className="">{"#12345678"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">User name : </p>
              <p className="">{"Gabriel"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Address : </p>
              <p className="">{"Dhaka Bangladesh"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Date : </p>
              <p className="">{modalData.createdAt}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">A/C number : </p>
              <p className="">{"****  ****  ****  *545"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Withdraw Amount : </p>
              <p className="">{"$2.99"}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-hash">Business Name : </p>
              <p className="">{"New Production"}</p>
            </div>
          </div>
          <div className="flex justify-center gap-5 pt-10 pb-4 ">
            <Button onClick={() => setIsModalOpen(false)} size="middle" type="default" className="w-40 rounded-xl">
            Download
            </Button>
            <Button size="middle" type="primary" className="w-40 rounded-xl">
              Print
            </Button>
          </div>
        </div>
      </DashboardModal>
    </div>
  );
};

export default Earnings;
