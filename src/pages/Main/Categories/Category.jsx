// import React, { useState } from 'react'
// import PageHeading from '../../../Components/PageHeading';
// import AddNewButton from '../../../Components/AddNewButton';
// import { Button, Form, Input } from 'antd';
// import { BiEdit } from 'react-icons/bi';
// import DashboardModal from '../../../Components/DashboardModal';
// import { CgArrowLeft } from 'react-icons/cg';

// const Category = () => {
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
//     "Bars",
//     "Nightclubs",
//     "Restaurants",
//     "Party Restaurants",
//     "Comedy Clubs",
//     "Concerts",
//     "Ticketed Parties"
//   ]
//   return (
//     <div className="py-[16px]">
//       <div className="pb-5 flex justify-between items-center">
//         <PageHeading title={"Category List"} />
//         {/* <AddNewButton className={"mt-2"} /> */}
//       </div>
//       <div className='flex flex-wrap gap-4'>
//         {partyCategories.map(party => (<div key={party}>
//           <div className="flex justify-between gap-5 bg-slate-100 px-4 py-3 rounded-lg min-w-52 w-full">{party} <Button onClick={() => showModal({ ...party, modalTitle: "Edit Category" })} shape='circle' size='small' type='dashed' ><BiEdit size={15} /></Button></div>
//         </div>))}
//       </div>
//       <DashboardModal
//         setIsModalOpen={setIsModalOpen}
//         isModalOpen={isModalOpen}
//         closeIcon={false}
//       >
//         <div className="flex flex-col justify-between text-base">
//           <div className="space-y-6">
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
//               <Form.Item label={null}>
//                 <Button className='w-full rounded-md mt-1' size="large" type="primary" htmlType="submit">
//                   Edit Category
//                 </Button>
//               </Form.Item>
//             </Form>
//           </div>
//         </div>
//       </DashboardModal>
//     </div>
//   )
// }

// export default Category



import React, { useState, useEffect } from 'react';
import PageHeading from '../../../Components/PageHeading';
import AddNewButton from '../../../Components/AddNewButton';
import { Button, Form, Input } from 'antd';
import { AiOutlineEye } from 'react-icons/ai';
import DashboardModal from '../../../Components/DashboardModal';
import { CgArrowLeft } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from your API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/category`);
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Category List</h1>

      {loading ? (
         <div className="flex items-center justify-center  mt-36">
         <div className="w-20 h-20 border-8 border-blue-500 border-dashed rounded-full animate-spin" />
       </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {categories.map((category) => {
            // Filter out any filters that don't have a 'name' property
            const validFilters = category.filters?.filter((f) => f.name);

            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm w-[220px] overflow-hidden"
              >
                {/* Top image */}
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${category.image}`}
                  alt={category.name}
                  className="w-full h-32 object-cover"
                />

                {/* Card content */}
                <div className="p-4">
                  {/* Category name */}
                  <h3 className="text-lg font-semibold capitalize">
                    {category.name.replace(/-/g, " ")}
                  </h3>

                  {/* Conditionally render the Filters section only if validFilters exist */}
                  {validFilters && validFilters.length > 0 && (
                    <div className="mt-2 border rounded-lg p-2">
                      <h4 className="font-semibold mb-2">Filters</h4>
                      {validFilters.map((filter) => (
                        <div
                          key={filter._id || filter.name}
                          className="bg-blue-50 px-3 py-2 flex justify-between items-center mb-2 rounded"
                        >
                          <span className="capitalize">{filter.name}</span>
                          {/* Navigate to /categories/filters/:filterId on click */}
                          <AiOutlineEye
                            className="text-blue-500 cursor-pointer"
                            onClick={() => navigate(`/categories/filters/${filter._id}`)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Category;

