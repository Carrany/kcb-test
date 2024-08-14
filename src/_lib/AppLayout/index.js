import AppHeader from "./AppHeader";
import { StyledAppLayout, StyledAppLayoutMain } from "./index.styled";

 const AppLayout = (props) => {
  const { children } = props;
  return (
    <StyledAppLayout>
      <AppHeader />
      <StyledAppLayoutMain>{children}</StyledAppLayoutMain>
    </StyledAppLayout>
  );
};

export default AppLayout
