import loadStyle from "./loadStyle.js";

const showModal = async (err, data) => {
  await loadStyle('styles/modal.css');
  await loadStyle('styles/modal-error.css');

  const overlay = document.createElement('div');
  overlay.classList.add('overlay', 'js-overlay');
  overlay.insertAdjacentHTML('beforeend',
      `<div class="modal js-modal">
        <div class="modal__header">
          <p class="modal__title js-modal-title">Добавить товар</p>
          <p class="modal__number js-id-text"><span class="modal__number-span
            js-modal-id-product"></span></p>
        </div>
        <hr class="modal__line line">
        <button class="modal__close js-modal-close" type="button"
          aria-label="close">
          <svg class="modal__close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="#close-modal"></use>
          </svg>
        </button>
        <form class="js-form-add-product" name="formProduct" action="https://jsonplaceholder.typicode.com/posts" method="POST">
          <fieldset class="modal__fieldset modal-grid">
            <div class="modal-grid__cell">
              <label class="modal__label" for="title">Наименование</label>
              <input class="modal__input js-modal-name-product-input"
                type="text" name="title" id="title" required>
              
              <label class="modal__label" for="category">Категория</label>
              <input class="modal__input js-modal-category-product-input"
                type="text" name="category" id="category" required>
              
              <label class="modal__label" for="units">Единица измерения</label>
              <input class="modal__input js-modal-units-product-input"
                type="text" name="units" id="units" required>
              
              <label class="modal__label" for="discount">Дисконт</label>
              <div class="modal__optional">
                <input class="modal__checkbox js-modal-checkbox"
                  type="checkbox" aria-label="Активирует поле ввода скидки">
                <input class="modal__input js-modal-discount-text" type="number"
                  name="discount" id="discount" min="1" disabled required>
              </div>
            </div>
            <div class="modal-grid__cell">
              <label class="modal__label" for="description">Описание</label>
              <textarea rows="5"
                class="modal__input js-modal-description-textarea"
                name="description" id="description" required></textarea>
              
              <label class="modal__label" for="count">Количество</label>
              <input class="modal__input js-modal-product-count-input"
                type="number" name="count" id="count" min="1" required>
              
              <label class="modal__label" for="price">Цена</label>
              <input class="modal__input js-modal-product-price" type="number"
                name="price" id="price" min="1" required>
            </div>
            <div class="modal-grid__cell modal-grid__cell_size_two-columns
              picture-grid">
              <div>
                <p class="modal__description-file">Изображение не должно
                  превышать размер 1 Мб</p>
              </div>
              <label class="modal__button-file
                js-btn-add-picture">Добавить изображение
                <input class="modal__input-file
                  visually-hidden" type="file" name="" id="">
              </label>
              <div class="modal__preview-file"></div>
            </div>
          </fieldset>
          <div class="modal__footer">
            <p class="modal__total-cost total-cost">Итоговая стоимость: <span
              class="total-cost__span js-modal-total-cost">0 руб.</span></p>
            <button class="modal__btn-add-product btn-add-product
              js-modal-btn-add-product" type="submit">Добавить товар</button>
          </div>
        </form>
      </div>
      <div class="modal-error-wrapper js-modal-error-wrapper">
        <div class="modal-error">
          <button type="button" class="modal-error__close js-modal-error-close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <use href="#close-modal"></use>
            </svg>
          </button>
          <div class="modal-error__image"></div>
          <p class="modal-error__text
            js-modal-error-text">Что-то пошло не так</p>
        </div>
      </div>
      `);

  document.body.append(overlay);

  overlay.addEventListener('click', ({target}) => {
    if (target === overlay || target.closest('.js-modal-close')) {
      overlay.remove();
    }
  });

  const overlayError = overlay.querySelector('.js-modal-error-wrapper');

  overlayError.addEventListener('click', ({target}) => {
    if (target === overlayError || target.closest('.js-modal-error-close')) {
      overlayError.remove();
    }
  });

  const formAddProduct = overlay.querySelector('.js-form-add-product');
  const modalCheckbox = overlay.querySelector('.js-modal-checkbox');
  const modalDiscountText = overlay.querySelector('.js-modal-discount-text');
  const modalTotalCost = document.querySelector('.js-modal-total-cost');

  if (!err && data) {
    const modalTitle = overlay.querySelector('.js-modal-title');
    modalTitle.innerHTML = 'Изменить товар';
    const modalIdText = overlay.querySelector('.js-id-text');
    modalIdText.insertAdjacentText('afterbegin', 'ID: ');
    const modalProductId = overlay.querySelector('.js-modal-id-product');
    modalProductId.textContent = data.id;
    const nameProductInput = overlay.
        querySelector('.js-modal-name-product-input');
    nameProductInput.value = data.title;
    const categoryProductInput = overlay.
        querySelector('.js-modal-category-product-input');
    categoryProductInput.value = data.category;
    const unitsProductInput = overlay.
        querySelector('.js-modal-units-product-input');
    unitsProductInput.value = data.units;
    if (data.discount) {
      modalCheckbox.checked = true;
      const discountProductInput = overlay.
          querySelector('.js-modal-discount-text');
      discountProductInput.disabled = false;
      discountProductInput.value = data.discount;
    }
    const descriptionProductInput = overlay.
        querySelector('.js-modal-description-textarea');
    descriptionProductInput.value = data.description;
    const countProductInput = overlay.
        querySelector('.js-modal-product-count-input');
    countProductInput.value = data.count;
    const priceProductInput = overlay.
        querySelector('.js-modal-product-price');
    priceProductInput.value = data.count;
    const modalBtnAddProduct = document.
        querySelector('.js-modal-btn-add-product');
    modalBtnAddProduct.disabled = true;
  }

  return {
    formAddProduct,
    modalCheckbox,
    modalDiscountText,
    modalTotalCost,
  };
};

export default showModal;


// const showModal = () => {
//   //  Фон, оболочка модального окна
//   const overlay = document.createElement('div');
//   overlay.classList.add('overlay', 'js-overlay');

//   //  Модальное окно
//   const modalWindow = document.createElement('div');
//   modalWindow.classList.add('modal', 'js-modal');

//   // Блок заголовка
//   const modalHeaderBlock = document.createElement('div');
//   modalHeaderBlock.classList.add('modal__header');

//   //  Заголовок модального окна
//   const modalTitle = document.createElement('p');
//   modalTitle.classList.add('modal__title', 'js-modal-title');
//   modalTitle.textContent = 'Добавить товар';

//   //  Идентификатор товара
//   const modalIdProductText = document.createElement('p');
//   modalIdProductText.classList.add('modal__number');
//   const modalIdProductNumber = document.createElement('span');
//   modalIdProductNumber.classList.add('modal__number-span',
//       'js-modal-id-product');

//   //  Линия
//   const modalLine = document.createElement('hr');
//   modalLine.classList.add('modal__line', 'line');

//   // Кнопка закрывания модального окна
//   const modalCloseBtn = document.createElement('button');
//   modalCloseBtn.type = 'button';
//   modalCloseBtn.ariaLabel = 'close';
//   modalCloseBtn.classList.add('modal__close', 'js-modal-close');
//   const iconCloseModal = `
//     <svg class="modal__close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <use href="#close-modal"></use>
//     </svg>
//   `;

//   //  Форма
//   const formModal = document.createElement('form');
//   formModal.classList.add('js-form-add-product');
//   formModal.name = 'formProduct';
//   formModal.action = 'https://jsonplaceholder.typicode.com/posts';
//   formModal.method = 'POST';

//   //  Грид блок в форме
//   const formFieldset = document.createElement('fieldset');
//   formFieldset.classList.add('modal__fieldset', 'modal-grid');

//   //  Грид 1 ячейка в блоке
//   const fieldsetGridCell = document.createElement('div');
//   fieldsetGridCell.classList.add('modal-grid__cell');

//   //  Наименование товара
//   const nameProductLabel = document.createElement('label');
//   nameProductLabel.classList.add('modal__label');
//   nameProductLabel.for = 'title';
//   nameProductLabel.textContent = 'Наименование';
//   const nameProductInput = document.createElement('input');
//   nameProductInput.classList.add('modal__input');
//   nameProductInput.type = 'text';
//   nameProductInput.name = 'title';
//   nameProductInput.id = 'title';
//   nameProductInput.required = 'true';

//   //  Категория товара
//   const categoryProductLabel = document.createElement('label');
//   categoryProductLabel.classList.add('modal__label');
//   nameProductLabel.for = 'category';
//   nameProductLabel.textContent = 'Категория';
//   const categoryProductInput = document.createElement('input');
//   categoryProductInput.classList.add('modal__input');
//   categoryProductInput.type = 'text';
//   categoryProductInput.name = 'category';
//   categoryProductInput.id = 'category';
//   categoryProductInput.required = 'true';

//   //  Единица измерения товара
//   const unitsProductLabel = document.createElement('label');
//   unitsProductLabel.classList.add('modal__label');
//   unitsProductLabel.for = 'units';
//   unitsProductLabel.textContent = 'Единица измерения';
//   const unitsProductInput = document.createElement('input');
//   unitsProductInput.classList.add('modal__input');
//   unitsProductInput.type = 'text';
//   unitsProductInput.name = 'units';
//   unitsProductInput.id = 'units';
//   unitsProductInput.required = 'true';

//   //  Дисконт
//   const discountProductLabel = document.createElement('label');
//   discountProductLabel.classList.add('modal__label');
//   discountProductLabel.for = 'discount';
//   discountProductLabel.textContent = 'Дисконт';
//   const discountBlock = document.createElement('div');
//   discountBlock.classList.add('modal__optional');
//   const checkboxProductInput = document.createElement('input');
//   checkboxProductInput.classList.add('modal__checkbox', 'js-modal-checkbox');
//   checkboxProductInput.type = 'checkbox';
//   checkboxProductInput.ariaLabel = 'Активирует поле ввода скидки';
//   const discountProductInput = document.createElement('input');
//   discountProductInput.classList.add('modal__input', 'js-discount-text');
//   discountProductInput.type = 'number';
//   discountProductInput.name = 'discount';
//   discountProductInput.id = 'discount';
//   discountProductInput.min = '1';
//   discountProductInput.required = 'true';
//   discountProductInput.disabled = 'true';

//   //  Грид 2 ячейка в блоке
//   const fieldsetGridCellTwo = document.createElement('div');
//   fieldsetGridCellTwo.classList.add('modal-grid__cell');

//   //  Описание товара
//   const descriptionProductLabel = document.createElement('label');
//   descriptionProductLabel.classList.add('modal__label');
//   descriptionProductLabel.for = 'description';
//   descriptionProductLabel.textContent = 'Описание';
//   const descriptionProductText = document.createElement('textarea');
//   descriptionProductText.rows = '5';
//   descriptionProductText.classList.add('modal__input');
//   descriptionProductText.name = 'description';
//   descriptionProductText.id = 'description';
//   descriptionProductText.required = 'true';

//   // Количество
//   const countProductLabel = document.createElement('label');
//   countProductLabel.classList.add('modal__label');
//   countProductLabel.for = 'count';
//   countProductLabel.textContent = 'Количество';
//   const countProductInput = document.createElement('input');
//   countProductInput.classList.add('modal__input');
//   countProductInput.type = 'number';
//   countProductInput.name = 'count';
//   countProductInput.id = 'count';
//   countProductInput.min = '1';
//   countProductInput.required = 'true';
// };
