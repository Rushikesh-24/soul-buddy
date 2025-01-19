'use client'
import React, { useEffect, useRef } from 'react';
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import gsap from 'gsap';

const Footer = () => {
  const footerRef = useRef(null);
  const socialIconsRef = useRef<HTMLDivElement>(null);
  const quickLinksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    // Fade in animation for the entire footer
    gsap.from(footerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out"
    });

    // Stagger animation for quick links
    if (quickLinksRef.current) {
      gsap.from(quickLinksRef.current.children, {
        opacity: 0,
        x: -20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      });
    }

    // Bounce animation for social icons
    if (socialIconsRef.current) {
      gsap.from(socialIconsRef.current.children, {
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 1
      });
    }
  }, []);

  return (
    <footer ref={footerRef} className=" text-white py-12 w-full z-40 bg-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {/* Section 1: About */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
            Soul-Buddy
          </h3>
          <p className="text-gray-300 leading-relaxed">
            ✨ Guiding you with the stars—stay connected for cosmic updates! 🌟
            Discover your path through astrology and spiritual guidance.
          </p>
        </div>

        {/* Section 2: Navigation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Quick Links</h3>
          <ul ref={quickLinksRef} className="space-y-3">
            {[
              { href: "/", text: "Home" },
              { href: "/about", text: "About Us" },
              { href: "/services", text: "Services" },
              { href: "/contact", text: "Contact" }
            ].map((link) => (
              <li key={link.text}>
                <a
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="transform group-hover:translate-x-2 transition-transform duration-300">
                    {link.text}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Section 3: Social Media */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Connect With Us</h3>
          <div ref={socialIconsRef} className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              <FaLinkedinIn size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center mt-12 border-t border-gray-700 pt-8 text-sm text-gray-400">
        <p className="max-w-7xl mx-auto px-6">
          © {new Date().getFullYear()} Soul-Buddy. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;