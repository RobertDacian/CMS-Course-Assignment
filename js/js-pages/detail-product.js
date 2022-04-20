import { message } from "../components/messages.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailProduct = document.querySelector(".product-hero-flex");

console.log(id);

const url = "https://cms-ca-wp.dev-squid.com/wp-json/wc/store/products/" + id;

console.log(url);

async function getSingleJackets() {
  try {
    const response = await fetch(url);
    const singleResult = await response.json();
    console.log(singleResult);

    console.log(response);

    createHtml(singleResult);
  } catch (error) {
    console.log(error);
    detailProduct.innerHTML = message("error", "An error occurred.", error);
  }
}

getSingleJackets(url);

function createHtml(singleProduct) {
  detailProduct.innerHTML = `<div class="product-wrapper">
                            <div class="images-wrapper">
                              <div class="product-image">
                                <img src="${singleProduct.images[0].src}" class="img" alt="${singleProduct.name}" />
                              </div>
                              <div class="thumbnail-image">
                                <img src="${singleProduct.images[0].thumbnail}" class="img-thumbnail" alt="${singleProduct.name}" />
                                <img src="${singleProduct.images[0].thumbnail}" class="img-thumbnail" alt="${singleProduct.name}" />
                                <img src="${singleProduct.images[0].thumbnail}" class="img-thumbnail" alt="${singleProduct.name}" />
                                <img src="${singleProduct.images[0].thumbnail}" class="img-thumbnail" alt="${singleProduct.name}" />
                              </div>
                            </div>

                            <div class="product-info">
                              <div class="product-info__header">
                                <h2>${singleProduct.name}</h2>
                                <h4 class="h4-light">${singleProduct.categories[0].name}</h4>
                                <p>${singleProduct.price_html}</p>
                              </div>
                              <div class="product-info__main">
                                <p>${singleProduct.description}</p>
                              </div>
                              <div class="product-info__footer">
                                <form action="./bag-detail.html" method="get">
                                <button class="btn">Add to cart</button>
                              </div>
                             </div>`;
}
