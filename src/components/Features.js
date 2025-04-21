'use client';

import { useRef, useState, useEffect } from 'react';
import { FiMonitor, FiDownload, FiFilm, FiLayers, FiSpeaker, FiUsers } from 'react-icons/fi';

const features = [
    {
        icon: <FiMonitor size={40} />,
        title: 'Multi-device Access',
        description: 'Stream content seamlessly across all your devices - TV, smartphone, tablet, or computer.'
    },
    {
        icon: <FiDownload size={40} />,
        title: 'Download & Watch Offline',
        description: 'Download your favorite shows and movies to watch offline when you&apos;re on the go.'
    },
    {
        icon: <FiFilm size={40} />,
        title: 'Exclusive Content',
        description: 'Access exclusive original series, movies, and documentaries only available on our platform.'
    },
    {
        icon: <FiLayers size={40} />,
        title: '4K Ultra HD',
        description: 'Experience stunning visual clarity with 4K Ultra HD and HDR content on compatible devices.'
    },
    {
        icon: <FiSpeaker size={40} />,
        title: 'Dolby Atmos',
        description: 'Immerse yourself in three-dimensional sound with Dolby Atmos on supported content.'
    },
    {
        icon: <FiUsers size={40} />,
        title: 'Multiple Profiles',
        description: 'Create up to 5 profiles for different members of your household with personalized recommendations.'
    }
];

const FeatureCard = ({ feature, index, isVisible }) => {
    return (
        <div
            className={`bg-glass rounded-xl p-6 transition-all duration-700 border border-white/10 transform 
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
                hover:shadow-lg hover:shadow-primary/20 hover:scale-105 hover:border-primary/30`}
            style={{ transitionDelay: `${index * 0.1}s` }}
        >
            <div className="text-primary mb-4 transform transition-all duration-300 hover:scale-110 hover:text-accent">
                {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-white">
                {feature.title}
            </h3>
            <p className="text-text-light">
                {feature.description}
            </p>
        </div>
    );
};

const Features = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        // Only run intersection observer on client side
        const observerSetup = () => {
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
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

        const observer = observerSetup();

        return () => {
            if (observer) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <section
            id="features"
            ref={sectionRef}
            className="py-24 relative overflow-hidden"
        >
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/4 right-0 w-60 h-60 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                        Why Choose <span className="text-gradient animate-text-gradient">OTTInfo</span>
                    </h2>
                    <p className="text-lg text-text-light max-w-2xl mx-auto">
                        Our platform offers the best streaming experience with cutting-edge features designed for entertainment lovers.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            feature={feature}
                            index={index}
                            isVisible={isVisible}
                        />
                    ))}
                </div>

                {/* Central glow effect */}
                <div className={`absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-1000 ${isVisible ? 'opacity-40' : 'opacity-0'}`}>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary rounded-full blur-[100px]"></div>
                </div>
            </div>
        </section>
    );
};

export default Features; 