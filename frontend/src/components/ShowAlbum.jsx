import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BASE_URL } from '../config'

const ShowAlbum = () => {
    const [album, setAlbum] = useState({})
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${BASE_URL}/${id}`)
            .then((result) => {
                setAlbum(result.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [id])

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this album?')) {
            axios.delete(`${BASE_URL}/${id}`)
                .then((result) => {
                    navigate("/")
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    if (loading) {
        return (
            <div className="container mt-5 text-center">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{ fontSize: '4rem' }}
                >
                    🎵
                </motion.div>
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mt-5"
        >
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <motion.div 
                        className="card border-0 overflow-hidden"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '30px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div className="row g-0">
                            <div className="col-md-5">
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                    style={{ height: '100%', overflow: 'hidden' }}
                                >
                                    <img 
                                        src={album.coverImage || 'https://via.placeholder.com/500x500?text=No+Cover'} 
                                        className="img-fluid h-100 w-100"
                                        alt={album.albumName}
                                        style={{ objectFit: 'cover' }}
                                    />
                                </motion.div>
                            </div>
                            <div className="col-md-7">
                                <div className="card-body p-4 p-lg-5">
                                    <motion.h2 
                                        className="card-title mb-4"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontWeight: 'bold',
                                            fontSize: 'clamp(1.5rem, 5vw, 2rem)'
                                        }}
                                    >
                                        {album.albumName}
                                    </motion.h2>
                                    
                                    <motion.div 
                                        className="mb-4"
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <InfoRow icon="🎤" label="Artist" value={album.artist} />
                                        <InfoRow icon="🎵" label="Genre" value={album.genre} />
                                        <InfoRow icon="📅" label="Release Year" value={album.releaseYear} />
                                    </motion.div>

                                    {/* Responsive Buttons Section - Fixed for mobile */}
                                    <motion.div 
                                        className="d-flex flex-column flex-sm-row gap-2 mt-4"
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-100 w-sm-auto"
                                        >
                                            <NavLink
                                                to={`/edit/${album._id}`}
                                                className="btn w-100"
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '15px',
                                                    padding: '12px 20px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 'clamp(0.9rem, 4vw, 1rem)'
                                                }}
                                            >
                                                ✏️ Edit
                                            </NavLink>
                                        </motion.div>
                                        
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-100 w-sm-auto"
                                        >
                                            <button
                                                onClick={handleDelete}
                                                className="btn w-100"
                                                style={{
                                                    background: '#dc3545',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '15px',
                                                    padding: '12px 20px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 'clamp(0.9rem, 4vw, 1rem)'
                                                }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </motion.div>
                                        
                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-100 w-sm-auto"
                                        >
                                            <a
                                                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(album.albumName + ' ' + album.artist)}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn w-100"
                                                style={{
                                                    background: '#FF0000',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '15px',
                                                    padding: '12px 20px',
                                                    textDecoration: 'none',
                                                    display: 'inline-block',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 'clamp(0.9rem, 4vw, 1rem)'
                                                }}
                                            >
                                                ▶️ YouTube
                                            </a>
                                        </motion.div>

                                        <motion.div
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-100 w-sm-auto"
                                        >
                                            <NavLink
                                                to="/"
                                                className="btn w-100"
                                                style={{
                                                    background: '#6c757d',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '15px',
                                                    padding: '12px 20px',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: 'clamp(0.9rem, 4vw, 1rem)'
                                                }}
                                            >
                                                ← Back
                                            </NavLink>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

const InfoRow = ({ icon, label, value }) => (
    <motion.div 
        className="mb-3"
        whileHover={{ x: 10 }}
        style={{ fontSize: 'clamp(1rem, 4vw, 1.1rem)' }}
    >
        <span style={{ marginRight: '10px', fontSize: 'clamp(1.2rem, 5vw, 1.3rem)' }}>{icon}</span>
        <strong style={{ color: '#4a5568' }}>{label}:</strong>
        <span style={{ color: '#718096', marginLeft: '10px' }}>{value}</span>
    </motion.div>
)

export default ShowAlbum