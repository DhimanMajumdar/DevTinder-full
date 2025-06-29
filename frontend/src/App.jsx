import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import Feed from "./components/Feed";
import Profile from "./components/Profile";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Nested routes */}
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginModal />} />
          <Route path="signup" element={<SignUpModal />} />
          <Route path="feed" element={<Feed />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
