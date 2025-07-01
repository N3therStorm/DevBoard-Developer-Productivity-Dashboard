export async function loadGitHubActivity() {
  const container = document.getElementById('github-calendar');
  const username = 'your-github-username';
  try {
    const res = await fetch(`https://api.github.com/users/${username}/events`);
    const data = await res.json();
    const recent = data.slice(0, 5).map(e => `
      <div>
        <strong>${e.type}</strong> at <em>${e.repo.name}</em>
      </div>`).join('');
    container.innerHTML = recent;
  } catch (err) {
    container.textContent = 'Unable to load GitHub data.';
  }
}
