import React, { useState } from 'react'
import { BreadCrumb } from '../../components/commons/breadCrumb/breadCrumb'
import { Poster } from '../../components/commons/poster/poster'
import { Shop } from '../../components/shop/shop'

export const ShopLeft = () => {
  const [loading, setLoading] = useState(false);
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
        <BreadCrumb title="Shop"/>
        <Poster/>
        <Shop setLoading={setLoading}/>
    </>
  )
}
