function clearTable() { // очищаем таблицу, удаляя дочерние элементы, а
  // также запоминем и возвращаем id выбранной (нажатой) строки
  const tbody = document.querySelector('tbody');
  let idSelectedTr;
  while (tbody.firstChild) {
    let tr = tbody.children[0];
    if (tr.classList.contains('active-tr')) {
      idSelectedTr = tr.id;
    }
    tbody.removeChild(tbody.firstChild);
  }

  return idSelectedTr;
}

export {clearTable};
