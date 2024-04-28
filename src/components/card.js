// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: Функция создания карточки
const addCard = (itemValues, removeCallback, likeCallback, popupImgCallback) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = itemValues.link;
  cardImage.alt = itemValues.name;
  cardTitle.textContent = itemValues.name;

  cardDeleteButton.addEventListener("click", () => removeCallback(cardElement));
  likeButton.addEventListener("click", likeCallback);
  cardImage.addEventListener("click", () => popupImgCallback({ name: itemValues.name, link: itemValues.link }));

  return cardElement;
};

// @todo: Функция удаления карточки
const removeCard = (cardElement) => cardElement.remove();

// Лайк карточек

function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  } 
};

export {addCard, removeCard, likeCard};
