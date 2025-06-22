import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card } from '../ui/card';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface MathTopic {
  _id?: string;
  title: string;
  description: string;
  equations: string[];
  applications: string[];
}

interface MathTopicFormProps {
  onSubmit: (topic: MathTopic) => void;
  topics: MathTopic[];
  onDelete: (id: string) => void;
}

const MathTopicForm = ({ onSubmit, topics, onDelete }: MathTopicFormProps) => {
  const [topic, setTopic] = useState<MathTopic>({
    title: '',
    description: '',
    equations: [''],
    applications: [''],
  });

  const handleEquationChange = (index: number, value: string) => {
    const newEquations = [...topic.equations];
    newEquations[index] = value;
    setTopic({ ...topic, equations: newEquations });
  };

  const handleApplicationChange = (index: number, value: string) => {
    const newApplications = [...topic.applications];
    newApplications[index] = value;
    setTopic({ ...topic, applications: newApplications });
  };

  const addEquation = () => {
    setTopic({ ...topic, equations: [...topic.equations, ''] });
  };

  const addApplication = () => {
    setTopic({ ...topic, applications: [...topic.applications, ''] });
  };

  const removeEquation = (index: number) => {
    const newEquations = topic.equations.filter((_, i) => i !== index);
    setTopic({ ...topic, equations: newEquations });
  };

  const removeApplication = (index: number) => {
    const newApplications = topic.applications.filter((_, i) => i !== index);
    setTopic({ ...topic, applications: newApplications });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Filter out empty equations and applications
      const filteredTopic = {
        ...topic,
        equations: topic.equations.filter(eq => eq.trim() !== ''),
        applications: topic.applications.filter(app => app.trim() !== ''),
      };
      await onSubmit(filteredTopic);
      
      // Reset form
      setTopic({
        title: '',
        description: '',
        equations: [''],
        applications: [''],
      });
    } catch (error) {
      console.error('Error submitting math topic:', error);
      alert('Failed to submit math topic. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await onDelete(id);
    } catch (error) {
      console.error('Error deleting math topic:', error);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            placeholder="Topic Title"
            value={topic.title}
            onChange={(e) => setTopic({ ...topic, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Textarea
            placeholder="Topic Description"
            value={topic.description}
            onChange={(e) => setTopic({ ...topic, description: e.target.value })}
            required
          />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Equations</h4>
          {topic.equations.map((equation, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="text"
                placeholder="Equation"
                value={equation}
                onChange={(e) => handleEquationChange(index, e.target.value)}
                required
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => removeEquation(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addEquation}>
            Add Equation
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Applications</h4>
          {topic.applications.map((application, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="text"
                placeholder="Application"
                value={application}
                onChange={(e) => handleApplicationChange(index, e.target.value)}
                required
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => removeApplication(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={addApplication}>
            Add Application
          </Button>
        </div>

        <Button type="submit">Add Math Topic</Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Math Topics</h3>
        {topics.map((t) => (
          <Card key={t._id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h4 className="font-medium">{t.title}</h4>
                <p className="text-sm text-gray-600">{t.description}</p>
                {t.equations.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium">Equations:</h5>
                    <ul className="list-disc list-inside text-sm">
                      {t.equations.map((eq, i) => (
                        <li key={i}>{eq}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {t.applications.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium">Applications:</h5>
                    <ul className="list-disc list-inside text-sm">
                      {t.applications.map((app, i) => (
                        <li key={i}>{app}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">Delete</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Math Topic</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{t.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => t._id && handleDelete(t._id)}>
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

export default MathTopicForm;
