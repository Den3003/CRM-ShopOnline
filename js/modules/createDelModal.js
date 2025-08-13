
const showDeleteModal = (product) => {
  const overlay = document.createElement('div');
  const modalWindow = document.createElement('div');
  const messageModal = document.createElement('p');
  const btnBlock = document.createElement('div');
  const cancel = document.createElement('button');
  const deleteProduct = document.createElement('button');

  messageModal
      .textContent = `Вы точно хотите удалить "${product}" из списка товаров`;

  cancel.type = 'button';
  deleteProduct.type = 'button';
  cancel.textContent = 'Отмена';
  deleteProduct.textContent = 'Удалить';
  overlay.classList.add('overlay', 'overlay-deleteModal');
  modalWindow.classList.add('modalWindow');
  messageModal.classList.add('message');
  btnBlock.classList.add('btnBlock');
  cancel.classList.add('btn-add-product');
  deleteProduct.classList.add('btn-add-product', 'btn-delete-product');

  btnBlock.append(cancel, deleteProduct);
  modalWindow.append(messageModal);
  modalWindow.append(btnBlock);
  overlay.append(modalWindow);
  document.body.append(overlay);

  return new Promise(resolve => {
    cancel.addEventListener('click', () => {
      overlay.remove();
      resolve(false);
    });

    deleteProduct.addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });
  });
};

export default showDeleteModal;
