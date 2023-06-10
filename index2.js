$(document).ready(function () {
  $('form').submit(function (event) {
    event.preventDefault();

    const category = $('#category').val()
    const name = $('#search-name').val()
    console.log(category)
    const url = `pesquisa.html?category=${category}&name=${name}`;

    window.open(url, '_blank');
  });
});



$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryQuery = urlParams.get('category');
  const nameQuery = urlParams.get('name');

  let endpoint;
  if(categoryQuery) {
    endpoint = `https://diwserver.vps.webdock.cloud/products/category/${categoryQuery}`
  } else {
    endpoint = `https://diwserver.vps.webdock.cloud/products/search?query=${nameQuery}`
  }
  

  console.log(endpoint)
  $.get(endpoint, function (data) {
    let searchResults;

    if(data.products) {
      searchResults = data.products
    } else {
      searchResults = data
    }
    const cardsContainer = $('#cards');

    if (searchResults.length === 0) {
      cardsContainer.html('<p>No products found.</p>');
    } else {
      const cardsHTML = searchResults.map(
        (product) => `
        <div class=" col-8 col-md-6 col-sm-6 mb-3 col-lg-3">
          <div class="product-card-search card">
            <img src="${
              product.image
            }" class="card-img-top product-card-search-image" alt="${
          product.title
        }" />
            <div class="card-body">
              <a href="detalhes.html?id=${product.id}">
                <h6 class="card-title">${product.title}</h6>
              </a>
              <div class="description-container">
                <p class="card-text">${product.description}</p>
              </div>
              <div class="price">R$ ${product.price.toFixed(2)}</div>
              <div class="review-rate">★★★★☆ (${product.rating.rate})</div>
            </div>
          </div>
        </div>
      `
      );

      cardsContainer.html(cardsHTML.join(''));
    }
  }).fail(function (error) {
    console.error('Error:', error);
  });
});