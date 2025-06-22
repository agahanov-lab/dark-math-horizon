import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Upload, Trash2, FileText } from 'lucide-react';
import { api } from '@/lib/api';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [currentResume, setCurrentResume] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCurrentResume();
  }, []);

  const fetchCurrentResume = async () => {
    try {      const data = await api.getCurrentResume();
      setCurrentResume(data);
    } catch (error) {
      if (error.response?.status !== 404) {
        console.error('Error fetching resume:', error);
      }
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError('Please select a PDF file');
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('resume', file);

    try {      await api.uploadResume(formData);
      setSuccess('Resume uploaded successfully');
      setFile(null);
      fetchCurrentResume();
    } catch (error) {
      setError(error.response?.data?.error || 'Error uploading resume');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await api.deleteResume();
      setCurrentResume(null);
      setSuccess('Resume deleted successfully');
    } catch (error) {
      setError('Error deleting resume');
    }
  };

  const downloadResume = () => {
    window.open(api.getResumeDownloadUrl(), '_blank');
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Resume Management</h2>
      
      {currentResume && (
        <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
          <FileText className="text-primary" />
          <div className="flex-1">
            <p className="font-medium">{currentResume.filename}</p>
            <p className="text-sm text-muted-foreground">
              Uploaded: {new Date(currentResume.uploadedAt).toLocaleDateString()}
            </p>
          </div>
          <Button variant="outline" onClick={downloadResume}>
            Download
          </Button>
          <Button variant="destructive" size="icon" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="flex gap-4">
        <Input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="flex-1"
        />
        <Button
          onClick={handleUpload}
          disabled={!file || isUploading}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload Resume
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default" className="bg-green-500/15">
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ResumeUploader;
