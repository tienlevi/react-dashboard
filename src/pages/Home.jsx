import { useState, useEffect } from "react";
import { Button, Input, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../redux/products";
import { Link } from "react-router-dom";
import useMessage from "antd/es/message/useMessage";

function Home() {
  const [message, contextHolder] = useMessage();
  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const filterData = products?.filter((item) =>
    item.name.toLowerCase().includes(searchText?.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      filteredValue: filteredInfo.name || null,
      onFilter: (value, record) => record.name.includes(value),
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, product) => (
        <Space>
          <Button
            onClick={() => {
              dispatch(deleteProduct(product.id));
              message.success("Delete success");
            }}
          >
            Delete
          </Button>
          <Link to={`/edit/${product.id}`}>
            <Button>Edit</Button>
          </Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  return (
    <>
      {products.length < 0 && <>Loading....</>}
      {contextHolder}
      <Space style={{ margin: "10px 0px" }}>
        <Input
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Link to={`/add`}>
          <Button>Add Product</Button>
        </Link>
      </Space>
      <Table
        columns={columns}
        dataSource={filterData?.map((item) => ({ key: item.id, ...item }))}
        onChange={handleChange}
      />
    </>
  );
}
export default Home;
