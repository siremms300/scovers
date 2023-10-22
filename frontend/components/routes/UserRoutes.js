

import {useEffect, useState} from 'react'
// import { Context } from '../../context' 
import axios from 'axios'
import { useRouter } from 'next/router' 
import { SyncOutlined } from '@ant-design/icons' 
import UserNav from '../nav/UserNav' 

 
const UserRoute = ({ children, showNav = true })=>{

    // state  
    const [ok, setOk] = useState(false) // this means that by default, setHidden is false, implying that it should display by default 

    //router 
    const router = useRouter() 

    // const {state: {user}} = useContext(Context) 


    useEffect(()=>{
        fetchUser()  
    }, [])

    const fetchUser = async()=>{
        try {
            const data = await axios.get('/api/current-user') 
            console.log(data)
            if (data.ok) setOk(true) 
        } catch (err) {
            console.log(err) 
            setOk(false)
            router.push('/login')
        }
    }  
 
    return ( 
        <>
            {ok ? (
            <SyncOutlined 
            spin 
            className='d-flex justify-content-center display-1 text-primary p-5'
            />
            ) : (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-2'>
                        {showNav && <UserNav />} 
                    </div> 

                    <div className='col-md-10'>
                        {children} 
                    </div>
                </div>
            </div>
            ) }
        </>
    );
}    

export default UserRoute 
