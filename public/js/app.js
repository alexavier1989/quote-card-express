
// Fetch the images array from the API
async function fetchBreakingBadImage() {
    const apiKey = '9075ede92e92c0c1847d756a02788d3a';
    const url = `https://api.themoviedb.org/3/tv/1396/images?api_key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const postersEN = data.posters.filter(poster => poster.iso_639_1 === 'en').map( p => p.file_path);
        const backdropsEN = data.backdrops.filter(backdrop => backdrop.iso_639_1 === 'en').map( b => b.file_path);

    const imagesObject = {
        posters: postersEN,
        backdrops: backdropsEN,
    }
    return imagesObject;
    } catch (error) {
        console.error('Error fetching image:', error);
    }
}

// Function for random background image
function changeBackground(imagesCollection, screenWidth = 768) {
    let imageUrl = '';
    let randomIndex = 0;
    if (screenWidth >= 768) {
        randomIndex = Math.floor(Math.random() * imagesCollection.backdrops.length);
        imageUrl = `https://image.tmdb.org/t/p/w500${imagesCollection.backdrops[randomIndex]}`;
    } else {
        randomIndex = Math.floor(Math.random() * imagesCollection.posters.length);
        imageUrl = `https://image.tmdb.org/t/p/w500${imagesCollection.posters[randomIndex]}`;
    }
    return imageUrl;
}

async function callPhrasesApiByTime(apiUrl, time) {
    const domElement = {
        quoteElement : document.querySelector(".quote"),
        authorElement : document.querySelector(".author"),
        mainElement : document.querySelector(".main"),
    };
    const imagesCollection = await fetchBreakingBadImage();

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`Error in the response: ${response.status} - ${response.statusText}`);
            }
            const data = await response.json();
            const quoteResponse = data[0].quote;
            const authorResponse = data[0].author;

            // Animation
            domElement.quoteElement.style.transition = "opacity 0.8s";
            domElement.authorElement.style.transition = "opacity 0.8s";
            domElement.mainElement.style.transition = "background-image 0.8s";
            domElement.quoteElement.style.opacity = 0;
            domElement.authorElement.style.opacity = 0;

            const screenWidth = window.innerWidth;
            console.log('Ancho de la pantalla:', screenWidth);

            // Change background + show quote and author
            setTimeout(() => {
                let changingBackground = changeBackground(imagesCollection, screenWidth);
                domElement.mainElement.style.backgroundImage = `url(${changingBackground})`;

                domElement.quoteElement.innerHTML = quoteResponse;
                domElement.authorElement.innerHTML = authorResponse;
                domElement.quoteElement.style.opacity = 1;
                domElement.authorElement.style.opacity = 1;
            }, 800);

        } catch (error) {
            console.error('API error: ', error);
        }
    }

    fetchData();
    // Call the function every 12 seconds
    setInterval(fetchData, time);
}

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://api.breakingbadquotes.xyz/v1/quotes";
    callPhrasesApiByTime(apiUrl, 12000);
})

