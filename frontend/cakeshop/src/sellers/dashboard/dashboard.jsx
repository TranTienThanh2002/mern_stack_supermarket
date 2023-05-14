import React from 'react'
import { BreadCrumb } from '../../components/commons/breadCrumb/breadCrumb'
import { DashBoard } from '../../components/dashBoard/dashBoard'

export const Dashboard = () => {
  return (
    <>
        <BreadCrumb title="User Dashboard"/>
        <DashBoard/>
    </>
  )
}
