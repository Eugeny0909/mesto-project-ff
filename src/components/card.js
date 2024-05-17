import { deleteLike, addLike, deleteMyCard } from "../components/api.js";

// Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// Cоздание карточки

const addCard = (cardData, removeCallback, likeCallback, popupImgCallback, profileId) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  const isLiked = cardData.likes.some((like) => like._id === profileId);
  if (isLiked) likeButton.classList.toggle("card__like-button_is-active");
  likeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === profileId) cardDeleteButton.style.display = "block";
  else cardDeleteButton.style.display = "none";

  cardDeleteButton.addEventListener("click", () => removeCallback(cardElement, cardData));
  likeButton.addEventListener("click", () => likeCallback(cardData, likeButton, likeCounter));
  cardImage.addEventListener("click", () => popupImgCallback({ name: cardData.name, link: cardData.link }));

  return cardElement;
};

// Удаление карточки

const removeCard = (cardElement, cardData) => {
  deleteMyCard(cardData._id)
    .then(() => cardElement.remove())
    .catch((error) => {
      console.log(error);
    });
};

// Постановка и удаление лайка

const likeCard = (cardData, likeButton, likeCounter) => {
  const likeFunction = likeButton.classList.contains("card__like-button_is-active")
    ? deleteLike
    : addLike;

  likeFunction(cardData._id)
    .then((data) => {
      likeCounter.textContent = data.likes.length;
      likeButton.classList.toggle("card__like-button_is-active");
    })
    .catch((error) => {
      console.log(error);
    });
};

export { addCard, removeCard, likeCard };
