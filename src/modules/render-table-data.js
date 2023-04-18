function renderTableData(users, separator, idSelectedTr) {
  const arrUsers = [...users];
  const tbody = document.querySelector('.table__main-data');
  const collectionTh = document.querySelectorAll('th');

  arrUsers.forEach((item, i) => {
    const tr = document.createElement('tr');
    tr.id = item.id;
    tbody.append(tr);

    if (tr.id === idSelectedTr) {
      tr.style.backgroundColor = '#faf6db';
      tr.classList.add('active-tr');
    }
    if (i >= separator) tr.style.display = 'none'; // опираясь на значение
    // "разделителя", скрываем неактуальные строки таблицы
    if (i < separator - 10) tr.style.display = 'none';

    for (let j = 0; j < 4; j++) {
      const td = document.createElement('td');
      td.classList.add('th-tr-look');
      tr.append(td);

      if (!collectionTh[j].classList.contains('active')) {
        td.style.display = 'none';
      }

      switch (j) {
        case 0:
          td.textContent = item.name.firstName;
          td.classList.add('name');
          break;
        case 1:
          td.textContent = item.name.lastName;
          td.classList.add('last-name');
          break;
        case 2:
          const p = document.createElement('p');
          td.append(p);
          p.textContent = `${item.about}`;
          p.classList.add('about-p');
          td.classList.add('about');
          break;
        case 3:
          if (item.eyeColor === 'blue') {
            td.innerHTML = `<div class="circle blue"></div>`;
          } else if (item.eyeColor === 'brown') {
            td.innerHTML = `<div class="circle brown"></div>`;
          } else if (item.eyeColor === 'green') {
            td.innerHTML = `<div class="circle green"></div>`;
          } else if (item.eyeColor === 'red') {
            td.innerHTML = `<div class="circle red"></div>`;
          }
          td.classList.add('eye-color');
          break;
      }
    }
  });
}

export {renderTableData};
