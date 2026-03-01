import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const ShowAlbum = () => {
    const [album,setAlbum] = useState({})
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:5000/${id}`).then((result) => {
            setAlbum(result.data)
        }).catch((err) => {
            console.log(err);
        });
    },[])

    const handleDelete = ()=>{
        axios.delete(`http://localhost:5000/${id}`).then((result) => {
            navigate("/")
        }).catch((err) => {
            console.log(err);
        });
    }

  return (
    <>
    <div
        class="container mt-5"
    >
        <div
            class="row justify-content-center align-items-center g-2"
        >
            <div class="col-4">
            <div class="card">
                <img class="card-img-top" src={album.coverImage} alt="Title" height='300px'/>
                <div class="card-body">
                    <h4 class="card-title">{album.albumName}</h4>
                    <p class="card-text">Artist: {album.artist}</p>
                    <p class="card-text">Genre: {album.genre}</p>
                    <p class="card-text">Release Year: {album.releaseYear}</p>
                    <NavLink
                        name=""
                        id=""
                        className="btn btn-warning mx-1"
                        to={`/edit/${album._id}`}
                        role="button"
                        >Edit</NavLink>
                    <button
                        type="button"
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                    <NavLink
                        name=""
                        id=""
                        className="btn btn-secondary mx-1"
                        to='/'
                        role="button"
                        >Back</NavLink>
                    
                </div>
            </div>
            
        </div>
        </div>
        
    </div>
    
      
    </>
  )
}

export default ShowAlbum
