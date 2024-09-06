
import React, { useState } from 'react'
import { API_URL } from '../data/Apiurl';

function Addwork() {
    const [workname,setWorkName] = useState("");
    const [experience,setExperience] = useState("");
    const [location,setLocation] = useState("");

    const handlesubmit = async(e)=>{
        e.preventDefault();
        try {

            const Token = localStorage.getItem("loginToken");
            const userid = localStorage.getItem("userId");

            if(!Token || !userid){
                alert("user not authenticated");
            }
             


            const responce = await fetch(`${API_URL}work/addwork/${userid}`,{
                method:'post',
                headers:{
                    'Token':`${Token}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({workname,experience,location})
            });
            const data = await  responce.json();

        if(responce.ok){
          alert("work added successfully");
          console.log(data)
        }

            
        } catch (error) {
            console.error(error);
            alert("something went wrong")
        }
    }
  return (
    <div>
        <form class="max-w-sm mx-auto my-24" onSubmit={handlesubmit}>
                
                <div class="mb-5">
                    <label for="workname" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">workname</label>
                    <input type="text" name='workname' value={workname} onChange={(e) => setWorkName(e.target.value)} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="software" required />
                </div>
                <div class="mb-5">
                    <label for="experience" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">experience</label>
                    <input type="text" name='experience' value={experience} onChange={(e) => setExperience(e.target.value)} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="5 years" required />
                </div>
                <div class="mb-5">
                    <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">location</label>
                    <input type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="newYork" required />
                </div>

                <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sigin</button>
                
               
            </form>
    </div>
  )
}

export default Addwork