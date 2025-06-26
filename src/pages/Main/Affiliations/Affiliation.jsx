import React, { useState, useEffect } from "react";
import PageHeading from "../../../Components/PageHeading";
import { Button } from "antd";
import { BiRightArrow } from "react-icons/bi";
import { Link } from "react-router-dom";

const Affiliation = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/category`
      );
      const result = await response.json();
      if (result?.data) {
        setCategories(result.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center  mt-36">
      <div className="w-20 h-20 border-8 border-blue-500 border-dashed rounded-full animate-spin" />
    </div>
    );
  }

  return (
    <div className="py-[16px]">
      <div className="pb-5 flex justify-between items-center">
        <PageHeading title={"Affiliations"} />
        {/* Uncomment AddNewButton if needed */}
        {/* <AddNewButton /> */}
      </div>
      <div className="flex flex-wrap gap-4">
  {categories.map((category) => (
    <Link to={`/affiliation/${category.id}`} key={category.id}>
      <div className="flex justify-between gap-5 bg-slate-100 px-5 py-4 rounded-lg min-w-52 w-full">
        <span>{capitalizeWords(category.name)}</span>
        <Button shape="circle" size="small" type="text">
          <BiRightArrow size={15} />
        </Button>
      </div>
    </Link>
  ))}
</div>

    </div>
  );
};

export default Affiliation;


 const capitalizeWords = (str) =>
  str
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
