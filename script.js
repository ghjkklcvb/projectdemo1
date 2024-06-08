// //tạo chức năng tim sảm phẩm

var heartButtons = document.querySelectorAll('.home-product-item__heart');

heartButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        this.classList.toggle('home-product-item__hearted');
    });
});


const productList = document.querySelector('.grid__column-2-4');
const sortBtns = document.querySelectorAll('.select-input__link');

function getProductPrices() {
  const prices = [];
  const productItems = productList.querySelectorAll('.home-product-item__price-new');
  productItems.forEach(item => {
    prices.push(parseFloat(item.textContent.replace(/\đ|,/g, ''))); // Remove currency symbols and commas
  });
  return prices;
}

function sortProducts(prices, sortOrder) {
  const sortedPrices = [...prices].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a - b;
    } else {
      return b - a;
    }
  });

  const sortedProducts = [];
  const productItems = productList.querySelectorAll('.home-product-item');
  sortedPrices.forEach((price, index) => {
    sortedProducts.push(productItems[prices.indexOf(price)]);
  });
  return sortedProducts;
}

function displayProducts(products) {
  productList.innerHTML = '';
  products.forEach(product => productList.appendChild(product));
}

sortBtns.forEach(btn => {
  btn.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor tag behavior

    const prices = getProductPrices();
    const sortOrder = btn.textContent.split(': ')[1].toLowerCase(); // Extract sort order (asc or desc)
    const sortedProducts = sortProducts(prices, sortOrder);

    displayProducts(sortedProducts);
  });
});
