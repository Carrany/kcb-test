import { AppLayout, AppThemeProvider, AppUsersList } from "_lib";
import UserProvider from "context/UserProvider";

function App() {
  return (
    <AppThemeProvider>
      <UserProvider>
        <AppLayout>
          <AppUsersList />
        </AppLayout>
      </UserProvider>
    </AppThemeProvider>
  );
}

export default App;
