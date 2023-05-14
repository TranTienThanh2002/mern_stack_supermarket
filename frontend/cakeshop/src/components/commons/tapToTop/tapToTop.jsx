import { Link } from "@mui/material";
import React, { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import {BsFillGearFill} from "react-icons/bs";
export const TapToTop = () => {
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  window.addEventListener("scroll", toggleVisible);
  return (
    <>
      <div class={visible ? "theme-option theme-option-2" : "theme-option"}>
        {/* <div class="setting-box">
          <button class="btn setting-button">
            <BsFillGearFill/>
          </button>

          <div class="theme-setting-2">
            <div class="theme-box">
              <ul>
                <li>
                  <div class="setting-name">
                    <h4>Color</h4>
                  </div>
                  <div class="theme-setting-button color-picker">
                    <form class="form-control">
                      <label for="colorPick" class="form-label mb-0">
                        Theme Color
                      </label>
                      <input
                        type="color"
                        class="form-control form-control-color"
                        id="colorPick"
                        value="#0da487"
                        title="Choose your color"
                      />
                    </form>
                  </div>
                </li>

                <li>
                  <div class="setting-name">
                    <h4>Dark</h4>
                  </div>
                  <div class="theme-setting-button">
                    <button class="btn btn-2 outline" id="darkButton">
                      Dark
                    </button>
                    <button class="btn btn-2 unline" id="lightButton">
                      Light
                    </button>
                  </div>
                </li>

                <li>
                  <div class="setting-name">
                    <h4>RTL</h4>
                  </div>
                  <div class="theme-setting-button rtl">
                    <button class="btn btn-2 rtl-unline">LTR</button>
                    <button class="btn btn-2 rtl-outline">RTL</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div> */}

        <div class="back-to-top" onClick={scrollTop} style={{ display: visible ? "inline-block" : "none" }}>
          <Link>
            <FaChevronUp  style={{color: "white"}}/>
          </Link>
        </div>
      </div>
    </>
  );
};
