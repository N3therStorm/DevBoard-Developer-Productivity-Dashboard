import { loadGitHubActivity } from './github.js';
import { setupTimer } from './timer.js';
import { fetchWeather } from './weather.js';
import { loadQuote } from './quotes.js';

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

const goalsList = document.getElementById('goals-list');
const newGoalInput = document.getElementById('new-goal');
const addGoalBtn = document.getElementById('add-goal');

const loadGoals = () => {
  const goals = JSON.parse(localStorage.getItem('goals')) || [];
  goalsList.innerHTML = '';
  goals.forEach((goal, i) => {
    const li = document.createElement('li');
    li.textContent = goal;
    li.addEventListener('click', () => {
      goals.splice(i, 1);
      localStorage.setItem('goals', JSON.stringify(goals));
      loadGoals();
    });
    goalsList.appendChild(li);
  });
};

addGoalBtn.addEventListener('click', () => {
  const goal = newGoalInput.value.trim();
  if (goal) {
    const goals = JSON.parse(localStorage.getItem('goals')) || [];
    goals.push(goal);
    localStorage.setItem('goals', JSON.stringify(goals));
    newGoalInput.value = '';
    loadGoals();
  }
});

loadGitHubActivity();
setupTimer();
fetchWeather();
loadQuote();
loadGoals();
