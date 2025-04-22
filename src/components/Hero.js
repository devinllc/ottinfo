'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiPlay, FiVolume2, FiVolumeX, FiPause } from 'react-icons/fi';

const movieElements = [
    { type: 'title', text: 'THE HAUNTING', delay: 2 },
    { type: 'cast', text: 'Director: James Wan', delay: 5 },
    { type: 'title', text: 'INSIDIOUS', delay: 4 },
    { type: 'cast', text: 'Starring: Vera Farmiga', delay: 7 },
    { type: 'title', text: 'CONJURING', delay: 9 },
    { type: 'cast', text: 'Patrick Wilson', delay: 3 },
    { type: 'title', text: 'SINISTER', delay: 6 },
    { type: 'cast', text: 'Director: Scott Derrickson', delay: 8 },
    { type: 'title', text: 'THE RING', delay: 1 },
    { type: 'cast', text: 'Ethan Hawke', delay: 10 },
    { type: 'title', text: 'HEREDITARY', delay: 7 },
    { type: 'cast', text: 'Toni Collette', delay: 4 },
    { type: 'title', text: 'THE WITCH', delay: 5 },
    { type: 'cast', text: 'Director: Robert Eggers', delay: 6 },
];

const Hero = () => {
    const [muted, setMuted] = useState(true); // Start muted to avoid autoplay issues
    const audioRef = useRef(null);
    const sectionRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [particles, setParticles] = useState([]);
    const [floatingMovieElements, setFloatingMovieElements] = useState([]);
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [revealStage, setRevealStage] = useState(0);
    const [audioError, setAudioError] = useState(null);
    const [userInteracted, setUserInteracted] = useState(false);
    const [audioLoaded, setAudioLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Add event listener for any user interaction
    useEffect(() => {
        const handleUserInteraction = () => {
            if (!userInteracted) {
                setUserInteracted(true);
                if (audioRef.current) {
                    forcePlayAudio();
                }
            }
        };

        // Add various interaction events
        document.addEventListener('click', handleUserInteraction);
        document.addEventListener('touchstart', handleUserInteraction);
        document.addEventListener('keydown', handleUserInteraction);

        // Try to preload the audio
        const preloadAudio = new Audio();
        preloadAudio.src = '/audio/background-music.mp3';
        preloadAudio.preload = 'auto';
        preloadAudio.load();

        preloadAudio.addEventListener('canplaythrough', () => {
            setAudioLoaded(true);
            console.log('Audio preloaded successfully');
        });

        preloadAudio.addEventListener('error', (e) => {
            console.error('Error preloading audio:', e);
            setAudioError('Could not load audio file. Please check your connection.');
        });

        return () => {
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
            document.removeEventListener('keydown', handleUserInteraction);
            preloadAudio.removeEventListener('canplaythrough', () => { });
            preloadAudio.removeEventListener('error', () => { });
        };
    }, [userInteracted]);

    // Initialize floating movie elements
    useEffect(() => {
        const elements = movieElements.map((element, index) => ({
            ...element,
            id: index,
            left: Math.random() * 80 + 10, // 10% to 90% of screen width
            top: Math.random() * 80 + 10,  // 10% to 90% of screen height
            size: element.type === 'title' ? (Math.random() * 1.2 + 1.2) : (Math.random() * 0.4 + 0.8), // Titles larger than cast
            speed: Math.random() * 60 + 40,
            floatDirection: Math.random() > 0.5 ? 'left' : 'right',
            opacity: Math.random() * 0.4 + 0.2,
        }));

        setFloatingMovieElements(elements);
    }, []);

    // Setup Intersection Observer to detect when hero section is visible
    useEffect(() => {
        if (!sectionRef.current) return;

        const options = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.3 // 30% of the section must be visible
        };

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            const isIntersecting = entry.isIntersecting;
            console.log("Hero section visibility changed:", isIntersecting);

            setIsVisible(isIntersecting);

            // Control audio based on visibility
            if (audioRef.current && audioEnabled && userInteracted && !muted) {
                if (isIntersecting) {
                    // Hero is visible, try to play audio
                    console.log("Hero is visible, attempting to play audio");
                    audioRef.current.play().catch(err => {
                        console.warn("Failed to play on scroll back to hero:", err);
                    });
                    setIsPlaying(true);
                } else {
                    // Hero is hidden, pause audio
                    console.log("Hero is not visible, pausing audio");
                    audioRef.current.pause();
                    setIsPlaying(false);
                }
            }
        }, options);

        // Observe the hero section
        observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
            observer.disconnect();
        };
    }, [audioEnabled, userInteracted, muted]);

    // Handle visibility change to resume audio when returning to the page
    useEffect(() => {
        const handleVisibilityChange = () => {
            // When user returns to the page, restart audio if it should be playing
            if (!document.hidden && !muted && audioEnabled && audioRef.current && isVisible && !isPlaying) {
                audioRef.current.play().catch(err => {
                    console.warn("Auto resume failed:", err);
                });
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [isPlaying, muted, audioEnabled, isVisible]);

    useEffect(() => {
        // Generate particles on client-side only to avoid hydration mismatch
        const particlesArray = Array.from({ length: 30 }, () => ({
            size: Math.random() * 20 + 10,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 15 + 15
        }));
        setParticles(particlesArray);

        // Enhanced reveal animation sequence
        const revealSequence = () => {
            // Stage 1: Initial reveal
            setTimeout(() => {
                setRevealStage(1);
                // Try to play muted audio when animation starts
                attemptAutoplay();
            }, 400);

            // Stage 2: Background image appears 
            setTimeout(() => {
                setRevealStage(2);
            }, 1200);

            // Stage 3: Content fades in
            setTimeout(() => {
                setRevealStage(3);
                setAnimationComplete(true);
            }, 2000);
        };

        // Start the reveal sequence
        revealSequence();

        // Set up audio element when component mounts
        if (audioRef.current) {
            audioRef.current.volume = 0.8;

            // Add event listeners to track audio state
            const handlePlay = () => {
                setIsPlaying(true);
                setAudioEnabled(true);
                console.log('Audio playing');
            };

            const handlePause = () => {
                setIsPlaying(false);
                console.log('Audio paused');
            };

            const handleError = (e) => {
                console.error('Audio error:', e);
                setAudioError('Error playing audio: ' + (e.message || 'Unknown error'));
            };

            audioRef.current.addEventListener('play', handlePlay);
            audioRef.current.addEventListener('pause', handlePause);
            audioRef.current.addEventListener('error', handleError);

            return () => {
                if (audioRef.current) {
                    audioRef.current.removeEventListener('play', handlePlay);
                    audioRef.current.removeEventListener('pause', handlePause);
                    audioRef.current.removeEventListener('error', handleError);
                }
            };
        }
    }, []);

    // Force play audio with multiple attempts and fallbacks
    const forcePlayAudio = () => {
        if (!audioRef.current) return;

        // Clear previous errors
        setAudioError(null);

        // Unmute and set volume
        audioRef.current.muted = false;
        setMuted(false);
        audioRef.current.volume = 0.8;

        // Reset audio to beginning if it's stopped
        if (audioRef.current.paused) {
            // Don't reset time if it's already playing
            audioRef.current.currentTime = 0;
        }

        // Play with multiple attempts
        const attemptPlay = (attempts = 0) => {
            console.log(`Attempt ${attempts + 1} to play audio`);

            const playPromise = audioRef.current.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log('Audio playback successful');
                    setIsPlaying(true);
                    setAudioEnabled(true);
                }).catch(err => {
                    console.warn(`Attempt ${attempts + 1} failed:`, err);

                    if (attempts < 2) {
                        // Try again after a short delay
                        setTimeout(() => attemptPlay(attempts + 1), 300);
                    } else {
                        setAudioError('Browser blocked audio playback. Please click the Enable Sound button below.');
                    }
                });
            }
        };

        attemptPlay();
    };

    // Properly stop audio
    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Try to play muted audio initially (to handle autoplay restrictions)
    const attemptAutoplay = () => {
        if (audioRef.current) {
            // Make sure it's muted
            audioRef.current.muted = true;
            setMuted(true);
            audioRef.current.volume = 0;

            try {
                const playPromise = audioRef.current.play();

                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            setIsPlaying(true);
                            setAudioEnabled(true);
                            console.log("Muted autoplay successful");
                        })
                        .catch(error => {
                            console.warn("Muted autoplay failed:", error.toString());
                        });
                }
            } catch (error) {
                console.warn("Error with muted autoplay attempt:", error.toString());
            }
        }
    };

    // Toggle play/pause with proper state management
    const togglePlay = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log("Toggle play button clicked");

        setUserInteracted(true);

        if (audioRef.current) {
            console.log("Toggle play called, current isPlaying:", isPlaying);
            if (isPlaying) {
                console.log("Stopping audio");
                stopAudio();
            } else {
                console.log("Starting audio");
                forcePlayAudio();
            }
        }
    };

    const toggleMute = (e) => {
        e.stopPropagation(); // Prevent event bubbling
        console.log("Toggle mute button clicked");

        setUserInteracted(true);

        if (audioRef.current) {
            const newMuted = !muted;
            audioRef.current.muted = newMuted;
            setMuted(newMuted);
        }
    };

    return (
        <section
            ref={sectionRef}
            className={`hero-section relative h-screen flex items-center overflow-hidden ${revealStage === 0 ? 'bg-black' : ''}`}
            id="hero-section"
        >
            {/* Initial reveal animation overlay */}
            <div
                className={`absolute inset-0 bg-black z-10 transition-opacity duration-1000 ease-in-out ${revealStage >= 1 ? 'opacity-0' : 'opacity-100'
                    }`}
            />

            {/* Animated background gradient overlay with enhanced transition - horror theme */}
            <div
                className={`absolute inset-0 bg-gradient-to-tr from-black via-red-900 to-gray-900 animate-gradient-xy z-0 transition-all duration-1500 ease-out ${revealStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                    }`}
            />

            {/* Particle effects - client-side only */}
            <div className={`absolute inset-0 z-1 opacity-30 transition-opacity duration-2000 ${revealStage >= 2 ? 'opacity-30' : 'opacity-0'}`}>
                <div className="particles-container">
                    {particles.map((particle, i) => (
                        <div
                            key={i}
                            className="particle"
                            style={{
                                '--size': `${particle.size}px`,
                                '--left': `${particle.left}%`,
                                '--top': `${particle.top}%`,
                                '--animation-delay': `${particle.delay}s`,
                                animationDuration: `${particle.duration}s`
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            {/* Floating Movie Elements - titles and cast names */}
            <div className={`absolute inset-0 z-2 overflow-hidden transition-opacity duration-2000 pointer-events-none ${revealStage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                {floatingMovieElements.map((element) => (
                    <div
                        key={element.id}
                        className={`absolute font-mono ${element.type === 'title' ? 'text-red-400' : 'text-gray-400'} floating-element`}
                        style={{
                            left: `${element.left}%`,
                            top: `${element.top}%`,
                            fontSize: `${element.size}rem`,
                            opacity: element.opacity,
                            animationDelay: `${element.delay}s`,
                            animationDuration: `${element.speed}s`,
                            animationName: element.floatDirection === 'left' ? 'floatLeft' : 'floatRight',
                        }}
                    >
                        {element.text}
                    </div>
                ))}
            </div>

            {/* Background Image with enhanced animation - horror theme */}
            <div
                className={`absolute inset-0 z-0 transition-all duration-2000 ease-out ${revealStage >= 2 ? 'opacity-70 scale-100' : 'opacity-0 scale-110'
                    }`}
            >
                <Image
                    src="/images/horror-bg.jpg"
                    alt="OTT Platform"
                    fill
                    priority
                    quality={100}
                    className="object-cover animate-slow-zoom"
                />
                <div className={`absolute inset-0 bg-gradient-to-r from-black/80 to-red-900/40 transition-opacity duration-1500 ${revealStage >= 2 ? 'opacity-100' : 'opacity-0'
                    }`}></div>
            </div>

            {/* Super Prominent Sound Enable Banner - Always visible until user interacts */}
            {!userInteracted && animationComplete && (
                <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center">
                    <div className="text-center max-w-lg px-4 py-8 bg-red-900/80 rounded-lg border-2 border-red-500 shadow-2xl pulse-red">
                        <h2 className="text-white text-3xl mb-6 font-bold font-mono">
                            ENABLE <span className="text-red-300">HORROR</span> SOUNDS
                        </h2>
                        <p className="text-gray-200 mb-8">
                            For the full horror experience, click below to enable audio
                        </p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setUserInteracted(true);
                                forcePlayAudio();
                            }}
                            className="animate-pulse-slow bg-black text-white hover:bg-red-950 flex items-center justify-center gap-3 py-5 px-8 rounded-md shadow-xl shadow-red-900/30 transition-all duration-300 hover:scale-105 mx-auto text-xl font-bold"
                        >
                            <FiVolume2 size={24} className="animate-bounce-slow" />
                            START THE NIGHTMARE
                        </button>
                    </div>
                </div>
            )}

            {/* Content with staggered animations */}
            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="max-w-3xl mx-auto md:mx-0">
                    <h1
                        className={`text-4xl md:text-6xl font-bold mb-4 text-white transition-all duration-1000 ${revealStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                            } font-mono tracking-tight`}
                    >
                        Your <span className="text-gradient animate-text-gradient bg-gradient-to-r from-red-500 via-red-300 to-red-600 glitch-text" data-text="NIGHTMARE">NIGHTMARE</span> Begins
                    </h1>
                    <p
                        className={`text-lg md:text-xl text-red-200 mb-8 transition-all duration-1000 delay-300 ${revealStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                            } font-mono tracking-wider fade-in-flicker`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        Stream unlimited horror movies, terrifying shows, and exclusive nightmares with stunning visual effects.
                        The fear follows you everywhere.
                    </p>

                    {/* Display current audio state for debugging */}
                    <div className={`mb-2 text-xs text-gray-500 ${revealStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        Audio State: {isPlaying ? 'Playing' : 'Paused'} | Muted: {muted ? 'Yes' : 'No'} | Section: {isVisible ? 'Visible' : 'Hidden'}
                        {audioRef.current && ` | Browser State: ${audioRef.current.paused ? 'Paused' : 'Playing'}`}
                    </div>

                    {/* Audio error message if present */}
                    {audioError && (
                        <div className={`mb-4 p-3 bg-red-900/70 border border-red-500 rounded text-red-200 text-sm ${revealStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                            {audioError}
                        </div>
                    )}

                    <div
                        className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${revealStage >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                            }`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        <button className="btn-primary bg-red-800 hover:bg-red-700 animate-pulse-slow">
                            Enter If You Dare
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 bg-black/70 text-red-500 border border-red-500 py-3 px-6 rounded-lg font-semibold hover:bg-red-900/30 transition-all hover:shadow-glow-red pulse-red z-30"
                            onClick={togglePlay}
                            type="button"
                        >
                            {isPlaying ? (
                                <>
                                    <FiPause size={20} className="animate-pulse-slow" />
                                    Silence The Horror
                                </>
                            ) : (
                                <>
                                    <FiPlay size={20} />
                                    Enable Horror Sounds
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Audio Controls with animation */}
            <div
                className={`absolute bottom-8 right-8 z-30 bg-black/50 border border-red-500 p-3 rounded-full transition-all duration-500 opacity-100 scale-100 hover:shadow-glow-red`}
            >
                <button
                    className="text-red-500 flex items-center justify-center"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute" : "Mute"}
                >
                    {muted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} className="animate-pulse-slow" />}
                </button>
            </div>

            {/* Background Audio - Using the original background-music.mp3 file */}
            <audio
                ref={audioRef}
                src="/audio/background-music.mp3"
                loop
                preload="auto"
                playsInline
                controls
                className="fixed bottom-0 left-0 w-80 z-50"
                style={{ display: audioError ? 'block' : 'none' }}
            />
        </section>
    );
};

export default Hero; 