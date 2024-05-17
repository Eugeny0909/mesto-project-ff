// Импорт файлов

import "./pages/index.css";
import { openModal, closeModal, closeOnOverlay } from "./components/modal.js";
import { addCard, removeCard, likeCard } from "./components/card.js";
import { enableValidation, clearValidation, validationConfig } from "./components/validation.js";
import { getUserInfo, getInitialCards, editProfile, addNewCard, updateAvatar } from "./components/api.js";

// DOM узлы

const placeList = document.querySelector(".places__list");

// Открытие модального окна редактирования профиля

const popupProfileEdit = document.querySelector(".popup_type_edit");
const openProfileEditBtn = document.querySelector(".profile__edit-button");
const buttonCloseList = document.querySelectorAll(".popup__close");

openProfileEditBtn.addEventListener("click", () => {
  openModal(popupProfileEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(popupProfileEdit, validationConfig);
});

// Закрытие попапов

buttonCloseList.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", closeOnOverlay);
});

// Редактирование имени и информации в профиле

const formElement = document.querySelector(".popup_type_edit .popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  loadingButton(true, formElement.querySelector(".popup__button"));

  editProfile(nameValue, jobValue)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(popupProfileEdit);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingButton(false, formElement.querySelector(".popup__button"));
    });
};

formElement.addEventListener("submit", handleProfileFormSubmit);

// Открытие попапа "Новое место"

const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddBtn = document.querySelector(".profile__add-button");

profileAddBtn.addEventListener("click", () => {
  formNewCard.reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});

// Добавление карточек на страницу

const formNewCard = document.querySelector(".popup_type_new-card .popup__form");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputUrl = formNewCard.querySelector(".popup__input_type_url");

const handleAddForm = (evt) => {
  evt.preventDefault();

  const cardValue = inputCardName.value;
  const linkValue = inputUrl.value;

  loadingButton(true, formNewCard.querySelector(".popup__button"));

  addNewCard(cardValue, linkValue)
    .then((cardData) => {
      const cardElement = addCard(cardData, removeCard, likeCard, openPopupImg, profileId);
      placeList.prepend(cardElement);
      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingButton(false, formNewCard.querySelector(".popup__button"));
    });
};

formNewCard.addEventListener("submit", handleAddForm);

// Открытие попапа с картинкой

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");

function openPopupImg({ name, link }) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImgCaption.textContent = name;

  openModal(popupTypeImage);
}

// Открытие попапа редактирования аватара

const popupEditAvatar = document.querySelector(".popup_type_avatar");
const avatarImageButton = document.querySelector(".profile__image-cover");

avatarImageButton.addEventListener("click", () => {
  clearValidation(popupEditAvatar, validationConfig);
  editAvatarForm.reset();
  openModal(popupEditAvatar);
});

// Изменение изображения аватара

const editAvatarForm = document.querySelector(".popup_type_avatar .popup__form");
const avatarLinkInput = popupEditAvatar.querySelector(".popup__input_type_url");
const avatarImage = document.querySelector(".profile__image");

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const linkValue = avatarLinkInput.value;

  loadingButton(true, editAvatarForm.querySelector(".popup__button"));

  updateAvatar(linkValue)
    .then((res) => {
      avatarImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(popupEditAvatar);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loadingButton(false, editAvatarForm.querySelector(".popup__button"));
    });
}

editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Включение валидации форм

enableValidation(validationConfig);

// Изменение текста кнопки пока данные загружаются

const loadingButton = (isLoading, button) => {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
};

//Получение информации о пользователе и карточках с сервера и заполнение ими страницы

let profileId;

Promise.all([getUserInfo(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileId = profileData._id;

    avatarImage.style.backgroundImage = `url(\\${profileData.avatar})`;

    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardsData.forEach((item) => {
      placeList.append(addCard(item, removeCard, likeCard, openPopupImg, profileId));
    });
  })
  .catch((error) => {
    console.log(error);
  });