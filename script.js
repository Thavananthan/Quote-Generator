const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide Loading

function removeLodingSpinner() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}
// Get Quote from API
async function getQuote() {
  showLoadingSpinner();
  const proxyURL = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl =
    'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

  try {
    const response = await fetch(proxyURL + apiUrl);
    const data = await response.json();
    //  if Author is black unkown
    if (data.quoteAuthor === '') {
      authorText.innerText = 'unknow';
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // Reduce font size for long quotes
    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    removeLodingSpinner();
  } catch (error) {
    getQuote();
  }
}

// twitter function
function tweetQuote() {
  const quote = quoteText.innerText;
  const autor = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${autor}`;
  window.open(twitterUrl, '_blank');
}
// Event list
newQuoteBtn.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// load
getQuote();
