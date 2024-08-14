import { Flex, Form, Input, Modal, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import {
  AppModalCreateUserButton,
  AppModalCreateUserInput,
} from "./index.styled";
import { StyledAppModalForm } from "../index.styled";
import { bomaYanguService } from "_services";

const AppModalCreateUser = (props) => {
  const { open, toggle, modalData, isEdit } = props;

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (!modalData) return;
    console.log(modalData, "here");
    form.setFieldsValue(modalData);
  }, [form, modalData]);

  const handleCreateUser = useCallback(
    async (values) => {
      try {
        setLoading(true);
        await bomaYanguService.createUser({ payload: values });
        setLoading(false);
        toggle();
      } catch (error) {
        setLoading(false);
      }
    },
    [toggle]
  );

  const handleEditUser = useCallback(
    async (values) => {
      try {
        setLoading(true);
        await bomaYanguService.editUser({
          payload: { ...(modalData || {}) },
          ...values,
        });
        toggle();
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    [modalData, toggle]
  );

  const onFinish = useCallback(
    (values) => {
      if (isEdit) {
        handleEditUser(values);
      } else {
        handleCreateUser(values);
      }
    },
    [handleCreateUser, handleEditUser, isEdit]
  );
  return (
    <Modal
      open={open}
      onCancel={toggle}
      footer={null}
      width={400}
      destroyOnClose={true}
    >
      <Title level={4}>{isEdit ? "Update" : "Create"} User</Title>
      <StyledAppModalForm
        layout="vertical"
        onFinish={onFinish}
        initialValues={modalData}
      >
        <Flex justify="space-between" gap={4}>
          <Form.Item
            label="First Name"
            name="usrFirstname"
            rules={[
              {
                required: true,
                message: "Please input first name!",
              },
            ]}
          >
            <AppModalCreateUserInput />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="usrLastname"
            rules={[
              {
                required: true,
                message: "Please input  last name!",
              },
            ]}
          >
            <AppModalCreateUserInput />
          </Form.Item>
        </Flex>

        <Form.Item
          label="Username"
          name="usrUsername"
          rules={[
            {
              required: true,
              message: "Please input username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <AppModalCreateUserButton
          type="primary"
          htmlType="submit"
          loading={loading}
        >
          Submit
        </AppModalCreateUserButton>
      </StyledAppModalForm>
    </Modal>
  );
};

const { Title } = Typography;

export default AppModalCreateUser;
