// Totalworks.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/Apiurl';

function Totalworks() {
  const [userData, setUserData] = useState(null); // Store user data

  // Function to get all data related to the user
  const getAlldata = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("User not found");
        return;
      }

      const response = await axios.get(`${API_URL}user/single-user/${userId}`);
      setUserData(response.data.user); // Set the user data
      console.log(response.data.user)
    } catch (error) {
      console.error(error);
      alert("Failed to get the user data");
    }
  };

  // Function to handle the delete operation
  const handleDelete = async (workId) => {
    try {
      await axios.delete(`${API_URL}work/deletework/${workId}`);
      alert("Work deleted successfully");
      getAlldata(); // Refresh the data after deletion
    } catch (error) {
      console.error(error);
      alert("Error deleting the work");
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    getAlldata();
  }, []);

  return (
    <div>
      {userData && userData.addwork.length > 0 ? (
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Work Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Experience</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Location</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Images</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.addwork.map((work) => (
              <tr key={work._id}>
                <td className="border border-gray-300 px-4 py-2">{work.workname}</td>
                <td className="border border-gray-300 px-4 py-2">{work.experience}</td>
                <td className="border border-gray-300 px-4 py-2">{work.location}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {work.imageUrl ? (
                    <img src={work.imageUrl} width="100px" alt="Work Image" /> 
                  ) : (
                    <p>No image available</p>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(work._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No works were added</p>
      )}
    </div>
  );
}

export default Totalworks;
