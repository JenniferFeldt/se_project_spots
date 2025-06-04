const showInputError = (formEl, inputEl, errorMessage, config) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(config.inputErrorClass);
  errorEl.textContent = errorMessage;
  errorEl.classList.add(config.errorClass);
};

const hideInputError = (formEl, inputEl, config) => {
  const errorEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(config.inputErrorClass);
  errorEl.textContent = "";
  errorEl.classList.remove(config.errorClass);
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => !input.validity.valid);
};

const toggleButtonState = (inputList, buttonEl, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEl, config); //  disables
  } else {
    buttonEl.classList.remove(config.inactiveButtonClass);
    buttonEl.disabled = false; //enables
  }
};
export const disableButton = (buttonEl, config) => {
  buttonEl.classList.add(config.inactiveButtonClass);
  buttonEl.disabled = true;
};

export const resetValidation = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  inputList.forEach((input) => hideInputError(formEl, input, config));
  toggleButtonState(inputList, buttonEl, config); // always reset state
};

const setEventListeners = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  const buttonEl = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, buttonEl, config);

  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formEl, input, config);
      toggleButtonState(inputList, buttonEl, config);
    });
  });
};

export const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((formEl) => {
    setEventListeners(formEl, config);
  });
};
