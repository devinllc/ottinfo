'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FiChevronRight, FiStar, FiPlay } from 'react-icons/fi';

// Mock data for trending content
const trendingContent = [
    {
        id: 1,
        title: 'Cosmic Odyssey',
        category: 'Sci-Fi Series',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=500&h=300&auto=format&fit=crop',
    },
    {
        id: 2,
        title: 'Mystic Valley',
        category: 'Fantasy Drama',
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=500&h=300&auto=format&fit=crop',
    },
    {
        id: 3,
        title: 'Urban Legends',
        category: 'Thriller',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=500&h=300&auto=format&fit=crop',
    },
    {
        id: 4,
        title: 'Forgotten Kingdom',
        category: 'Historical Drama',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=300&auto=format&fit=crop',
    },
    {
        id: 5,
        title: 'Neon Streets',
        category: 'Cyberpunk Action',
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=500&h=300&auto=format&fit=crop',
    },
    {
        id: 6,
        title: 'Eternal Sunset',
        category: 'Romance',
        rating: 4.4,
        image: 'https://images.unsplash.com/photo-1501426026826-31c667bdf23d?w=500&h=300&auto=format&fit=crop',
    },
];

const ContentCard = ({ content, index }) => {
    return (
        <div
            className="relative group overflow-hidden rounded-xl transform transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
            style={{ animationDelay: `${index * 0.1}s` }}
        >
            <div className="w-full h-48 md:h-64 overflow-hidden relative">
                <Image
                    src={content.image}
                    alt={content.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                        {content.category}
                    </span>
                    <div className="flex items-center ml-auto bg-black/60 text-xs text-yellow-400 px-2 py-1 rounded-md backdrop-blur-sm">
                        <FiStar className="mr-1" />
                        {content.rating}
                    </div>
                </div>
                <h3 className="text-white font-bold text-lg group-hover:text-primary transition-colors">
                    {content.title}
                </h3>
                <div className="mt-3 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <button className="flex items-center gap-2 text-white bg-primary hover:bg-primary/80 rounded-md px-3 py-1.5 text-sm transition-all w-full justify-center">
                        <FiPlay size={16} />
                        <span>Watch Now</span>
                    </button>
                </div>
            </div>
            <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </div>
    );
};

const Content = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Series', 'Movies', 'Documentaries', 'Kids'];
    const [visible, setVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Only run intersection observer on client side
        const setupObserver = () => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observer.disconnect();
                    }
                },
                { threshold: 0.1 }
            );

            if (sectionRef.current) {
                observer.observe(sectionRef.current);
            }

            return observer;
        };

        const observer = setupObserver();

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <section
            id="content"
            ref={sectionRef}
            className="py-24 relative overflow-hidden"
        >
            {/* Background Elements */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/20 rounded-full filter blur-3xl"></div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div
                    className={`flex flex-col md:flex-row md:items-end md:justify-between mb-12 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                            Trending on <span className="text-gradient animate-text-gradient">OTTInfo</span>
                        </h2>
                        <p className="text-lg text-text-light max-w-2xl">
                            Check out what&apos;s popular right now on our platform. From thrilling series to blockbuster movies.
                        </p>
                    </div>

                    <div className="flex mt-6 md:mt-0 overflow-x-auto py-2 md:py-0 -mx-2">
                        {categories.map((category, index) => (
                            <button
                                key={category}
                                className={`px-4 py-2 mx-1 rounded-full transition-all whitespace-nowrap ${activeCategory === category
                                    ? 'bg-primary text-white shadow-glow'
                                    : 'bg-glass hover:bg-white/20 text-white'
                                    }`}
                                onClick={() => setActiveCategory(category)}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {trendingContent.map((content, index) => (
                        <div
                            key={content.id}
                            className={`transition-all duration-1000 ${visible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-20'
                                }`}
                            style={{ transitionDelay: `${index * 0.1 + 0.3}s` }}
                        >
                            <ContentCard content={content} index={index} />
                        </div>
                    ))}
                </div>

                <div
                    className={`mt-12 flex justify-center transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                        }`}
                    style={{ transitionDelay: '0.8s' }}
                >
                    <button className="flex items-center justify-center gap-2 bg-glass hover:bg-white/20 text-white py-3 px-6 rounded-lg font-semibold transition-all border border-white/10 hover:shadow-glow group">
                        <span>Browse All Content</span>
                        <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Content; 