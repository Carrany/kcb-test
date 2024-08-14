import PropTypes from "prop-types";
import { ConfigProvider } from "antd";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "_constants";
import React from "react";
import { getAntTheme } from "_helpers";

const AppThemeProvider = (props) => {
  const theme = defaultTheme.theme;

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider theme={{ token: getAntTheme(theme) }}>
        {props.children}
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default React.memo(AppThemeProvider);

AppThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
