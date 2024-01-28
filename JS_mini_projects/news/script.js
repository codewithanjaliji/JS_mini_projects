// document.addEventListener('DOMContentLoaded', function () {
//     const apiKey = '0f79a06889dd420d9f65699ac0f7da5f'; // Replace with your News API key
//     const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => displayNews(data.articles))
//         .catch(error => console.error('Error fetching news:', error));
// });

// function displayNews(articles) {
//     const newsContainer = document.getElementById('news-container');

//     articles.forEach(article => {
//         const articleElement = document.createElement('div');
//         articleElement.classList.add('article');

//         const heading = document.createElement('h2');
//         heading.textContent = article.title;

//         const image = document.createElement('img');
//         image.src = article.urlToImage;
//         image.alt = article.title;

//         const content = document.createElement('p');
//         content.textContent = article.description;

//         articleElement.appendChild(heading);
//         articleElement.appendChild(image);
//         articleElement.appendChild(content);

//         newsContainer.appendChild(articleElement);
//     });
// }

const apiKey = '0f79a06889dd420d9f65699ac0f7da5f';
const apiUrl = 'https://newsapi.org/v2/top-headlines';
const newsContainer = document.getElementById('news-container');
let currentLanguage = 'en'; // Default language, e.g., English

async function getNews(category) {
    try {
        const response = await fetch(`${apiUrl}?category=${category}&language=${currentLanguage}&apiKey=${apiKey}`);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function displayNews(articles) {
    newsContainer.innerHTML = '';
    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');
        newsCard.innerHTML = `
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}" alt="${article.title}">
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;
        newsContainer.appendChild(newsCard);
    });
}

async function filterNews(category) {
    const articles = await getNews(category);
    displayNews(articles);
}

function changeLanguage(language) {
    currentLanguage = language;
    // You may want to reload the news with the new language
    // For example, call filterNews with the current category
    filterNews('general'); // Replace with your default category
}

// Initial load
filterNews('general'); // Replace with your default category
