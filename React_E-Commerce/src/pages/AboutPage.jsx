import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">
        Charles & Keith là một thương hiệu thời trang quốc tế nổi tiếng với 
        các sản phẩm phụ kiện thời trang cao cấp, đặc biệt là giày dép và túi xách 
        dành cho phụ nữ. Được thành lập vào năm 1996 tại Singapore bởi hai anh em Charles Wong và Keith 
        Wong, thương hiệu này nhanh chóng mở rộng và trở thành một biểu tượng trong ngành công nghiệp 
        thời trang toàn cầu.
        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://res.cloudinary.com/hoahien/image/upload/v1718642289/pq2ccmnhcsa8sawoyy5e.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Mens's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://res.cloudinary.com/hoahien/image/upload/v1718642034/rvgzzv5dbqqk3zhcwm5u.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Women's Clothing</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://res.cloudinary.com/hoahien/image/upload/v1718642034/ue7t1sfi0mk6e8qkq1ro.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Jewelery</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://res.cloudinary.com/hoahien/image/upload/v1718642034/mqyi7jrnu6st2ug8jasf.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Electronics</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage