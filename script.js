let search_tool = document.getElementById("search-tool");
const catalog = document.querySelector(".catalog");


document.addEventListener("DOMContentLoaded", function () {
    fetch('http://127.0.0.1:5000/api/buttons', {
           method: 'GET',
           mode: 'cors',
           headers: {
             'Content-Type': 'application/json'
       },
  })
        .then(response => response.json())
        .then(data => {
            const buttonListContainer = document.getElementById("button-list");
            data.forEach(item => {
                const button = document.createElement("button");
                button.className = "category_button";
                button.textContent = item;

                // Add click event listener (customize the action here)
                button.addEventListener("click", () => {
                    alert(`You clicked ${item}`);
                });

                buttonListContainer.appendChild(button);
            });
        })
        .catch(error => {
            console.error('Error fetching button names:', error);
        });
});

document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("search-input");
    const searchResults = document.getElementById("search-results");

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();
        if (query === "") {
            searchResults.innerHTML = "";
            return;
        }

        fetch(`http://127.0.0.1:5000/api/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Error fetching search results:', error);
            });
    });

    function displayResults(results) {
        searchResults.innerHTML = "";
        results.forEach(result => {
            const li = document.createElement("li");
            li.textContent = result;
            searchResults.appendChild(li);
        });
    }
});


function createProductCard(product) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} ₽</p>
        <button>В корзину</button>
    `;
    catalog.appendChild(card);
}

// Fetch product data from the Python backend
fetch('http://127.0.0.1:5000/api/get_products')
    .then((response) => response.json())
    .then((products) => {
        // Populate the catalog with product cards
        products.forEach(createProductCard);
    })
    .catch((error) => {
        console.error('Error fetching product data:', error);
    });

