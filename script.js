
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');


// Once fetched the data will be stored locally
let apiQuotes = [];


function showLoadingIcon() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function removeLoadingIcon() {
    if(!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }

}



// Show new Quote
function newQuote() {
    showLoadingIcon();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // If author is blank, add 'Unknown'
    if(!quote.author) {
        authorText.innerText = 'Unknown'
    } else {
        authorText.innerText = quote.author;
    }

    // Reduce font size for long quotes
    if(quote.text.length > 120) {
        quoteText.classList.add('long-quote')
    } else {
        quoteText.classList.remove('long-quote')
    }

    quoteText.innerText = quote.text;
    removeLoadingIcon();

}


// Get Quote From Api
async function getQuote() {
    showLoadingIcon();
    const proxyUrl = 'https://morning-everglades-07614.herokuapp.com/'
    const apiUrl = 'https://type.fit/api/quotes';

    try{
        const response = await fetch(proxyUrl + apiUrl);
        apiQuotes = await response.json();
        newQuote();

    } catch (error) {
        removeLoadingIcon();
        quoteText.innerText = 'There was a problem getting your quote. Please try again'  ;
        authorText.innerText = '';

    }
}


// Tweet quote 
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}



// Event Listeners 
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote)


// On Load
getQuote();



