import React, { useState } from 'react'
import { API_URL } from '../data/Apiurl';
import { Link, useNavigate } from 'react-router-dom';


function Sigin() {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate("");


    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {
            setLoading(true);
            const responce = await fetch(`${API_URL}user/Login`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({email,password})
            });
            const data = await responce.json();
            if(responce.ok){
                alert("Login successfull");
                localStorage.setItem('loginToken',data.token);
                localStorage.setItem('userId',data.userId);
                if (data.profilePicture) {
                    localStorage.setItem('profilePicture', data.profilePicture);
                } 
                console.log(data);
                navigate('/Addwork');
                window.location.reload();
            }
            else if(!responce.ok){
                alert("incorrect email or password");
                setEmail("");
                setPassword("");
            }
            setLoading(false);
              setError(false);
        } catch (error) {
            console.error(error);
            alert("Login failed");
            setLoading(false);
            setError(true);
        }
    }
    return (
        <div>

            <form class="max-w-sm mx-auto my-24" onSubmit={handlesubmit}>
                
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" name='email' value={email} onChange={(e) => setEmail(e.target.value)} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type="password" name='password' value={password} onChange={(e) => setPassword(e.target.value)} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="your password" required />
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sigin</button>
                <div className='flex'>
                    <p>Don't have an account?</p>
                    <Link to="/Sigup" >
                    <span className='text-blue-600'>Sigup</span>
                    </Link>
                </div>
               
            </form>

        </div>
    )
}

export default Sigin;