
const PLAYLIST_KEY = 'focusTunes-playlist';
const THEME_KEY = 'focusTunes-theme';

export const savePlaylist = (playlist) => {
  localStorage.setItem(PLAYLIST_KEY, JSON.stringify(playlist));
};

export const loadPlaylist = () => {
  const savedPlaylist = localStorage.getItem(PLAYLIST_KEY);
  return savedPlaylist ? JSON.parse(savedPlaylist) : [];
};

export const saveTheme = (isDark) => {
  localStorage.setItem(THEME_KEY, JSON.stringify(isDark));
};

export const loadTheme = () => {
  const savedTheme = localStorage.getItem(THEME_KEY);
  return savedTheme ? JSON.parse(savedTheme) : false;
};
