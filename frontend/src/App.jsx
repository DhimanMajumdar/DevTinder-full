import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Requests from "./components/Requests";
import Connections from "./components/Connections";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              {/* Nested routes */}
              <Route index element={<LandingPage />} />
              <Route path="login" element={<LoginModal />} />
              <Route path="signup" element={<SignUpModal />} />
              <Route path="feed" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="requests" element={<Requests />} />
              <Route path="connections" element={<Connections />} />
              <Route path="chat/:targetUserId" element={<Chat />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
