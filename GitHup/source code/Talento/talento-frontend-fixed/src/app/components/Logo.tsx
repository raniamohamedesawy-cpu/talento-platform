import React from 'react';

interface LogoProps {
  variant?: 'icon' | 'full' | 'navbar' | 'footer' | 'favicon';
  theme?: 'dark' | 'light';
  className?: string;
}

export function Logo({ variant = 'full', theme = 'dark', className = '' }: LogoProps) {
  // Brand colors
  const colors = theme === 'dark'
    ? {
        primary: '#F5A060',
        light: '#FFD4A8',
        mid: '#D4875A',
        dark: '#C07040',
        text: '#FFFFFF'
      }
    : {
        primary: '#D47038',
        light: '#F0A870',
        mid: '#A8582A',
        dark: '#C07040',
        text: '#1A0E00'
      };

  // Icon-only version (48x48)
  const IconLogo = () => (
    <svg
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="glow-icon" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      <line x1="24" y1="19" x2="24" y2="7" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="13" y2="13" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="35" y2="13" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="11" y2="22" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="37" y2="22" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="16" y2="30" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="24" y1="19" x2="32" y2="30" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="24" y1="19" x2="24" y2="34" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      {theme === 'dark' && (
        <>
          <line x1="16" y1="30" x2="8" y2="34" stroke={colors.primary} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
          <line x1="32" y1="30" x2="40" y2="34" stroke={colors.primary} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        </>
      )}

      {/* Network nodes */}
      <circle cx="24" cy="7" r="2.5" fill={colors.primary} filter="url(#glow-icon)"/>
      <circle cx="13" cy="13" r="2.2" fill={colors.primary} filter="url(#glow-icon)"/>
      <circle cx="35" cy="13" r="2.2" fill={colors.primary} filter="url(#glow-icon)"/>
      <circle cx="11" cy="22" r="2.2" fill={colors.primary} filter="url(#glow-icon)"/>
      <circle cx="37" cy="22" r="2.2" fill={colors.primary} filter="url(#glow-icon)"/>
      <circle cx="16" cy="30" r="2.2" fill={colors.mid} filter="url(#glow-icon)"/>
      <circle cx="32" cy="30" r="2.2" fill={colors.mid} filter="url(#glow-icon)"/>
      <circle cx="24" cy="34" r="2.2" fill={colors.mid} filter="url(#glow-icon)"/>
      {theme === 'dark' && (
        <>
          <circle cx="8" cy="34" r="1.8" fill={colors.dark} opacity="0.8"/>
          <circle cx="40" cy="34" r="1.8" fill={colors.dark} opacity="0.8"/>
        </>
      )}
      <circle cx="24" cy="19" r="4.5" fill={colors.primary} filter="url(#glow-icon)"/>
      <circle cx="24" cy="19" r="2.8" fill={colors.light}/>
    </svg>
  );

  // Full logo with text (220x48)
  const FullLogo = () => (
    <svg
      viewBox="0 0 220 48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <filter id="glow-full" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="1.2" result="b"/>
          <feMerge>
            <feMergeNode in="b"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Connection lines */}
      <line x1="24" y1="19" x2="24" y2="7" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="13" y2="13" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="35" y2="13" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="11" y2="22" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="37" y2="22" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.85"/>
      <line x1="24" y1="19" x2="16" y2="30" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="24" y1="19" x2="32" y2="30" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      <line x1="24" y1="19" x2="24" y2="34" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>

      {/* Network nodes */}
      <circle cx="24" cy="7" r="2.5" fill={colors.primary} filter="url(#glow-full)"/>
      <circle cx="13" cy="13" r="2.2" fill={colors.primary} filter="url(#glow-full)"/>
      <circle cx="35" cy="13" r="2.2" fill={colors.primary} filter="url(#glow-full)"/>
      <circle cx="11" cy="22" r="2.2" fill={colors.primary} filter="url(#glow-full)"/>
      <circle cx="37" cy="22" r="2.2" fill={colors.primary} filter="url(#glow-full)"/>
      <circle cx="16" cy="30" r="2.2" fill={colors.mid} filter="url(#glow-full)"/>
      <circle cx="32" cy="30" r="2.2" fill={colors.mid} filter="url(#glow-full)"/>
      <circle cx="24" cy="34" r="2.2" fill={colors.mid} filter="url(#glow-full)"/>
      <circle cx="24" cy="19" r="4.5" fill={colors.primary} filter="url(#glow-full)"/>
      <circle cx="24" cy="19" r="2.8" fill={colors.light}/>

      {/* Talento text */}
      <text
        x="56"
        y="30"
        fontFamily="'Tenor Sans', Georgia, serif"
        fontSize="22"
        fontWeight="400"
        letterSpacing="1.5"
        fill={colors.text}
        opacity={theme === 'dark' ? '0.95' : '0.9'}
      >
        Talento
      </text>
    </svg>
  );

  // Navbar version (same as full, sized at h-8/32px via className)
  const NavbarLogo = () => <FullLogo />;

  // Footer version (reduced opacity)
  const FooterLogo = () => (
    <div style={{ opacity: 0.4 }}>
      <FullLogo />
    </div>
  );

  // Favicon version (32x32 with background)
  const FaviconLogo = () => (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="7" fill="#0D1F35"/>
      <line x1="16" y1="13" x2="16" y2="5" stroke="#F5A060" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
      <line x1="16" y1="13" x2="8" y2="10" stroke="#F5A060" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
      <line x1="16" y1="13" x2="24" y2="10" stroke="#F5A060" strokeWidth="1.2" strokeLinecap="round" opacity="0.9"/>
      <line x1="16" y1="13" x2="9" y2="18" stroke="#F5A060" strokeWidth="1.2" strokeLinecap="round" opacity="0.75"/>
      <line x1="16" y1="13" x2="23" y2="18" stroke="#F5A060" strokeWidth="1.2" strokeLinecap="round" opacity="0.75"/>
      <line x1="16" y1="13" x2="16" y2="24" stroke="#F5A060" strokeWidth="1.2" strokeLinecap="round" opacity="0.65"/>
      <circle cx="16" cy="5" r="1.8" fill="#F5A060"/>
      <circle cx="8" cy="10" r="1.6" fill="#F5A060"/>
      <circle cx="24" cy="10" r="1.6" fill="#F5A060"/>
      <circle cx="9" cy="18" r="1.5" fill="#D4875A"/>
      <circle cx="23" cy="18" r="1.5" fill="#D4875A"/>
      <circle cx="16" cy="24" r="1.5" fill="#D4875A"/>
      <circle cx="16" cy="13" r="3" fill="#F5A060"/>
      <circle cx="16" cy="13" r="1.8" fill="#FFD4A8"/>
    </svg>
  );

  if (variant === 'icon') {
    return <IconLogo />;
  }

  if (variant === 'navbar') {
    return <NavbarLogo />;
  }

  if (variant === 'footer') {
    return <FooterLogo />;
  }

  if (variant === 'favicon') {
    return <FaviconLogo />;
  }

  return <FullLogo />;
}
