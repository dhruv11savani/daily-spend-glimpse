
// Helper function to format time in MM:SS
export const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Default tracks for testing
export const defaultTracks = [
  {
    id: '1',
    title: 'Forest Meditation',
    artist: 'Nature Sounds',
    url: 'https://actions.google.com/sounds/v1/ambiences/forest_ambient.ogg',
  },
  {
    id: '2',
    title: 'Ocean Waves',
    artist: 'Relaxing Sounds',
    url: 'https://actions.google.com/sounds/v1/water/waves_crashing_on_rock_beach.ogg',
  }
];
