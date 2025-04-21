'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-glass py-2' : 'py-4'
            }`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <Image src="/images/logo.png" alt="OTTInfo Logo" width={150} height={60} priority />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="#features" className="text-white hover:text-blue-400 transition-colors">
                            Features
                        </Link>
                        <Link href="#content" className="text-white hover:text-blue-400 transition-colors">
                            Content
                        </Link>
                        <Link href="#pricing" className="text-white hover:text-blue-400 transition-colors">
                            Pricing
                        </Link>
                        <Link href="#about" className="text-white hover:text-blue-400 transition-colors">
                            About
                        </Link>
                        <button className="btn-primary">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <button
                        className="md:hidden text-white p-2"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation Menu */}
                {isOpen && (
                    <div className="md:hidden bg-glass mt-4 p-4 rounded-lg">
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="#features"
                                className="text-white hover:text-blue-400 transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Features
                            </Link>
                            <Link
                                href="#content"
                                className="text-white hover:text-blue-400 transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Content
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-white hover:text-blue-400 transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                Pricing
                            </Link>
                            <Link
                                href="#about"
                                className="text-white hover:text-blue-400 transition-colors py-2"
                                onClick={() => setIsOpen(false)}
                            >
                                About
                            </Link>
                            <button className="btn-primary mt-2 w-full">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar; 