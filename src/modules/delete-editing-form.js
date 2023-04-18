function deleteEditingForm() {
  const form = document.querySelector('.editing-form');
  const tbody = document.querySelector('tbody');
  tbody.classList.remove('active-form');
  if (form) form.remove();
}

function deleteEditingFormByKey() { // в случае, если форма редактирования
  // открыта, навешиваем событие для возможности закрытия таблицы через
  // клавишу esc
  const tbody = document.querySelector('tbody');
  if (tbody.classList.contains('active-form')) {
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Escape') {
        document.querySelectorAll('tbody tr').forEach(item => item.style.backgroundColor = '#fff');
        deleteEditingForm();
      }
    });
  }
}

export {deleteEditingForm, deleteEditingFormByKey};
