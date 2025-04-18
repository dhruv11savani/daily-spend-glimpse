
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import { Progress } from './ui/progress';
import { formatTime } from '../utils/audioUtils';
import { Slider } from './ui/slider';

const AudioPlayer = ({ 
  currentTrack, 
  isPlaying, 
  currentTime,
  duration,
  volume,
  onPlay, 
  onPause,
  onSeek,
  onVolumeChange,
  className = ""
}) => {
  const progress = (currentTime / duration) * 100 || 0;

  // Determine which volume icon to display based on the volume level
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.3) return <Volume className="h-5 w-5" />;
    if (volume < 0.7) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  // Handle volume mute/unmute toggle
  const toggleMute = () => {
    onVolumeChange(volume > 0 ? 0 : 0.7);
  };

  return (
    <div className={`flex flex-col space-y-4 p-4 bg-card rounded-lg shadow-md ${className}`}>
      <div className="flex justify-between items-center">
        <div className="flex-1">
          {currentTrack && (
            <div>
              <h3 className="font-medium">{currentTrack.title}</h3>
              <p className="text-sm text-muted-foreground">{currentTrack.artist}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Progress value={progress} />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-4">
        <button className="hover:bg-accent p-2 rounded-full">
          <SkipBack className="h-5 w-5" />
        </button>
        <button 
          onClick={isPlaying ? onPause : onPlay} 
          className="bg-primary text-primary-foreground p-3 rounded-full hover:bg-primary/90"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button className="hover:bg-accent p-2 rounded-full">
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
      
      {/* Volume Control Section */}
      <div className="flex items-center space-x-2 mt-2">
        <button onClick={toggleMute} className="hover:bg-accent p-2 rounded-full">
          <VolumeIcon />
        </button>
        <Slider 
          value={[volume * 100]} 
          min={0} 
          max={100} 
          step={1}
          onValueChange={(value) => onVolumeChange(value[0] / 100)}
          className="w-32"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
