// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placeList = document.querySelector(".places__list");

// @todo: Функция создания карточки
const addCard = (itemValues, removeCallback) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  cardElement.querySelector(".card__image").src = itemValues.link;
  cardElement.querySelector(".card__image").alt = itemValues.name;
  cardElement.querySelector(".card__title").textContent = itemValues.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", () => removeCallback(cardElement));

  return cardElement;
};

// @todo: Функция удаления карточки
const removeCard = (cardElement) => {
  cardElement.querySelector(".card__delete-button").closest(".card").remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  placeList.append(addCard(item, removeCard));
});
