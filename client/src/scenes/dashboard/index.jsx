import React from 'react'
import Topbar from '../global/topBar'
import SideBarCmp from '../global/sideBar'
import DashboardComp from '../../components/dashboard/dashboardcomp'
import { BrowserRouter,Outlet,Route,Routes } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='app'> 
     <SideBarCmp />
      <main className="content">

        <Topbar />
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
