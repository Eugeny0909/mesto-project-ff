const openModal = (item) => {
  item.classList.add("popup_is-animated");
  item.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeOnEsc);
  item.addEventListener("mousedown", closeOnOverlay);
};

const closeModal = (item) => {
  item.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeOnEsc);
  item.removeEventListener("mousedown", closeOnOverlay);
};

const closeOnEsc = (evt) => {
  if (evt.key === "Escape") {
    const PopupIsOpened = document.querySelector(".popup_is-opened");
    closeModal(PopupIsOpened);
  }
};

const closeOnOverlay = (evt) => {
  if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
};

export {openModal, closeModal};