import control from "./control.js";
import loadStyle from "./loadStyle.js";
import { fetchRequest } from "./serverRequest.js";
import { PRODUCTS_CATEGORY, URL } from "./variables.js";

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
                type="text" title="Только кириллица и пробел" 
                name="title" id="title" required>
              
              <label class="modal__label" for="category">Категория</label>
              <input class="modal__input js-modal-category-product-input"
                type="text" title="Только кириллица и пробел"
                name="category" id="category" autocomplete="off"
                list="category-list" required>
              <datalist id="category-list" class="category-list"></datalist>
              
              <label class="modal__label" for="units">Единица измерения</label>
              <input class="modal__input js-modal-units-product-input"
                type="text" title="Только кириллица"
                name="units" id="units" required>
              
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
              <textarea rows="5" minlength="80"
                class="modal__input js-modal-description-textarea"
                name="description" title="Только кириллица и пробел"
                id="description" required></textarea>
              
              <label class="modal__label" for="count">Количество</label>
              <input class="modal__input js-modal-product-count-input"
                type="number" title="Только цифры"
                name="count" id="count" min="1" required>
              
              <label class="modal__label" for="price">Цена</label>
              <input class="modal__input js-modal-product-price" type="number"
                name="price" title="Только цифры"
                id="price" min="1" required>
            </div>
            <div class="modal-grid__cell modal-grid__cell_size_two-columns
              picture-grid">
              <div class="modal__error-message-file">
                <p class="modal__description-file">Изображение не должно
                  превышать размер 1 Мб</p>
              </div>
              <label class="modal__button-file
                js-modal-btn-add-picture">Добавить изображение
                <input class="modal__input-file
                  visually-hidden js-modal-image-input"
                  type="file" name="image" id="image" accept="image/*">
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
  const modalTotalCost = overlay.querySelector('.js-modal-total-cost');
  const modalAddImageInput = overlay.querySelector('.js-modal-image-input');
  const modalPreviewFileBlock = overlay.querySelector('.modal__preview-file');
  const modalNameProduct = overlay
      .querySelector('.js-modal-name-product-input');
  const modalCategoryInput = overlay
      .querySelector('.js-modal-category-product-input');
  const modalTextArea = overlay.querySelector('.js-modal-description-textarea');
  const modalUnitsInput = overlay
      .querySelector('.js-modal-units-product-input');
  const modalCountInput = overlay
      .querySelector('.js-modal-product-count-input');
  const modalPriceInput = overlay.querySelector('.js-modal-product-price');
  const categoryList = overlay.querySelector('.category-list');


  control.listenModalInputs(modalNameProduct, /[^А-ЯЁ\s]/gi);
  control.listenModalInputs(modalCategoryInput, /[^А-ЯЁ\s]/gi);
  control.listenModalInputs(modalTextArea, /[^А-ЯЁ\s]/gi);
  control.listenModalInputs(modalUnitsInput, /[^А-ЯЁ]/gi);
  control.listenModalInputs(modalCountInput, /\D/g);
  control.listenModalInputs(modalPriceInput, /\D/g);


  fetchRequest(URL + PRODUCTS_CATEGORY, {
    method: 'get',
    callback: (err, data) => {
      data.forEach(element => {
        const option = document.createElement('option');
        option.value = element;
        categoryList.appendChild(option);
      });
    },
  });


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
    priceProductInput.value = data.price;
    const modalBtnAddProduct = document.
        querySelector('.js-modal-btn-add-product');
    modalBtnAddProduct.disabled = true;
  }

  modalAddImageInput.addEventListener('change', () => {
    if (modalAddImageInput.files[0].size < 1048576) {
      overlay.querySelector('.modal__description-file').style.display = 'none';
      if (modalAddImageInput.files.length > 0) {
        const src = URL.createObjectURL(modalAddImageInput.files[0]);
        const modalPreviewFile = document.createElement('img');
        modalPreviewFile.src = src;
        modalPreviewFileBlock.append(modalPreviewFile);
        modalPreviewFileBlock.style.display = 'block';
      }
    } else {
      overlay.querySelector('.modal__description-file').style.display = 'block';
    }
  });

  return {
    formAddProduct,
    modalCheckbox,
    modalDiscountText,
    modalTotalCost,
    modalAddImageInput,
    overlay,
  };
};

export default showModal;
