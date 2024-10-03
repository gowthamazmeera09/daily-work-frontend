import React, { useState } from 'react';
import { API_URL } from '../data/Apiurl';

function Addwork() {
    const [workname, setWorkName] = useState("");
    const [experience, setExperience] = useState("");
    const [location, setLocation] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);

    const handlesubmit = async (e) => {
        e.preventDefault();
        try {
            const Token = localStorage.getItem("loginToken");
            const userid = localStorage.getItem("userId");

            if (!Token || !userid) {
                alert("User not authenticated");
                return;
            }

            // Create FormData to handle file upload
            const formData = new FormData();
            formData.append('workname', workname);
            formData.append('experience', experience);
            formData.append('location', location);
            formData.append('work', selectedFile); // 'work' should match the name used in multer.single()

            const response = await fetch(`${API_URL}work/addwork/${userid}`, {
                method: 'POST',
                headers: {
                    'Token': `${Token}`,
                    // No need for Content-Type as `fetch` will handle it when sending FormData
                },
                body: formData,
            });
            const data = await response.json();

            if (response.ok) {
                alert("Work added successfully");
                console.log(data);
                setWorkName("");
                setExperience("");
                setLocation("");
                setSelectedFile(null); // Clear the selected file
            } else {
                alert("Error: " + data.message);
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong");
        }
    };

    return (
        <div>
            <form className="max-w-sm mx-auto my-24" onSubmit={handlesubmit}>
                <div className="mb-5">
                    <label htmlFor="workname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Workname</label>
                    <input type="text" name="workname" value={workname} onChange={(e) => setWorkName(e.target.value)} className="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="Software" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="experience" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Experience</label>
                    <input type="text" name="experience" value={experience} onChange={(e) => setExperience(e.target.value)} className="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="5 years" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                    <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} className="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" placeholder="New York" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="work" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Images</label>
                    <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} className="shadow-sm bg-gray-50 border text-gray-900 text-sm rounded-lg block w-full p-2.5" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">Add Work</button>
            </form>
        </div>
    );
}

export default Addwork;