import React from "react";

import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
export const TrendingProduct = () => {
  const { data } = useFetch("https://super-market-2ebn.onrender.com/api/product/get/productTopSales");
  const navigate = useNavigate()
  const handleClick = (id)=>{
    navigate(`/product/${id}`)
  }
  return (
    <>
      {data.length > 0 && (
        <div class="table-responsive dashboard-bg-box">
          <div class="dashboard-title mb-4">
            <h3>Trending Products</h3>
          </div>

          <table class="table product-table">
            <thead>
              <tr>
                <th scope="col">Images</th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Sales</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} onClick={()=>handleClick(item._id)} style={{cursor: 'pointer'}}>
                  <td class="product-image">
                    <img src={item.photos[0]} class="img-fluid" alt="" />
                  </td>
                  <td>
                    <h6>{item.productname}</h6>
                  </td>
                  <td>
                    <h6>${item.discount}</h6>
                  </td>
                  <td>
                    <h6>{item.sales}</h6>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};
