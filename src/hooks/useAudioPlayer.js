
import { useState, useRef, useEffect } from 'react';
import { loadPlaylist, savePlaylist } from '../utils/storageUtils';

export const useAudioPlayer = () => {
  const [playlist, setPlaylist] = useState(loadPlaylist());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const addTrack = (track) => {
    const newPlaylist = [...playlist, track];
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);
  };

  const removeTrack = (trackId) => {
    const newPlaylist = playlist.filter(track => track.id !== trackId);
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);
  };

  const play = (track) => {
    if (track) {
      audioRef.current.src = track.url;
      setCurrentTrack(track);
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return {
    playlist,
    currentTrack,
    isPlaying,
    addTrack,
    removeTrack,
    play,
    pause,
    audioRef
  };
};
