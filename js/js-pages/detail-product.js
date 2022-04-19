import { message } from "../components/messages.js";
import { products } from "./products.js";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const detailProduct = document.querySelector(".product-hero-flex");

console.log(id);

// If there is no id redirect back to shop page

const product = products.find(function (product) {
  // console.log(typeof product.id);

  if (Number(id) === product.id) {
    console.log(typeof product.id);
    return true;
  }
});

// console.log(product);

const { category, description, name, price, image, thumbnail } = product;

detailProduct.innerHTML = `<div class="product-wrapper">

                            <div class="images-wrapper">
                              <div class="product-image">
                                <img src="${image}" class="img" alt="${name}" />
                              </div>
                              <div class="thumbnail-image">
                                <img src="${thumbnail}" class="img-thumbnail" alt="${name}" />
                                <img src="${thumbnail}" class="img-thumbnail" alt="${name}" />
                                <img src="${thumbnail}" class="img-thumbnail" alt="${name}" />
                                <img src="${thumbnail}" class="img-thumbnail" alt="${name}" />
                              </div>
                            </div>

                            <div class="product-info">
                              <div class="product-info__header">
                                <h2>${name}</h2>
                                <h4 class="h4-light">${category}</h4>
                                <p>${price}</p>
                              </div>
                              <div class="product-info__main">
                                <p>${description}</p>
                              </div>
                              <div class="product-info__footer">
                                <form action="./bag-detail.html" method="get">
                                <button class="btn">Add to cart</button>
                              </div>
                             </div>`;
