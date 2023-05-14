import React from "react";

import {HiHome} from 'react-icons/hi'
import { Link } from "react-router-dom";
export const BreadCrumb = ({title}) => {
  return (
    <>
      <section class="breadscrumb-section pt-0">
        <div class="container-fluid-lg">
          <div class="row">
            <div class="col-12">
              <div class="breadscrumb-contain">
                <h2>{title}</h2>
                <nav>
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                      <Link to="/">
                        <HiHome className="icon"/>
                      </Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      
                      {title}
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
