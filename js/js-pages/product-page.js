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
// const searchButton = document.querySelector(".search-button");

const baseUrl = "https://cms-ca-wp.dev-squid.com/wp-json/wc/store/products";

let products = [];

export async function getProducts(url) {
  try {
    const response = await fetch(url);
    products = await response.json();

    displayProducts(products);
  } catch (error) {
    console.log(error);
    productsContainer.innerHTML = message("error", "An error occurred.", error);
  }
}
getProducts(baseUrl);

const displayProducts = (productsToDisplay) => {
  if (productsToDisplay.length < 1) {
    productsContainer.innerHTML = `<div class="msg-container">
                                  <p class="error-msg" id="errorMsg">Sorry, no products matched your search</p>
                                  </div>`;
    return;
  }

  productsContainer.innerHTML = "";

  productsToDisplay.forEach(function (product) {
    productsContainer.innerHTML += `<a <div class="single-product product f-dir-col__center-center"   data-id="${product.id}" href="product.html?id=${product.id}&name=${product.name}" >
                  <img src="${product.images[0].src}" class="product-img img" alt=""/>
                  <div class="product-footer">
                    <h5 class="product-name h5-light">${product.name}</h5>
                    <p class="product-price">${product.price_html}</p>
                  </div>
                </div></a>`;
  });
  displayButtons(productsToDisplay);
};

//////////////////////////////////////////////////////////////////////////////
////////////////// SETTING UP THE SEARCH INPUT FILTER/////////////////////////
//////////////////////////////////////////////////////////////////////////////
const form = document.querySelector(".input-form");
const searchInput = document.querySelector("#search-input");

form.addEventListener("keyup", () => {
  const inputValue = searchInput.value.toLowerCase();
  console.log(inputValue);

  const filteredProducts = products.filter((product) => {
    return product.name.toLowerCase().includes(inputValue);
  });
  displayProducts(filteredProducts);
});

//////////////////////////////////////////////////////////////////////////////
////////// DISPLAYING THE FILTER BUTTONS FORM ( CATEGORY BUTTONS ) ///////////
//////////////////////////////////////////////////////////////////////////////

const categoriesDOM = document.querySelector(".categories");

// This is the displayButtons function when we iterate over the original products array to get the category property form each object, including the all button
const displayButtons = () => {
  const buttons = ["all", ...new Set(products.map((product) => product.categories[0].name))];
  // console.log(buttons);
  categoriesDOM.innerHTML = buttons
    .map((categories) => {
      return `<button class="category-btn h6-light" data-id="${categories}">${categories}</button>`;
    })
    .join("");
};
displayButtons();

//////////////////////////////////////////////////////////////////////////////
///// MAKING THE FILTER BUTTONS DISPLAY THE DATA ONCE THEY ARE CLICKED ///////
//////////////////////////////////////////////////////////////////////////////

let categoryProducts;

categoriesDOM.addEventListener("click", (e) => {
  console.log(e.target);
  const htmlElement = e.target;
  if (htmlElement.classList.contains("category-btn")) {
    if (htmlElement.dataset.id === "all") {
      categoryProducts = products;
    } else {
      categoryProducts = products.filter((product) => {
        return product.categories[0].name === htmlElement.dataset.id;
      });
    }
    searchInput.value = "";
    displayProducts(categoryProducts);
  }
});

//////////////////////////////////////////////////////////////////////////////
/////////////// ITEMS PER PAGE FILTER WITH API ARGUMENT "PER+PAGE"////////////
//////////////////////////////////////////////////////////////////////////////

// Items per-page filter
perPage.onchange = function (event) {
  const newUrl = baseUrl + `?per_page=${event.target.value}`;
  productsContainer.innerHTML = "";
  getProducts(newUrl);
};

/////////////////////////////////////////////////////
////////////////// OLD CODE /////////////////////////
/////////////////////////////////////////////////////
// export async function getProducts(url) {
//   try {
//     const response = await fetch(url);
//     const products = await response.json();
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

// Items per-page filter
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
