import domElements from "./domElements.js";
import data from "./dataArray.js";
import {getTotalPrice, getRandomId} from "./calculations.js";
import {renderGoods} from "./render.js";

const checkboxToggle = () => {
  domElements.modalCheckbox.addEventListener('click', e => {
    const target = e.target;

    if (target.checked) {
      domElements.modalDiscountText.disabled = false;
    } else {
      domElements.modalDiscountText.value = '';
      domElements.modalDiscountText.disabled = true;
    }

    domElements.modalTotalCost.textContent = `
      ${getTotalPrice(
      domElements.formAddProduct.count.value,
      domElements.formAddProduct.price.value,
      domElements.formAddProduct.discount.value)} руб.
    `;
  });
};

const modalControl = () => {
  const openModal = () => {
    domElements.modalProductId.textContent = `${getRandomId()}`;
    domElements.modalOverlayClose.classList.add('is-visible');
  };

  const closeModal = () => {
    domElements.modalOverlayClose.classList.remove('is-visible');
  };

  domElements.btnCmsAddProduct.addEventListener('click', openModal);

  domElements.modalOverlayClose.addEventListener('click', e => {
    const target = e.target;

    if (target === domElements.modalOverlayClose ||
      target.closest('.js-modal-close')) {
      closeModal();
    }
  });
};

const addProduct = () => {
  domElements.formAddProduct.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);

    dataObject.id = domElements.modalProductId.textContent;

    if (domElements.modalDiscountText.disabled) {
      dataObject.discount = false;
    }

    data.cloneUserArray.push(dataObject);
    renderGoods(data.cloneUserArray);
    domElements.formAddProduct.reset();
    domElements.modalOverlayClose.classList.remove('is-visible');
    domElements.modalTotalCost.textContent = '0 руб.';
    domElements.modalDiscountText.disabled = true;
  });
};

const showChangePrice = () => {
  domElements.formAddProduct.addEventListener('change', e => {
    const target = e.target;

    if (domElements.formAddProduct.price === target ||
      domElements.formAddProduct.count === target ||
      domElements.formAddProduct.discount === target) {
      domElements.modalTotalCost.textContent = `
        ${getTotalPrice(
      domElements.formAddProduct.count.value,
      domElements.formAddProduct.price.value,
      domElements.formAddProduct.discount.value)} руб.
      `;
    }
  });
};

const deleteProduct = () => {
  domElements.cmsTableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.js-cms-delete-product')) {
      const objectId = +target.closest('.cms-table__body-row')
          .dataset.productId;
      target.closest('.cms-table__body-row').remove();
      data.cloneUserArray = data.cloneUserArray
          .filter(item => +item.id !== objectId);
      renderGoods(data.cloneUserArray);
    }
  });
};

const listenPictureButtons = (row) => {
  row.querySelector('.js-cms-create-picture')
      .addEventListener('click', (e) => {
        const target = e.target;
        const left = (window.screen.width - 600) / 2;
        const top = (window.screen.height - 600) / 2;
        window.open(target.closest('.cms-table__body-row')
            .dataset.pic, "picture"
        , `width=600,height=600,left=${left},top=${top}`);
      });
};

export default {
  checkboxToggle,
  modalControl,
  addProduct,
  showChangePrice,
  deleteProduct,
  listenPictureButtons,
};
