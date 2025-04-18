
import React, { useState, useEffect } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioPlayer from '../components/AudioPlayer';
import { Moon, Sun, Library } from 'lucide-react';
import { loadTheme, saveTheme } from '../utils/storageUtils';

const MusicPlayer = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => loadTheme());
  const { 
    playlist,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    play,
    pause,
    seek,
    adjustVolume,
  } = useAudioPlayer();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
    saveTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <Library className="h-6 w-6" />
          <h1 className="text-2xl font-bold">FocusTunes</h1>
        </div>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-secondary"
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Now Playing</h2>
          <AudioPlayer 
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            currentTime={currentTime}
            duration={duration}
            volume={volume}
            onPlay={() => play(currentTrack || playlist[0])}
            onPause={pause}
            onSeek={seek}
            onVolumeChange={adjustVolume}
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Playlist</h2>
          <div className="bg-card rounded-lg p-4 space-y-2">
            {playlist.map(track => (
              <div 
                key={track.id}
                onClick={() => play(track)}
                className={`p-3 rounded-md cursor-pointer hover:bg-accent ${
                  currentTrack?.id === track.id ? 'bg-accent' : ''
                }`}
              >
                <div className="font-medium">{track.title}</div>
                <div className="text-sm text-muted-foreground">{track.artist}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
