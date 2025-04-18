
export const savePlaylist = (playlist) => {
  localStorage.setItem('focusTunes-playlist', JSON.stringify(playlist));
};

export const loadPlaylist = () => {
  const savedPlaylist = localStorage.getItem('focusTunes-playlist');
  return savedPlaylist ? JSON.parse(savedPlaylist) : [];
};
