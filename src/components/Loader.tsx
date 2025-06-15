
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
          className="relative w-36 h-36 rounded-full overflow-hidden shadow-2xl mx-auto"
          style={{ backgroundColor: '#1a1a1a' }}
        >
          {/* Outer Camera Ring */}
          <div 
            className="absolute inset-2 rounded-full border-2 opacity-80"
            style={{ 
              borderColor: 'var(--primary-color, #a8997a)',
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
              animation: 'outerGlow 5s ease-in-out infinite reverse',
              boxShadow: '0 0 10px var(--primary-color, #a8997a)'
            }} 
          />
          
          {/* Shutter Mechanism */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg 
              width="90" 
              height="90" 
              viewBox="0 0 100 100" 
              className="transform rotate-90"
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(90deg)' }}
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
                      animation: `irisBlade 3s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite`
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
        <div className="mt-6 text-center">
          <div 
            className="text-2xl font-bold tracking-[0.1em]"
            style={{ 
              fontFamily: 'Impact, sans-serif',
              color: 'var(--text-primary, #2a2a2a)'
            }}
          >
            CAPTURING MOMENTS
          </div>
        </div>
      </div>

      <style>{`
        @keyframes irisBlade {
          0% {
            transform: scale(1.15) rotate(-3deg);
            opacity: 0.8;
          }
          50% {
            transform: scale(0.95) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: scale(1.15) rotate(-3deg);
            opacity: 0.8;
          }
        }

        @keyframes outerGlow {
          0%, 100% { 
            transform: scale(1);
            opacity: 0.2;
          }
          50% { 
            transform: scale(1.05);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default Loader;
