import {
  enableValidation,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";

import "./index.css";

import { enableValidation } from "../scripts/validation.js";
import { validationConfig } from "../scripts/validation-config.js"; // if exists
enableValidation(validationConfig);
import Api from ".."

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c6b032d7-341c-4d5e-a157-9e62fbe1626d",
    "Content-Type": "application/json",
  },
});

api.getInitialCards().then((cards) => {
  console.log;
});

// === DOM ELEMENTS ===
const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = document.querySelector("#profile-name-input");
const editProfileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostForm = newPostModal.querySelector(".modal__form");
const newPostCardImageInput = document.querySelector("#card-image-input");
const newPostCaptionInput = document.querySelector("#caption-input");

const previewModal = document.querySelector("#preview-modal");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardsList = document.querySelector(".cards__list");

// === MODAL FUNCTIONS ===
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_is-opened");
    if (openModal) closeModal(openModal);
  }
}

// Close modal on overlay click
const modals = document.querySelectorAll(".modal");
modals.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target === modal) {
      closeModal(modal);
    }
  });
});

// Universal close button handler
const closeButtons = document.querySelectorAll(".modal__close-btn");
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// === CARD FUNCTIONS ===
function getCardElement(data) {
  const cardEl = cardTemplate.cloneNode(true);
  const img = cardEl.querySelector(".card__image");
  cardEl.querySelector(".card__title").textContent = data.name;
  img.src = data.link;
  img.alt = data.name;

  cardEl.querySelector(".card__like-btn").addEventListener("click", (e) => {
    e.target.classList.toggle("card__like-btn_active");
  });

  cardEl.querySelector(".card__delete-btn").addEventListener("click", () => {
    cardEl.remove();
  });

  img.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardEl;
}

// === EVENT LISTENERS ===
editProfileBtn.addEventListener("click", () => {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, settings);
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (e) => {
  e.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => {
  resetValidation(newPostForm, settings);
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = newPostCaptionInput.value.trim();
  const link = newPostCardImageInput.value.trim();
  const newCard = getCardElement({ name, link });

  cardsList.prepend(newCard);
  newPostForm.reset();

  const button = e.submitter;
  disableButton(button, settings);
  closeModal(newPostModal);
});

// === INIT ===
initialCards.forEach((card) => cardsList.append(getCardElement(card)));
enableValidation(settings);
