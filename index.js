$(document).ready(function () {
  $.get('https://diwserver.vps.webdock.cloud/products/category/Accessories - Jewellery?page=6', function (data) {
    var products = data.products;
    var productCards = $('.product-card');

    productCards.each(function (index) {
      var product = products[index];
      var card = $(this);

      card.find('.card-img-top').attr('src', product.image);

      card.find('.card-title').text(product.title);

      var description = product.description;
      card.find('.card-text').html(description);

      card.find('.card-title').addClass('text-truncate');
      card.find('.card-text').addClass('text-truncate');

      card.find('.price').text('R$' + product.price.toFixed(2));

      card
        .find('.review-rate')
        .text('★★★★☆ (' + product.rating.rate.toFixed(1) + ')');

      var productId = product.id;
      card
        .find('.card-title')
        .wrap('<a href="detalhes.html?id=' + productId + '"></a>');
    });
  });

  $(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    if (productId) {
      $.get(
        `https://diwserver.vps.webdock.cloud/products/${productId}`,
        function (product) {
          $('#product-title').text(product.title);
          $('#product-description').html(product.description);
          $('#product-price').text('Price: R$' + product.price.toFixed(2));
          $('#product-rating').text(
            'Rating: ' +
              product.rating.rate.toFixed(1) +
              ' (' +
              product.rating.count +
              ' ratings)'
          );
          $('#product-image').attr('src', product.image);
        }
      );
    }
  });

  $('#buttonName').click(function () {
    let selectedCategory = $('#searchInput').val();

    console.log("aaaaaaaaa")
    if (selectedCategory) {
      const url = `pesquisa.html?name=${selectedCategory}`;

      window.open(url, '_blank');
    }
  });

  $('#buttonCategory').click(function () {
    let selectedCategory = $('#category').val();

    if (selectedCategory) {
      const url = `pesquisa.html?category=${selectedCategory}`;

      window.open(url, '_blank');
    }
  });

  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('category');
  const nameQuery = urlParams.get('name');
  let endpoint;

  if (searchQuery) {
    endpoint = `https://diwserver.vps.webdock.cloud/products/category/${searchQuery}`;
  } else {
    endpoint = `https://diwserver.vps.webdock.cloud/products/search?query=${nameQuery}`;
  }

  $.get(endpoint, function (data) {
    const { products: searchResults } = data;
    const cardsContainer = $('#cards');

    if (searchResults.length === 0) {
      cardsContainer.html('<p>No products found.</p>');
    } else {
      const cardsHTML = searchResults.map(
        (product) => `
        <div class="col-8 col-md-6 col-sm-6 mb-3 col-lg-3">
          <div class="product-card-search card">
            <img src="${product.image}" class="card-img-top product-card-search-image" alt="${product.title}" />
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

  var categorySelect = $('#category');

  $.ajax({
    url: 'https://diwserver.vps.webdock.cloud/products/categories',
    method: 'GET',
    success: function (response) {
      response.forEach(function (category) {
        categorySelect.append(
          $('<option>', {
            value: category,
            text: category,
          })
        );
      });
    },
  });

  var listGroup = $('.list-group');
  var button = $('#button');

  $.ajax({
    url: 'https://diwserver.vps.webdock.cloud/products/category/Accessories - Jewellery',
    method: 'GET',
    success: function (response) {
      var products = response.products;
      products.forEach(function (product) {
        var listItem = $('<div>', {
          class:
            'list-group-item d-flex justify-content-between align-items-center',
          text: product.title,
        });

        var reviewRate = $('<span>', {
          class: 'review-rate',
          text: `(${product.rating.rate})`,
        });

        listItem.append(reviewRate);
        listGroup.append(listItem);
      });
    },
  });
});
