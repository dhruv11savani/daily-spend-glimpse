
import React, { useRef } from 'react';
import { Upload, FileAudio } from 'lucide-react';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';

const UploadMusic = ({ onUpload }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = React.useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is audio
    if (!file.type.startsWith('audio/')) {
      setError('Please upload an audio file');
      return;
    }

    // Create URL for the audio file
    const audioUrl = URL.createObjectURL(file);
    const newTrack = {
      id: Date.now().toString(),
      title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
      artist: 'Custom Upload',
      url: audioUrl
    };

    onUpload(newTrack);
    setError('');
    event.target.value = ''; // Reset input
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="audio/*"
        className="hidden"
      />
      
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="w-full"
      >
        <Upload className="mr-2" />
        Upload Music
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default UploadMusic;
