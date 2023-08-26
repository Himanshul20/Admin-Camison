import Button from "@component/buttons/Button";
import Card from "@component/Card";
import FlexBox from "@component/FlexBox";
import Grid from "@component/grid/Grid";
import Hidden from "@component/hidden/Hidden";
import { toast } from "react-toastify";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import Pagination from "@component/pagination/Pagination";
import TableRow from "@component/TableRow";
import TextField from "@component/text-field/TextField";
import Typography, { H5 } from "@component/Typography";
import { crypt } from "@utils/fn";
import { addCategory, getData } from "@utils/API";
import { Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { DeleteFilled, EditFilled } from "@ant-design/icons";
import { message } from "antd";

const AddCategory = () => {

  const [categoryList, setcategoryList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCategory = async () => {
    var params = "Switch=ALLCATEGORY&itemid=0&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setcategoryList(res.data.result);
    })

  }


  const AddCategory = async (params) => {
    var dycrypt = crypt(params);
    let val = new URLSearchParams();


    let data = JSON.stringify({
      "Datastring": dycrypt
    });
    val.set('Datastring', dycrypt);
    console.log(val, data);
    await addCategory(dycrypt).then((res) => {

      if (res['errorYn'] != 'Y') {
        message.success('Category Added Successfully');
        setLoading(true);

      } else {
        setLoading(true);
        message.error(res['errorMsg']);


      }
      // setcategoryList(res.data.result);
    })

  }
  useEffect(() => {

    fetchCategory();
  }, [loading])

  const handleFormSubmit = async (values) => {
    console.log(values);
    AddCategory(values?.name)
  };

  return (
    <div>
      <DashboardPageHeader
        title="Add Category"
        iconName="delivery-box"

      />

      <Card p="50px">
        <Formik
          initialValues={initialValues}
          validationSchema={checkoutSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={6}>
                <Grid item sm={6} xs={12}>
                  <TextField
                    name="name"
                    label="Name"
                    placeholder="Name"
                    fullwidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name || ""}
                    errorText={touched.name && errors.name}
                  />
                </Grid>

              </Grid>
              <Button
                mt="25px"
                variant="contained"
                color="primary"
                type="submit"
              >
                Save category
              </Button>
            </form>
          )}
        </Formik>
      </Card>

      <div>
        <Hidden down={769}>
          <TableRow padding="0px 18px" mb="-0.125rem" boxShadow="none" bg="none">
            <FlexBox my="0px" mx="6px" flex="2 2 220px !important">
              <H5 ml="56px" color="text.muted" textAlign="left">
                Name
              </H5>
            </FlexBox>

            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Edit
            </H5>
            <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
              Delete
            </H5>
            <H5
              flex="0 0 0 !important"
              color="text.muted"
              px="22px"
              my="0px"
            ></H5>
          </TableRow>
        </Hidden>

        {categoryList.map((item, ind) => (
          <Link href={"/vendor/products/5452423"} key={ind}>
            <TableRow as="a" href={"/vendor/products/5452423"} my="1rem" padding="6px 18px">
              <FlexBox alignItems="center" m="6px" flex="2 2 220px !important">
                <Typography textAlign="left" ml="20px">
                  {item.product_Category_name}
                </Typography>
              </FlexBox>
              <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                <EditFilled />
              </H5>
              <H5 color="text.muted" my="0px" mx="6px" textAlign="left">
                <DeleteFilled />
              </H5>
              <H5
                flex="0 0 0 !important"
                color="text.muted"
                px="22px"
                my="0px"
              ></H5>

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
    </div>
  );
};

const initialValues = {
  name: "",
};

const checkoutSchema = yup.object().shape({
  name: yup.string().required("required"),
});

AddCategory.layout = VendorDashboardLayout;

export default AddCategory;
