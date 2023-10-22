import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
// import "../Styles/main.css"; 

import { useState, useEffect, useContext } from "react"
// import { Menu } from "antd"
// import Link from "next/link" 
// import {
//     AppstoreAddOutlined,
//     LoginOutlined,
//     UserAddOutlined,
//     UserOutlined,
//     CustomerServiceOutlined,
//     SnippetsOutlined,
//     LogoutOutlined,
//     CoffeeOutlined,
//     CarryOutOutlined,
//     TeamOutlined
// } from "@ant-design/icons" 
import { Context } from '../context' 
import axios from "axios" 
import { toast } from "react-toastify"
import { useRouter } from "next/router"
// import SubMenu from "antd/es/menu/SubMenu"

// const { Item, SubMenu, ItemGroup } = Menu  


const Navbar =()=> {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	}; 




    const [current, setCurrent] = useState('') 

    const {state, dispatch} = useContext(Context) 
    const {user} = state;
    const router = useRouter()

    useEffect(()=> {
        process.browser && setCurrent(window.location.pathname) 
    }, [process.browser && window.location.pathname]) 

    const logout = async()=>{
        dispatch({type: "LOGOUT"})
        window.localStorage.removeItem("user") 

        const {data} = await axios.get('/api/logout') 
        toast(data.message) 
        router.push('/')
    }


	return (
		<header
        >
            <a href="/" style={{textDecoration: 'none', fontWeight: 700}}>
			<h3>
                 SCOVERS 
            </h3> 
            </a> 

			<nav ref={navRef}> 

                 

				<a href="/">
                    Home
                </a> 


                {user && user.role && user.role.includes("Instructor") ? (

                <a href="/instructor/course/create">
                    Create course
                </a>  
                ) : (
                    <a href="/adminregister">
                        Register as Institution 
                    </a>
                )} 



				{/* <a href="/#">Register as Institution</a> */} 


				{/* <a href="/#">About us</a>
				<a href="/#">Contact us</a>  */}




                {user === null && ( 
                    <>
                        
                        <a href="/login">
                            Login 
                        </a>

                    
                        <a href="/register">
                            Register 
                        </a> 
                    </>
                )}


                {user && user.role && user.role.includes("Instructor") && (
                    
                    <a href="/instructor"> 
                        Admin  
                    </a>
                )}


                {user !==null && (

                    <a onClick={logout} style={{ cursor: 'pointer' }}>  
                    Logout
                    </a>
                )}

               



				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar; 
