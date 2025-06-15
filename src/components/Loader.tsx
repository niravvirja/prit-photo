
import React from 'react';

const Loader = () => {
  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50" 
      style={{ backgroundColor: 'var(--background-color, #fefefe)' }}
    >
      <div className="relative">
        {/* Camera Body */}
        <div 
          className="relative w-48 h-48 rounded-full overflow-hidden shadow-2xl mx-auto animate-scale-in"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          {/* Outer Camera Ring */}
          <div 
            className="absolute inset-2 rounded-full border-2"
            style={{ 
              borderColor: 'var(--primary-color, #a8997a)',
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
              animation: 'outerGlow 3s ease-in-out infinite alternate',
              boxShadow: '0 0 15px var(--primary-color, #a8997a)'
            }} 
          />
          
          {/* Shutter Mechanism */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              width="120" 
              height="120" 
              viewBox="0 0 100 100" 
              className="transform"
              style={{
                position: 'absolute', top: '50%', left: '50%',
                animation: 'spin 20s linear infinite reverse',
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Background Container Ring */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="url(#containerGradient)"
                style={{
                  filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.4))'
                }}
              />
              
              {/* Gradient Definition for Container Ring */}
              <defs>
                <linearGradient id="containerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2a2a2a' }} />
                  <stop offset="50%" style={{ stopColor: '#1a1a1a' }} />
                  <stop offset="100%" style={{ stopColor: '#0a0a0a' }} />
                </linearGradient>
              </defs>
              
              {/* Iris Blades */}
              {[...Array(8)].map((_, i) => {
                const angle = i * (360 / 8);
                return (
                  <path
                    key={i}
                    d={`
                      M 50 50
                      L ${50 + 38 * Math.cos((angle - 20) * Math.PI / 180)} 
                      ${50 + 38 * Math.sin((angle - 20) * Math.PI / 180)}
                      A 38 38 0 0 1 
                      ${50 + 38 * Math.cos((angle + 20) * Math.PI / 180)} 
                      ${50 + 38 * Math.sin((angle + 20) * Math.PI / 180)}
                      Z
                    `}
                    fill="url(#bladeGradient)"
                    className="iris-blade"
                    style={{
                      transformOrigin: '50px 50px',
                      animation: `irisBlade 2.5s cubic-bezier(0.77, 0, 0.18, 1) infinite`
                    }}
                  />
                );
              })}
              
              {/* Gradient Definition for Blades */}
              <defs>
                <linearGradient id="bladeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#4a4a4a' }} />
                  <stop offset="20%" style={{ stopColor: 'var(--primary-color, #a8997a)' }} />
                  <stop offset="80%" style={{ stopColor: '#3a3a3a' }} />
                  <stop offset="100%" style={{ stopColor: '#1a1a1a' }} />
                </linearGradient>
              </defs>
              
              {/* Inner Lens Ring */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="url(#ringGradient)"
                strokeWidth="2"
                style={{
                  filter: 'drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5))'
                }}
              />
              
              {/* Gradient Definition for Inner Lens Ring */}
              <defs>
                <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#2a2a2a' }} />
                  <stop offset="50%" style={{ stopColor: '#1a1a1a' }} />
                  <stop offset="100%" style={{ stopColor: '#0a0a0a' }} />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* Text */}
        <div 
          className="mt-8 text-center"
          style={{ animation: 'text-fade-in 2s ease-out 0.5s forwards', opacity: 0 }}
        >
          <div 
            className="font-outfit text-xl sm:text-2xl lg:text-3xl tracking-wider"
            style={{ 
              color: 'var(--text-primary, #2a2a2a)',
              textShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            UnfoldingTheWorldOf<span className="text-primary font-semibold">PritPhoto</span>
          </div>
        </div>
      </div>

      <style>{`
        @font-face {
          font-family: 'Top Luxury';
          src: url('/fonts/top-luxury/TOPLUXURY.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }

        @font-face {
          font-family: 'Grafies';
          src: url('/fonts/grafies/Grafies.otf') format('opentype');
          font-weight: normal;
          font-style: normal;
        }

        @keyframes irisBlade {
          0%, 100% {
            transform: scale(1.1) rotate(5deg) translateZ(0);
            opacity: 0.8;
          }
          50% {
            transform: scale(0.85) rotate(-5deg) translateZ(0);
            opacity: 1;
          }
        }

        @keyframes outerGlow {
          0% { 
            transform: scale(1.0);
            opacity: 0.8;
          }
          100% { 
            transform: scale(1.05);
            opacity: 1;
          }
        }

        @keyframes spin {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes text-fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
