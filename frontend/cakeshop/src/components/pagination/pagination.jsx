import usePagination from "@mui/material/usePagination";
import React, { useEffect, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useFillterProductContext } from "../../redux/contexts/filterProductContext/filterProductContext";
import axios from "axios";

export const Pagination = ({data, setPage, limit}) => {
  const [pages, setPages] = useState(0);
  const { items } = usePagination({
    count: data.length%limit===0 ? data.length/limit : Math.ceil(data.length / limit),
  });
  const handleClickActive = (element) => {
    if (document.querySelector("li.page-item.active")) {
      document.querySelector("li.page-item.active").classList.remove("active");
    }
    if (document.querySelector(`li.${element}`)) {
      document.querySelector(`li.${element}`).classList.add("active");
    }
  };
  useEffect(() => {
    if (pages > 0 && pages < items.length) {
      handleClickActive(`page${pages}`);
      setPage(pages);
    }
  }, [pages]);
  
  return (
    <nav className="custome-pagination">
      <ul class="pagination justify-content-center">
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === "start-ellipsis" || type === "end-ellipsis") {
            children = "…";
          } else if (type === "page") {
            children = (
              <Link
                class="page-link"
                type="button"
                style={{
                  fontWeight: selected ? "bold" : undefined,
                }}
                {...item}
              >
                {page}
              </Link>
            );
          } else {
            children = (
              <Link class="page-link" type="button" {...item}>
                {type === "next" && page<items.length - 1 && (
                  <AiOutlineDoubleRight />
                )}
                {
                  type === "previous"&& page>0 && (
                    <AiOutlineDoubleLeft />
                  )
                }
              </Link>
            );
          }

          return (
            <li
              key={index}
              className={`page-item  ${
                page > 0 && page < items.length-1 ? `page${page}` : ""
              }
              ${
                page === 1 && type !== "next" && type !== "previous"
                  ? "active"
                  : ""
              } `}
              style={{"display":  `${page > 0 && page<items.length - 1  ? "block":"none"}`}}
              
              onClick={() => {
                // page > 0 && page < items.length + 2 &&
                // handleClickActive(`page${page}`);
                setPages(page);
              }}
            >
              {children}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
