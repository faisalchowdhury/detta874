import React, { useState, useEffect } from "react";
import {
  Layout,
  Avatar,
  List,
  Input,
  Typography,
  Spin,
  Alert,
  Button,
  Tag,
} from "antd";
import { SearchOutlined, UserOutlined } from "@ant-design/icons";
import {
  useGetReportsQuery,
  useSendReportReplyMutation,
} from "../../../redux/features/support/supportApi";

const { Content, Sider } = Layout;
const { Text, Title } = Typography;

const Report = () => {
  const [adminResponse, setAdminResponse] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const {
    data: reports,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetReportsQuery();
  const [
    sendReportReply,
    { isLoading: replyLoading, isError: replyIsError, error: replyError },
  ] = useSendReportReplyMutation();

  useEffect(() => {
    if (reports?.data && Array.isArray(reports.data)) {
      let filtered = reports.data;

      if (searchTerm) {
        filtered = reports.data.filter((item) =>
          item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      setFilteredData(filtered);

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
  }, [searchTerm, reports]);

  const sendReply = async () => {
    if (!adminResponse.trim()) {
      return; // Don't send empty replies
    }

    try {
      await sendReportReply({
        name: selectedUser?.name,
        id: selectedUser?._id,
        email: selectedUser?.email,
        userMessage: selectedUser?.msg,
        adminResponse: adminResponse,
      }).unwrap();

      // Clear the textarea
      setAdminResponse("");

      // Refresh the reports list to update the status
      // setSelectedUser = { ...selectedUser, isReplyed: true };
      refetch();

      console.log("Email sent");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
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
        width={400}
        className="overflow-y-auto bg-white shadow-md sticky top-0 border-r border-accent"
        style={{ height: "75vh", padding: "16px 12px" }}
      >
        <Input
          placeholder="Search names"
          prefix={<SearchOutlined className="text-dark" />}
          onChange={(e) => setSearchTerm(e.target?.value)}
          className="mb-3 bg-accent border-none rounded-lg h-10 text-dark placeholder:text-dark"
        />

        <List
          itemLayout="horizontal"
          dataSource={filteredData}
          renderItem={(item) => (
            <List.Item
              onClick={() => setSelectedUser(item)}
              className={`cursor-pointer p-3 rounded-lg mb-1 ${
                selectedUser?._id === item?._id
                  ? "bg-primary/10 border-l-4 border-primary"
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
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <Text strong className="text-sm truncate text-dark">
                          {item?.name}
                        </Text>
                        <Tag
                          color={item?.isReplyed ? "#6A0DAD" : "#2C3233"}
                          className="ml-2 text-xs rounded-full border-none text-white"
                          style={{
                            background: item?.isReplyed ? "#6A0DAD" : "#2C3233",
                            color: "#fff",
                          }}
                        >
                          {item?.isReplyed ? "Replied" : "New"}
                        </Tag>
                      </div>
                      <Text className="block text-dark/60 text-xs whitespace-nowrap overflow-hidden text-ellipsis">
                        {item?.subject}
                      </Text>
                    </div>
                    <Text
                      type="secondary"
                      className="text-xs flex-shrink-0 text-dark/40"
                    >
                      {item?.createdAt}
                    </Text>
                  </div>
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
                <div className="flex justify-between items-start">
                  <Title level={4} className="mb-1 text-dark">
                    {selectedUser?.subject}
                  </Title>
                  <Tag
                    color={selectedUser?.isReplyed ? "#6A0DAD" : "#2C3233"}
                    className="ml-2 rounded-full border-none text-white"
                    style={{
                      background: selectedUser?.isReplyed
                        ? "#6A0DAD"
                        : "#2C3233",
                      color: "#fff",
                    }}
                  >
                    {selectedUser?.isReplyed ? "Replied" : "New"}
                  </Tag>
                </div>
                <div className="bg-accent/60 p-2 border border-accent rounded-md mb-2">
                  <Text className="block text-sm text-dark">
                    Suspect name: {selectedUser?.suspectName}
                  </Text>
                  <Text className="text-sm block text-dark">
                    Suspect username: {selectedUser?.suspectUsername}
                  </Text>
                  <Text className="block text-sm text-dark">
                    Suspect email: {selectedUser?.suspectEmail}
                  </Text>
                </div>
                <div className="bg-white p-2 border border-primary/30 rounded-md">
                  <Text className="block text-sm text-dark">
                    Victim name: {selectedUser?.name}
                  </Text>
                  <Text className="text-sm block text-dark">
                    Victim username: {selectedUser?.username}
                  </Text>
                  <Text className="block text-sm text-dark">
                    Victim email: {selectedUser?.email}
                  </Text>
                </div>
              </div>
              <h1 className="mb-2 font-medium text-dark">Message:</h1>
              <div className="p-4 bg-accent rounded-lg mb-6 flex-grow border border-accent/60">
                <Text className="leading-relaxed text-dark">
                  {selectedUser?.msg}
                </Text>
              </div>
            </>
          ) : (
            <div className="flex justify-center items-center h-full text-dark/40">
              <Text>No support requests found</Text>
            </div>
          )}
          <div className="mt-auto">
            <Input.TextArea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              placeholder="Type your reply..."
              autoSize={{ minRows: 3, maxRows: 5 }}
              className="rounded-lg bg-accent border-none p-3 text-dark placeholder:text-dark"
              disabled={selectedUser?.isReplyed}
            />
            <Button
              onClick={sendReply}
              loading={replyLoading}
              className="bg-primary hover:bg-[#5a0996] float-right mt-3 text-white font-medium border-none"
              disabled={!adminResponse.trim() || selectedUser?.isReplyed}
              style={{ background: "#6A0DAD", border: "none" }}
            >
              {selectedUser?.isReplyed ? "Already Replied" : "Send Reply"}
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default Report;
