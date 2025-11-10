import type { ReactNode } from 'react';
import Tilt from 'react-parallax-tilt';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  tiltMaxAngleX?: number;
  tiltMaxAngleY?: number;
}

const TiltCard = ({ 
  children, 
  className = '', 
  scale = 1.05,
  tiltMaxAngleX = 10,
  tiltMaxAngleY = 10
}: TiltCardProps) => {
  return (
    <Tilt
      scale={scale}
      tiltMaxAngleX={tiltMaxAngleX}
      tiltMaxAngleY={tiltMaxAngleY}
      transitionSpeed={400}
      glareEnable={true}
      glareMaxOpacity={0.15}
      glareColor="#14b8a6"
      glarePosition="all"
      className={className}
    >
      {children}
    </Tilt>
  );
};

export default TiltCard;
