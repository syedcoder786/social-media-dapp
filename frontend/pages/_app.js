import '../styles/globals.css'
import '../styles/login.css'
import '../styles/dashboard.css'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "../etherjs/walletWrapper"

import { wrapper } from "../store/store";

import { useState, useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";

import { login, reset, logout } from "../store/auth/authSlice";



function MyApp({ Component, pageProps }) {

  const [hydrated, setHydrated] = useState(false)

  let localData=null;
    if (typeof window !== "undefined") {
    console.log("You are on the browser");
    // 👉️ can use localStorage here
    // localStorage.setItem("data", JSON.stringify({address:"", balance: 0}))
    localData = JSON.parse(localStorage.getItem("data"));
    } else {
    console.log("You are on the server");
    // 👉️ can't use localStorage
  }

  const [data, setData] = useState(localData?localData:null)

  const dispatch = useDispatch()

  const { user, isSuccess, isError, message } = useSelector((state) => state.auth)


  useEffect(() => {
    setHydrated(true)
    if(window.ethereum){
        window.ethereum.on('accountsChanged',(accounts) => {
            if(accounts.length > 0){
                console.log("changed")
                connectWallet()
            }else{
                console.log("disconnect")
                // if(user){
                    dispatch(logout())
                // }
                dispatch(reset())
                // dispatch(log)
                localStorage.removeItem("data")
                setData({
                    address:'',
                    balance: 0,
                })
            }
        })
    }
    // connectWallet()
},[])


const connectWallet = async () => {
  if(window.ethereum){
      // await window.ethereum.request({
      //     method: 'eth_requestAccounts',
      // });
      // getDetails()
      const details = await connect()
      console.log(details)
      localStorage.setItem("data", JSON.stringify(details));
      setData(details)
      dispatch(login({address: details.address}))
  }else{
      alert("Install metamask extension!")
  }
}

if(!hydrated){
  return (<div></div>)
}

  return(
    <>
      <Component {...pageProps} data={data} connectWallet={connectWallet}/>
      <ToastContainer 
        position="top-center"
      />
    </>
  )
  
}

export default wrapper.withRedux(MyApp);