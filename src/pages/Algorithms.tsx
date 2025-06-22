import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { usePagination } from '@/hooks/use-pagination';
import { api } from '@/lib/api';

interface Algorithm {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
}

const Algorithms = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [allAlgorithms, setAllAlgorithms] = useState<Algorithm[]>([]);

  useEffect(() => {
    const fetchAlgorithms = async () => {
      try {
        const data = await api.getAlgorithms();
        setAllAlgorithms(data);
      } catch (error) {
        console.error('Error fetching algorithms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAlgorithms();
  }, []);

  const { 
    currentItems: algorithms, 
    currentPage, 
    totalPages, 
    goToPage, 
    nextPage, 
    previousPage,
    canNextPage,
    canPreviousPage 
  } = usePagination<Algorithm>({ 
    items: allAlgorithms, 
    itemsPerPage: 3 
  });

  const renderPaginationLinks = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => goToPage(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-20">
        <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent">
          Featured Algorithms
        </h1>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent">
        Featured Algorithms
      </h1>
      
      {allAlgorithms.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No algorithms available yet.
        </div>
      ) : (
        <>
          <div className="space-y-6 max-w-3xl mx-auto">
            {algorithms.map((algo) => (
              <motion.div
                key={algo._id}
                layoutId={algo._id}
                onClick={() => setExpandedId(expandedId === algo._id ? null : algo._id)}
                className={`glass-effect rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] ${
                  expandedId === algo._id ? 'fixed inset-4 z-50 overflow-y-auto md:inset-20' : ''
                }`}
              >
                <motion.h3
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-math-purple to-accent bg-clip-text text-transparent"
                  layoutId={`title-${algo._id}`}
                >
                  {algo.title}
                </motion.h3>
                
                <AnimatePresence>
                  {expandedId === algo._id ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-lg text-muted-foreground">{algo.description}</p>
                      
                      <div className="mt-6">
                        <a
                          href={algo.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="w-5 h-5" />
                          <span>View on GitHub</span>
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-muted-foreground"
                    >
                      {algo.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination className="mt-12">
              <PaginationContent>
                {canPreviousPage && (
                  <PaginationItem>
                    <PaginationPrevious onClick={previousPage} className="cursor-pointer" />
                  </PaginationItem>
                )}
                
                {renderPaginationLinks()}
                
                {canNextPage && (
                  <PaginationItem>
                    <PaginationNext onClick={nextPage} className="cursor-pointer" />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          )}

          {/* Overlay when a card is expanded */}
          {expandedId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className="fixed inset-0 bg-black/60 z-40"
            />
          )}
        </>
      )}
    </div>
  );
};

export default Algorithms;
