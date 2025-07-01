export function setupTimer() {
  const timerDisplay = document.getElementById('timer-display');
  const startBtn = document.getElementById('start');
  const resetBtn = document.getElementById('reset');

  let time = 1500;
  let interval = null;

  const updateDisplay = () => {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    timerDisplay.textContent = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const startTimer = () => {
    if (interval) return;
    interval = setInterval(() => {
      time--;
      updateDisplay();
      if (time === 0) {
        clearInterval(interval);
        interval = null;
        new Notification('Pomodoro complete!', { body: 'Time for a break.' });
      }
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(interval);
    interval = null;
    time = 1500;
    updateDisplay();
  };

  if ('Notification' in window && Notification.permission !== 'granted') {
    Notification.requestPermission();
  }

  startBtn.addEventListener('click', startTimer);
  resetBtn.addEventListener('click', resetTimer);
  updateDisplay();
}
