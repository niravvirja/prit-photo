import React, { useState, useEffect } from 'react';
import { Menu, X, Instagram, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('hero');
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkTheme ? 'dark' : 'light');
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'portfolio', 'services', 'testimonials', 'contact'];
      let activeSectionId = 'hero';
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element && element.getBoundingClientRect().top <= 100 && element.getBoundingClientRect().bottom >= 0) {
          activeSectionId = sectionId;
        }
      }
      setCurrentSection(activeSectionId);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleEventsClick = () => {
    navigate('/events');
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Home', href: 'hero', type: 'scroll' },
    { label: 'About', href: 'about', type: 'scroll' },
    { label: 'Portfolio', href: 'portfolio', type: 'scroll' },
    { label: 'Services', href: 'services', type: 'scroll' },
    { label: 'Events', href: '/events', type: 'navigate' },
    { label: 'Reviews', href: 'testimonials', type: 'scroll' },
    { label: 'Contact', href: 'contact', type: 'scroll' },
  ];

  const handleNavClick = (item) => {
    item.type === 'navigate' ? handleEventsClick() : scrollToSection(item.href);
  };

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const darkSections = ['portfolio', 'testimonials'];
  const shouldUsePrimaryBg = darkSections.includes(currentSection);
  const logoSrc = 'https://res.cloudinary.com/dmo0bmu3c/image/upload/v1749984661/events/importants/header/prit-logo.png';
  const logoFilter = shouldUsePrimaryBg ? (isDarkTheme ? 'brightness(0)' : 'brightness(0) invert(1)') : 'none';

  return (
    <header className="fixed top-2 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between h-20 shadow-2xl rounded-2xl px-5 backdrop-blur-md border border-border/20 transition-all duration-300 ${
            shouldUsePrimaryBg ? 'bg-primary text-primary-foreground' : 'bg-background text-foreground'
          }`}
        >
          {/* Left Section - Logo */}
          <div className="flex items-center">
            <img
              src={logoSrc}
              alt="Prit Digital Studio Logo"
              className="h-10 sm:h-10 md:h-12 lg:h-14 xl:h-14 w-auto object-contain"
              style={{ filter: logoFilter }}
            />
          </div>

          {/* Center Section - Navigation */}
          <nav className="hidden xl:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`text-base px-4 py-2 rounded-xl font-medium transition-colors duration-200 ${
                  shouldUsePrimaryBg
                    ? 'text-primary-foreground hover:bg-primary-foreground/20'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Section - Icons */}
          <div className="hidden xl:flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://instagram.com/prit_digital_photo', '_blank')}
              className={`p-2 rounded-xl ${
                shouldUsePrimaryBg
                  ? 'text-primary-foreground hover:bg-primary-foreground/20'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Instagram className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`p-2 rounded-xl ${
                shouldUsePrimaryBg
                  ? 'text-primary-foreground hover:bg-primary-foreground/20'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              className={`px-4 py-2 text-base rounded-2xl font-medium transition-colors duration-300 ${
                shouldUsePrimaryBg
                  ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              Book Session
            </Button>
          </div>

          {/* Mobile Section */}
          <div className="xl:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://instagram.com/prit_digital_photo', '_blank')}
              className={`p-2 rounded-xl ${
                shouldUsePrimaryBg
                  ? 'text-primary-foreground hover:bg-primary-foreground/20'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              <Instagram className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className={`p-2 rounded-xl ${
                shouldUsePrimaryBg
                  ? 'text-primary-foreground hover:bg-primary-foreground/20'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {isDarkTheme ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className={`p-2 rounded-xl ${
                shouldUsePrimaryBg
                  ? 'text-primary-foreground hover:bg-primary-foreground/20'
                  : 'text-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMenuOpen && (
        <div
          className={`xl:hidden fixed left-4 right-4 top-[88px] z-40 shadow-2xl rounded-2xl border p-4 mt-2 backdrop-blur-md transition-all duration-300 ${
            shouldUsePrimaryBg
              ? 'bg-primary/95 border-primary-foreground/20'
              : 'bg-background/95 border-border'
          }`}
        >
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className={`text-center py-3 text-base border-b last:border-b-0 w-full rounded-xl font-medium transition-colors ${
                  shouldUsePrimaryBg
                    ? 'text-primary-foreground hover:bg-primary-foreground/20 border-primary-foreground/20'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground border-border'
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <Button
                onClick={() => {
                  scrollToSection('contact');
                  setIsMenuOpen(false);
                }}
                className={`w-full py-3 text-base rounded-full font-medium transition-colors duration-300 ${
                  shouldUsePrimaryBg
                    ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                Book Session
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;