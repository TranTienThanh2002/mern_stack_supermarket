import React from 'react'
import page404 from '../../assets/images/inner-page/404.png'
import { BreadCrumb } from '../../components/commons/breadCrumb/breadCrumb'
import { useNavigate } from 'react-router-dom'
export const Page404 = () => {
  const navigate = useNavigate();
  const handleClick=()=>{
    navigate('/')
  }
  return (
    <>
    <BreadCrumb title="404"/>
      <section class="section-404 section-lg-space">
        <div class="container-fluid-lg">
            <div class="row">
                <div class="col-12">
                    <div class="image-404">
                        <img src={page404} class="img-fluid blur-up lazyload" alt=""/>
                    </div>
                </div>

                <div class="col-12">
                    <div class="contain-404">
                        <h3 class="text-content">The page you are looking for could not be found. The link to this
                            address may be outdated or we may have moved the since you last bookmarked it.</h3>
                        
                        <button onClick={handleClick}
                            class="btn btn-md text-white theme-bg-color mt-4 mx-auto">Back To Home Screen</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </>
  )
}
