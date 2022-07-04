import Inputmask from "inputmask";
import RequestForm from "./form.js";

import "./styles/index.scss";
import { getPhotos, getPosts } from "./api";

//slider-------------------------------------------------------------------------
const sliderItems = document.querySelectorAll(".slider__item");
const sliderLine = document.querySelector(".slider .slider__line");
let count = 0;
let width;

function init() {
  width = document.querySelector(".slider").offsetWidth;
  sliderLine.style.width = width * sliderItems.length + "px";
  sliderItems.forEach((item) => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
  rollSlider();
}

init();
window.addEventListener("resize", init);

document
  .querySelector(".slider__nav")
  .addEventListener("click", function (event) {
    if (event.target.id) {
      const arr = event.target.id.split("-");
      count = arr[arr.length - 1];
      rollSlider();
    }
  });

function rollSlider() {
  sliderLine.style.transform = "translate(-" + count * width + "px)";
}

let inputs = document.querySelectorAll('input[type="tel"]');
let inputMask = new Inputmask("+7 (999) 999-99-99");
inputMask.mask(inputs);

//Form-------------------------------------------------------------------------
const closeForm = () => {
  const closeButton = document.querySelector(".closeForm");
  const formSection = document.querySelector(".requestForm");
  closeButton.addEventListener("click", () => {
    formSection.classList.remove("requestForm_open");
  });
};
const openForm = () => {
  const openButton = document.querySelectorAll(".sendRequest");
  const formSection = document.querySelector(".requestForm");
  openButton.forEach((b) => {
    b.addEventListener("click", () => {
      formSection.classList.add("requestForm_open");
    });
  });
};
openForm();
closeForm();
function onSubmit(e) {
  e.preventDefault();
  let errorsCount = formValidate();
  if (errorsCount === 0) {
    alert("данные отправлены");
    e.target.reset();
  }
}

const requestForm = new RequestForm({
  formSelector: ".requestForm__form",
  onSubmit,
});

function formValidate() {
  let errorsCount = 0;
  let fields = document.querySelectorAll(
    ".requestForm__form-item input, textarea",
  );
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    requestForm.formRemoveError(field);
    if (field.name === "name") {
      nameValidation(field);
    } else if (field.name === "email") {
      emailValidate(field);
    } else if (field.name === "tel") {
      telValidation(field);
    } else if (field.name === "yourRequest") {
      yourRequestValidation(field);
    }
  }
  function emailValidate(field) {
    if (!field.value) {
      requestForm.formAddError(field, "это обязательное поле");
      errorsCount++;
    } else if (
      !field.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      requestForm.formAddError(field, "Введите корректный email");
      errorsCount++;
    }
  }
  function nameValidation(field) {
    if (!field.value) {
      requestForm.formAddError(field, "это обязательное поле");
      errorsCount++;
    } else if (field.value.length > 50) {
      requestForm.formAddError(field, "Максимальное кол-во символов: 50");
      errorsCount++;
    }
  }
  function telValidation(field) {
    if (!field.value) {
      requestForm.formAddError(field, "это обязательное поле");
      errorsCount++;
    }
  }
  function yourRequestValidation(field) {
    if (field.value.length > 500) {
      requestForm.formAddError(field, "Максимальное кол-во символов: 500");
      errorsCount++;
    }
  }
  return errorsCount;
}
//burger-------------------------------------------------------------------------
const menu = document.querySelector(".menu-icon");
const navMenu = document.querySelector(".navList");
const Buttons = document.querySelector(".Buttons");
if (menu) {
  menu.addEventListener("click", () => {
    menu.classList.toggle("menu-icon--active");
    navMenu.classList.toggle("navList--active");
    Buttons.classList.toggle("Buttons--active");
  });
}
//fetch posts-------------------------------------------------------------------------

const loadMore = document.querySelector(".loadMore");
const cardsList = document.querySelector(".cards-list");

const loadPosts = async () => {
  const posts = await getPosts();
  const photos = await getPhotos(1, 1);
  cardsList.insertAdjacentHTML(
    "beforeend",
    posts.map(
      (p) => `<li class="card-item">
              <img
              width="320"
              height="180"
                class="card-item__image"
                src=${photos[0].url}
                alt="card\`s background"
              />
              <div class="card-item__content">
                <h4 class="card-item__title">${p.title}</h4>
                <p class="description">
                  How to increase your productivity with a Music
                </p>
                <p>
                  ${p.body}
                </p>
                <p>Posted by Eugenia, on July 24, 2019</p>
                <button class="secondaryButton">Continue reading</button>
              </div>
            </li>`,
    ),
  );
};
loadMore.addEventListener("click", loadPosts);
