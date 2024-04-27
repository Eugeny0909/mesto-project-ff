import "./pages/index.css"; // импорт главного файла стилей
import { initialCards } from "./scripts/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import { addCard, removeCard, likeCard } from "./components/card.js";

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");

// @todo: Вывести карточки на страницу
initialCards.forEach((item) =>placeList.append(addCard(item, removeCard, likeCard, openPopupImg)));

//   Открытие и закрытие модального окна редактирования профиля

const popupProfileEdit = document.querySelector(".popup_type_edit");
const openProfileEditBtn = document.querySelector(".profile__edit-button");
const closePopupEdit = document.querySelector(".popup__close");

openProfileEditBtn.addEventListener("click", () => {
  openModal(popupProfileEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
});

closePopupEdit.addEventListener("click", () => {
  closeModal(popupProfileEdit);
});

// Редактирование имени и информации в профиле

const formElement = document.querySelector(".popup_type_edit .popup__form");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupProfileEdit);
};

formElement.addEventListener("submit", handleProfileFormSubmit);

// Открытие и закрытие попапа "Новое место"

const popupNewCard = document.querySelector(".popup_type_new-card");
const profileAddBtn = document.querySelector(".profile__add-button");
const closePopupNewCard = popupNewCard.querySelector(".popup__close");

profileAddBtn.addEventListener("click", () => {
  openModal(popupNewCard);
});

closePopupNewCard.addEventListener("click", () => {
  closeModal(popupNewCard);
});

// Отправка формы добавления карточки

const formNewCard = document.querySelector(".popup_type_new-card .popup__form");
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputUrl = document.querySelector(".popup__input_type_url");

const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  const cardData = {
    name: inputCardName.value,
    link: inputUrl.value,
  };

  const cardElement = addCard(cardData, removeCard, likeCard, openPopupImg);
  placeList.prepend(cardElement);
  formNewCard.reset();
  closeModal(popupNewCard);
};

formNewCard.addEventListener("submit", handleAddFormSubmit);

// Открытие и закрытие попапа с картинкой

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImgCaption = document.querySelector(".popup__caption");
const closePopupImage = popupTypeImage.querySelector(".popup__close");

function openPopupImg(evt) {
  const cardElement = evt.target.closest(".card");
  openModal(popupTypeImage);

  const cardImage = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__title");

  if (cardText && cardImage) {
    popupImage.src = cardImage.src;
    popupImage.alt = cardText.textContent;
    popupImgCaption.textContent = cardText.textContent;
  }

  closePopupImage.addEventListener("click", () => {
    closeModal(popupTypeImage);
  });
}
