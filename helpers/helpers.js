export const convertSeconds = secondsElapsed => {
  if (secondsElapsed < 60) return secondsElapsed;

  const createMinutes = () => {
    const minutes = Math.floor(secondsElapsed / 60);

    return minutes < 10 ? `0${minutes}` : minutes;
  };

  const createSeconds = () => {
    const seconds = secondsElapsed % 60;
    return seconds < 10 ? `0${seconds}` : seconds;
  };

  return `${createMinutes()}:${createSeconds()}`;
};
