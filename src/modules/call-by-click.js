function callByClick(btn, objStateBtns) { // в завсимости от состояния
  // кнопки вызываем нужную функцию
  if (objStateBtns[btn.id.slice(5)]) {
    if (btn.id !== 'hide-all-col') document.querySelector(`.${btn.id.slice(5)}-th`).classList.add('active');
    showByClick(btn.id, objStateBtns);
  } else {
    if (btn.id !== 'hide-all-col') document.querySelector(`.${btn.id.slice(5)}-th`).classList.remove('active');
    hideByClick(btn.id);
  }
}

function hideByClick(idBtn) {
  if (idBtn !== 'hide-all-col') {
    document.querySelector(`.${idBtn.slice(5)}-th`).style.display = 'none';

    const collectionTd = document.querySelectorAll(`.${idBtn.slice(5)}`);
    collectionTd.forEach(item => item.style.display = 'none');

  } else {
    const collectionTd = document.querySelectorAll(`td`);
    const collectionTh = document.querySelectorAll(`th`);
    collectionTh.forEach(item => {
      if (item.classList.contains('active')) {
        item.classList.remove('active');
      }
    });
    collectionTd.forEach(item => item.style.display = 'none');
  }
}

function showByClick(idBtn, objStateBtns) {
  if (idBtn !== 'hide-all-col') {
    if (objStateBtns['all-col']) {
      const collectionTh = document.querySelectorAll('th');
      collectionTh.forEach(item => {
        if (!item.classList.contains('active')) {
          item.style.display = 'none';
        }
      });

      collectionTh.forEach(item => {
        if (item.classList.contains(`${idBtn.slice(5)}-th}`)) {
          item.style.display = '';
        }
      });
    }
    document.querySelector(`.${idBtn.slice(5)}-th`).style.display = '';

    const collectionTd = document.querySelectorAll(`.${idBtn.slice(5)}`);
    collectionTd.forEach(item => item.style.display = '');
  } else {
    const collectionTh = document.querySelectorAll(`th`);
    if (objStateBtns['name'] && objStateBtns['last-name'] && objStateBtns['about'] && objStateBtns['eye-color'] && objStateBtns['all-col']) {
      collectionTh.forEach(item => item.style.display = '');
    }
    const collectionTd = document.querySelectorAll(`td`);
    collectionTh.forEach(item => {
      if (!item.classList.contains('active')) {
        item.classList.add('active');
      }
    });
    collectionTd.forEach(item => item.style.display = '');
  }
}

export {callByClick};
