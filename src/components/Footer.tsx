
import React from 'react';
import { Instagram, Phone, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="text-center space-y-6">
          {/* Logo and Tagline */}
          <div className="space-y-3">
            <img
              src="https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984661/events/importants/header/prit-logo.png"
              alt="Prit Photo Logo"
              className="h-24 w-24 object-contain mx-auto"
            />
            <h3 className="text-xl font-serif font-bold text-foreground">
              #AJourneyOfLoveByPritPhoto
            </h3>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center space-x-3">
            <a
              href="https://instagram.com/prit_digital_photo"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-accent hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-colors duration-200 rounded-xl border border-border"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/917285072603"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-accent hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-colors duration-200 rounded-xl border border-border"
              aria-label="Contact us on WhatsApp"
            >
              <Phone className="w-4 h-4" />
            </a>
            <a
              href="mailto:info@pritdigitalstudio.com"
              className="w-10 h-10 bg-accent hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-colors duration-200 rounded-xl border border-border"
              aria-label="Send us an email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="w-10 h-10 bg-accent hover:bg-primary flex items-center justify-center text-primary hover:text-white transition-colors duration-200 rounded-xl border border-border"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

          {/* Bottom Section */}
          <div className="pt-4 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 text-sm text-muted-foreground">
              <div>© {currentYear} Prit Photo. All rights reserved.</div>
              <div>Designed with <span className="text-primary">♥</span> for capturing love stories</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
