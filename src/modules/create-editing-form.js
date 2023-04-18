import logo from '/src/icons/infotecs.svg';
import {deleteEditingForm} from './delete-editing-form';

function createEditingForm(users, elem) {
  const collectionTh = document.querySelectorAll('th');
  const container = document.querySelector('.container');
  const div = document.createElement('div');
  const form = document.createElement('form');
  const inputName = document.createElement('input');
  const inputLastName = document.createElement('input');
  const textAreaAbout =  document.createElement('textarea');
  const divBtn = document.createElement('div');
  const btnEdit = document.createElement('button');
  const btnCancel = document.createElement('button');

  form.classList.add('editing-form__form');
  textAreaAbout.classList.add('editing-form__textarea', 'textarea-about');
  inputName.classList.add('editing-form__input', 'input-name');
  inputLastName.classList.add('editing-form__input', 'input-last-name');
  div.classList.add('editing-form');
  divBtn.classList.add('editing-form__btn-group');
  btnEdit.textContent = 'Редактировать';
  btnEdit.classList.add('editing-form__btn', 'btn-edit');
  btnCancel.textContent = 'Отмена';
  btnCancel.id = 'btn-cancel';
  btnCancel.classList.add('editing-form__btn');

  container.append(div);
  div.innerHTML = `<img class="editing-form__logo" src="${logo}" alt="logo">`;
  div.append(form);
  form.append(inputName, inputLastName, textAreaAbout);

  collectionTh.forEach((item, i) => {
    const divInfo = document.createElement('div');
    const span = document.createElement('span');
    if (i === 3) divInfo.classList.add('editing-form__item', 'item-eye-color');
    divInfo.classList.add('editing-form__item');
    span.classList.add('editing-form__prop');
    form.append(divInfo);
    divInfo.append(span);

    switch (i) {
      case 0:
        divInfo.append(inputName);
        inputName.value = `${elem.children[i].textContent}`;
        span.classList.add('span-name');
        span.textContent = 'Имя: ';
        break;
      case 1:
        divInfo.append(inputLastName);
        inputLastName.value = `${elem.children[i].textContent}`;
        span.classList.add('span-last-name');
        span.textContent = 'Фамилия: ';
        break;
      case 2:
        divInfo.append(textAreaAbout);
        textAreaAbout.value = `${elem.children[i].textContent}`;
        span.textContent = 'Описание: ';
        break;
      case 3:
        const circleEyeColor = elem.children[i].firstChild.cloneNode(false);
        divInfo.append(circleEyeColor);
        circleEyeColor.classList.add('div-eye-color');
        span.classList.add('span-eye-color');
        span.textContent = 'Цвет глаз: ';
        for (let i = 0; i < 4; i++) {
          const btn = document.createElement('button');
          btn.classList.add('editing-form__btn-eye-color');
          btn.addEventListener('click', (e) => {
            const divSelectedColor = document.querySelector('.div-eye-color');
            let divColor = e.target;
            if (divColor.tagName === 'BUTTON') divColor = e.target.firstChild;
            divSelectedColor.classList.remove('blue', 'brown', 'green', 'red');
            divSelectedColor.classList.add(`${divColor.classList[1] || divColor.classList[divColor.classList.length - 1]}`);
          });

          if (i === 0) {
            const selector = document.querySelector('.blue');
            createChoiceCircle(selector, btn);
          } else if (i === 1) {
            const selector = document.querySelector('.brown');
            createChoiceCircle(selector, btn);
          } else if (i === 2) {
            const selector = document.querySelector('.green');
            createChoiceCircle(selector, btn);
          } else if (i === 3) {
            const selector = document.querySelector('.red');
            createChoiceCircle(selector, btn);
          }
          divInfo.append(btn);
        }
        break;
    }
  });

  btnEdit.addEventListener('click', () => {
    const collectionTr = document.querySelectorAll('tr');
    const currentTr = Array.from(collectionTr).find(item => item.id === elem.id);
    const currentTrIndex = Array.from(collectionTr).findIndex(item => item.id === elem.id);

    currentTr.style.backgroundColor = '#fff';

    currentTr.children[0].textContent = inputName.value; // записываем
    // акутальные данные
    users[currentTrIndex - 1].name.firstName = inputName.value; // меняем
    // значение нужного свойства у объекта

    currentTr.children[1].textContent = inputLastName.value;
    users[currentTrIndex - 1].name.lastName = inputLastName.value;

    currentTr.children[2].children[0].textContent = textAreaAbout.value;
    users[currentTrIndex - 1].about = textAreaAbout.value;

    const divTableEyeColor = document.querySelector('.div-eye-color');
    currentTr.children[3].children[0].classList.remove('blue', 'brown', 'green', 'red');

    const divTableEyeColorClass = Array.from(divTableEyeColor.classList).find(item => { // получаем нужный класс для отображения выбранного
      // цвета глаз
      return item === 'blue' || item === 'brown' || item === 'green' || item === 'red';
    });
    currentTr.children[3].children[0].classList.add(divTableEyeColorClass);
    users[currentTrIndex - 1].eyeColor = divTableEyeColorClass;

    collectionTr.forEach(item => item.classList.remove('active-tr'));
    deleteEditingForm();
  });

  btnCancel.addEventListener('click', () => {
    const collectionTr = document.querySelectorAll('tr');
    collectionTr.forEach(item => {
      item.style.backgroundColor = '#fff';
      item.classList.remove('active-tr');
    });
    deleteEditingForm();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
  });

  form.append(divBtn);
  divBtn.append(btnEdit, btnCancel);
}

function createChoiceCircle(selector, btn) {
  const cloneCircle = selector.cloneNode(false);
  cloneCircle.classList.add('editing-form__choice-circle');
  btn.append(cloneCircle);
}

export {createEditingForm};
