import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BASE_URL } from '../config'

const EditAlbum = () => {
    const { id } = useParams()
    const [album, setAlbum] = useState({
        albumName: '', 
        artist: '', 
        releaseYear: '', 
        genre: '', 
        coverImage: ''
    })
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)
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

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        axios.put(`${BASE_URL}/${id}`, album)
            .then((result) => {
                navigate(`/show/${id}`)
            })
            .catch((err) => {
                console.log(err)
                setIsSubmitting(false)
            })
    }

    const inputVariants = {
        focus: {
            scale: 1.02,
            boxShadow: '0 0 15px rgba(102, 126, 234, 0.5)',
            transition: { type: "spring", stiffness: 300 }
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="container mt-5"
        >
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <motion.div 
                        className="card border-0"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        style={{
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '30px',
                            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
                        }}
                    >
                        <div className="card-body p-5">
                            <motion.div 
                                className="text-center mb-4"
                                initial={{ y: -20 }}
                                animate={{ y: 0 }}
                            >
                                <motion.span
                                    animate={{ 
                                        rotate: [0, 10, -10, 0],
                                        scale: [1, 1.2, 1.2, 1]
                                    }}
                                    transition={{ 
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }}
                                    style={{ fontSize: '4rem', display: 'block' }}
                                >
                                    ✏️
                                </motion.span>
                                <h2 style={{ 
                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight: 'bold'
                                }}>
                                    Edit Album
                                </h2>
                            </motion.div>

                            <form onSubmit={handleSubmit}>
                                {[
                                    { label: 'Album Name', field: 'albumName', type: 'text' },
                                    { label: 'Artist', field: 'artist', type: 'text' },
                                    { label: 'Release Year', field: 'releaseYear', type: 'number' },
                                    { label: 'Genre', field: 'genre', type: 'text' },
                                    { label: 'Cover Image URL', field: 'coverImage', type: 'text' }
                                ].map((input, index) => (
                                    <motion.div 
                                        key={input.field}
                                        className="mb-4"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <label className="form-label fw-bold" style={{ color: '#4a5568' }}>
                                            {input.label}
                                        </label>
                                        <motion.input
                                            type={input.type}
                                            className="form-control form-control-lg"
                                            style={{
                                                borderRadius: '15px',
                                                border: '2px solid #e2e8f0',
                                                padding: '15px',
                                                transition: 'all 0.3s'
                                            }}
                                            whileFocus="focus"
                                            variants={inputVariants}
                                            value={album[input.field]}
                                            onChange={(e) => setAlbum({...album, [input.field]: e.target.value})}
                                            required={input.field !== 'coverImage'}
                                        />
                                    </motion.div>
                                ))}

                                <motion.div 
                                    className="d-flex gap-3 mt-5"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <motion.button
                                        type="submit"
                                        className="btn flex-grow-1"
                                        disabled={isSubmitting}
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '15px',
                                            padding: '15px',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold'
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isSubmitting ? (
                                            <motion.span
                                                animate={{ rotate: 360 }}
                                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            >
                                                ⏳
                                            </motion.span>
                                        ) : 'Save Changes'}
                                    </motion.button>
                                    
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <NavLink
                                            to={`/show/${id}`}
                                            className="btn"
                                            style={{
                                                background: '#6c757d',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '15px',
                                                padding: '15px 30px',
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold',
                                                textDecoration: 'none',
                                                display: 'inline-block'
                                            }}
                                        >
                                            Cancel
                                        </NavLink>
                                    </motion.div>
                                </motion.div>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default EditAlbum