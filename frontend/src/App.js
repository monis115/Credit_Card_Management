// file app.js
// import Nav from "./Header/Nav";
import Nav from "./components/Nav";
import Home from "./Header/Home";
import Footer from "./components/Footer";
//import Login from "./components/Login";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Change from "./auth/change";
import Forget from "./auth/Forget";
import ResetPasswordForm from "./auth/ResetPasswordForm";
import { Routes, Route } from "react-router-dom";
//import Register from "./components/Register";
import { UserProvider } from "./context/UserContext";
import Logout from "./components/Logout";
import CreditCardForm from "./Credit/CreditCardForm";
import Addcard from "./Credit/Addcard";
import Profile from "./Credit/Profile";
import { UserDataProvider } from "./context/UserDataContext";
import Product from "./Credit/Products";
import { Card } from "./Credit/Card";
import Statm from "./Credit/Statm";
import User from "./Credit/User";
import Score from "./Credit/Score";
import Statement from "./Credit/Statement";
import About from "./Header/About";
import Contact from "./components/Contact";
import ErrorPage from "./components/ErrorPage";
function App() {
  return (
    <UserProvider>
      <UserDataProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/cc" element={<CreditCardForm />} />
          <Route path="/card" element={<Addcard />} />
          <Route path="/p" element={<Profile />} />
          <Route path="/atm" element={<Card />} />
          <Route path="/product" element={<Product />} />
          <Route path="/statement" element={<Statm />} />
          <Route path="/pay" element={<Statement />} />
          <Route path="/user" element={<User />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/score" element={<Score score={500} />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route
            path="/reset-password/:resetToken"
            element={<ResetPasswordForm />}
          />
          <Route path="/forget" element={<Forget />} />
          {/* <Route path="/addadmin" element={<AdminLogin />} />
        <Route path="/removeadmin" element={<RemoveAdmin />} /> */}
          <Route path="/changepass" element={<Change />} />
        </Routes>
        <Footer />
      </UserDataProvider>
    </UserProvider>
  );
}

export default App;
