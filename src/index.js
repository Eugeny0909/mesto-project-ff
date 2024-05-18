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

const profileForm = document.forms["edit-profile"];
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileSaveButton = popupProfileEdit.querySelector(".popup__button");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  changeButtonText(true, profileSaveButton);

  editProfile(nameValue, jobValue)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;
      closeModal(popupProfileEdit);
    })
    .catch(console.error)
    .finally(() => {
      changeButtonText(false, profileSaveButton);
    });
};

profileForm.addEventListener("submit", handleProfileFormSubmit);

// Открытие попапа "Новое место"

const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddBtn = document.querySelector(".profile__add-button");

profileAddBtn.addEventListener("click", () => {
  newCardForm.reset();
  clearValidation(popupNewCard, validationConfig);
  openModal(popupNewCard);
});

// Добавление карточек на страницу

const newCardForm = document.forms["new-place"];
const newCardSaveButton = popupNewCard.querySelector(".popup__button");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputUrl = newCardForm.querySelector(".popup__input_type_url");

const handleAddForm = (evt) => {
  evt.preventDefault();

  const cardValue = inputCardName.value;
  const linkValue = inputUrl.value;

  changeButtonText(true, newCardSaveButton);

  addNewCard(cardValue, linkValue)
    .then((cardData) => {
      const cardElement = addCard(cardData, removeCard, likeCard, openPopupImg, profileId);
      placeList.prepend(cardElement);
      closeModal(popupNewCard);
    })
    .catch(console.error)
    .finally(() => {
      changeButtonText(false, newCardSaveButton);
    });
};

newCardForm.addEventListener("submit", handleAddForm);

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
  editAvatarForm.reset();
  clearValidation(popupEditAvatar, validationConfig);
  openModal(popupEditAvatar);
});

// Изменение изображения аватара

const editAvatarForm = document.forms["edit-avatar"];
const AvatarSaveButton = popupEditAvatar.querySelector(".popup__button");
const avatarLinkInput = popupEditAvatar.querySelector(".popup__input_type_url");
const avatarImage = document.querySelector(".profile__image");

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();

  const linkValue = avatarLinkInput.value;

  changeButtonText(true, AvatarSaveButton);

  updateAvatar(linkValue)
    .then((res) => {
      avatarImage.style.backgroundImage = `url('${res.avatar}')`;
      closeModal(popupEditAvatar);
    })
    .catch(console.error)
    .finally(() => {
      changeButtonText(false, AvatarSaveButton);
    });
}

editAvatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Включение валидации форм

enableValidation(validationConfig);

// Изменение текста кнопки пока данные загружаются

const changeButtonText = (isLoading, button) => {
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
  .catch(console.error);