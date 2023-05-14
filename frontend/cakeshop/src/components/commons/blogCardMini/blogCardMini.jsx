import React from 'react'

export const BlogCardMini = ({image,date,title}) => {
  return (
    <>
        <div>
          <div class="blog-box">
            <div class="blog-box-image">
              <a href="blog-detail.html" class="blog-image"  style={{
                "background-image": `url(${image})`,
                "background-size": "cover",
                "background-position": "center center",
                "background-repeat": "no-repeat",
                display: "block",
              }}>
                <img
                  src={image}
                  class="bg-img blur-up lazyload"
                  alt=""
                  style={{ display: "none" }}
                />
              </a>
            </div>

            <a href="blog-detail.html" class="blog-detail" 
            >
              <h6>{date}</h6>
              <h5>{title}</h5>
            </a>
          </div>
        </div>
    
    </>
  )
}
