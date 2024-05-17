// Объект настроек валидации

const validationConfig = {
  formSelector: ".popup",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

// Показать ошибку валидации

const showInputError = (popupElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement && errorElement) {
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
  }
};

// Скрыть ошибку валидации

const hideInputError = (popupElement, inputElement, validationConfig) => {
  const errorElement = popupElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  }
};

// Проверка валидности поля

const checkInputValidity = (popupElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(popupElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(popupElement, inputElement, validationConfig);
  }
};

// Проверка наличия невалидных полей

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Переключение состояние кнопки

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationConfig.inactiveButtonClass);
  } else if (buttonElement) {
    buttonElement.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Установка обработчика событий

const setEventListeners = (popupElement, validationConfig) => {
  const inputList = Array.from(
    popupElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = popupElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(popupElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

// Включение валидации

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((popupElement) => {
    popupElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(popupElement, validationConfig);
  });
};

// Сброс ошибок валидации

const clearValidation = (popupElement, validationConfig) => {
  const inputList = Array.from(
    popupElement.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = popupElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, buttonElement, validationConfig);

  inputList.forEach((inputElement) => {
    hideInputError(popupElement, inputElement, validationConfig);
  });
};

export { enableValidation, clearValidation, validationConfig };
