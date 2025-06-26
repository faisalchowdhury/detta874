// src/pages/Main/Support/Support.jsx
import React, { useState, useEffect } from "react";
import { Layout, Avatar, List, Input, Typography, Spin, Alert } from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import { useGetSupportsQuery } from "../../../redux/features/support/supportApi";

const { Content, Sider } = Layout;
const { Text, Title } = Typography;

const Support = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const { data: supports, isLoading, isError, error } = useGetSupportsQuery();

  useEffect(() => {
    if (supports?.data && Array.isArray(supports.data)) {
      let filtered = supports.data;

      // Apply search filter if term exists
      if (searchTerm) {
        filtered = supports.data.filter((item) =>
          item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredData(filtered);

      // Manage selection:
      // 1. If no selection exists - select first item
      // 2. If current selection is missing from results - select first item
      // 3. If no results - clear selection
      if (filtered.length > 0) {
        if (
          !selectedUser ||
          !filtered.some((user) => user._id === selectedUser._id)
        ) {
          setSelectedUser(filtered[0]);
        }
      } else {
        setSelectedUser(null);
      }
    }
  }, [searchTerm, supports]);

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "75vh",
        }}
      >
        <Spin size="large" tip="Loading support requests..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6">
        <Alert
          message="Error"
          description={`Failed to load support requests: ${error?.message}`}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <Layout className="min-h-screen bg-accent">
      <Sider
        width={320}
        className="overflow-y-auto bg-white shadow-md sticky top-0 border-r border-accent"
        style={{ height: "75vh", padding: "16px 12px" }}
      >
        <Input
          placeholder="Search names"
          prefix={<SearchOutlined className="text-dark" />}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-3 bg-accent border-none rounded-lg h-10 text-dark placeholder:text-dark"
        />

        <List
          itemLayout="horizontal"
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item
              onClick={() => setSelectedUser(item)}
              className={`cursor-pointer  rounded-lg mb-1  ${
                selectedUser?._id === item?._id
                  ? "bg-primary/10 border-l-4 border-primary px-12"
                  : "bg-white"
              }`}
            >
              <div className="flex w-full">
                <Avatar
                  src={item?.image}
                  icon={<UserOutlined />}
                  className="w-10 h-10 bg-accent text-primary"
                />
                <div className="ml-3 w-[calc(100%-42px)]">
                  <div className="flex justify-between items-start">
                    <Text strong className="text-sm truncate text-dark">
                      {item?.name}
                    </Text>
                    <Text
                      type="secondary"
                      className="text-xs flex-shrink-0 text-dark/40"
                    >
                      {new Date(item?.createdAt).toLocaleDateString()}
                    </Text>
                  </div>
                  <Text className="block text-dark/60 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                    {item?.subject}
                  </Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Sider>

      <Content className="p-6">
        <div className="bg-white rounded-xl p-6 shadow-sm h-[calc(100vh-150px)] flex flex-col border border-accent/40">
          {selectedUser ? (
            <>
              <div className="mb-6">
                <Title level={4} className="mb-1 text-dark">
                  {selectedUser?.subject}
                </Title>
                <Text type="secondary" className="text-dark/40">
                  {new Date(selectedUser?.createdAt).toLocaleString()}
                </Text>
              </div>
              <div className="p-4 bg-accent rounded-lg mb-6 flex-grow border border-accent/60 overflow-y-auto">
                <Text className="leading-relaxed text-dark whitespace-pre-wrap">
                  {selectedUser?.msg}
                </Text>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-dark/40">
              <Text>Select a support request to view details</Text>
            </div>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default Support;
