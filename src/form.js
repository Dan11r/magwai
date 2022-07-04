export default class Form {
  constructor({ formSelector, onSubmit }) {
    this.form = document.querySelector(formSelector);
    this.submitHandler(onSubmit);
  }
  submitHandler(onSubmit) {
    this.form.addEventListener("submit", onSubmit);
  }
  formAddError(field, message) {
    let p = document.createElement("p");
    p.innerText = message;
    p.classList.add("errorMessage");
    field.classList.add("_error");

    field.parentElement.appendChild(p);
  }
  formRemoveError(field) {
    let p = field.parentElement.querySelector(".errorMessage");
    if (p) {
      field.parentElement.removeChild(p);
    }
    field.classList.remove("_error");
  }
}
