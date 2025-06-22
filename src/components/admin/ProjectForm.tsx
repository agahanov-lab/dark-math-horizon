import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface Project {
  _id?: string;
  title: string;
  description: string;
  githubLink: string;
}

interface ProjectFormProps {
  onSubmit: (project: Project) => void;
  projects: Project[];
  onDelete: (id: string) => void;
}

const ProjectForm = ({ onSubmit, projects, onDelete }: ProjectFormProps) => {
  const [project, setProject] = useState<Project>({
    title: '',
    description: '',
    githubLink: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(project);
      
      // Reset form
      setProject({
        title: '',
        description: '',
        githubLink: '',
      });
    } catch (error) {
      console.error('Error submitting project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Project Title"
            value={project.title}
            onChange={(e) => setProject({ ...project, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => setProject({ ...project, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Input
            type="url"
            placeholder="GitHub Link"
            value={project.githubLink}
            onChange={(e) => setProject({ ...project, githubLink: e.target.value })}
            required
          />
        </div>
        <Button type="submit">Add Project</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Projects</h3>
        {projects.map((p) => (
          <Card key={p._id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{p.title}</h4>
                <p className="text-sm text-gray-600">{p.description}</p>
                <a href={p.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                  GitHub Link
                </a>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Project</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{p.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => p._id && handleDelete(p._id)}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProjectForm;
