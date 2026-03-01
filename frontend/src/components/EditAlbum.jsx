import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { NavLink, useNavigate, useParams } from 'react-router-dom'

const EditAlbum = () => {
    const {id} = useParams()
    const [album, setAlbum] = useState({albumName:'', artist:'', releaseYear:0, genre:'', coverImage:''})
    const navigate = useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:5000/${id}`).then((result) => {
            setAlbum(result.data)
        }).catch((err) => {
            console.log(err);
        });
    },[])

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:5000/${id}`,album).then((result) => {
            navigate(`/show/${id}`)
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
                                value={album.albumName}
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
                                value={album.artist}
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
                                value={album.releaseYear}
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
                                value={album.genre}
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
                                value={album.coverImage}
                                onChange={(e)=>setAlbum({...album,coverImage:e.target.value})}
                            />
                            <label for="formId1">Upload Cover Image</label>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-warning"
                        >
                            Edit Album
                        </button>
                        
                        <NavLink
                        name=""
                        id=""
                        className="btn btn-secondary mx-1"
                        to={`/show/${id}`}
                        role="button"
                        >Back</NavLink>
                        
                    </form>
                </div>
                
            </div>
            
        </div>
    </>
  )
}

export default EditAlbum
