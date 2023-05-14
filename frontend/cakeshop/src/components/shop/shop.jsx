import React, { useEffect, useState } from 'react'
import { LeftBox } from '../commons/leftBox/leftBox'
import { RightBox } from '../commons/rightBox/rightBox'

export const Shop = ({setLoading}) => {
    const [data, setData] = useState([]);
    const [showFilterMobile, setShowFilterMobile] = useState(false);
    useEffect(()=>{},[showFilterMobile])
  return (
    <>
        <section class="section-b-space shop-section">
        <div class="container-fluid-lg">
            <div class="row">
                <div class="col-custome-3">
                    <LeftBox setData = {setData} setShowFilterMobile={setShowFilterMobile} showFilterMobile={showFilterMobile}/>
                </div>

                <div class="col-custome-9">
                    <RightBox fillterProduct={data} setLoading={setLoading} setShowFilterMobile={setShowFilterMobile} showFilterMobile={showFilterMobile}/>
                </div>
            </div>
        </div>
    </section>
    <div class={showFilterMobile?"bg-overlay show":"bg-overlay"}></div>
    </>
  )
}
