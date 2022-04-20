import { message } from "../components/messages.js";

//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
////////////////////////////////// SHOP PAGE /////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

const productsContainer = document.querySelector(".products-container");

const url = "https://cms-ca-wp.dev-squid.com/wp-json/wc/store/products";

export async function getJackets() {
  try {
    const response = await fetch(url);
    const products = await response.json();

    console.log(products);

    productsContainer.innerHTML = "";

    products.forEach(function (product) {
      productsContainer.innerHTML += `<a <article class="single-product product f-dir-col__center-center"   data-id="${product.id}" href="product.html?id=${product.id}&name=${product.name}" > 
                  <img src="${product.images[0].src}" class="product-img img" alt=""/>
                  <div class="product-footer">
                    <h5 class="product-name h5-light">${product.name}</h5>
                    <p class="product-price">${product.price_html}</p>
                  </div>
                </article></a>`;
    });
  } catch (error) {
    console.log(error);
    productsContainer.innerHTML = message("error", "An error occurred.", error);
  }
}

getJackets(url);

//////////////////////////////////////////////////////////////////////////////
////////////////// SETTING UP THE SEARCH INPUT FILTER/////////////////////////
//////////////////////////////////////////////////////////////////////////////

// This is a search input text filter to show the products according to what we type in the search input

// const form = document.querySelector(".input-form");
// const searchInput = document.querySelector(".search-input");

// form.addEventListener("keyup", () => {
//   const inputValue = searchInput.value;
//   console.log(inputValue);

//   filteredProducts = products.filter((product) => {
//     return product.name.toLowerCase().includes(inputValue);
//   });
//   displayProducts();
// });

//////////////////////////////////////////////////////////////////////////////
////////// DISPLAYING THE FILTER BUTTONS FORM ( CATEGORY BUTTONS ) ///////////
//////////////////////////////////////////////////////////////////////////////

//

//////////////////////////////////////////////////////////////////////////////
///// MAKING THE FILTER BUTTONS DISPLAY THE DATA ONCE THEY ARE CLICKED ///////
//////////////////////////////////////////////////////////////////////////////

// categoriesDOM.addEventListener("click", (e) => {
//   // console.log(e.target);
//   const htmlElement = e.target;
//   if (htmlElement.classList.contains("category-btn")) {
//     if (htmlElement.dataset.id === "all") {
//       filteredProducts = [...products];
//     } else {
//       filteredProducts = products.filter((product) => {
//         return product.category === htmlElement.dataset.id;
//       });
//     }
//     searchInput.value = "";
//     displayProducts();
//   }
// });
