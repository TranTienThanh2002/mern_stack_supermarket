import React, { useEffect, useState } from "react";
import { BannerSection } from "../../components/banners/banner";
import { HomeSection } from "../../components/homes/home";
import { NewsLetter } from "../../components/newsLetter/newsLetter";
import { ProductSection } from "../../components/products/product";

export const Home = () => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [loading]);
  return (
    <>
      {!loading && (
        <div class="fullpage-loader">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <HomeSection />
      <BannerSection />
      <ProductSection />
      <NewsLetter setLoading={setLoading} />
    </>
  );
};
