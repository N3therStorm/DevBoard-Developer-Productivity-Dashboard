export async function loadQuote() {
  const quoteEl = document.getElementById('quote');
  const authorEl = document.getElementById('author');
  try {
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();
    quoteEl.textContent = `"${data.content}"`;
    authorEl.textContent = `— ${data.author}`;
  } catch (err) {
    quoteEl.textContent = 'Could not load quote.';
  }
}
