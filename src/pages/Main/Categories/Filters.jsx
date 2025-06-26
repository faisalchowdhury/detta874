// import React, { useState } from 'react'
// import PageHeading from '../../../Components/PageHeading';
// import AddNewButton from '../../../Components/AddNewButton';
// import { Button, Form, Input } from 'antd';
// import { BiEdit } from 'react-icons/bi';
// import DashboardModal from '../../../Components/DashboardModal';
// import { CgArrowLeft } from 'react-icons/cg';

// const Filters = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalData, setModalData] = useState({});
//   const showModal = (data) => {
//     setIsModalOpen(true);
//     setModalData(data);
//   };
//   const onFinish = (values) => {
//     console.log('Success:', values);
//   };
//   const partyCategories = [
//     "Music",
//     "Energy Level",
//     "Crowd Size",
//     "Age",
//     "Cuisine",
//     "Dietary Restrictions",
//     "Price",
//     "Entry Fee",
//     "Food & Drink"
//   ];
//   return (
//     <div className="py-[16px]">
//       <div className="pb-5 flex justify-between items-center">
//         <PageHeading title={"Filter List"} />
//         <AddNewButton className={"mt-2"} />
//       </div>
//       <div className='flex flex-wrap gap-4'>
//         {partyCategories.map(party => (<div key={party}>
//           <div className="flex justify-between gap-5 bg-slate-100 px-4 py-3 rounded-lg min-w-52 w-full">{party} <Button onClick={() => showModal({ ...party, modalTitle: "Edit Filter" })} shape='circle' size='small' type='dashed' ><BiEdit size={15} /></Button></div>
//         </div>))}
//       </div>
//       <DashboardModal
//         setIsModalOpen={setIsModalOpen}
//         isModalOpen={isModalOpen}
//       >
//         <div className="flex flex-col justify-between text-base">
//           <div className="space-y-7">
//             <div className='flex items-center gap-1'>
//               <CgArrowLeft onClick={() => setIsModalOpen(false)} size={25} /> <h6 className="font-medium text-xl">{modalData.modalTitle}</h6>
//             </div>
//             <Form
//               name="basic"
//               layout='vertical'
//               labelCol={{
//                 span: 24,
//               }}
//               wrapperCol={{
//                 span: 24,
//               }}
//               requiredMark={false}
//               initialValues={{

//               }}
//               onFinish={onFinish}
//               autoComplete="off"
//             >
//               <Form.Item
//                 label={<span className='text-base font-medium'>Category Name</span>}
//                 name="name"
//                 rules={[
//                   {
//                     required: true,
//                     message: 'Please input your category name!',
//                   },
//                 ]}
//               >
//                 <Input size='large' />
//               </Form.Item>
//               <Form.Item
//                 label={<span className='text-base font-medium'>Filter Name</span>}
//                 name="filter"
//               // rules={[
//               //   {
//               //     required: true,
//               //     message: 'Please input your category name!',
//               //   },
//               // ]}
//               >
//                 <Input size='large' />
//               </Form.Item>
//               <Form.Item
//                 name="sub"
//               >
//                 <Input size='large' />
//               </Form.Item>
//               <Form.Item
//                 name="child"
//               >
//                 <Input size='large' />
//               </Form.Item>
//               <Form.Item label={null}>
//                 <Button className='w-full rounded-md mt-1' size="large" type="primary" htmlType="submit">
//                   Edit Filter
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>
//         </div>
//       </DashboardModal>
//     </div>
//   )
// }

// export default Filters

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Input, Button, message } from "antd";
import { CgArrowLeft } from "react-icons/cg";
import { AiOutlineDelete } from "react-icons/ai";

const EditSubFilter = () => {
  const { filterId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [filterName, setFilterName] = useState("");
  const [subfilters, setSubfilters] = useState([]);

  // Fetch the filter data from your API using the dynamic filterId
  useEffect(() => {
    if (!filterId) return;

    const fetchFilter = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/filter?id=${filterId}`
        );
        const result = await res.json();
        if (result?.data?.length > 0) {
          const filterObj = result.data[0];
          setFilterName(filterObj.name || "");
          setSubfilters(filterObj.subfilters || []);
        }
      } catch (error) {
        console.error("Error fetching filter:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilter();
  }, [filterId]);

  /**
   * Delete subfilter (if it has an ID) and remove from state
   */
  const handleRemoveSubfilter = async (subfilterId, index) => {
    if (subfilterId) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/filter/delete-sub-filter?id=${subfilterId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete subfilter");
        }
        message.success("Subfilter deleted successfully!");
      } catch (error) {
        console.error("Error deleting subfilter:", error);
      }
    }
    // Remove from local state (regardless of success or not)
    setSubfilters((prev) => prev.filter((_, i) => i !== index));
  };

  /**
   * Add a new empty subfilter row in the local state
   */
  const handleAddSubfilter = () => {
    setSubfilters((prev) => [...prev, { id: null, value: "" }]);
  };

  /**
   * Update the value of a subfilter at a given index
   */
  const handleChangeSubfilter = (index, newValue) => {
    setSubfilters((prev) =>
      prev.map((sub, i) => (i === index ? { ...sub, value: newValue } : sub))
    );
  };

  /**
   * Save newly added subfilters (with no ID) to the backend
   */
  const handleSave = async () => {
    const token = localStorage.getItem("token");
    let hasAddedAny = false;

    try {
      // For each new subfilter (id is null) that has a non-empty value, call the POST API
      for (const subfilter of subfilters) {
        if (!subfilter.id && subfilter.value.trim() !== "") {
          hasAddedAny = true;
          const response = await fetch(
            `${import.meta.env.VITE_SERVER_URL}/filter/add-sub-filter`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                filterId,
                value: subfilter.value,
              }),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to add subfilter");
          }
        }
      }

      if (hasAddedAny) {
        message.success("New subfilters added successfully!");
      } else {
        message.info("No new subfilters to add.");
      }
    } catch (error) {
      console.error("Error saving subfilters:", error);
      message.error("Failed to add one or more subfilters.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      {/* Heading */}
      <div className="flex items-center gap-2 mb-5">
        <button
          onClick={() => navigate(-1)}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <CgArrowLeft size={25} />
        </button>
        <h1 className="text-xl font-semibold">Edit Sub Filter</h1>
      </div>

      {/* White container/card */}
      <div className="bg-white border border-gray-200 rounded-md p-5 max-w-lg">
        <Form layout="vertical" className="flex flex-col space-y-6">
          {/* Filter Name */}
          <Form.Item
            label={<span className="text-base font-medium">Filter name</span>}
            className="mb-0"
          >
            <Input
              size="large"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
              disabled
              className="rounded-md"
            />
          </Form.Item>

          {/* Subfilter List */}
          <Form.Item
            label={<span className="text-base font-medium">Subfilter Name</span>}
            className="mb-0"
          >
            {subfilters.map((subfilter, index) => (
              <div
                className="flex items-center gap-2 mb-3"
                key={subfilter.id || `sub-${index}`}
              >
                <Input
                  size="large"
                  value={subfilter.value}
                  onChange={(e) => handleChangeSubfilter(index, e.target.value)}
                  className="rounded-md"
                />
                <AiOutlineDelete
                  className="cursor-pointer text-red-500 hover:text-red-600"
                  size={20}
                  onClick={() => handleRemoveSubfilter(subfilter.id, index)}
                />
              </div>
            ))}

            <Button type="dashed" onClick={handleAddSubfilter}>
              Add More
            </Button>
          </Form.Item>

          {/* Save Button */}
          <Form.Item className="mb-0">
            <Button
              type="primary"
              size="large"
              className="w-full rounded-md bg-primary"
              onClick={handleSave}
            >
              Save Subfilters
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default EditSubFilter;








