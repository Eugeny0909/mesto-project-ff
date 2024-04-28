const openModal = (item) => {
  item.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
};

const closeModal = (item) => {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
};

const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const popupIsOpened = document.querySelector(".popup_is-opened");
    closeModal(popupIsOpened);
  }
};

const closeOnOverlay = (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
};

export { openModal, closeModal, closeOnOverlay };
