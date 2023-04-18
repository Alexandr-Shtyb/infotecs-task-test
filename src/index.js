import users from '/db/db.json';
import {renderTableData} from './modules/render-table-data';
import {callByClick} from './modules/call-by-click';
import {createPagination} from './modules/create-pagination';
import {clearTable} from './modules/clear-table';
import {sortTable} from './modules/sort-table';
import {createEditingForm} from './modules/create-editing-form';
import {
  deleteEditingForm,
  deleteEditingFormByKey
} from './modules/delete-editing-form';

import './index.html';
import './index.css';

let sortedUsers; // переменная для того, чтобы передавать актуальные данные
// в renderTable
let idSelectedTr; // переменная для того, чтобы "запоминать" id выбранной
// (нажатой) строчки таблицы
let separator = 10; // вычисляемый "разделитель", чтобы показывать актуальные
// данные в зависимости от выбранной страницы
const divTrigger = document.querySelector('.control-buttons');
const controlBtns = document.querySelectorAll('.control-buttons__btn');
const divPagination = document.querySelector('.pagination');
const collectionTh = document.querySelectorAll('th');
const tbody = document.querySelector('tbody');
const objStateBtns = { // объект состояния кнопок, чтобы корректно работало
  // скрытие/показ
  ['name']: true,
  ['last-name']: true,
  ['about']: true,
  ['eye-color']: true,
  ['all-col']: true,
};

renderTableData(users, separator);
createPagination(users);

divTrigger.addEventListener('click', (e) => { // обработчик на родительский
  // элемент кнопок
  const btn = e.target;
  if (btn.matches('#hide-name') || btn.matches('#hide-last-name') || btn.matches('#hide-about')
    || btn.matches('#hide-eye-color') || btn.matches('#hide-all-col')) {
    objStateBtns[btn.id.slice(5)] = !objStateBtns[btn.id.slice(5)]; // изменение состояния выбранной кнопки

    let textBtn = (objStateBtns[btn.id.slice(5)]) ? `Скрыть ${btn.dataset.btn}` : `Показать ${btn.dataset.btn}`;

    if (btn.id === 'hide-all-col') {
      for (let key in objStateBtns) { // приведение к одному состоянию в
        // случае сокрытия/показа всех кнопок
        objStateBtns[key] = objStateBtns['all-col'];
      }

      controlBtns.forEach((item, i) => {
        if (i < controlBtns.length - 1) {
          let textBtn = (objStateBtns[item.id.slice(5)]) ? `Скрыть ${item.dataset.btn}` : `Показать ${item.dataset.btn}`;
          item.textContent = textBtn;
        }
      });

      callByClick(btn, objStateBtns);
      btn.textContent = textBtn;
    } else {
      const allColBtn = document.getElementById('hide-all-col');
      // изменение состояния последней кнопки в соответствии с остальными
      // кнопками
      if (!objStateBtns['name'] && !objStateBtns['last-name'] && !objStateBtns['about'] && !objStateBtns['eye-color']) {
        objStateBtns['all-col'] = false;
        allColBtn.textContent = `Показать ${allColBtn.dataset.btn}`;
      } else if (!objStateBtns['name'] || !objStateBtns['last-name'] || !objStateBtns['about'] || !objStateBtns['eye-color']) {
        objStateBtns['all-col'] = true;
        allColBtn.textContent = `Скрыть ${allColBtn.dataset.btn}`;
      }

      callByClick(btn, objStateBtns);
      btn.textContent = textBtn;
    }
  }
});

collectionTh.forEach(item => item.addEventListener('click', (e) => {
  if (item.classList.contains('des-order')) { // направления для сортировки
    item.classList.remove('des-order');
    item.classList.add('asc-order');
  } else {
    item.classList.add('des-order');
    item.classList.remove('asc-order');
  }

  collectionTh.forEach(item => { // видимость текущей сортировки
    if ((item.classList.contains('des-order') || item.classList.contains('asc-order')) && (item !== e.target)) {
      item.classList.remove('des-order');
      item.classList.remove('asc-order');
    }
  });
  sortedUsers = sortTable(e, users, separator); // сортировка и получение
  // актуальных данных
}));

divPagination.addEventListener('click', (e) => { // обработка переходов по
  // разным страницам
  const btn = e.target;
  if (btn.matches('.pagination__btn')) {
    const collectionBtnPagination = document.querySelectorAll('.pagination__btn');
    collectionBtnPagination.forEach(item => item.classList.remove('active-page'));

    btn.classList.add('active-page');
    separator = +btn.dataset.page * 10; // вычисление "разделителя" для
    // дальнейшего скрытия неатуальных данных

    idSelectedTr = clearTable(); // очистка таблицы и получение id выбранной
    // (нажатой) строки
    renderTableData(sortedUsers || users, separator, idSelectedTr);
  }
});


const observer = new MutationObserver(deleteEditingFormByKey);
// слежение за изменением tbody для навешивания события
const config = {
  attributes: true,
  childList: true,
  subtree: true
};
observer.observe(tbody, config);

tbody.addEventListener('click', (e) => { // показ выбранной (нажатой) строки
  if (e.target.tagName === 'TD' || e.target.tagName === 'DIV' || e.target.tagName === 'P') {
    let elem = (e.target.tagName === 'TD') ? e.target.parentNode : e.target.parentNode.parentNode;
    if (tbody.classList.contains('active-form')) {
      tbody.classList.remove('active-form');
      deleteEditingForm();
    }

    document.querySelectorAll('tbody tr').forEach(item => {
      item.style.backgroundColor = '#fff';
      item.classList.remove('active-tr');
    });
    elem.style.backgroundColor = '#faf6db';
    elem.classList.add('active-tr');
    tbody.classList.add('active-form');
    createEditingForm(sortedUsers || users, elem);
  }
});

tbody.addEventListener('mousemove', (e) => {
  if (e.target.tagName === 'TD' || e.target.tagName === 'DIV' || e.target.tagName === 'P') {
    const elem = (e.target.tagName === 'TD') ? e.target.parentNode : e.target.parentNode.parentNode;
    if (!tbody.classList.contains('active-form')) {
      elem.style.backgroundColor = '#faf6db';
      elem.style.transition = 'background-color' +
        ' .3s ease';
    }
  }
});

tbody.addEventListener('mouseout', (e) => {
  if (e.target.tagName === 'TD' || e.target.tagName === 'DIV' || e.target.tagName === 'P') {
    const elem = (e.target.tagName === 'TD') ? e.target.parentNode : e.target.parentNode.parentNode;
    if (!tbody.classList.contains('active-form')) {
      elem.style.backgroundColor = '#fff';
      elem.style.transition = 'background-color' +
        ' .3s ease';
    }
  }
});



