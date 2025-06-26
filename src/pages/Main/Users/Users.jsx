import React, { useState, useMemo } from "react";
import { Button, DatePicker, Input } from "antd";
import { IoSearch } from "react-icons/io5";

// Replace this with your actual RTK Query import
import { useGetAllUserQuery } from "../../../redux/features/Users/usersApi";

// Placeholder components for loading and heading
import LoaderComponent from "../../../Components/LoaderWraperComp";
import PageHeading from "../../../Components/PageHeading";

import UserListTable from "../../../Components/UserListTable";

const Users = () => {
  // State for search filters: name (string) and date (YYYY-MM-DD)
  const [searchQuery, setSearchQuery] = useState({ name: "", date: "" });

  // Fetch all users from your API (adjust limit as needed)
  const {
    data: usersData,
    isLoading,
    isError,
    refetch,
  } = useGetAllUserQuery({
    role: "user",
    limit: 1000,
  });

  // The array of all users. Adjust if your API response structure differs.
  const allUsers = usersData?.data || [];

  // Filter data on the frontend based on "name" and "date"
  const filteredData = useMemo(() => {
    return allUsers.filter((user) => {
      // Case-insensitive name match
      const matchesName = searchQuery.name
        ? user.name?.toLowerCase().includes(searchQuery.name.toLowerCase())
        : true;

      // Convert user.createdAt to "YYYY-MM-DD" by:
      // 1. new Date(user.createdAt) => JS Date
      // 2. .toISOString().slice(0,10) => "YYYY-MM-DD"
      const userCreatedAt = new Date(user.createdAt).toISOString().slice(0, 10);
      const matchesDate = searchQuery.date
        ? userCreatedAt === searchQuery.date
        : true;

      return matchesName && matchesDate;
    });
  }, [allUsers, searchQuery]);

  // Called when user clicks the search button; the actual filtering
  // is handled by `filteredData` in the useMemo above.
  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  if (isLoading) return <LoaderComponent isError={false} />;
  if (isError) return <p>Error loading data.</p>;

  return (
    <div className="py-[16px]">
      {/* Page heading and search controls */}
      <div className="pb-5 flex justify-between items-center">
        <PageHeading title={"User List"} />

        <div className="flex justify-end gap-x-4">
          {/* Date filter (format="YYYY-MM-DD" ensures dateString is in "YYYY-MM-DD") */}
          <DatePicker
            format="YYYY-MM-DD"
            onChange={(date, dateString) =>
              setSearchQuery((prev) => ({
                ...prev,
                date: dateString, // e.g. "2025-02-23"
              }))
            }
            placeholder="Date"
            style={{ width: "150px" }}
            className="custom-datepicker rounded-full text-[#222222] px-3.5 text-sm"
          />

          {/* Name filter */}
          <Input
            onChange={(e) =>
              setSearchQuery((prev) => ({ ...prev, name: e.target.value }))
            }
            className="focus:outline-none outline-none rounded-full placeholder:text-[#222222] px-3.5 text-sm w-[170px]"
            placeholder="User Name"
          />

          {/* Search button */}
          <Button
            onClick={handleSearch}
            type="primary"
            style={{ background: "#1E90FF" }}
            shape="circle"
            icon={<IoSearch />}
          />
        </div>
      </div>

      {/* Pass filtered data to UserListTable */}
      <UserListTable
        role="user"
        data={filteredData}
        refatch={refetch}
        pageSize={10} // 10 records per page
      />
    </div>
  );
};

export default Users;
