// Totalworks.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../data/Apiurl';

function Totalworks() {
  const [userData, setUserData] = useState(null); // Store user data
  const [imageUploadWorkId, setImageUploadWorkId] = useState(null); // Track which work is adding images
  const [selectedFiles, setSelectedFiles] = useState(null); // Track selected files for upload

  // Function to get all data related to the user
  const getAlldata = async () => {
    try {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        alert("User not found");
        return;
      }

      const Token = localStorage.getItem("loginToken");
      const response = await axios.get(`${API_URL}user/single-user/${userId}`, {
        headers: {
          'Token': `${Token}`,
        },
      });
      setUserData(response.data.user); // Set the user data
      console.log(response.data.user)
    } catch (error) {
      console.error(error);
      alert("Failed to get the user data");
    }
  };

  // Function to handle the delete work operation
  const handleDelete = async (workId) => {
    try {
      const Token = localStorage.getItem("loginToken");
      await axios.delete(`${API_URL}work/deletework/${workId}`, {
        headers: {
          'Token': `${Token}`,
        },
      });
      alert("Work deleted successfully");
      getAlldata(); // Refresh the data after deletion
    } catch (error) {
      console.error(error);
      alert("Error deleting the work");
    }
  };

  // Function to handle image upload form submission
  const handleAddImageSubmit = async (workId) => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one image");
      return;
    }

    try {
      const Token = localStorage.getItem("loginToken");
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('images', selectedFiles[i]);
      }

      const response = await axios.post(`${API_URL}work/addimage/${workId}`, formData, {
        headers: {
          'Token': `${Token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        alert("Images added successfully");
        setImageUploadWorkId(null); // Close the upload form
        setSelectedFiles(null); // Clear selected files
        getAlldata(); // Refresh data
      } else {
        alert("Error adding images: " + response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error uploading images");
    }
  };

  // Function to handle image deletion
  const handleDeleteImage = async (workId, imageName) => {
    if (!window.confirm("Are you sure you want to delete this image?")) {
      return;
    }

    try {
      const Token = localStorage.getItem("loginToken");
      const response = await axios.delete(`${API_URL}work/deleteimage/${workId}/${imageName}`, {
        headers: {
          'Token': `${Token}`,
        },
      });

      if (response.status === 200) {
        alert("Image deleted successfully");
        getAlldata(); // Refresh data
      } else {
        alert("Error deleting image: " + response.data.error);
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting image");
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
              <th className="border border-gray-300 px-4 py-2 text-left">Add Image</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Delete Work</th>
            </tr>
          </thead>
          <tbody>
            {userData.addwork.map((work) => (
              <tr key={work._id}>
                <td className="border border-gray-300 px-4 py-2">{work.workname}</td>
                <td className="border border-gray-300 px-4 py-2">{work.experience}</td>
                <td className="border border-gray-300 px-4 py-2">{work.location}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {work.imageUrls && work.imageUrls.length > 0 ? (
                    <div className="flex flex-wrap">
                      {work.imageUrls.map((imageUrl, index) => {
                        // Extract imageName from imageUrl
                        const imageName = imageUrl.split('/').pop();
                        return (
                          <div key={index} className="relative m-1">
                            <img src={imageUrl} width="100px" alt="Work Image" className="object-cover" />
                            <button 
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 py-0.5"
                              onClick={() => handleDeleteImage(work._id, imageName)}
                              title="Delete Image"
                            >
                              &times;
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p>No images available</p>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {imageUploadWorkId === work._id ? (
                    <div>
                      <input 
                        type="file" 
                        multiple 
                        onChange={(e) => setSelectedFiles(e.target.files)} 
                        className="mb-2"
                      />
                      <div>
                        <button 
                          onClick={() => handleAddImageSubmit(work._id)}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mr-2"
                        >
                          Upload
                        </button>
                        <button 
                          onClick={() => { setImageUploadWorkId(null); setSelectedFiles(null); }}
                          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setImageUploadWorkId(work._id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Add Image
                    </button>
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
