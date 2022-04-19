// importing the array from products products.js

import { products } from "./products.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SHOP PAGE /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
//////////// COPY OF THE ORIGINAL ARRAY AND MAPPING / FILTERING //////////////
//////////////////////////////////////////////////////////////////////////////

// Here "filteredProducts" is a copy of the original products array. Every time we set up a search filter, we need to make a copy of the original array, if we dont, when a user type in to search a product and delete the search, the array wont go back to it's in initial value, and the products won't show after we run out of search options.
let filteredProducts = [...products];

const productsContainer = document.querySelector(".products-container");

// This function filter's the array to show the products also there is an if statement in case there is no product found when the user type in the search filter
const displayProducts = () => {
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<div class="msg-container">
                                  <p class="error-msg" id="errorMsg">Sorry, no products matched your search</p>
                                  </div>`;
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map((product) => {
      const { id, name, image, price } = product;

      return ` <a <article class="single-product product f-dir-col__center-center" data-id="${id}" href="product.html?id=${id}&name=${name}"> 
                  <img src="${image}" class="product-img img" alt=""/>
                  <div class="product-footer">
                    <h5 class="product-name h5-light">${name}</h5>
                    <p class="product-price">${price}</p>
                  </div>
                </article></a>`;
    })
    .join("");
};
displayProducts();

//////////////////////////////////////////////////////////////////////////////
////////////////// SETTING UP THE SEARCH INPUT FILTER/////////////////////////
//////////////////////////////////////////////////////////////////////////////

// This is a search input text filter to show the products according to what we type in the search input
const form = document.querySelector(".input-form");
const searchInput = document.querySelector(".search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value;
  console.log(inputValue);

  filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

//////////////////////////////////////////////////////////////////////////////
////////// DISPLAYING THE FILTER BUTTONS FORM ( CATEGORY BUTTONS ) ///////////
//////////////////////////////////////////////////////////////////////////////

const categoriesDOM = document.querySelector(".categories");

// This is the displayButtons function when we iterate over the original products array to get the category property form each object, including the all button
const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map((product) => product.category))];
  // console.log(buttons);
  categoriesDOM.innerHTML = buttons
    .map((category) => {
      return `<button class="category-btn h6-light" data-id="${category}">${category}</button>`;
    })
    .join("");
};
displayButtons();

//////////////////////////////////////////////////////////////////////////////
///// MAKING THE FILTER BUTTONS DISPLAY THE DATA ONCE THEY ARE CLICKED ///////
//////////////////////////////////////////////////////////////////////////////

categoriesDOM.addEventListener("click", (e) => {
  // console.log(e.target);
  const htmlElement = e.target;
  if (htmlElement.classList.contains("category-btn")) {
    if (htmlElement.dataset.id === "all") {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.category === htmlElement.dataset.id;
      });
    }
    searchInput.value = "";
    displayProducts();
  }
});
