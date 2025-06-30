import React from 'react';

interface ShapeDividerProps {
  position?: 'top' | 'bottom';
  color?: string;
  height?: string;
  className?: string;
  type?: 'wave' | 'curve' | 'slant' | 'triangle';
}

const ShapeDivider: React.FC<ShapeDividerProps> = ({
  position = 'bottom',
  color = '#fff',
  height = '100px',
  className = '',
  type = 'wave'
}) => {
  const getSvgPath = () => {
    switch (type) {
      case 'wave':
        return position === 'top' 
          ? "M0,0 C150,100 350,0 500,50 C650,100 850,0 1000,50 L1000,0 Z"
          : "M0,100 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,100 Z";
      case 'curve':
        return position === 'top'
          ? "M0,0 Q500,100 1000,0 L1000,0 Z"
          : "M0,100 Q500,0 1000,100 L1000,100 Z";
      case 'slant':
        return position === 'top'
          ? "M0,0 L1000,100 L1000,0 Z"
          : "M0,100 L1000,0 L1000,100 Z";
      case 'triangle':
        return position === 'top'
          ? "M0,0 L500,100 L1000,0 L1000,0 Z"
          : "M0,100 L500,0 L1000,100 L1000,100 Z";
      default:
        return "M0,100 C150,0 350,100 500,50 C650,0 850,100 1000,50 L1000,100 Z";
    }
  };

  const transform = position === 'top' ? 'rotate(180deg)' : 'none';

  return (
    <div 
      className={`absolute left-0 w-full overflow-hidden leading-none ${
        position === 'top' ? 'top-0' : 'bottom-0'
      } ${className}`}
      style={{ height, transform }}
    >
      <svg
        className="relative block w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
      >
        <path
          d={getSvgPath()}
          fill={color}
        />
      </svg>
    </div>
  );
};

export default ShapeDivider;
