import React from "react";
import Layout from "./Layout";

import CarouselComponent from "./CarouselComponent";
import Signin from "./Signin";

const Home = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row" style={{ background: "#2c3e50" }}>
          <div className="container">
            <CarouselComponent />
          </div>
        </div>
        <div className="row" style={{ background: "#bdc3c7" }}>
          <div className="container mt-5">
            <h2>About</h2>
            <p className="text-center">
              A traveller is someone who travels around the world collecting
              their own adventures.Then writing about their travel experiences,
              and building the desires of others.
            </p>
          </div>
        </div>
        <div className="row" style={{ background: "#bdc3c7" }}>
          <div className="container mt-5 float-right">
            <h2>Contact info</h2>

            <div>
              {" "}
              <img src="../gmail.png" />
              <span className="ml-2"> zabid1998@gmail.com</span>
            </div>
            <div>
              {" "}
              <img src="../linkedin.png" />
              <span className="ml-2"> https://linkedin.com/in/zabidali</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
