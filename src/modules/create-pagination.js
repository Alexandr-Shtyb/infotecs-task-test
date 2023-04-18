function createPagination(users) {
  const numberPages = Math.ceil(users.length / 10);
  const pagination = document.querySelector('.pagination');
  const ul = document.createElement('ul');
  ul.classList.add('pagination__list');
  pagination.append(ul);

  for (let i = 0; i < numberPages; i++) {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    if (i === 0) btn.classList.add('active-page');
    li.classList.add('pagination__item');
    btn.dataset.page = `${i + 1}`;
    btn.classList.add('pagination__btn');
    btn.textContent = `${i + 1}`;

    ul.append(li);
    li.append(btn);
  }
}

export {createPagination};
