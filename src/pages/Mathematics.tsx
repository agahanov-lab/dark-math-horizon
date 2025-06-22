import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

interface MathTopic {
  _id: string;
  title: string;
  description: string;
  equations: string[];
  applications: string[];
}

const Mathematics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [allTopics, setAllTopics] = useState<MathTopic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await api.getMathTopics();
        setAllTopics(data);
      } catch (error) {
        console.error('Error fetching math topics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const { 
    currentItems: topics, 
    currentPage, 
    totalPages, 
    goToPage, 
    nextPage, 
    previousPage,
    canNextPage,
    canPreviousPage 
  } = usePagination<MathTopic>({ 
    items: allTopics, 
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
          Mathematics
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
        Mathematics
      </h1>
      
      {allTopics.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No mathematics topics available yet.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topics.map((topic) => (
              <motion.div
                key={topic._id}
                layoutId={topic._id}
                onClick={() => setExpandedId(expandedId === topic._id ? null : topic._id)}
                className={`glass-effect rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 ${
                  expandedId === topic._id ? 'fixed inset-4 md:inset-20 z-50 overflow-y-auto' : ''
                }`}
              >
                <motion.h3
                  className="text-2xl font-bold mb-3 bg-gradient-to-r from-math-purple to-accent bg-clip-text text-transparent"
                  layoutId={`title-${topic._id}`}
                >
                  {topic.title}
                </motion.h3>
                
                <AnimatePresence>
                  {expandedId === topic._id ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-4"
                    >
                      <p className="text-lg text-muted-foreground">{topic.description}</p>
                      
                      <div className="mt-6">
                        <h4 className="text-xl font-semibold mb-3">Key Equations</h4>
                        <div className="space-y-2">
                          {topic.equations.map((eq, index) => (
                            <div key={index} className="p-3 bg-background/50 rounded-lg font-mono">
                              {eq}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-xl font-semibold mb-3">Applications</h4>
                        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                          {topic.applications.map((app, index) => (
                            <li key={index}>{app}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.p className="text-muted-foreground">
                      {topic.description}
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

export default Mathematics;
