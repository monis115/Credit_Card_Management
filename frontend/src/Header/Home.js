import React from "react";
// import Herosection from "../components/Herosection";
// import Cards from "../components/Cards";
import Bg from "../components/Bg";
import Best from "../components/Best";
import Order from "../components/Order";
import Question from "../components/Question";
import Contact from "../components/Contact";
import Statistical from "../components/Statistical";
import YouTubeVideo from "../components/YouTubeVideo";

const Home = () => {
  return (
    <>
      <Bg />
      {/* <Herosection />
      <Cards /> */}
      <Best />
      <YouTubeVideo />
      <Statistical />

      <Order />
      <Question />
      <Contact />
    </>
  );
};

export default Home;
