import React, { useState, useRef } from 'react'

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideo, setLoadedVideo] = useState(0)

  // États pour gérer le hover en JS (ultra stable pour ton Chromebook)
  const [isHovered, setIsHovered] = useState(false)

  const TotalVideo = 4
  const nextVideoRef = useRef(null)

  const HandleVideoLoaded = () => {
    setLoadedVideo((prev) => prev + 1)
  }


  
  const handleMiniVidClick = () => {
    setHasClicked(true)
    setCurrentIndex((prevIndex) => (prevIndex % TotalVideo) + 1)
  }

  const getVideoSrc = (index) => {
    return `/videos/hero-${index}.mp4`
  }

  const nextVideoIndex = (currentIndex + 1) 

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflowX: 'hidden' }}>
      <div id="video-frame" style={{ position: 'relative', zIndex: 10, height: '100vh', width: '100vw', overflow: 'hidden', borderRadius: '8px', backgroundColor: '#dfdff2' }}>
        
        {/* Zone interactive centrale unifiée */}
        <div 
          onClick={handleMiniVidClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 50,
            width: '280px',
            height: '280px', // Un peu plus haut pour accueillir le texte en dessous
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Boîtier de la Vidéo avec Style Dynamique */}
          <div 
            style={{ 
              fontWeight: 'bold', 
              width: '256px', 
              height: '256px',
              transformOrigin: 'center',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.5)',
              transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
              overflow: 'hidden',
              borderRadius: '8px'
            }}
          >
            <video 
              ref={nextVideoRef}
              src={getVideoSrc(nextVideoIndex)} 
              loop 
              muted
              autoPlay 
              id='current-video'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                pointerEvents: 'none' // Empêche la vidéo de voler le focus de la souris
              }}
              onLoadedData={HandleVideoLoaded} 
            />
          </div>         
        </div>

      </div>
    </div>
  )
}

export default Hero