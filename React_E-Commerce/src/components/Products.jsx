import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../redux/action";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { Link } from "react-router-dom";
import { saveCartToCookie } from "../utils/CookieCart";
import { getAllBrands, getAllProducts } from "../utils/ApiFunction";
import "./index.css";

const Products = () => {
  const state = useSelector((state) => state.handleCart);
  const [cart, setCart] = useState(state);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [brand, setBrand] = useState();
  const [loading, setLoading] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  let componentMounted = true;

  const dispatch = useDispatch();

  const addProduct = (product) => {
    dispatch(addCart(product))
  }
  useEffect(() => {
    setCart(state);
  }, [state]);
  useEffect(() => {
    saveCartToCookie(cart);
  }, [cart])
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await getAllProducts();
      if (componentMounted) {
        setData(response);
        setFilter(response);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getAllBrands();
      if(response) {
        setBrand(response.reverse());
      }
    };
    fetchApi();
  }, []);
  // const formatMoney = (x) => {
  //   const price = formatCash(x);
  //   return <li className="list-group-item lead">{price}đ</li>
  // }
  const Loading = () => {
    return (
      <>
        <div className="col-12 py-5 text-center">
          <Skeleton height={40} width={560} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
        <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
          <Skeleton height={592} />
        </div>
      </>
    );
  };

  const filterProduct = (cat) => {
    setSelectedBrand(cat)
    const updatedList = data.filter((item) => item.brand.id === cat);
    setFilter(updatedList);
  }
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons text-center py-5">
          <button 
            className={`btn btn-outline-dark btn-sm m-2 ${selectedBrand === null ? "btn-checked" : ""}`} 
            onClick={() => {setFilter(data); setSelectedBrand(null)}}
          >
            All
          </button>
          {brand?.map((item) => (
            <button 
              className={`btn btn-outline-dark btn-sm m-2 ${selectedBrand === item.key ? "btn-checked" : ""}`} 
              onClick={() => filterProduct(item.key)} key={item.key}
            >
              {item.value}
            </button>
          ))}
        </div>
        {filter.length > 0 ? (
          <>
            {filter.map((product) => {
              return (
                <div id={product.id} key={product.id} className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
                  <div className="card text-center h-100" key={product.id}>
                    <img
                      className="card-img-top p-3"
                      src={product.thumbnail}
                      alt="Card"
                      height={300}
                      style={{objectFit: "contain"}}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {product.name.substring(0, 12)}...
                      </h5>
                      <p className="card-text">
                        {product.description.substring(0, 90)}...
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      {product.price && (
                        <li className="list-group-item lead">{product.price}$</li>
                      )}
                      {/* <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li> */}
                    </ul>
                    <div className="card-body">
                      <Link to={"/product/" + product.id} className="btn btn-dark m-1">
                        Buy Now
                      </Link>
                      <button className="btn btn-dark m-1" onClick={() => addProduct(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        ):(
          <div className="container">
            <div className="row">
              <div className="col-md-12 py-5 bg-light text-center">
                <h4 className="p-3 display-5"> Không có sản phẩm nào</h4>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  return (
    <>
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12">
            <h2 className="display-5 text-center">Latest Products</h2>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </>
  );
};

export default Products;
