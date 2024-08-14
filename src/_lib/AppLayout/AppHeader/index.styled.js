import { Header } from "antd/es/layout/layout";
import styled from "styled-components";

export const StyledAppHeader = styled(Header)`
  position: fixed;
  right: 0;
  top: 0;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: ${({ theme }) => `${theme.header.height}px`};
  background-color: #ffffff !important;
  padding: 0px 16px;
  border-bottom: 1px solid #e5e7eb;
  width: 100%;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    left: 0;
    margin-bottom: 0px;
  }
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.xxs}px) {
    padding: 0px 5px;
  }
`;
