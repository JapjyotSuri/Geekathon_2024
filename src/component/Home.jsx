import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const Home = () => {
    const location=useLocation();
    const repoParam=location?.state?.repos;
   
    const [repos,setRepos]=useState(repoParam)
  return (
    <div className='flex flex-wrap h-[100%] w-[100%] justify-center items-center'>
        {
            repos.map((repo) => (
                <div className='w-[210px] h-[210px] m-4 p-4 flex items-center justify-center flex-col rounded-2xl shadow-md bg-gray-800 text-[#fee819] text-[19px] hover:shadow-lg hover:scale-105 transition-transform duration-300'>
                    <h1>{repo.name}</h1>
                    
                </div>
            ))
        }
    </div>
  )
}

export default Home
