
import { useState, useRef, useEffect } from 'react';
import { loadPlaylist, savePlaylist } from '../utils/storageUtils';
import { defaultTracks } from '../utils/audioUtils';

export const useAudioPlayer = () => {
  const [playlist, setPlaylist] = useState(() => {
    const savedPlaylist = loadPlaylist();
    return savedPlaylist.length > 0 ? savedPlaylist : defaultTracks;
  });
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const addTrack = (track) => {
    const newPlaylist = [...playlist, track];
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);
  };

  const removeTrack = (trackId) => {
    const newPlaylist = playlist.filter(track => track.id !== trackId);
    setPlaylist(newPlaylist);
    savePlaylist(newPlaylist);
    
    if (currentTrack?.id === trackId) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTrack(null);
    }
  };

  const play = (track) => {
    if (track) {
      if (currentTrack?.id !== track.id) {
        audioRef.current.src = track.url;
        setCurrentTrack(track);
      }
    }
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const seek = (value) => {
    audioRef.current.currentTime = value;
    setCurrentTime(value);
  };

  return {
    playlist,
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    addTrack,
    removeTrack,
    play,
    pause,
    seek
  };
};
