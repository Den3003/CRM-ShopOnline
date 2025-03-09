import data from "./dataArray.js";
import { renderGoods } from "./render.js";

const getTotalPrice = (count, price, discount) => {
  const totalPrice = +count * +price;
  const discountPercent = +discount / 100;

  return totalPrice - (totalPrice * discountPercent);
};

const getCmsTotalPrice = (arr) => {
  const cmsTotalCost = document.querySelector('.js-cms-total-cost');

  const cost = arr.reduce((acc, item) =>
    acc + (getTotalPrice(item.count, item.price, item.discount)), 0);
  cmsTotalCost.textContent = `${cost} руб.`;
  console.log('arr: ', arr);
};


const getRandomId = () => {
  const randomId = Math.floor(Math.random() * (300000000 - 1 + 1)) + 1;
  data.cloneUserArray.forEach(item => {
    if (randomId === item.id) {
      return getRandomId();
    }
  });

  console.log('randomId: ', randomId);
  return randomId;
};

const checkboxToggle = (modalDiscountText, modalTotalCost, formAddProduct) => {
  const modalCheckbox = document.querySelector('.js-modal-checkbox');

  modalCheckbox.addEventListener('click', e => {
    const target = e.target;

    if (target.checked) {
      modalDiscountText.disabled = false;
    } else {
      modalDiscountText.value = '';
      modalDiscountText.disabled = true;
    }

    modalTotalCost.textContent = `
      ${getTotalPrice(
        formAddProduct.count.value,
        formAddProduct.price.value,
        formAddProduct.discount.value)} руб.
    `;
  });
  
};

const modalControl = () => {
  const btnCmsAddProduct = document.querySelector('.js-cms-btn-add-product')
  const modalProductId = document.querySelector('.js-modal-id-product');
  const modalOverlayClose = document.querySelector('.js-overlay');
  const openModal = () => {
    modalProductId.textContent = `${getRandomId()}`;
    modalOverlayClose.classList.add('is-visible');
  };

  const closeModal = () => {
    modalOverlayClose.classList.remove('is-visible');
  };

  btnCmsAddProduct.addEventListener('click', openModal);

  modalOverlayClose.addEventListener('click', e => {
    const target = e.target;

    if (target === modalOverlayClose ||
      target.closest('.js-modal-close')) {
      closeModal();
  }
  });

  return {
    closeModal,
    modalProductId,
    modalOverlayClose,
  }
};


const addProduct = (modalProductId, modalOverlayClose) => {
  const formAddProduct = document.querySelector('.js-form-add-product');
  const modalTotalCost = document.querySelector('.js-modal-total-cost');
  const modalDiscountText = document.querySelector('.js-discount-text');

  formAddProduct.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);
  
    dataObject.id = modalProductId.textContent;
  
    if (modalDiscountText.disabled) {
      dataObject.discount = false;
    }
  
    data.cloneUserArray.push(dataObject);
    renderGoods(data.cloneUserArray);
    formAddProduct.reset();
    modalOverlayClose.classList.remove('is-visible');
    modalTotalCost.textContent = '0 руб.';
    modalDiscountText.disabled = true;
  });

  return {
    formAddProduct,
    modalTotalCost,
    modalDiscountText,
  }
};

const showChangePrice = (formAddProduct, modalTotalCost) => {
  formAddProduct.addEventListener('change', e => {
    const target = e.target;
  
    if (formAddProduct.price === target ||
      formAddProduct.count === target ||
      formAddProduct.discount === target) {
      modalTotalCost.textContent = `
        ${getTotalPrice(
        formAddProduct.count.value,
        formAddProduct.price.value,
        formAddProduct.discount.value)} руб.
      `;
    }
  });
};

const deleteProduct = (cmsTableBody) => {
  cmsTableBody.addEventListener('click', e => {
    const target = e.target;
    if (target.closest('.js-cms-delete-product')) {
      const objectId = +target.closest('.cms-table__body-row').dataset.productId;
      target.closest('.cms-table__body-row').remove();
      data.cloneUserArray = data.cloneUserArray.filter(item => +item.id !== objectId);
      console.log('userArray: ', data.cloneUserArray);
      renderGoods(data.cloneUserArray);
    }
  });
};

export default {
  getTotalPrice,
  getCmsTotalPrice,
  getRandomId,
  checkboxToggle,
  modalControl,
  addProduct,
  showChangePrice,
  deleteProduct,
}
