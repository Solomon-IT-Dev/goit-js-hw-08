import throttle from 'lodash.throttle';

const refs = {
  feedbackForm: document.querySelector('.feedback-form'),
  formInput: document.querySelector('.feedback-form input'),
  formTextarea: document.querySelector('.feedback-form textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const formFeedbackData = {};
const userFormData = {
  email: refs.formInput,
  message: refs.formTextarea,
};

refs.feedbackForm.addEventListener('input', throttle(formInputHandler, 500));
refs.feedbackForm.addEventListener('submit', onSubmitFormBtnClick);
populateSavedData();

function formInputHandler(e) {
  formFeedbackData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formFeedbackData));
}

function populateSavedData() {
  const savedFormData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (savedFormData.email) {
    userFormData.email.value = savedFormData.email;
    formFeedbackData.email = userFormData.email.value;
  }
  if (savedFormData.message) {
    userFormData.message.value = savedFormData.message;
    formFeedbackData.message = userFormData.message.value;
  }
}

function onSubmitFormBtnClick(e) {
  e.preventDefault();
  if (e.currentTarget.email.value === '' || e.currentTarget.message.value === '') {
    alert('Please, fill in empty areas in order to submit form!');
  } else {
    console.log('formData: ', formFeedbackData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
}
