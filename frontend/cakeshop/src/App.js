import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-notifications/lib/notifications.css";
import { Header } from "./components/headers/header";
import { Home } from "./pages/home/home";
import { Footer } from "./components/footers/footer";
import { TapToTop } from "./components/commons/tapToTop/tapToTop";
import { ShopLeft } from "./pages/shopLeft/shopLeft";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductDetails } from "./pages/productDetails/productDetails";
import { Dashboard } from "./sellers/dashboard/dashboard";
import { Cart } from "./pages/cart/cart";
import { Page404 } from "./pages/404/page404";
import { QuickView } from "./components/commons/quickView/quickView";
import { Compare } from "./pages/compare/compare";
import { Wishlist } from "./pages/wishlist/wishlist";
import { Login } from "./pages/login/login";
import { Register } from "./pages/register/register";
import { ForgotPassword } from "./pages/forgotPassword/forgotPassword";
import { Contact } from "./pages/contact/contact";
import { Checkout } from "./pages/checkOut/checkout";
import { UserDashboard } from "./pages/userDashboard/userDashboard";
import { ResetPassword } from "./pages/forgotPassword/resetPassword";
import { Search } from "./pages/search/search";
import { OrderSuccess } from "./pages/orderSuccess/ordersuccess";
import { BecomeSeller } from "./pages/becomeSeller/becomeSeller";
import { MenuMobile } from "./components/menuMobile/menuMobile";
import { NotificationContainer } from "react-notifications";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <MenuMobile />
        <Routes>
          <Route exact path="*" element={<Page404 />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/shop" element={<ShopLeft />} />
          <Route exact path="/product/:id" element={<ProductDetails />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/compare" element={<Compare />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/forgot" element={<ForgotPassword />} />
          <Route
            exact
            path="/resetpassword/:email"
            element={<ResetPassword />}
          />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/profile" element={<UserDashboard />} />
          <Route exact path="/searchProduct" element={<Search />} />
          <Route exact path="/orderSuccess/:id" element={<OrderSuccess />} />
          <Route exact path="/becomeSeller" element={<BecomeSeller />} />
        </Routes>
        <TapToTop />
        <Footer />
        <QuickView />
        <NotificationContainer />
      </BrowserRouter>
    </>
  );
}

export default App;
