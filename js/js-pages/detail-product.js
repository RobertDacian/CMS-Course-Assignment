import { message } from "../components/messages.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailProduct = document.querySelector(".product-hero-flex");

console.log(id);

const urlDetails = "https://cms-ca-wp.dev-squid.com/wp-json/wc/products/id={id}";

console.log(urlDetails);

async function getSingleJackets() {
  try {
    const response = await fetch(urlDetails);
    const data = await response.json();

    console.log(data);

    createHtml(data);
  } catch (error) {
    console.log(error);
    detailProduct.innerHTML = message("error", "An error occurred.", error);
  }
}

getSingleJackets(urlDetails);

function createHtml(product) {
  detailProduct.innerHTML = `<div class="product-wrapper">
                            <div class="images-wrapper">
                              <div class="product-image">
                                <img src="${product.src}" class="img" alt="${product.name}" />
                              </div>
                              <div class="thumbnail-image">
                                <img src="${product.thumbnail}" class="img-thumbnail" alt="${product.name}" />
                                <img src="${product.thumbnail}" class="img-thumbnail" alt="${product.name}" />
                                <img src="${product.thumbnail}" class="img-thumbnail" alt="${product.name}" />
                                <img src="${product.thumbnail}" class="img-thumbnail" alt="${product.name}" />
                              </div>
                            </div>

                            <div class="product-info">
                              <div class="product-info__header">
                                <h2>${product.name}</h2>
                                <h4 class="h4-light">${product.category}</h4>
                                <p>${product.price_html}</p>
                              </div>
                              <div class="product-info__main">
                                <p>${product.description}</p>
                              </div>
                              <div class="product-info__footer">
                                <form action="./bag-detail.html" method="get">
                                <button class="btn">Add to cart</button>
                              </div>
                             </div>`;
}
