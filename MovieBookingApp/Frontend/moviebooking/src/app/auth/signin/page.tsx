"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image';
import logo from '@/assets/logo.png'
import { toast } from 'react-toastify';
import { getCookie , setCookie} from 'cookies-next';

import '../auth.css'
interface FormData{
    email:string,
    password:string;
}
const Signin = () => {
    const[formdata,setFormdata] = useState<FormData>({
        email:'',
        password:'',
    })

    const[errors,setErrors] = useState<Record<string,string>>({})
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const{name,value} = e.target;
      setFormdata({
        ...formdata,
        [name]:value,
      })
    }
  const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    const validationErrors: Record<string, string> = {};
    if (!formdata.email) {
        validationErrors.email = 'Email is required';
    }
    if (!formdata.password) {
        validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
    }
    
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formdata),
        credentials: 'include'
    })
        .then((res) => {
            return res.json();
        })
        .then(async (response) => {
            console.log('login res ', response)
            if (response.ok) {
                toast(response.message, {
                    type: 'success',
                    position: 'top-right',
                    autoClose: 2000
                })
                // await setCookie('authToken', response.data.authToken)
                // await setCookie('refreshToken', response.data.refreshToken)
                // const authToken = await getCookie('authToken');
                // console.log('My Cookie Value:', authToken);
                // checkLogin()
                window.location.href = "/"

            } else {
                toast(response.message, {
                    type: 'error',
                    position: 'top-right',
                    autoClose: 2000
                });
            }
        })
        .catch((error) => {
            toast(error.message, {
                type: 'error',
                position: 'top-right',
                autoClose: 2000
            });
        })
};

const checkLogin = async () => {
    let authToken = await getCookie('authToken')
    let refreshToken = await getCookie('refreshToken')

    console.log(authToken, refreshToken)
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/auth/checklogin`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',

    })
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            console.log('check login res ', response)



            if (response.ok) {
                // toast(response.message, {
                //     type: 'success',
                //     position: 'top-right',
                //     autoClose: 2000
                // })

                window.location.href = "/"


            } else {
                // toast(response.message, {
                //     type: 'error',
                //     position: 'top-right',
                //     autoClose: 2000
                // });
            }
        })
        .catch((error) => {
            window.location.href = "/"
        })
};
  return (
    <div> 
         <div className='authout'>
            <div className='authin'>
                <div className="left">
                    <Image src={logo} alt="" className='img' />
                </div>
                <div className='right'>
                    <form
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                        onSubmit={handleSubmit}
                    >
                        <div className="forminput_cont">
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder="Enter Your Email"
                                name="email"
                                value={formdata.email}
                                onChange={handleChange}
                            />
                            {errors.email && <span className="formerror">{errors.email}</span>}
                        </div>
                        <div className="forminput_cont">
                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter Your Password"
                                name="password"
                                value={formdata.password}
                                onChange={handleChange}
                            />
                            {errors.password && (
                                <span className="formerror">{errors.password}</span>
                            )}
                        </div>

                        <button type="submit" className="main_button">
                            Login
                        </button>

                        <p className="authlink">
                            Don&apos;t have an account? <Link href="/auth/signup">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Signin