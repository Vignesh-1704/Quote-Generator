// Manipulating the DOM

const quoteContainer  = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');



// Get Quotes From API
// Asynchronous Fetch Request within try/catch 
// An Asynchronous function can run at anytime independently that wont stop the browser from cmpleting the loading of the page

let apiQuotes = [];

//Show New Quote

function newQuote()
{
    loading();
    // Pick a random quote from apiQuotes Array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check if Author field is blank and replace it with 'Unknown'
    if(!quote.author)
    {
        authorText.textContent = "Unknown"
    }
    else
    {
        authorText.textContent = quote.author;
    }

    //Check Quote Length to determine styling
    if(quote.text > 70)
    {
        quoteText.classList.add('long-quote');
    }
    else
    {
        quoteText.classList.remove('long-quote');
    }
    //Set the quote , Hide the Loader
    quoteText.textContent = quote.text;
    complete();
}




async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try
    {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }
    catch(error)
    {
        //Catch and Handle Error Here
    }
}




//Instead of using a API using the Data stored locally
//Benefit of storing it locally is making it customizable and will befast
/*

function newQuote()
{
    // Pick a random quote from apiQuotes Array
    const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
    console.log(quote);
}

//onLoad
newQuote();

*/




// Tweet Quote

function tweetQuote()
{
    // A template string uses backticks `` is because a template string allows us to pass a variable which will be converted to String

    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;   
    // _blank allows to open twiiter in a new window
    window.open(twitterUrl,'_blank');  
}


// Event Listeners for the Buttons

newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



// Show Loading 
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}


// Hide Loading
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}



//Onload 
getQuotes();