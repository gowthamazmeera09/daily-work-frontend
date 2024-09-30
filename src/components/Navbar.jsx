

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
  const [profilePicture, setProfilePicture] = useState('');
  const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false)


  useEffect(() => {
    setLoading(true)
    
    // Get the profile picture from localStorage
    const storedProfilePicture = localStorage.getItem('profilePicture');
    if (storedProfilePicture) {
      setProfilePicture(storedProfilePicture);
    }
    setError(false)
  }, []);

  

  return (
    <div>
      
      <nav class="bg-slate-200 border-gray-200 dark:bg-gray-900">
        <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
          <a href="https://flowbite.com" class="flex items-center space-x-3 rtl:space-x-reverse">
            <h5 class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">gowtham</h5>
            
          </a>
          <div class="flex items-center space-x-6 rtl:space-x-reverse">
            <a href="tel:5541251234" class="text-sm  text-gray-500 dark:text-white hover:underline">(+91)6303497101</a>
            <Link to="Sigin" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">

            {profilePicture ? (
                            <Link to="/Profile">
                            <img src={profilePicture} className="h-10 w-10 object-cover rounded-full" />
                          </Link>
                        ) : (
                          <span>
                            <Link to="Sigup" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Sigup</Link>/
                            <Link to="Sigin" class="text-sm  text-blue-600 dark:text-blue-500 hover:underline">Sigin</Link>
                          </span>
                        )}
            </Link>
          </div>
        </div>
      </nav>
      <nav class="bg-gray-50 dark:bg-gray-700">
        <div class="max-w-screen-xl px-4 py-3 mx-auto">
          <div class="flex items-center center place-content-center">
            <ul class="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li>
                <Link to="Addwork" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Addwork</Link>
              </li>
              <li>
                <Link to="Totalworks" class="text-gray-900 dark:text-white hover:underline">Totalworks</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>



      {/* <div className='bg-slate-200 flex justify-between items-center'>
        <div className='font-bold p-4'>
          <h5>gowtham</h5>
        </div>
        <div className=''>
          <ul className='flex gap-4 mx-9'>
            <Link to="Home"><li>Home</li></Link> 
            <Link to="About"><li>About</li></Link> 
            <Link to="Sigin"><li>Sigin</li></Link> 
          </ul>
        </div>
      </div> */}
    </div>
  )
}

export default Navbar;