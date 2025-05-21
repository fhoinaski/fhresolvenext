import { motion } from 'framer-motion';

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
}

export function ProjectCard({ id, title, description, image, tags }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      {image ? (
        <div className="h-52 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      ) : (
        <div className="h-52 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center">
          <span className="text-blue-500 dark:text-blue-300 font-medium">Sem imagem</span>
        </div>
      )}
      
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-5 line-clamp-3">{description}</p>
        
        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag: string) => (
            <span 
              key={tag} 
              className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-3 py-1 rounded-full text-xs font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
} 