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
import { CircularProgress } from '@mui/material';

import React, { useEffect, useState } from "react";
import { getData } from "../../../utils/API"
import { Space, Spin } from "antd";
const Products = () => {

  const [productList, setproductList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const fetchProduct = async () => {
    var params = "Switch=ALLPRODUCT&itemid=0&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setproductList(res.data.result);
    })

  }
  useEffect(() => {
    setIsLoading(true);
    fetchProduct();
    setIsLoading(false);
  }, [])

  return (
    <div>
      {isLoading && <Space size="middle" >

        <Spin size="large" />
      </Space>}
      <DashboardPageHeader title="Products" iconName="delivery-box" />


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
            Total Stock
          </H5>
          <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
            Total Variation
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
        <Link href={"/vendor/product/" + item.key} key={ind}>
          <TableRow as="a" href={"/vendor/product/" + item.key} my="1rem" padding="6px 18px">
            <FlexBox alignItems="center" m="6px" flex="2 2 px !important">
              <Avatar src={item.imagepath || "/assets/images/products/imageshoes.png"} size={36} />
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
            <H5
              m="6px"
              textAlign="left"
              fontWeight="600"
              color={item.totalStock < 6 ? "error.main" : "inherit"}
            >
              {item.totalStock.toString().padStart(2, "0")}
            </H5>
            <H5 m="6px" textAlign="left" fontWeight="400">
              {item.variationCount}
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

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination
          pageCount={5}
          onChange={(data) => {
            console.log(data.selected);
          }}
        />
      </FlexBox>
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

Products.layout = VendorDashboardLayout;

export default Products;
