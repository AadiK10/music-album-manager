
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'

const Home = () => {
    const [albums,setalbums] = useState([])
    

    useEffect(()=>{
        axios.get("http://localhost:5000").then((result) => {
        setalbums(result.data)
        }).catch((err) => {
            console.log(err);
        });
    },[])
    
  return (
    <>
      <div
        class="container mt-5"
      >
        <div
            class="row justify-content-center align-items-center g-2"
        >
            {
                albums.map((album)=>(
                    <div class="col-3">
                        <div class="card">
                            <img class="card-img-top" src={album.coverImage} alt="Title" height='250px'/>
                            <div class="card-body">
                                <h4 class="card-title">{album.albumName}</h4>
                                <p class="card-text">Genre: {album.genre}</p>
                                <NavLink
                                    name=""
                                    id=""
                                    className="btn btn-info"
                                    to={`/show/${album._id}`}
                                    role="button"
                                    >Show More</NavLink>
                                
                            </div>
                        </div>
                        
                    </div>
                ))
            }
            
            
        </div>
        
      </div>
      
    </>
  )
}

export default Home