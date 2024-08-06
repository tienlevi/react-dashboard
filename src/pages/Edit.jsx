import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { editProduct, getProductById } from "../redux/products";
import useMessage from "antd/es/message/useMessage";

function Edit() {
  const { id } = useParams();
  const [message, contextHolder] = useMessage();
  const { products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getProductById(id));
  }, []);

  const onSubmit = (data) => {
    dispatch(editProduct(data));
    navigate("/");
    message.success("Sửa thành công");
  };

  if (loading) return <>Loading...</>;

  return (
    <>
      {contextHolder}
      <h2>Edit Product</h2>
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
        style={{
          maxWidth: 600,
        }}
        initialValues={products}
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
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea style={{ resize: "none" }} />
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

export default Edit;
