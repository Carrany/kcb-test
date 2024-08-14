import { Layout } from "antd";
import { styled } from "styled-components";

export const StyledAppLayout = styled(Layout)`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow-x: hidden;
  overflow-y: hidden;
`;

export const StyledAppLayoutMain = styled(Layout)`
  transition: all 0.1s linear;
  flex-shrink: 0;
  padding: 20px;
  position: relative;
  top: ${({ theme }) => `${theme.header.height}px`};
`;
