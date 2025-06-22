import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectForm from '../components/admin/ProjectForm';
import MathTopicForm from '../components/admin/MathTopicForm';
import AlgorithmForm from '../components/admin/AlgorithmForm';
import ResumeUploader from '../components/admin/ResumeUploader';
import { api } from '@/lib/api';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState<'projects' | 'mathematics' | 'algorithms' | 'resume'>('projects');
  const [projects, setProjects] = useState([]);
  const [mathTopics, setMathTopics] = useState([]);
  const [algorithms, setAlgorithms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAdminAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
    if (isAuth) {
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    try {
      const [projectsData, mathTopicsData, algorithmsData] = await Promise.all([
        api.getProjects(),
        api.getMathTopics(),
        api.getAlgorithms()
      ]);
      setProjects(projectsData);
      setMathTopics(mathTopicsData);
      setAlgorithms(algorithmsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'Maksat2007!') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdminAuthenticated', 'true');
      setError('');
      fetchData();
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSubmit = async (data: any) => {
    try {
      switch (activeCategory) {
        case 'projects':
          await api.createProject(data);
          break;
        case 'mathematics':
          await api.createMathTopic(data);
          break;
        case 'algorithms':
          await api.createAlgorithm(data);
          break;
      }
      alert(`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} added successfully!`);
      fetchData(); // Refresh the data after successful submission
    } catch (error) {
      console.error('Error submitting data:', error);
      alert('Failed to submit. Please try again.');
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    try {
      switch (activeCategory) {
        case 'projects':
          await api.deleteProject(id);
          break;
        case 'mathematics':
          await api.deleteMathTopic(id);
          break;
        case 'algorithms':
          await api.deleteAlgorithm(id);
          break;
      }
      alert(`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} deleted successfully!`);
      fetchData(); // Refresh the data after successful deletion
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete. Please try again.');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-md p-8 glass-effect rounded-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent">
            Admin Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-input bg-background"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-input bg-background"
                required
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <button
              type="submit"
              className="w-full py-3 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-math-purple bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('isAdminAuthenticated');
              setIsAuthenticated(false);
              navigate('/');
            }}
            className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-[240px,1fr] gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <button
              onClick={() => setActiveCategory('projects')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeCategory === 'projects'
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/10'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveCategory('mathematics')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeCategory === 'mathematics'
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/10'
              }`}
            >
              Mathematics
            </button>
            <button
              onClick={() => setActiveCategory('algorithms')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeCategory === 'algorithms'
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/10'
              }`}
            >
              Algorithms
            </button>
            <button
              onClick={() => setActiveCategory('resume')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                activeCategory === 'resume'
                  ? 'bg-primary text-white'
                  : 'hover:bg-primary/10'
              }`}
            >
              Resume
            </button>
          </div>

          {/* Main Content */}
          <div className="glass-effect p-8 rounded-2xl">
            {activeCategory === 'projects' && (
              <ProjectForm 
                onSubmit={handleSubmit} 
                projects={projects}
                onDelete={handleDelete}
              />
            )}
            {activeCategory === 'mathematics' && (
              <MathTopicForm 
                onSubmit={handleSubmit}
                topics={mathTopics}
                onDelete={handleDelete}
              />
            )}
            {activeCategory === 'algorithms' && (
              <AlgorithmForm 
                onSubmit={handleSubmit}
                algorithms={algorithms}
                onDelete={handleDelete}
              />
            )}
            {activeCategory === 'resume' && (
              <ResumeUploader />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
