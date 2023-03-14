import { useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ProtectionRouteForAdmin,
  ProtectionRouteForOrderRegistration,
  ProtectionRouteForUser,
} from "./custom-hooks/ProtectionRoute";
import ScrollToTop from "./custom-hooks/ScrollToTop";
import Header from "./components/api/Header";
import LogIn from "./components/api/LogIn";
import Layout from "./components/Layout/Layout";
import SignupPage from "./pages/FrontEnd_UI/SignupPage";
import LoginPage from "./pages/FrontEnd_UI/LoginPage";
import Home from "./pages/FrontEnd_UI/Home";
import AllMenuPage from "./pages/FrontEnd_UI/AllMenuPage";
import MenuPage from "./pages/FrontEnd_UI/MenuPage";
import RecipeCardDetailsPage from "./pages/FrontEnd_UI/RecipeCardDetailsPage";
import ShopPage from "./pages/FrontEnd_UI/ShopPage";
import AboutUs from "./pages/FrontEnd_UI/AboutUs";
import CartVocherPage from "./pages/FrontEnd_UI/CartVocherPage";
import OrderRegistrationPage from "./pages/FrontEnd_UI/OrderRegistrationPage";
import UserHistoryPage from "./pages/FrontEnd_UI/UserHistoryPage";
import UserProfilePage from "./pages/FrontEnd_UI/UserProfilePage";
import ApiCreate from "./pages/API_UI/ApiCreate";
import ApiManage from "./pages/API_UI/ApiManage";
import ApiUpdate from "./pages/API_UI/ApiUpdate";
import Error from "./pages/FrontEnd_UI/Error";
import LoadingBar from "react-top-loading-bar";
import { useState } from "react";

function App() {
  let { pastRoute } = useSelector((state) => state.cartReducer);
  const [progress, setProgress] = useState(0);

  return (
    <Router>
      {/* LoadingBar Component */}
      <LoadingBar
        color="#974103"
        waitingTime={0}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ScrollToTop>
        <Routes>
          {/* Frontend Routes */}
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />

          <Route element={<Layout />}>
            <Route path="/" element={<Home setProgress={setProgress} />} />
            <Route
              path="/menu/all"
              element={<AllMenuPage setProgress={setProgress} />}
            />
            <Route
              path="/menu/:type"
              element={<MenuPage setProgress={setProgress} />}
            />
            <Route
              path="/menu/:type/:slug"
              element={<RecipeCardDetailsPage setProgress={setProgress} />}
            />
            <Route
              path="/shop"
              element={<ShopPage setProgress={setProgress} />}
            />
            <Route
              path="/about"
              element={<AboutUs setProgress={setProgress} />}
            />

            <Route
              path="/cart"
              element={<CartVocherPage setProgress={setProgress} />}
            />
            <Route
              element={
                <ProtectionRouteForOrderRegistration redirectPath={pastRoute} />
              }
            >
              <Route
                path="/cart/order"
                element={<OrderRegistrationPage setProgress={setProgress} />}
              />
            </Route>
            <Route element={<ProtectionRouteForUser />}>
              <Route
                path="/user/profile"
                element={<UserProfilePage setProgress={setProgress} />}
              />
              <Route
                path="/user/history"
                element={<UserHistoryPage setProgress={setProgress} />}
              />
            </Route>
          </Route>
          {/* Backend API routes */}
          <Route path="/api/login" element={<LogIn />} />
          <Route element={<Header />}>
            <Route
              element={<ProtectionRouteForAdmin redirectPath={"/api/login"} />}
            >
              <Route path="/api/manage" element={<ApiManage />} />
              <Route path="/api/manage/create" element={<ApiCreate />} />
              <Route path="/api/manage/update/:slug" element={<ApiUpdate />} />
            </Route>
          </Route>
          {/* Error Page */}
          <Route path="*" element={<Error />} />
        </Routes>
      </ScrollToTop>
    </Router>
  );
}

export default App;
