import Card from "@component/Card";
import DashboardPageHeader from "@component/layout/DashboardPageHeader";
import VendorDashboardLayout from "@component/layout/VendorDashboardLayout";
import { addProduct, getData, uploadProductImage } from "@utils/API";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";

import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Col,
  Row,
  message,
  Space,
  Spin,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { MyButton, crypt, decrypt } from "@utils/fn";
import { useRouter } from "next/router";
import axios from "axios";
const { TextArea } = Input;
import FormData from "form-data";
const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;

  const [isloading, setLoading] = useState(false);
  const [categoryDRP, setCategoryDRP] = useState([]);
  const [colorDRP, setColorDRP] = useState([]);

  const [sizeDRP, setSizeyDRP] = useState([]);

  const [getimages, setimages] = useState([]);
  const [getAimages, setAimages] = useState([]);

  const [formdata, setformdata] = useState({});
  const [form] = Form.useForm();
  var form1 = new FormData();
  const [editor, setEditor] = useState();
  const [edit, setEdit] = useState(false);
  const [ProductId, setProductId] = useState(id);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: "-1",
      name: "1",
      status: "done",
      url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    },
    {
      uid: "-2",
      name: "1",
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
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleAPreview = async (file: UploadFile) => {
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
  const fetchColordrp = async () => {
    var params = "Switch=COLORDRP&itemid=0&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setColorDRP(res.data.result);
    });
  };
  const fetchSizedrp = async () => {
    var params = "Switch=SIZEDRP&itemid=0&itemDtlId=0";
    await getData(params).then((res) => {
      console.log(res.data.result);
      setSizeyDRP(res.data.result);
    });
  };
  const fetchimages = async () => {
    var params =
      "Switch=PODUCTIMAGES&itemid=" +
      id.toString().split("-")[0] +
      "~" +
      id.toString().split("-")[2] +
      "&itemDtlId=1";
    await getData(params).then((res) => {
      console.log(res?.data?.result);
      setimages(res?.data?.result || []);
    });
  };
  const fetchAimages = async () => {
    var params =
      "Switch=PODUCTIMAGES&itemid=" +
      id.toString().split("-")[0] +
      "~" +
      id.toString().split("-")[2] +
      "&itemDtlId=2";
    await getData(params).then((res) => {
      console.log(res?.data?.result);
      setAimages(res?.data?.result || []);
    });
  };
  const fetchdata = async () => {
    var params =
      "Switch=EDITMODE&itemid=" +
      id.toString().split("-")[0] +
      "&itemDtlId=" +
      id.toString().split("-")[1];
    await getData(params).then((res) => {
      console.log(res?.data?.result["0"]);
      // setformdata(res?.data?.result['0']);
      let item = res?.data?.result["0"];
      setformdata(item);
      console.log("formdata", item, formdata);
    });
  };
  let optionItems = categoryDRP.map((item) => (
    <option key={item.value}>{item.label}</option>
  ));
  let optionColorItems = colorDRP.map((item) => (
    <option key={item.value}>{item.label}</option>
  ));
  let optionSizeItems = sizeDRP.map((item) => (
    <option key={item.value}>{item.label}</option>
  ));
  const AddnewProduct = async (params) => {
    // var dycrypt = crypt(params);

    var Prameters = `Switch=${params}`;

    await addProduct(Prameters).then((res) => {
      if (res["errorYn"] != "Y") {
        console.log(`Issue Created Successfully : ${decrypt(res["data"])}`);
        setProductId(decrypt(res["data"]));
      } else {
        console.log(res["errorMsg"]);
      }
    });
  };
  const onFinishimage = (values) => {
    // console.log('Received values of form: ', values, values['Path'].split("\\")[values['Path'].split("\\").length - 1]);
    if (ProductId != undefined) {
      const formValues = `${ProductId || "NA"}|${values["color"] || "NA"}|${
        values["Size"] || "NA"
      }|${values["Path"] || "NA"}|${"1" || "NA"}`;
      const encryptFormvalues = crypt(formValues);

      UploadProductimage(encryptFormvalues);
    } else {
      console.log("product Id is not fetched");
    }
  };
  const [fileSelected, setFileSelected] = useState([]);
  const [isuploadimage, setisuploadimage] = useState(false);

  const saveFileSelected = (e) => {
    //in case you wan to print the file selected
    console.log(e.target.files);
    setFileSelected(e.target.files);
  };

  const importFile = async (isupload, e) => {
    setLoading(true);
    console.log(fileSelected, isupload, e);
    var formd = new FormData();

    for (let index = 0; index < fileSelected.length; index++) {
      formd.append("files", fileSelected[index]);
    }
    try {
      const res = await axios
        .post(
          "https://localhost:7179/uploadProductImages?data=" +
            isupload +
            "|" +
            ProductId +
            "|" +
            formdata["color"] +
            "|" +
            formdata["size"] +
            "||" +
            e,
          formd
        )
        .then((response) => {
          if (response?.data["errorYn"] != "Y") {
            message.success("Uploaded");
          } else {
            message.error(response?.data["errorMsg"]);
          }
          setLoading(false);
          console.log(response);
        });
      setisuploadimage(true);
    } catch (ex) {
      console.log(ex);
    }
  };
  const UploadProductimage = async (params) => {
    var Prameters = `Switch=${params}`;

    await uploadProductImage(Prameters).then((res) => {
      if (res["errorYn"] != "Y") {
        console.log(`Product uploaded Successfully : ${decrypt(res["data"])}`);
      } else {
        console.log(res["errorMsg"]);
      }
    });
  };
  const onFinishimages = (values) => {
    console.log(values);
  };
  const onFinish = (values) => {
    var formdata = "";
    console.log("Received values of form: ", values);
    for (let index = 0; index < values["variation"].length; index++) {
      let data = values["variation"][index];

      formdata += `${data["Size"]}^${data["color"]}^${data["mrp"]}^${
        data["sp"]
      }^${data["stock"]}${index == values["variation"].length - 1 ? "" : "~"}`;
    }

    const formValues = `${values["Name"] || "NA"}|${
      values["Description"] || "NA"
    }|${values["Keyword"] || "NA"}|${values["Category"] || "NA"}|${formdata}`;
    console.log(values["variation"].length, formdata, formValues);

    const encryptFormvalues = crypt(formValues);
    AddnewProduct(encryptFormvalues);
  };
  useEffect(() => {
    fetchimages();
  }, [isuploadimage]);
  useEffect(() => {
    fetchAimages();
  }, [isuploadimage]);
  useEffect(() => {
    fetchColordrp();
    fetchSizedrp();
    fetchCategorydrp().then(() => {
      fetchdata().then(() => {});
      fetchimages();
      fetchAimages();
    });
  }, []);
  useEffect(() => {
    form.setFieldsValue(formdata);
  }, [form, formdata]);
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
      {isloading && (
        <Space size="middle">
          <Spin
            style={{ position: "fixed", top: "50%", left: "50%" }}
            size="large"
          />
        </Space>
      )}
      <Card p="30px">
        <Form
          form={form}
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
          initialValues={formdata}
          style={{
            maxWidth: 600,
          }}
        >
          <Form.Item
            labelAlign="left"
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter name!",
              },
            ]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            labelAlign="left"
            name="category"
            label="Category"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please select Category!",
              },
            ]}
          >
            <Select disabled={true} placeholder="Please select a Category">
              {optionItems}
            </Select>
          </Form.Item>
          <Form.Item
            labelAlign="left"
            name="description"
            label="Description"
            hasFeedback
          >
            <TextArea rows={4} />
          </Form.Item>
          <Card color={"grey"} size={"small"}>
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
                  <Select disabled={true} placeholder="Please select colors">
                    {optionColorItems}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={12} sm={10} md={12} lg={8} xl={15}>
                <Form.Item
                  labelAlign="left"
                  label={["Size"]}
                  name={"size"}
                  rules={[
                    {
                      required: true,
                      message: "Missing Size",
                    },
                  ]}
                >
                  <Select disabled={true} placeholder="Please select Size">
                    {optionSizeItems}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={12} sm={10} md={6} lg={8} xl={15}>
                <Form.Item
                  labelAlign="left"
                  label={["Stock"]}
                  name={"stock"}
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
                  label={["MRP"]}
                  name={"mrp"}
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
                  label={["SP"]}
                  name={"sp"}
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
            </Row>
          </Card>

          <Form.Item
            labelAlign="left"
            label="Keyword"
            name="keyword"
            rules={[
              {
                required: true,
                message: "Please enter Keyword!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            labelAlign="left"
            wrapperCol={{
              span: 12,
              offset: 6,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update Product Variation
            </Button>
          </Form.Item>
        </Form>
        <h4>Upload Image for Position 1</h4>

        {getimages.length == 0 && (
          <h5 style={{ color: "red" }}> NO IMAGE UPLOADED YET</h5>
        )}
        <input type="file" onChange={saveFileSelected} multiple />
        <input
          type="button"
          name="B"
          value="upload"
          onClick={() => {
            importFile("0", "1");
          }}
        />

        <Upload
          listType="picture-card"
          fileList={getimages}
          onPreview={handlePreview}
        ></Upload>
        <h4>Upload Image for Position 2 A+ listing</h4>
        {getimages.length == 0 && (
          <h5 style={{ color: "red" }}> NO IMAGE UPLOADED YET</h5>
        )}
        <input type="file" onChange={saveFileSelected} multiple />
        <input
          type="button"
          name="A"
          value="upload"
          onClick={() => {
            importFile("0", "2");
          }}
        />

        <Upload
          listType="picture-card"
          fileList={getAimages}
          onPreview={handleAPreview}
        ></Upload>
      </Card>
    </div>
  );
};

OrderDetails.layout = VendorDashboardLayout;

export default OrderDetails;
function getBase64(arg0: RcFile): string | PromiseLike<string> {
  throw new Error("Function not implemented.");
}
