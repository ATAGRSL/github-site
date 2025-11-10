import type { ReactElement } from 'react';
import {
  SiOpenjdk,
  SiPhp,
  SiJavascript,
  SiTypescript,
  SiMysql,
  SiHtml5,
  SiCss3,
  SiPython,
  SiSharp,
  SiOracle,
  SiSpring,
  SiMagento,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiVuedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiDocker,
  SiGit,
  SiJira,
  SiGithubactions,
  SiAmazon,
  SiGraphql,
  SiDelphi,
  SiRaspberrypi,
} from 'react-icons/si';
import { FaCode, FaServer, FaLock, FaCubes, FaCheckCircle, FaBroom, FaRunning, FaBrain, FaUsers, FaSyncAlt, FaBook } from 'react-icons/fa';

interface TechIconProps {
  name: string;
  className?: string;
}

const TechIcon = ({ name, className = 'w-5 h-5' }: TechIconProps): ReactElement => {
  const iconMap: Record<string, ReactElement> = {
    'Java': <SiOpenjdk className={className} />,
    'PHP': <SiPhp className={className} />,
    'JavaScript': <SiJavascript className={className} />,
    'TypeScript': <SiTypescript className={className} />,
    'SQL': <SiMysql className={className} />,
    'HTML': <SiHtml5 className={className} />,
    'CSS': <SiCss3 className={className} />,
    'Python': <SiPython className={className} />,
    'C#': <SiSharp className={className} />,
    'PL/SQL': <SiOracle className={className} />,
    'Spring Boot': <SiSpring className={className} />,
    'Magento': <SiMagento className={className} />,
    'React': <SiReact className={className} />,
    'Node.js': <SiNodedotjs className={className} />,
    'Express.js': <SiExpress className={className} />,
    'Vue.js': <SiVuedotjs className={className} />,
    'TailwindCSS': <SiTailwindcss className={className} />,
    'PostgreSQL': <SiPostgresql className={className} />,
    'MySQL': <SiMysql className={className} />,
    'MongoDB': <SiMongodb className={className} />,
    'Redis': <SiRedis className={className} />,
    'Docker': <SiDocker className={className} />,
    'Git': <SiGit className={className} />,
    'Jira': <SiJira className={className} />,
    'CI/CD': <SiGithubactions className={className} />,
    'AWS': <SiAmazon className={className} />,
    'Azure': <FaServer className={`${className} text-blue-500`} />,
    'GraphQL': <SiGraphql className={className} />,
    'Delphi': <SiDelphi className={className} />,
    'Raspberry Pi': <SiRaspberrypi className={className} />,
    'RESTful API': <FaServer className={className} />,
    'Web Services': <FaCode className={className} />,
    'JWT Authentication': <FaLock className={className} />,
    'Microservices': <FaCubes className={className} />,
    'Unit Testing': <FaCheckCircle className={className} />,
    'Clean Code': <FaBroom className={className} />,
    'Agile': <FaRunning className={className} />,
    'Problem Solving': <FaBrain className={className} />,
    'Teamwork': <FaUsers className={className} />,
    'Adaptability': <FaSyncAlt className={className} />,
    'Continuous Learning': <FaBook className={className} />,
  };

  return iconMap[name] || <span className={className}>•</span>;
};

export default TechIcon;
