import {renderTableData} from './render-table-data';
import {clearTable} from './clear-table';

function sortTable(e, users, separator) {
  let idSelectedTr;
  const usersCopy = [...users];
  const th = e.target;
  switch (th.id) {
    case 'name-th':
      usersCopy.sort((a, b) => {
        if (a.name.firstName > b.name.firstName) {
          return 1;
        } else if (a.name.firstName < b.name.firstName) {
          return -1;
        }
        return 0;
      });
      break;
    case 'last-name-th':
      usersCopy.sort((a, b) => {
        if (a.name.lastName > b.name.lastName) {
          return 1;
        } else if (a.name.lastName < b.name.lastName) {
          return -1;
        }
        return 0;
      });
      break;
    case 'about-th':
      usersCopy.sort((a, b) => {
        if (a.about > b.about) {
          return 1;
        } else if (a.about < b.about) {
          return -1;
        }
        return 0;
      });
      break;
    case 'eye-color-th':
      usersCopy.sort((a, b) => {
        if (a.eyeColor > b.eyeColor) {
          return 1;
        } else if (a.eyeColor < b.eyeColor) {
          return -1;
        }
        return 0;
      });
      break;
  }
  if (!th.classList.contains('des-order')) usersCopy.reverse();

  idSelectedTr = clearTable(); // запоминаем id выбранной (нажатой) строки
  renderTableData(usersCopy, separator, idSelectedTr);
  return usersCopy; // возвращаем актуальный массив данных
}

export {sortTable};
