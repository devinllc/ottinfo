'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiPlay, FiVolume2, FiVolumeX, FiMusic } from 'react-icons/fi';

const Hero = () => {
    const [muted, setMuted] = useState(false);
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [animationComplete, setAnimationComplete] = useState(false);
    const [particles, setParticles] = useState([]);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Generate particles on client-side only to avoid hydration mismatch
        const particlesArray = Array.from({ length: 15 }, () => ({
            size: Math.random() * 20 + 10,
            left: Math.random() * 100,
            top: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 15 + 15
        }));
        setParticles(particlesArray);

        // Start animations, but not audio (we'll wait for user interaction)
        const timer = setTimeout(() => {
            setAnimationComplete(true);
        }, 1000);

        const handleScroll = () => {
            if (audioRef.current && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden && audioRef.current && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };

        const handleBlur = () => {
            if (audioRef.current && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleBlur);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleBlur);
            clearTimeout(timer);
        };
    }, [isPlaying]);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        setHasInteracted(true);
                    })
                    .catch(error => {
                        console.error("Audio playback failed:", error);
                    });
            }
        }
    };

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !muted;
            setMuted(!muted);
        }
    };

    return (
        <section className="relative h-screen flex items-center overflow-hidden">
            {/* Animated background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-purple-900 to-pink-800 animate-gradient-xy z-0"></div>

            {/* Particle effects - client-side only */}
            <div className="absolute inset-0 z-0 opacity-30">
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

            {/* Background Image with animation */}
            <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out ${animationComplete ? 'opacity-60' : 'opacity-0'}`}>
                <Image
                    src="/images/hero-bg.jpg"
                    alt="OTT Platform"
                    fill
                    priority
                    quality={100}
                    className="object-cover scale-110 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-purple-900/50"></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="max-w-3xl mx-auto md:mx-0">
                    <h1 className={`text-4xl md:text-6xl font-bold mb-4 text-white transition-all duration-1000 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Your Ultimate <span className="text-gradient animate-text-gradient">Entertainment</span> Experience
                    </h1>
                    <p className={`text-lg md:text-xl text-text-light mb-8 transition-all duration-1000 delay-300 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        Stream unlimited movies, TV shows, and exclusive content with stunning quality and seamless experience.
                        Available on all your devices, anytime, anywhere.
                    </p>
                    <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-500 ${animationComplete ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <button className="btn-primary animate-pulse-slow">
                            Start Free Trial
                        </button>
                        <button
                            className="flex items-center justify-center gap-2 bg-white text-blue-900 py-3 px-6 rounded-lg font-semibold hover:bg-blue-50 transition-all hover:shadow-glow"
                            onClick={togglePlay}
                        >
                            <FiPlay size={20} className={isPlaying ? 'animate-spin-slow' : ''} />
                            {isPlaying ? 'Pause Audio' : 'Play Audio'}
                        </button>
                    </div>
                </div>
            </div>

            {/* Music Start Prompt - shows when animation is complete but audio hasn't been started yet */}
            {!hasInteracted && animationComplete && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 animate-bounce-slow">
                    <button
                        onClick={togglePlay}
                        className="flex items-center justify-center bg-primary text-white p-5 rounded-full shadow-lg shadow-purple-500/30 hover:bg-primary/80 transition-all duration-300 hover:scale-110"
                        aria-label="Play Background Music"
                    >
                        <FiMusic size={32} />
                    </button>
                </div>
            )}

            {/* Audio Controls with animation */}
            <div className={`absolute bottom-8 right-8 z-20 bg-glass p-3 rounded-full transition-all duration-500 ${isPlaying ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} hover:shadow-glow`}>
                <button
                    className="text-white flex items-center justify-center"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute" : "Mute"}
                >
                    {muted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} className="animate-pulse-slow" />}
                </button>
            </div>

            {/* Background Audio */}
            <audio
                ref={audioRef}
                src="/audio/background-music.mp3"
                loop
                muted={muted}
                preload="auto"
            />
        </section>
    );
};

export default Hero; 