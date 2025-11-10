import { motion } from 'framer-motion';

interface KineticTextProps {
  text: string;
  delay?: number;
}

const KineticText = ({ text, delay = 0 }: KineticTextProps) => {
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: delay },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: 'spring' as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-balance"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {words.map((word, index) => (
        <motion.span
          variants={child}
          key={index}
          className="inline-block mr-2"
        >
          {word === 'Kompleks' ? (
            <span className="glitch-text" data-text={word}>
              {word}
            </span>
          ) : word === 'etkileyici' || word === 'dijital' ? (
            <span className="shimmer-text">{word}</span>
          ) : (
            word
          )}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default KineticText;
