import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Totalworks() {
  const [userData, setUserData] = useState(null); // Store user data

  useEffect(() => {
    // Fetch the user data
    axios.get("https://daily-work-backend.onrender.com/user/single-user/66dec7e406a4e867c1128e91")
      .then((res) => {
        setUserData(res.data.user); // Set the user data
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <div>
      {userData ? (
        <div>
          <h1>{userData.username}</h1> {/* Display the username */}
          <ul>
            {userData.addwork.map((work) => (
              <li key={work._id}>
                <h3>{work.workname}</h3>
                <p>Experience: {work.experience}</p>
                <p>Location: {work.location}</p>
                {/* Display the images */}
                {work.images.map((image, index) => (
                  <img 
                    key={index} 
                    src={image.replace("C:\\fakepath\\", "/uploads/")} // Adjust the image path as needed
                    alt={work.workname} 
                    width="100"
                  />
                ))}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );
}

export default Totalworks;
