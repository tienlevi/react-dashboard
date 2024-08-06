import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import { addProduct } from "../redux/products";
import useMessage from "antd/es/message/useMessage";

function Add() {
  const [message, contextHolder] = useMessage();
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onSubmit = (data) => {
    dispatch(addProduct(data));
    message.success("Add success");
  };

  return (
    <>
      {contextHolder}
      <h2>Add Product</h2>
      <Form
        form={form}
        name="wrap"
        labelCol={{
          flex: "110px",
        }}
        labelAlign="left"
        labelWrap
        wrapperCol={{
          flex: 1,
        }}
        colon={false}
        style={{
          maxWidth: 600,
        }}
        onFinish={onSubmit}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label=" ">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default Add;
