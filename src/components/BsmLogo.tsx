import React from 'react';

interface BsmLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'image' | 'vector' | 'auto';
}

export const BsmLogo: React.FC<BsmLogoProps> = ({ 
  className = '', 
  size = 'md',
  variant = 'auto'
}) => {
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  const currentSizeClass = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${currentSizeClass} ${className}`}>
      {/* Official Image Asset */}
      <img
        src="/src/assets/images/pt_bsm_logo_1790669775414.jpg"
        alt="Logo Resmi PT Bintang Semesta Motor (BSM)"
        className="w-full h-full object-contain rounded-md drop-shadow-sm"
        onError={(e) => {
          // If image fails, show exact pixel-perfect vector representation
          const target = e.currentTarget;
          target.style.display = 'none';
          const sibling = target.nextElementSibling as HTMLElement;
          if (sibling) sibling.style.display = 'block';
        }}
      />

      {/* High-Definition Scalable Vector Fallback / Alternative */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-sm hidden"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Red Outlined Star */}
        <polygon
          points="50,6 61.2,38.2 95.1,38.2 67.7,58.1 78.2,90.3 50,70.8 21.8,90.3 32.3,58.1 4.9,38.2 38.8,38.2"
          fill="#ffffff"
          stroke="#e00000"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Bold Blue BSM Text */}
        <text
          x="50"
          y="61"
          textAnchor="middle"
          fill="#0044ff"
          fontSize="24"
          fontWeight="900"
          fontFamily="Impact, 'Arial Black', sans-serif"
          letterSpacing="0.5px"
        >
          BSM
        </text>
      </svg>
    </div>
  );
};
