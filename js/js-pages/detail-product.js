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



/////////////////////////////////SLIDER /////////////////////////////

// let slidePosition = 0;
// const slides = document.querySelectorAll(".slide-item");
// const totalSlides = slides.length;
// console.log(totalSlides);

// document.getElementById("next-btn").addEventListener("click", function () {
//   console.log("Test next");
//   moveToNextSlide();
// });

// document.getElementById("prev-btn").addEventListener("click", function () {
//   console.log("Test prev");
//   moveToPreviousSlide();
// });

// function updateSlidePosition() {
//   for (let slide of slides) {
//     slide.classList.remove("slide-visible");
//     slide.classList.add("slide--hidden");
//   }

//   slides[slidePosition].classList.add("slide-visible");
// }

// function moveToNextSlide() {
//   console.log("Hello next function");

//   if (slidePosition === totalSlides - 1) {
//     slidePosition = 0;
//   } else {
//     slidePosition++;
//   }

//   updateSlidePosition();
// }

// function moveToPreviousSlide() {
//   console.log("Hello previous function");

//   if (slidePosition === 0) {
//     slidePosition = totalSlides - 1;
//   } else {
//     slidePosition--;
//   }

//   updateSlidePosition(totalSlides);
// }

