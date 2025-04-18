
import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

const AudioPlayer = ({ 
  currentTrack, 
  isPlaying, 
  play, 
  pause, 
  playlist 
}) => {
  const handlePlayPause = () => {
    isPlaying ? pause() : play(currentTrack || playlist[0]);
  };

  return (
    <div className="flex items-center justify-center space-x-4 p-4 bg-secondary rounded-lg">
      <button className="hover:bg-accent p-2 rounded-full">
        <SkipBack />
      </button>
      <button 
        onClick={handlePlayPause} 
        className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/80"
      >
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <button className="hover:bg-accent p-2 rounded-full">
        <SkipForward />
      </button>
    </div>
  );
};

export default AudioPlayer;
