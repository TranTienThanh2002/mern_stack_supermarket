import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

import { NavbarTop } from "./navbar-top/navbarTop";
import { HeaderNav } from "./header-nav/headerNav";
export const Header = () => {
  const [showNavBarMobile, setShowNavBarMobile] = useState(false);
  useEffect(()=>{},[showNavBarMobile])
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <header class={visible? "pb-md-4 pb-0 active" : "pb-md-4 pb-0"} style={{zIndex: "2"}}>
        <NavbarTop setShowNavBarMobile={setShowNavBarMobile} showNavBarMobile={showNavBarMobile}/>

        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <HeaderNav showNavBarMobile={showNavBarMobile} setShowNavBarMobile={setShowNavBarMobile}/>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
