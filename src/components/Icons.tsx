import React from 'react';
import type { TenseKey, PersonKey } from '../types/spanish';

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// 1. Tense / Aspect Icons

// Ongoing past (Imperfect): Circular/loop arrow representing continuous repetition
export const OngoingPastIcon: React.FC<IconProps> = ({ className = '', size = 26, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);

// One-time past (Preterite): Left arrow into a solid dot
export const OneTimePastIcon: React.FC<IconProps> = ({ className = '', size = 26, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 12H5" />
    <path d="M10 17l-5-5 5-5" />
    <circle cx="19" cy="12" r="2" fill={color} />
  </svg>
);

// Present: Central point / marker with vertical indicator
export const PresentIcon: React.FC<IconProps> = ({ className = '', size = 26, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="3" fill={color} />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
  </svg>
);

// Future: Right arrow forward
export const FutureIcon: React.FC<IconProps> = ({ className = '', size = 26, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M14 7l5 5-5 5" />
  </svg>
);

// Helper for Tense Icon rendering
export const TenseIcon: React.FC<{ tenseKey: TenseKey; className?: string; size?: number }> = ({
  tenseKey,
  className,
  size = 26,
}) => {
  switch (tenseKey) {
    case 'preterito_imperfecto':
      return <OngoingPastIcon className={className} size={size} />;
    case 'preterito_indefinido':
      return <OneTimePastIcon className={className} size={size} />;
    case 'presente':
      return <PresentIcon className={className} size={size} />;
    case 'futuro_simple':
      return <FutureIcon className={className} size={size} />;
  }
};

// 2. Subject Person Icons

// Yo (Me / I): SOLID PERSON (solid head AND solid body)
export const YoIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Solid Head */}
    <circle cx="12" cy="7" r="4" fill={color} />
    {/* Solid Body */}
    <path d="M5.5 21a6.5 6.5 0 0 1 13 0Z" fill={color} />
  </svg>
);

// Tú (You): Outline person with LARGE, PROMINENT pointing arrow caret
export const TuIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="9" cy="7" r="3.5" />
    <path d="M3 21v-1.5a4.5 4.5 0 0 1 9 0V21" />
    {/* Large, prominent pointing arrow caret */}
    <path d="M15 12h7" strokeWidth="2.5" />
    <path d="M18 7.5l4.5 4.5-4.5 4.5" strokeWidth="2.5" fill="none" />
  </svg>
);

// Él / Ella / Usted (Him / Her / You formal): Single neutral outline person
export const ElEllaIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="7" r="3.5" />
    <path d="M6 21v-1.5a4.5 4.5 0 0 1 12 0V21" />
  </svg>
);

// Nosotros (Us / We): Group containing 'me' (SOLID head + SOLID body for 'me') and outline second person
export const NosotrosIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
  >
    {/* Front 'Me' Person - Solid head and solid body */}
    <circle cx="8" cy="7" r="3.5" fill={color} />
    <path d="M2.5 21a5.5 5.5 0 0 1 11 0Z" fill={color} />

    {/* Secondary Person - Outline */}
    <circle cx="17.5" cy="8" r="2.5" stroke={color} strokeWidth="1.8" />
    <path d="M14.5 21v-1a3.5 3.5 0 0 1 6 0V21" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Vosotros / Ustedes (You all): 2-3 outline persons WITH LARGE, PROMINENT pointing arrow caret
export const VosotrosIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Group outlined */}
    <circle cx="8" cy="6.5" r="2.2" />
    <path d="M4.5 21v-1.5a3.5 3.5 0 0 1 7 0V21" />
    <circle cx="3" cy="9" r="1.8" />
    <path d="M0.5 21v-1a2.8 2.8 0 0 1 4-2.2" />

    {/* Large, prominent pointing arrow caret */}
    <path d="M13 12h8" strokeWidth="2.5" />
    <path d="M17 7.5l4.5 4.5-4.5 4.5" strokeWidth="2.5" fill="none" />
  </svg>
);

// Ellos / Ellas (Them): 3 outline persons grouped
export const EllosIcon: React.FC<IconProps> = ({ className = '', size = 24, color = 'currentColor' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="6.5" r="2.5" />
    <path d="M8 21v-1.5a4 4 0 0 1 8 0V21" />
    <circle cx="4.5" cy="9.5" r="2" />
    <path d="M1 21v-1a3 3 0 0 1 4.5-2.5" />
    <circle cx="19.5" cy="9.5" r="2" />
    <path d="M23 21v-1a3 3 0 0 0-4.5-2.5" />
  </svg>
);

// Helper for Person Icon rendering
export const PersonIcon: React.FC<{ personKey: PersonKey; className?: string; size?: number }> = ({
  personKey,
  className,
  size = 24,
}) => {
  switch (personKey) {
    case 'yo':
      return <YoIcon className={className} size={size} />;
    case 'tu':
      return <TuIcon className={className} size={size} />;
    case 'el_ella_usted':
      return <ElEllaIcon className={className} size={size} />;
    case 'nosotros':
      return <NosotrosIcon className={className} size={size} />;
    case 'vosotros_ustedes':
      return <VosotrosIcon className={className} size={size} />;
    case 'ellos_ellas':
      return <EllosIcon className={className} size={size} />;
  }
};
