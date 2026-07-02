import { useState, useRef, useEffect, useMemo } from 'react';
import { Navigation } from 'lucide-react';
import Button from './Button';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Enregistrement indispensable du plugin de Scroll
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideo, setLoadedVideo] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );

  const TotalVideo = 3;

  const miniVideoRef = useRef(null);
  const nextVideoRef = useRef(null);

  const HandleVideoLoaded = () => {
    setLoadedVideo((prev) => prev + 1);
    setIsLoading(false);
  };

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const UpComingVideoIndex = (currentIndex % TotalVideo) + 1;

  const handleMiniVidClick = () => {
    setHasClicked(true);
    setCurrentIndex(UpComingVideoIndex);
  };

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set('#next-video', { visibility: 'visible', autoAlpha: 0 });

        gsap.to('#next-video', {
          transformOrigin: 'center center',
          duration: 1,
          width: '100%',
          height: '100%',
          autoAlpha: 1,
          ease: 'power1.inOut',
          onStart: () => {
            if (nextVideoRef.current) nextVideoRef.current.play().catch(() => {});
          },
        });

        gsap.from(`#current-video`, {
          transformOrigin: 'center center',
          duration: 1.5,
          scale: 0,
          ease: 'power1.inOut',
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  // 2. Animation ScrollTrigger fluide
  useGSAP(() => {
    gsap.set('#video-frame', {
      clipPath: 'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
      borderRadius: '0 0 40% 10%',
    });

    gsap.from('#video-frame', {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      borderRadius: '0 0 0 0',
      ease: 'power1.inOut',
      scrollTrigger: {
        trigger: '#video-frame',
        start: 'center center',
        end: 'bottom center',
        scrub: true,
      },
    });
  }, []);

  const getVideoSrc = (index) => `/videos/hero-${index}.mp4`;

  const boboStyle = useMemo(
    () => ({
      right: windowWidth >= 640 ? '2.5rem' : '1.25rem',
      fontSize:
        windowWidth >= 1024
          ? '12rem'
          : windowWidth >= 768
            ? '8rem'
            : windowWidth >= 640
              ? '4.5rem'
              : '3rem',
      lineHeight: '0.85',
    }),
    [windowWidth]
  );

  const redefineStyle = useMemo(
    () => ({
      fontSize:
        windowWidth >= 1024
          ? '10rem'
          : windowWidth >= 768
            ? '7rem'
            : windowWidth >= 640
              ? '4.5rem'
              : '3.5rem',
      lineHeight: '0.85',
    }),
    [windowWidth]
  );

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw', overflowX: 'hidden' }}>
      {isLoading && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 100,
            display: 'flex',
            height: '100vh',
            width: '100vw',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#dfdff2',
            overflow: 'hidden',
          }}
        >
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}

      <div
        id="video-frame"
        style={{
          position: 'relative',
          zIndex: 10,
          height: '100vh',
          width: '100vw',
          overflow: 'hidden',
          backgroundColor: '#dfdff2',
        }}
      >
        {/* ZONE INTERACTIVE CENTRALE (MINI-PLAYER) */}
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
            height: '280px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '256px',
              height: '256px',
              transformOrigin: 'center',
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'scale(1)' : 'scale(0.5)',
              transition: 'transform 0.5s ease-in-out, opacity 0.5s ease-in-out',
              overflow: 'hidden',
              borderRadius: '8px',
            }}
          >
            <video
              ref={miniVideoRef}
              src={getVideoSrc(UpComingVideoIndex)}
              loop
              muted
              autoPlay
              id="current-video"
              preload="auto"
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                willChange: 'transform, clip-path',
                objectPosition: 'center',
                pointerEvents: 'none',
              }}
              onLoadedData={HandleVideoLoaded}
            />
          </div>
        </div>

        {/* VIDÉO CACHÉE POUR TRANSITIONS (Optimisée Streaming) */}
        <video
          ref={nextVideoRef}
          src={getVideoSrc(currentIndex)}
          loop
          muted
          id="next-video"
          preload="auto"
          playsInline
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '256px',
            height: '256px',
            willChange: 'transform, clip-path',
            objectFit: 'cover',
            objectPosition: 'center',
            visibility: 'hidden',
            zIndex: 20,
          }}
          onLoadedData={HandleVideoLoaded}
        />

        {/* VIDÉO D'ARRIÈRE-PLAN (Chargement Instantané) */}
        <video
          src={getVideoSrc(currentIndex)}
          autoPlay
          loop
          muted
          id="bg-video"
          preload="auto"
          playsInline
          style={{
            position: 'absolute',
            willChange: 'transform, clip-path',
            top: '0%',
            left: '0%',
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 10,
          }}
          onLoadedData={HandleVideoLoaded}
        />

        {/* Premier titre CAVANI (Bleu) */}
        <h1
          className="special-font hero-heading absolute bottom-5 z-40 text-blue-75"
          style={boboStyle}
        >
          re<b>a</b>lit<b>y</b>
        </h1>

        {/* Contenu textuel et bouton */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            zIndex: 40,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        >
          <div className="mt-24 px-5 sm:px-10" style={{ pointerEvents: 'auto' }}>
            <h1 className="special-font hero-heading text-blue-100 mb-2" style={redefineStyle}>
              RE<b>D</b>EFI<b>N</b>E
            </h1>

            <p className="text-blue-100 text-lg mb-5 max-w-64 font-robert-regular">
              entrer dans un monde où le jeu vidéo devient une expérience immersive et captivante.
            </p>

            <Button
              id="Watch.trailer"
              title="Watch Trailer"
              leftIcon={<Navigation size={14} fill="#000000" color="#000000" />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      {/* Second texte CAVANI (Noir) en arrière-plan */}
      <h1 className="special-font hero-heading absolute bottom-5 text-black" style={boboStyle}>
        re<b>a</b>lit<b>y</b>
      </h1>
    </div>
  );
};

export default Hero;
