import { useState, useEffect } from 'react';
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

interface Project {
  _id: string;
  title: string;
  description: string;
  githubLink: string;
}

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allProjects, setAllProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setAllProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const { 
    currentItems: projects, 
    currentPage, 
    totalPages, 
    goToPage, 
    nextPage, 
    previousPage,
    canNextPage,
    canPreviousPage 
  } = usePagination<Project>({ 
    items: allProjects, 
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
          Projects
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
        Projects
      </h1>
      
      {allProjects.length === 0 ? (
        <div className="text-center text-muted-foreground py-12">
          No projects available yet.
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div 
                key={project._id}
                className="glass-effect rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-4">
                  <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {project.description}
                  </p>
                </div>
                
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors"
                  >
                    <Github className="w-5 h-5" />
                    <span>View on GitHub</span>
                  </a>
                )}
              </div>
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
        </>
      )}
    </div>
  );
};

export default Projects;
