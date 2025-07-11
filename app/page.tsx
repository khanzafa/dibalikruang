import React from "react";
import Home from "../components/Home/Home";
import ResponsiveNav from "../components/Home/Navbar/ResponsiveNav";
import Footer from "../components/Home/Footer/Footer";

const HomePage = () => {
  return (
    <div>
      <ResponsiveNav />
      <Home />
      <div id="contact">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
