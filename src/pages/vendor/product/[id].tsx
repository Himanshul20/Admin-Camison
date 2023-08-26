import Avatar from "@component/avatar/Avatar";
import IconButton from "@component/buttons/IconButton";
import FlexBox from "@component/FlexBox";
import Hidden from "@component/hidden/Hidden";
import Icon from "@component/icon/Icon";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import Typography, { H5 } from "@component/Typography";
import Link from "next/link";

import React, { useEffect, useState } from "react";
import { addProductVariation, getData } from "../../../utils/API"
import { Button, Form, Input, Select, Upload, Col, Row, Space, Spin, Card } from "antd";
import { useRouter } from "next/router";
import { LeftOutlined, MinusCircleOutlined, PlusOutlined, StopFilled } from "@ant-design/icons";
import { crypt } from "@utils/fn";
import { toast } from "react-toastify";

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ProductId, setProductId] = useState(id);
  const [loading, setLoading] = useState(false);

  const [productList, setproductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [sizeDRP, setSizeyDRP] = useState([]);
  const [colorDRP, setColorDRP] = useState([]);



  const fetchColordrp = async () => {
    var params = "Switch=COLORDRP&itemid=0&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setColorDRP(res.data.result);
    })

  }
  const fetchSizedrp = async () => {
    var params = "Switch=SIZEDRP&itemid=0&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setSizeyDRP(res.data.result);
    })

  }


  let optionColorItems = colorDRP.map((item) =>
    <option key={item.value}>{item.label}</option>
  );
  let optionSizeItems = sizeDRP.map((item) =>
    <option key={item.value}>{item.label}</option>
  );
  const onFinish = (values) => {
    var formdata = "";
    console.log('Received values of form: ', values);
    if (ProductId != undefined) {
      for (let index = 0; index < values['variation'].length; index++) {
        let data = values['variation'][index];

        formdata += `${ProductId}^${data['Size']}^${data['color']}^${data['mrp']}^${data['sp']}^${data['stock']}${index == values['variation'].length - 1 ? "" : '~'}`
      }
      console.log(values['variation'].length, formdata);

      AddProductVariation(formdata);

    } else {

      console.log("Product id not fetched");

    }

    // const formValues = `${values['Name'] || 'NA'}|${values['Description'] || 'NA'}|${values['Keyword'] || 'NA'}|${values['Category'] || 'NA'}|${formdata}`;

  }

  const AddProductVariation = async (params) => {
    var dycrypt = crypt(params);
    let val = new URLSearchParams();


    let data = JSON.stringify({
      "Datastring": dycrypt
    });
    val.set('Datastring', dycrypt);
    console.log(val, data);
    await addProductVariation(dycrypt).then((res) => {

      if (res['errorYn'] != 'Y') {
        toast('Issue Created Successfully', { type: 'success' })
        setLoading(true);

      } else {
        setLoading(true);

        toast(res['errorMsg'], { type: 'success' })

      }
      // setcategoryList(res.data.result);
    })

  }
  const fetchProduct = async () => {
    var params = "Switch=PRODUCT&itemid=" + ProductId + "&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setproductList(res.data.result);
    })

  }
  useEffect(() => {
    console.log(id, ProductId)
    setProductId(id);

    fetchdata();

  }, [loading])

  const fetchdata = async () => {
    setIsLoading(true);

    await fetchColordrp()
    await fetchSizedrp()
    await fetchProduct();
    setIsLoading(false);

  }
  return (
    <div>
      {isLoading && <Space size="middle" >

        <Spin style={{ position: "fixed", top: "50%", left: "50%" }} size="large" />
      </Space>}
      <DashboardPageHeader title="Product Variation" iconName="delivery-box" />


      <Hidden down={769}>
        <TableRow padding="0px 18px" mb="-0.125rem" boxShadow="none" bg="none">
          <FlexBox my="0px" mx="6px" flex="2 2 px !important">
            <H5 ml="20px" color="text.muted" textAlign="left">
              Name
            </H5>
          </FlexBox>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Category
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Color/Size
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Stock
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Regular price
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Sale Price
          </H5>
          <H5
            flex="0 0 0 !important"
            color="text.muted"
            px="22px"
            my="0px"
          ></H5>
        </TableRow>
      </Hidden>

      {productList.map((item, ind) => (
        <Link href={"/vendor/products/" + item.key} key={ind}>
          <TableRow as="a" href={"/vendor/products/" + item.key} my="1rem" padding="6px 18px">
            <FlexBox alignItems="center" m="6px" flex="2 2 px !important">
              <H5 m="6px" textAlign="left" fontWeight="400">
                {item.key}
              </H5>
              <Typography textAlign="left" ml="20px">
                {item.product_name}
              </Typography>
            </FlexBox>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {item.product_Category}
            </H5>
            {item.product_Size}
            <StopFilled style={{ color: item.product_Color }} />

            <H5
              m="6px"
              textAlign="left"
              fontWeight="600"
              color={item.product_stock < 6 ? "error.main" : "inherit"}
            >
              {item.product_stock.toString().padStart(2, "0")}
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {item.product_MRP.toFixed(2)}
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {item.product_saleprice.toFixed(2)}
            </H5>

            <Hidden flex="0 0 0 !important" down={769}>
              <Typography textAlign="center" color="text.muted">
                <IconButton size="small">
                  <Icon variant="small" defaultcolor="currentColor">
                    arrow-right
                  </Icon>
                </IconButton>
              </Typography>
            </Hidden>
          </TableRow>
        </Link>
      ))}

      {/* <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox> */}
      <Card p="30px">
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={{
            'stock': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
          }}
          style={{
            maxWidth: 600,
          }}
        >


          <Form.List name="variation">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card
                    key={key}
                    color={'grey'}
                    size={'small'}
                  >
                    <Row>
                      <Col xs={12} sm={10} md={6} lg={8} xl={15}>
                        <Form.Item labelAlign="left"
                          {...restField}
                          label={['color']}
                          name={[name, 'color']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing Size',
                            },
                          ]}

                        >
                          <Select placeholder="Please select colors">
                            {optionColorItems}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={12} lg={8} xl={15}>
                        <Form.Item labelAlign="left"
                          {...restField}
                          label={['Size']}

                          name={[name, 'Size']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing Size',
                            },
                          ]}

                        >
                          <Select placeholder="Please select Size">
                            {optionSizeItems}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={6} lg={8} xl={15}>
                        <Form.Item labelAlign="left"
                          {...restField}
                          label={['Stock']}

                          name={[name, 'stock']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing Stock',
                            },
                          ]}
                        >
                          <Input placeholder="Enter Stock" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={6} lg={8} xl={10}>
                        <Form.Item labelAlign="left"
                          {...restField}
                          label={['MRP']}

                          name={[name, 'mrp']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing mrp',
                            },
                          ]}
                        >
                          <Input placeholder="Enter MRP" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={6} lg={8} xl={10}>
                        <Form.Item labelAlign="left"
                          {...restField}
                          label={['SP']}

                          name={[name, 'sp']}
                          rules={[
                            {
                              required: true,
                              message: 'Missing Sales price',
                            },
                          ]}
                        >
                          <Input placeholder="Enter Sales price" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={6} lg={8} xl={10}>
                        <MinusCircleOutlined onClick={() => remove(name)} />

                      </Col>
                    </Row>





                  </Card>
                ))}
                <Form.Item labelAlign="left" >
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Variation
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>









          <Form.Item labelAlign="left"
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Add Variation
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const productList1 = [
  {
    orderNo: "1050017AS",
    stock: 30,
    price: 350,
    href: "/vendor/products/5452423",
  },
  {
    orderNo: "1050017AS",
    stock: 20,
    price: 500,
    href: "/vendor/products/5452423",
  },
  {
    orderNo: "1050017AS",
    stock: 2,
    price: 700,
    href: "/vendor/products/5452423",
  },
  {
    orderNo: "1050017AS",
    stock: 25,
    price: 300,
    href: "/vendor/products/5452423",
  },
  {
    orderNo: "1050017AS",
    stock: 1,
    price: 700,
    href: "/vendor/products/5452423",
  },
];

Product.layout = VendorDashboardLayout;

export default Product;
