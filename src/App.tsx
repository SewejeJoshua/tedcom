import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";

import Index from "./pages/Index";

// Onboarding
import Onboarding from "./components/onboarding/page";

// Authentication
import Role from "./components/auth/role";
import Profile from "./components/auth/profile";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup";
import Forgot from "./components/auth/forgot";

// Home
import Home from "./components/home/page";

// Counseling
import Counsel from "./components/counsel/page";
import CounselingChatroom from "./components/counsel/counseling_chatroom";

// Learning
import Learn from "./components/learn/page";
import ChatRoom from "./components/learn/chatroom";

// Marketplace
import Market from "./components/market/page";

// Footer
import Footer from "./components/footer/page";



function AppLayout() {


  const location = useLocation();



  const hideFooter =
    location.pathname.includes("/counseling/chat") ||
    location.pathname.includes("/learn/chatroom");




  return (

    <>

      <Routes>

        {/* Landing */}
        <Route path="/" element={<Index />} />


        {/* Onboarding */}
        <Route path="/onboarding" element={<Onboarding />} />



        {/* Authentication */}
        <Route path="/auth">

          <Route path="role" element={<Role />} />

          <Route path="profile" element={<Profile />} />

          <Route path="login" element={<Login />} />

          <Route path="signup" element={<Signup />} />

          <Route path="forgot" element={<Forgot />} />

        </Route>



        {/* Home */}
        <Route path="/home" element={<Home />} />



        {/* Counseling */}
        <Route path="/counsel" element={<Counsel />} />

        <Route
          path="/counseling/chat/:id"
          element={<CounselingChatroom />}
        />



        {/* Learning */}
        <Route path="/learn" element={<Learn />} />

        <Route
          path="/learn/chatroom"
          element={<ChatRoom />}
        />



        {/* Marketplace */}
        <Route path="/market" element={<Market />} />

      </Routes>




      {!hideFooter && <Footer />}


    </>

  );

}




export default function App(){

  return <AppLayout />;

}