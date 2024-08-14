import React, { useCallback, useContext, useState } from "react";
import { StyledAppAuthButton, StyledAppAuthForm } from "./index.styled";
import { Form, Input, Modal, Typography } from "antd";
import { bomaYanguService } from "_services";
import { setAccessToken } from "_helpers";
import UserContext from "context/UserContext";

const AppAuth = (props) => {
  const { open } = props;
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(
    async (values) => {
      try {
        setIsLoading(true);
        const { data } = await bomaYanguService.login(values);

        setUser(data?.payload);
        setAccessToken(data?.token);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    },
    [setUser]
  );

  const onFinish = (values) => {
    handleLogin(values);
  };
  return (
    <Modal
      open={open}
      closable={false}
      footer={null}
      width={400}
      destroyOnClose={true}
    >
      <Title level={4}>Login To Boma Yangu</Title>

      <StyledAppAuthForm layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input username!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input password!",
            },
          ]}
        >
          <Input size="large" />
        </Form.Item>
        <StyledAppAuthButton
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
        >
          Submit
        </StyledAppAuthButton>
      </StyledAppAuthForm>
    </Modal>
  );
};

const { Title } = Typography;

export default AppAuth;
