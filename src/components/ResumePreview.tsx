import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

const ResumePreview = () => {
  const [hasResume, setHasResume] = useState(false);

  useEffect(() => {
    checkResume();
  }, []);

  const checkResume = async () => {
    try {
      await api.getCurrentResume();
      setHasResume(true);
    } catch (error) {
      setHasResume(false);
    }
  };

  const handleDownload = () => {
    window.open(api.getResumeDownloadUrl(), '_blank');
  };

  if (!hasResume) return null;

  return (
    <Button
      onClick={handleDownload}
      className="inline-flex items-center gap-2"
      size="lg"
    >
      <Download className="h-4 w-4" />
      Download Resume
    </Button>
  );
};

export default ResumePreview;
