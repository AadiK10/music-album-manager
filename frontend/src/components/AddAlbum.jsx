import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddAlbum = () => {

    const [album,setAlbum] = useState({albumName:'', artist:'', releaseYear:0, genre:'', coverImage:''})

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post("http://localhost:5000/",album).then((result) => {
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
                <div class="col-6">
                    <form action="" onSubmit={handleSubmit}>
                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                name="formId1"
                                id="formId1"
                                placeholder=""
                                onChange={(e)=>setAlbum({...album,albumName:e.target.value})}
                            />
                            <label for="formId1">Album Name</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                name="formId1"
                                id="formId1"
                                placeholder=""
                                onChange={(e)=>setAlbum({...album,artist:e.target.value})}
                            />
                            <label for="formId1">Artist</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input
                                type="number"
                                class="form-control"
                                name="formId1"
                                id="formId1"
                                placeholder=""
                                onChange={(e)=>setAlbum({...album,releaseYear:e.target.value})}
                            />
                            <label for="formId1">Release Year</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                name="formId1"
                                id="formId1"
                                placeholder=""
                                onChange={(e)=>setAlbum({...album,genre:e.target.value})}
                            />
                            <label for="formId1">Genre</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input
                                type="text"
                                class="form-control"
                                name="formId1"
                                id="formId1"
                                placeholder=""
                                onChange={(e)=>setAlbum({...album,coverImage:e.target.value})}
                            />
                            <label for="formId1">Upload Cover Image</label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-warning"
                        >
                            Add Album
                        </button>
                        
                        
                    </form>
                </div>
                
            </div>
            
        </div>
        
    </>
  )
}

export default AddAlbum