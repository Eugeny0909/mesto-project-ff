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

const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (inputElement && errorElement) {
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.errorClass);
  }
};

// Скрыть ошибку валидации

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  if (errorElement) {
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.errorClass);
    errorElement.textContent = "";
  }
};

// Проверка валидности поля

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

// Проверка наличия невалидных полей

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Переключение состояние кнопки

const toggleButtonState = (inputList, submitButton, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    submitButton.disabled = true;
    submitButton.classList.add(validationConfig.inactiveButtonClass);
  } else if (submitButton) {
    submitButton.disabled = false;
    submitButton.classList.remove(validationConfig.inactiveButtonClass);
  }
};

// Установка обработчика событий

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  toggleButtonState(inputList, submitButton, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, submitButton, validationConfig);
    });
  });
};

// Включение валидации

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
};

// Сброс ошибок валидации

const clearValidation = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const submitButton = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(inputList, submitButton, validationConfig);

  inputList.forEach((inputElement) => {hideInputError(formElement, inputElement, validationConfig);});
};

export { enableValidation, clearValidation, validationConfig };
