import React, { useCallback, useContext, useState } from "react";
import { StyledAppHeader } from "./index.styled";
import { Button, Typography } from "antd";
import { bomaYanguService } from "_services";
import { AppModalAuth } from "_lib/AppModal";
import UserContext from "context/UserContext";
import { setAccessToken } from "_helpers";

const AppHeader = () => {
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const onClickLogout = useCallback(async () => {
    try {
      setLoading(true);
      await bomaYanguService.logout();
      setLoading(false);
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      setLoading(false);
    }
  }, [setUser]);
  return (
    <StyledAppHeader>
      <AppModalAuth open={!user} />
      <Title level={4}>Boma Yangu</Title>
      {!!user && (
        <Button type="primary" danger onClick={onClickLogout} loading={loading}>
          Logout
        </Button>
      )}
    </StyledAppHeader>
  );
};

const { Title } = Typography;

export default AppHeader;
