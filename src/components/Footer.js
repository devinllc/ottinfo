import Link from 'next/link';
import Image from 'next/image';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
    return (
        <footer className="bg-background py-16 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    <div>
                        <Link href="/" className="inline-block mb-6">
                            <Image src="/images/logo.png" alt="OTTInfo Logo" width={120} height={48} />
                        </Link>
                        <p className="text-text-light mb-6">
                            Your ultimate streaming destination for premium movies, TV shows, and exclusive content.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-text-light hover:text-primary transition-colors">
                                <FiFacebook size={20} />
                            </a>
                            <a href="#" className="text-text-light hover:text-primary transition-colors">
                                <FiTwitter size={20} />
                            </a>
                            <a href="#" className="text-text-light hover:text-primary transition-colors">
                                <FiInstagram size={20} />
                            </a>
                            <a href="#" className="text-text-light hover:text-primary transition-colors">
                                <FiYoutube size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#about" className="text-text-light hover:text-primary transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Press
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Device Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="text-text-light hover:text-primary transition-colors">
                                    Content Guidelines
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 text-center">
                    <p className="text-text-light text-sm">
                        &copy; {new Date().getFullYear()} OTTInfo. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer; 