
// const authorNames = [
//     {
//         lowerCaseName: "gustavofring",
//         picturePath: "/img/Gus_Fring.jpg"
//     },{
//         lowerCaseName: "hankschrader",
//         picturePath: "/img/Hank_Schrader.jpg"
//     },{
//         lowerCaseName: "jessepinkman",
//         picturePath: "/img/Jesse_Pinkman.jpg"
//     },{
//         lowerCaseName: "lalosalamanca",
//         picturePath: "/img/Lalo_Salamanca.jpg"
//     },{
//         lowerCaseName: "mikeehrmantraut",
//         picturePath: "/img/Mike_Ehrmantraut.jpg"
//     },{
//         lowerCaseName: "saulgoodman",
//         picturePath: "/img/Saul_Goodman.jpg"
//     },{
//         lowerCaseName: "skylerwhite",
//         picturePath: "/img/Skyler_White.jpg"
//     },{
//         lowerCaseName: "tiosalamanca",
//         picturePath: "/img/Tio_Salamanca.jpg"
//     },{
//         lowerCaseName: "tucosalamanca",
//         picturePath: "/img/Tuco_Salamanca.jpg"
//     },{
//         lowerCaseName: "walterwhite",
//         picturePath: "/img/Walter_White.jpg"
//     }

// ]
// function changeBackgroundByAuthor(authorResponse){
//     const authorObj = authorNames.filter((authorName) => authorName.lowerCaseName.includes( authorResponse.toLowerCase().replace(" ","")))
//     const imagePath = authorObj != undefined && authorObj.length > 0 ? authorObj[0].picturePath : "/img/Breaking_bad_poster.jpg";
//     return imagePath;
// }

function callPhrasesApiByTime(apiUrl, time) {

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);

            if (!response.ok) {
                throw new Error(`Error in the response: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            let quoteElement = document.querySelector(".quote");
            let authorElement = document.querySelector(".author");
            let mainElement = document.querySelector(".main");

            const quoteResponse = data[0].quote;
            const authorResponse = data[0].author;

            // Animation
            quoteElement.style.transition = "opacity 0.8s";
            authorElement.style.transition = "opacity 0.8s";
            mainElement.style.transition = "background-image 0.8s";
            quoteElement.style.opacity = 0;
            authorElement.style.opacity = 0;

            setTimeout(() => {
                // let changingBackground = changeBackgroundByAuthor(authorResponse);
                // mainElement.style.backgroundImage = `url(${changingBackground})`;

                quoteElement.innerHTML = quoteResponse;
                authorElement.innerHTML = authorResponse;

                quoteElement.style.opacity = 1;
                authorElement.style.opacity = 1;
            }, 800);

        } catch (error) {
            console.error('API error: ', error);
        }
    }

    fetchData();
    setInterval(fetchData, time);
}

document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://api.breakingbadquotes.xyz/v1/quotes";
    callPhrasesApiByTime(apiUrl, 12000);
})

