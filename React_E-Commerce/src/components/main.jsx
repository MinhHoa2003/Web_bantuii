import React from "react";

const Home = () => {
  return (
    <>
      <div className="hero border-1 pb-3">
        <div className="card bg-dark text-white border-0 mx-3">
          <img
            className="card-img img-fluid"
            src="https://res.cloudinary.com/hoahien/image/upload/v1718816470/gfwap1mtrlnnguexgnek.jpg"
            alt="Card"
            height={500}
            style={{objectFit: "cover", }}
          />
          <div className="card-img-overlay d-flex align-items-center">
            <div className="container">
              {/* <h5 className="card-title fs-1 text fw-lighter">
              Some new bag products</h5>
              <p className="card-text fs-5 d-none d-sm-block ">
              Let's explore some of our products
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
