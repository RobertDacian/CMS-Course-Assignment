import { message } from "../components/messages.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SHOP PAGE /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const productsContainer = document.querySelector(".products-container");
const perPage = document.querySelector(".per-page-selection");
const categories = document.querySelectorAll(".category-btn");
const searchButton = document.querySelector(".search-button");

const baseUrl = "https://cms-ca-wp.dev-squid.com/wp-json/wc/store/products";

let products = [];
let filteredProducts = products;

export async function getProducts(url) {
  try {
    const response = await fetch(url);
    products = await response.json();

    console.log(products);
    displayProducts(products);

    // productsContainer.innerHTML = "";
  } catch (error) {
    console.log(error);
    productsContainer.innerHTML = message("error", "An error occurred.", error);
  }
}
getProducts(baseUrl);

const displayProducts = (productsToDisplay) => {
  if (filteredProducts.length < 1) {
    productsContainer.innerHTML = `<div class="msg-container">
                                  <p class="error-msg" id="errorMsg">Sorry, no products matched your search</p>
                                  </div>`;
    return;
  }

  productsContainer.innerHTML = filteredProducts
    .map((product) => {
      const { id, name, image, price } = product;

      return `<a <div class="single-product product f-dir-col__center-center"   data-id="${product.id}" href="product.html?id=${product.id}&name=${product.name}" >
                  <img src="${product.images[0].src}" class="product-img img" alt=""/>
                  <div class="product-footer">
                    <h5 class="product-name h5-light">${product.name}</h5>
                    <p class="product-price">${product.price_html}</p>
                  </div>
                </div></a>`;
    })
    .join("");
};

//   productsToDisplay.forEach(function (product) {
//     productsContainer.innerHTML += `<a <div class="single-product product f-dir-col__center-center"   data-id="${product.id}" href="product.html?id=${product.id}&name=${product.name}" >
//                   <img src="${product.images[0].src}" class="product-img img" alt=""/>
//                   <div class="product-footer">
//                     <h5 class="product-name h5-light">${product.name}</h5>
//                     <p class="product-price">${product.price_html}</p>
//                   </div>
//                 </div></a>`;
//   });
// };
displayProducts();

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

// filter code
// do filtering method then call

// let products = [];

// export async function getProducts(url) {
//   try {
//     const response = await fetch(url);
//     products = await response.json();
//     console.log(products);

//     // productsContainer.innerHTML = "";

//     products.forEach(function (product) {
//       productsContainer.innerHTML += `<a <div class="single-product product f-dir-col__center-center"   data-id="${product.id}" href="product.html?id=${product.id}&name=${product.name}" >
//                   <img src="${product.images[0].src}" class="product-img img" alt=""/>
//                   <div class="product-footer">
//                     <h5 class="product-name h5-light">${product.name}</h5>
//                     <p class="product-price">${product.price_html}</p>
//                   </div>
//                 </div></a>`;
//     });
//   } catch (error) {
//     console.log(error);
//     productsContainer.innerHTML = message("error", "An error occurred.", error);
//   }
// }

// getProducts(baseUrl);

// // Items per-page filter
// perPage.onchange = function (event) {
//   const newUrl = baseUrl + `?per_page=${event.target.value}`;
//   productsContainer.innerHTML = "";
//   getProducts(newUrl);
// };

// // Categories Filter
// categories.forEach(function (category) {
//   category.onclick = function (event) {
//     let newUrl;
//     if (event.target.id === "all") {
//       const categoryAll = event.target.value;
//       newUrl = baseUrl + `?all=${categoryAll}`;
//     } else {
//       const categoryChosen = event.target.value;
//       newUrl = baseUrl + `?category=${categoryChosen}`;
//     }
//     productsContainer.innerHTML = "";
//     getProducts(newUrl);
//   };
// });

// // //Search Input Filter
// searchButton.onclick = function () {
//   const searchInput = document.querySelector("#search-input").value;
//   console.dir(searchInput);
//   const newUrl = baseUrl + `?search=${searchInput}`;
//   productsContainer.innerHTML = "";
//   getProducts(newUrl);
// };
