
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import ProductDetailPage from './pages/ProductDetailPage'
import Protected from './features/auth/components/Protected'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchItemsByUsedIdAsync } from './features/cart/cartSlice'

import PageNotFound from './pages/404'
import OrderSuccessPage from './pages/OrderSuccessPage'
import UserOrders from './features/user/components/UserOrders'
import UserOrderPage from './pages/UserOrderPage'
import UserProfile from './features/user/components/UserProfile'
import UserProfilePage from './pages/UserProfilePage'
import { fetchLoggedInUserAsync, selectUserInfo } from './features/user/userSlice'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:<Protected><HomePage /></Protected>
    },
    {
      path: "/login",
      element:<LoginPage />
    },
    {
      path: "/signup",
      element:<SignupPage />
    },
    {
      path: "/cart",
      element:<Protected><CartPage /></Protected>
    },
    {
      path: "/checkout",
      element:<Protected><Checkout /></Protected>
    },
    {
      path: "/product-detail/:id",
      element:<Protected><ProductDetailPage /></Protected>
    },
    {
      path: "/orders",
      element:<Protected><UserOrderPage /></Protected>
    }, 
    {
      path: "/profile",
      element:<Protected><UserProfilePage /></Protected>
    }, 
    {
      path: "*",
      element:<PageNotFound />
    },
    {
      path: "/order-success/:id",
      element:<OrderSuccessPage />
    },
  ]
)

function App() {
const dispatch = useDispatch();
const user = useSelector(selectUserInfo)
useEffect(()=>{
  if(user){
    dispatch(fetchItemsByUsedIdAsync(user.id))
    dispatch(fetchLoggedInUserAsync(user.id))
  }
}, [dispatch, user])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
