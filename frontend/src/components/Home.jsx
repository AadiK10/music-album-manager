import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Home = () => {
    const [albums, setAlbums] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:5000")
            .then((result) => {
                setAlbums(result.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
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
        <div className="container mt-5">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-5"
            >
                <h1 style={{ 
                    color: 'white', 
                    fontSize: '3rem',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    Your Music Collection
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.8)' }}>
                    Discover and manage your favorite albums
                </p>
            </motion.div>

            <motion.div 
                className="row g-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {albums.map((album) => (
                        <motion.div 
                            key={album._id}
                            className="col-xl-3 col-lg-4 col-md-6"
                            variants={itemVariants}
                            layout
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <motion.div 
                                className="card h-100 border-0"
                                whileHover={{ 
                                    y: -10,
                                    boxShadow: '0 20px 30px rgba(0,0,0,0.2)'
                                }}
                                style={{
                                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ position: 'relative', overflow: 'hidden' }}>
                                    <motion.img 
                                        className="card-img-top" 
                                        src={album.coverImage || 'https://via.placeholder.com/300x300?text=No+Cover'} 
                                        alt={album.albumName}
                                        style={{ height: '250px', objectFit: 'cover' }}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <motion.div 
                                        className="position-absolute top-0 end-0 m-3"
                                        initial={{ opacity: 0, x: 20 }}
                                        whileHover={{ opacity: 1, x: 0 }}
                                    >
                                        <span className="badge" style={{ 
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            padding: '8px 15px',
                                            borderRadius: '20px'
                                        }}>
                                            {album.genre}
                                        </span>
                                    </motion.div>
                                </div>
                                
                                <div className="card-body">
                                    <motion.h5 
                                        className="card-title fw-bold mb-2"
                                        style={{ color: '#2d3748' }}
                                    >
                                        {album.albumName}
                                    </motion.h5>
                                    <p className="card-text text-muted mb-3">
                                        {album.artist} • {album.releaseYear}
                                    </p>
                                    
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <NavLink
                                            className="btn w-100"
                                            to={`/show/${album._id}`}
                                            style={{
                                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '10px',
                                                padding: '10px'
                                            }}
                                        >
                                            View Details
                                        </NavLink>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {albums.length === 0 && (
                <motion.div 
                    className="text-center mt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <h3 style={{ color: 'white' }}>No albums yet!</h3>
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <NavLink 
                            to="/add" 
                            className="btn btn-lg mt-3"
                            style={{
                                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '30px',
                                padding: '15px 40px'
                            }}
                        >
                            Add Your First Album
                        </NavLink>
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

export default Home