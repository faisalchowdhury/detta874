import React, { useState } from 'react'
import PageHeading from '../../../Components/PageHeading';
import AddNewButton from '../../../Components/AddNewButton';
import { Button, Form, Input } from 'antd';
import { BiEdit, BiPlusCircle } from 'react-icons/bi';
import DashboardModal from '../../../Components/DashboardModal';
import { CgArrowLeft } from 'react-icons/cg';
import { PiMinusCircleThin } from 'react-icons/pi';

const SubFilters = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const showModal = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
  };
  const partyCategories = [
    "Music",
    "Energy Level",
    "Crowd Size",
    "Age",
    "Cuisine",
    "Dietary Restrictions",
    "Price",
    "Entry Fee",
    "Food & Drink"
  ];

  return (
    <div className="py-[16px]">
      <div className="pb-5 flex justify-between items-center">
        <PageHeading title={"Sub Filters"} />
        <AddNewButton className={"mt-2"} />
      </div>
      <div className='flex flex-wrap gap-4'>
        {partyCategories.map(party => (<div key={party}>
          <div className="flex justify-between gap-5 bg-slate-100 px-4 py-3 rounded-lg min-w-52 w-full">{party} <Button onClick={() => showModal({ ...party, modalTitle: "Edit Sub-Filter" })} shape='circle' size='small' type='dashed' ><BiEdit size={15} /></Button></div>
        </div>))}
      </div>
      <DashboardModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
      >
        <div className="flex flex-col justify-between text-base">
          <div className="space-y-7">
            <div className='flex items-center gap-1'>
              <CgArrowLeft onClick={() => setIsModalOpen(false)} size={25} /> <h6 className="font-medium text-xl">{modalData.modalTitle}</h6>
            </div>
            <Form
              name="basic"
              layout='vertical'
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              requiredMark={false}
              initialValues={{

              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label={<span className='text-base font-medium'>Filter Name</span>}
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input your category name!',
                  },
                ]}
              >
                <Input size='large' />
              </Form.Item>
              <Form.Item
                label={<span className='text-base font-medium'>Sub-Filter Name</span>}
                name="filter"
              // rules={[
              //   {
              //     required: true,
              //     message: 'Please input your category name!',
              //   },
              // ]}
              >
                <Input size='large' />
              </Form.Item>
              <Form.Item
                name="sub"
              >
                <Input size='large' />
              </Form.Item>
              <Form.Item
                name="child"
              >
                <Input size='large' />
              </Form.Item>
              <Form.List
                name="more"
                // rules={[
                //   {
                //     validator: async (_, names) => {
                //       if (!names || names.length < 2) {
                //         return Promise.reject(new Error('At least 2 passengers'));
                //       }
                //     },
                //   },
                // ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.map((field, index) => (
                      <Form.Item
                        // {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                        // label={index === 0 ? 'Passengers' : ''}
                        required={false}
                        key={field.key}
                      >
                        <div className='flex items-center gap-2'>
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: "Please input this field.",
                              },
                            ]}
                            noStyle
                          >
                            <Input
                              placeholder=""
                              size='large'
                            />
                          </Form.Item>
                          {fields.length > 1 ? (
                            <PiMinusCircleThin size={25}
                              className="dynamic-delete-button cursor-pointer"
                              onClick={() => remove(field.name)}
                            />
                          ) : null}
                        </div>
                      </Form.Item>
                    ))}
                    <Form.Item>
                      <Button
                      className='w-full'
                        type="dashed"
                        onClick={() => {
                          add('', 0);
                        }}
                        icon={<BiPlusCircle />}
                      >
                        Add More
                      </Button>
                      <Form.ErrorList errors={errors} />
                    </Form.Item>
                  </>
                )}
              </Form.List>
              <Form.Item label={null}>
                <Button className='w-full rounded-md mt-1' size="large" type="primary" htmlType="submit">
                  Update
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </DashboardModal>
    </div>
  )
}

export default SubFilters