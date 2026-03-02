import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className="navbar navbar-expand-lg navbar-dark"
      style={{ 
        background: 'linear-gradient(135deg, #1e1e2f 0%, #2a2a40 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
      }}
    >
      <div className="container">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink className="navbar-brand" to="/">
            <span style={{ fontSize: '1.8rem', marginRight: '10px' }}>🎵</span>
            Music Album Manager
          </NavLink>
        </motion.div>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <motion.li 
              className="nav-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                className={({isActive}) => 
                  isActive ? "nav-link active fw-bold" : "nav-link"
                } 
                to="/"
              >
                Home
              </NavLink>
            </motion.li>
            <motion.li 
              className="nav-item"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <NavLink 
                className={({isActive}) => 
                  isActive ? "nav-link active fw-bold" : "nav-link"
                } 
                to="/add"
              >
                Add Album
              </NavLink>
            </motion.li>
          </ul>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar