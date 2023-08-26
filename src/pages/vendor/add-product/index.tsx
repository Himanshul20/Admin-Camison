import Card from "@component/Card";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import {
  addProduct,
  getCategorydrp,
  getData,
  uploadProductImage,
} from "@utils/API";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

import { Button, Form, Input, Select, Upload, Col, Row, message } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MyButton, crypt, decrypt } from "@utils/fn";
import { url } from "inspector";
import axios from "axios";
import { toast } from "react-toastify";
const { TextArea } = Input;

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const AddProduct = () => {
  const [fileSelected, setFileSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    //console.log(e.target.files[0]);
    setFileSelected(e.target.files[0]);
  };

  const importFile = async (e) => {
    const formData = new FormData();
    formData.append("file", fileSelected);
    try {
      const res = await axios.post(
        "https://localhost:7179/uploadProductImages?data=1222|1|1||1",
        formData
      );
    } catch (ex) {
      console.log(ex);
    }
  };
  const [categoryDRP, setCategoryDRP] = useState([]);
  const [editor, setEditor] = useState();
  const [edit, setEdit] = useState(false);
  const [ProductId, setProductId] = useState(undefined);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-3",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-4",
      name: "image.png",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-xxx",
      percent: 50,
      name: "image.png",
      status: "uploading",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const fetchCategorydrp = async () => {
    var params = "Switch=CATEGORYDRP&itemid=0&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setCategoryDRP(res.data.result);
    });
  };
  let optionItems = categoryDRP.map((item) => (
    <option key={item.value}>{item.label}</option>
  ));

  const AddnewProduct = async (params) => {
    var dycrypt = crypt(params);
    let val = new URLSearchParams();
    setLoading(true);

    let data = JSON.stringify({
      Datastring: dycrypt,
    });
    val.set("Datastring", dycrypt);
    console.log(val, data);
    await addProduct(dycrypt).then((res) => {
      setLoading(false);

      if (res["errorYn"] != "Y") {
        message.success("Product Added Successfully");
        form.resetFields();
      } else {
        message.success(res["errorMsg"]);
      }

      // setcategoryList(res.data.result);
    });
  };

  const onFinishimage = (values) => {
    // console.log('Received values of form: ', values, values['Path'].split("\\")[values['Path'].split("\\").length - 1]);
    if (ProductId != undefined) {
      const formValues = `${ProductId || "NA"}|${values["color"] || "NA"}|${
        values["Size"] || "NA"
      }|${values["Path"] || "NA"}|${"1" || "NA"}`;
      const encryptFormvalues = crypt(formValues);

      UploadProduct(encryptFormvalues);
    } else {
      console.log("product Id is not fetched");
    }
  };

  const UploadProduct = async (params) => {
    var Prameters = `Switch=${params}`;

    await uploadProductImage(Prameters).then((res) => {
      if (res["errorYn"] != "Y") {
        console.log(`Product uploaded Successfully : ${decrypt(res["data"])}`);
      } else {
        console.log(res["errorMsg"]);
      }
    });
  };

  const onFinish = (values) => {
    var formdata = "";
    var imagebase64 = "";
    console.log("Received values of form: ", values);
    for (let index = 0; index < values["variation"].length; index++) {
      let data = values["variation"][index];

      formdata += `${data["Size"]}^${data["color"]}^${data["mrp"]}^${
        data["sp"]
      }^${data["stock"]}${index == values["variation"].length - 1 ? "" : "~"}`;
    }
    // for (let index = 0; index < values['upload'].length; index++) {
    //   let data = values['upload'][index];

    //   imagebase64 += `${data['thumbUrl']}${index == values['variation'].length - 1 ? "" : '~'}`
    // }
    const formValues = `${values["Name"] || "NA"}|${
      values["Description"] || "NA"
    }|${values["Keyword"] || "NA"}|${values["Category"] || "NA"}|${formdata}`;
    console.log(values["variation"].length, formdata, formValues);

    AddnewProduct(formValues);
  };

  useEffect(() => {
    fetchCategorydrp();
  }, []);

  return (
    <div>
      <DashboardPageHeader
        title="Add Product"
        iconName="delivery-box"
        button={
          <Link href="/vendor/products">
            <MyButton text={"Back to Product List"} />
          </Link>
        }
      />

      <Card p="30px">
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          form={form}
          initialValues={{
            stock: 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            labelAlign="left"
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: "Please enter name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            name="Category"
            label="Category"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select Category!",
              },
            ]}
          >
            <Select placeholder="Please select a Category">
              {optionItems}
            </Select>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            name="Description"
            label="Description"
            hasFeedback
          >
            <TextArea rows={4} />
          </Form.Item>
          <Form.List name="variation">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Card key={key} color={"grey"} size={"small"}>
                    <Row>
                      <Col xs={12} sm={10} md={6} lg={8} xl={15}>
                        <Form.Item
                          labelAlign="left"
                          {...restField}
                          label={["color"]}
                          name={[name, "color"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Size",
                            },
                          ]}
                        >
                          <Select placeholder="Please select colors">
                            <Option value="1">Red</Option>
                            <Option value="2">Green</Option>
                            <Option value="3">Blue</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={12} lg={8} xl={15}>
                        <Form.Item
                          labelAlign="left"
                          {...restField}
                          label={["Size"]}
                          name={[name, "Size"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Size",
                            },
                          ]}
                        >
                          <Select placeholder="Please select Size">
                            <Option value="1">Small</Option>
                            <Option value="2">Medium</Option>
                            <Option value="3">Large</Option>
                            <Option value="4">Extra Large</Option>
                            <Option value="5">Double XL</Option>
                            <Option value="6">Triple XL</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={6} lg={8} xl={15}>
                        <Form.Item
                          labelAlign="left"
                          {...restField}
                          label={["Stock"]}
                          name={[name, "stock"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Stock",
                            },
                          ]}
                        >
                          <Input placeholder="Enter Stock" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={6} lg={8} xl={10}>
                        <Form.Item
                          labelAlign="left"
                          {...restField}
                          label={["MRP"]}
                          name={[name, "mrp"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing mrp",
                            },
                          ]}
                        >
                          <Input placeholder="Enter MRP" />
                        </Form.Item>
                      </Col>
                      <Col xs={12} sm={10} md={6} lg={8} xl={10}>
                        <Form.Item
                          labelAlign="left"
                          {...restField}
                          label={["SP"]}
                          name={[name, "sp"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Sales price",
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
                <Form.Item labelAlign="left">
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add Variation
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item
            labelAlign="left"
            label="Keyword"
            name="Keyword"
            rules={[
              {
                required: true,
                message: "Please enter Keyword!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item labelAlign="left"
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="logo" listType="picture">
              <Button >Click to upload</Button>
            </Upload>
          </Form.Item> */}

          <Form.Item
            labelAlign="left"
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <h4>Upload Image for Position 1</h4>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinishimage}
          // disabled={ProductId != undefined ? false : true}

          initialValues={{
            stock: 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Row>
            <Col xs={12} sm={10} md={6} lg={8} xl={15}>
              <Form.Item
                labelAlign="left"
                label={["color"]}
                name={"color"}
                rules={[
                  {
                    required: true,
                    message: "Missing Size",
                  },
                ]}
              >
                <Select placeholder="Please select colors">
                  <Option value="1">Red</Option>
                  <Option value="2">Green</Option>
                  <Option value="3">Blue</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={10} md={12} lg={8} xl={15}>
              <Form.Item
                labelAlign="left"
                label={["Size"]}
                name={"Size"}
                rules={[
                  {
                    required: true,
                    message: "Missing Size",
                  },
                ]}
              >
                <Select placeholder="Please select Size">
                  <Option value="1">Small</Option>
                  <Option value="2">Medium</Option>
                  <Option value="3">Large</Option>
                  <Option value="4">Extra Large</Option>
                  <Option value="5">Double XL</Option>
                  <Option value="6">Triple XL</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={12} sm={10} md={12} lg={8} xl={15}>
              <Form.Item
                labelAlign="left"
                label={["Path"]}
                name={"Path"}
                rules={[
                  {
                    required: true,
                    message: "Missing Path",
                  },
                ]}
              >
                <Input placeholder="Please Enter file Path" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={10} md={12} lg={8} xl={15}>
              <Form.Item
                labelAlign="left"
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Upload Image
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          ></Upload>
        </Form>

        <input type="file" onChange={saveFileSelected} />
        <input type="button" value="upload" onClick={importFile} />
        <h4>Upload Image for Position 2 A+ listing</h4>
        <Form
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          disabled={ProductId != undefined ? false : true}
          initialValues={{
            stock: 3,
            "checkbox-group": ["A", "B"],
            rate: 3.5,
          }}
          style={{
            maxWidth: 600,
          }}
        >
          <Row>
            <Col xs={12} sm={10} md={12} lg={8} xl={15}>
              <Form.Item
                labelAlign="left"
                label={["Path"]}
                name={"Path"}
                rules={[
                  {
                    required: true,
                    message: "Missing Path",
                  },
                ]}
              >
                <Input placeholder="Please Enter file Path" />
              </Form.Item>
            </Col>
            <Col xs={12} sm={10} md={12} lg={8} xl={15}>
              <Form.Item
                labelAlign="left"
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Upload Image
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          ></Upload>
        </Form>
      </Card>
    </div>
  );
};

AddProduct.layout = VendorDashboardLayout;

export default AddProduct;
function getBase64(arg0: RcFile): string | PromiseLike<string> {
  throw new Error("Function not implemented.");
}
