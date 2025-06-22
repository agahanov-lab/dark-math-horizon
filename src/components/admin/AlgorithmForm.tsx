import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/alert-dialog';

interface Algorithm {
  _id?: string;
  title: string;
  description: string;
  githubLink: string;
}

interface AlgorithmFormProps {
  onSubmit: (algorithm: Algorithm) => void;
  algorithms: Algorithm[];
  onDelete: (id: string) => void;
}

const AlgorithmForm = ({ onSubmit, algorithms, onDelete }: AlgorithmFormProps) => {
  const [algorithm, setAlgorithm] = useState<Algorithm>({
    title: '',
    description: '',
    githubLink: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(algorithm);

      // Reset form
      setAlgorithm({
        title: '',
        description: '',
        githubLink: '',
      });
    } catch (error) {
      console.error('Error submitting algorithm:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting algorithm:', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Algorithm Title"
            value={algorithm.title}
            onChange={(e) => setAlgorithm({ ...algorithm, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Algorithm Description"
            value={algorithm.description}
            onChange={(e) => setAlgorithm({ ...algorithm, description: e.target.value })}
            required
          />
        </div>
        <div>
          <Input
            type="url"
            placeholder="GitHub Link"
            value={algorithm.githubLink}
            onChange={(e) => setAlgorithm({ ...algorithm, githubLink: e.target.value })}
            required
          />
        </div>
        <Button type="submit">Add Algorithm</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Algorithms</h3>
        {algorithms.map((a) => (
          <Card key={a._id} className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{a.title}</h4>
                <p className="text-sm text-gray-600">{a.description}</p>
                <a
                  href={a.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  GitHub Link
                </a>
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Algorithm</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{a.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => a._id && handleDelete(a._id)}>Delete</AlertDialogAction>
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

export default AlgorithmForm;
