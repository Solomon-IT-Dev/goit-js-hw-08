import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  formInput: document.querySelector('.feedback-form input'),
  formTextarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const userFeedbackData = {};

refs.feedbackForm.addEventListener('input', throttle(formInputHandler, 500));
populateSavedData();
refs.feedbackForm.addEventListener('submit', onSubmitFormBtnClick);

function formInputHandler(e) {
  userFeedbackData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFeedbackData));
}

function populateSavedData() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData) {
    refs.formInput.value = savedFormData.email;
    refs.formTextarea.value = savedFormData.message;
  }
}

function onSubmitFormBtnClick(e) {
  e.preventDefault();
  if (e.currentTarget.email.value === '' || e.currentTarget.message.value === '') {
    alert('Please, fill in empty areas in order to submit form!');
  } else {
    const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
    console.log('formData: ', savedFormData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
