import React from "react";
import Layout from "./Layout";

import CarouselComponent from "./CarouselComponent";
import Signin from "./Signin";

const Home = () => {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row" style={{ background: "#2c3e50", height: "100vh" }}>
          <div className="container">
            <CarouselComponent style={{ height: "100vh" }} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
