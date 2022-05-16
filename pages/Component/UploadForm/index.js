import React from "react";
import { useDispatch } from "react-redux";
import { Button, Form, Input, Upload } from "antd";
import { PictureOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 15,
  },
};

function UploadingForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  function onComplete(values) {
    const formValues = { ...values };

    dispatch({ type: "UPLOAD_FORM", payload: formValues });
  }
  return (
    <Form
      name="formm"
      form={form}
      {...layout}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
      layout="horizontal"
      onFinish={onComplete}
    >
      <Form.Item
        name="name"
        label="Name"
        rules={[
          {
            required: true,
            message: "Please input your Name!",
          },
        ]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        name="price"
        label="Price"
        rules={[
          {
            required: true,
            message: "Please input your Price!",
          },
        ]}
      >
        <Input placeholder="Price" />
      </Form.Item>
      <Form.Item
        name="location"
        label="Location"
        rules={[
          {
            required: true,
            message: "Please input your location!",
          },
        ]}
      >
        <Input placeholder="location" />
      </Form.Item>
      <Form.Item
        name="quantity"
        label="Quantity"
        initialValue={1}
        rules={[
          {
            required: true,
            message: "Please input your Quantity!",
          },
        ]}
      >
        <Input placeholder="Quantity" />
      </Form.Item>
      <Form.Item name="upload" label="Upload">
        <Upload
          listType="picture-card"
          showUploadList={{ showRemoveIcon: true }}
          maxCount={1}
        >
          <Button
            style={{
              border: "1px solid transparent",
            }}
            icon={<PictureOutlined />}
          />
        </Upload>
      </Form.Item>

      <Form.Item style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button type="primary" loading={false} htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}
export default UploadingForm;
