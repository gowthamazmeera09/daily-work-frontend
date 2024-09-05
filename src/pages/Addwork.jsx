import React, { useState } from 'react';
import { API_URL } from '../data/Apiurl';

function Addwork() {
    const [workname, setWorkName] = useState('');
    const [experience, setExperience] = useState('');
    const [location, setLocation] = useState('');

    const handleAddWorkSubmit = async (e) => {
        e.preventDefault();

       try {
        const token = localStorage.getItem("loginToken");
        const userId = localStorage.getItem("userId");

        if(!token || !userId){
          alert('user not authenticated');
          console.log("user not found")
        }

        const formData = new FormData();
        formData.append('workname',workname)
        formData.append('experience',experience);
        formData.append('location',location);

        const response = await fetch(`${API_URL}work/addwork/${userId}`, {
          method: 'POST',
          headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
          body: formData
        })
        const data = await response.json();

        if(response.ok){
          alert("work added successfully");
          console.log(data)
        }

       } catch (error) {
        console.error(error);
        alert("something went wrong")
       }
    };

    return (
        <div>
            <form className="max-w-sm mx-auto my-24" onSubmit={handleAddWorkSubmit}>
                <div className="mb-5">
                    <label htmlFor="workname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Work Name</label>
                    <input
                        type="text"
                        name="workname"
                        value={workname}
                        onChange={(e) => setWorkName(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="your work"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                    <input
                        type="text"
                        name="experience"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="5 years"
                        required
                    />
                </div>
                <div className="mb-5">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input
                        type="text"
                        name="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="your location"
                        required
                    />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Register new work
                </button>
            </form>
        </div>
    );
}

export default Addwork;
