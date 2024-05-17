const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-13",
  headers: {
    authorization: "9461d58f-ab6e-4d09-b9bf-af27ed341fdd",
    "Content-Type": "application/json",
  },
};

// Проверка ответа и отклонение промиса

const getResData = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
};

// Загрузка информации о пользователе с сервера

const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => getResData(res));
};

// Загрузка карточек с сервера

const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => getResData(res));
};

// Редактирование профиля

const editProfile = (userProfileName, userProfileAbout) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userProfileName,
      about: userProfileAbout,
    }),
  }).then((res) => getResData(res));
};

// Добавление новой карточки на сервер

const addNewCard = (nameCard, linkCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: nameCard,
      link: linkCard,
    }),
  }).then((res) => getResData(res));
};

// Удаление своей карточки

const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResData(res));
};

// Добавление лайка

const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => getResData(res));
};

// Удаление лайка

const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => getResData(res));
};

// Отправка аватара

const updateAvatar = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  }).then((res) => getResData(res));
};

export { getUserInfo, getInitialCards, editProfile, addNewCard, deleteMyCard, addLike, deleteLike, updateAvatar };
