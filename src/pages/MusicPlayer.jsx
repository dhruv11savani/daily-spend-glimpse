
import React, { useState } from 'react';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import AudioPlayer from '../components/AudioPlayer';
import { Moon, Sun } from 'lucide-react';

const MusicPlayer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { 
    playlist, 
    currentTrack, 
    isPlaying, 
    addTrack, 
    removeTrack, 
    play, 
    pause 
  } = useAudioPlayer();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  return (
    <div className={`container mx-auto p-6 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">FocusTunes</h1>
        <button 
          onClick={toggleTheme} 
          className="p-2 rounded-full hover:bg-secondary"
        >
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
      </div>

      <AudioPlayer 
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        play={play}
        pause={pause}
        playlist={playlist}
      />
    </div>
  );
};

export default MusicPlayer;
