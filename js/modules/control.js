import domElements from "./domElements.js";
import {getTotalPrice, updatePageInfo} from "./calculations.js";
import {renderGoods, renderTotalPrice} from "./render.js";
import {
  SEARCH_PARAM,
  PRODUCTS_LIST, URL,
  PRODUCTS_PAGE,
  PRODUCTS_TOTAL_PRICE,
  statePages,
} from "./variables.js";
import {fetchRequest} from "./serverRequest.js";
import {createRow} from "./createElements.js";
import showModal from "./createModal.js";
import showDeleteModal from "./createDelModal.js";


const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.addEventListener('loadend', () => {
    resolve(reader.result);
  });
  reader.addEventListener('error', err => {
    reject(err);
  });

  reader.readAsDataURL(file);
});

const pageNavigationControl = () => {
  domElements.cmsPrevButton.addEventListener("click", () => {
    if (statePages.currentPage > 1) {
      statePages.currentPage--;
      fetchRequest(URL + PRODUCTS_LIST +
        PRODUCTS_PAGE + statePages.currentPage, {
        method: 'get',
        callback: renderGoods,
      });
    }
  });

  domElements.cmsNextButton.addEventListener("click", () => {
    if (statePages.currentPage * statePages.itemsPerPages <
        statePages.totalCount) {
      statePages.currentPage++;
      fetchRequest(URL + PRODUCTS_LIST + PRODUCTS_PAGE +
        statePages.currentPage, {
        method: 'get',
        callback: renderGoods,
      });
    }
  });
};

const checkboxToggle = (modalCheckbox, modalDiscountText,
    formAddProduct, modalTotalCost) => {
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

const addProduct = (formAddProduct, modalDiscountText,
    modalTotalCost, modalAddImageInput, overlay) => {
  formAddProduct.addEventListener('submit', async e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataObject = Object.fromEntries(formData);

    if (modalDiscountText.disabled) {
      dataObject.discount = false;
    }

    if (modalAddImageInput.files[0]?.size < 1048576) {
      dataObject.image = await toBase64(dataObject.image);
    }

    fetchRequest(URL + PRODUCTS_LIST, {
      method: 'post',
      callback: (err, item) => {
        if (err) {
          domElements.modalErrorWrapper.classList.add('is-visible');
          if (item) {
            domElements.modalErrorText.innerHTML = item;
          }
          return;
        }

        if (statePages.currentPage === statePages.totalPages &&
          statePages.totalCount %
            +domElements.cmsLimitProductsPage.textContent) {
          domElements.cmsTableBody
              .insertAdjacentElement('beforeend', createRow(item));
        }
        if (statePages.currentPage === statePages.totalPages &&
          !statePages.totalCount %
            +domElements.cmsLimitProductsPage.textContent) {
          domElements.cmsTableBody.innerHTML = '';
          domElements.cmsTableBody
              .insertAdjacentElement('beforeend', createRow(item));
        }

        fetchRequest(URL + PRODUCTS_TOTAL_PRICE, {
          method: 'get',
          callback: renderTotalPrice,
        });

        fetchRequest(URL + PRODUCTS_LIST, {
          method: 'get',
          callback: updatePageInfo,
        });

        formAddProduct.reset();
        overlay.querySelector('.modal__description-file').
            style.display = 'none';
        modalTotalCost.textContent = '0 руб.';
        modalDiscountText.disabled = true;
        overlay.remove();
      },
      body: dataObject,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
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

const modalControl = () => {
  const openModal = async ({target}) => {
    if (target.classList.contains('js-cms-btn-add-product')) {
      const {
        formAddProduct,
        modalCheckbox,
        modalDiscountText,
        modalTotalCost,
        modalAddImageInput,
        overlay,
      } = await showModal();
      addProduct(formAddProduct, modalDiscountText,
          modalTotalCost, modalAddImageInput, overlay);
      checkboxToggle(modalCheckbox, modalDiscountText,
          formAddProduct, modalTotalCost);
      showChangePrice(formAddProduct, modalTotalCost);
    }

    if (target.closest('.js-cms-create-product')) {
      const productId =
        target.closest('.cms-table__body-row').dataset.productId;
      const {
        formAddProduct,
        modalCheckbox,
        modalDiscountText,
        modalTotalCost,
      } = await fetchRequest(URL + PRODUCTS_LIST + productId, {
        method: 'get',
        callback: showModal,
      });
      checkboxToggle(modalCheckbox, modalDiscountText,
          formAddProduct, modalTotalCost);
      showChangePrice(formAddProduct, modalTotalCost);
    }
  };
  domElements.cmsWrapper.addEventListener('click', openModal);
};

//! Удаление товара из списка товаров(таблицы)

const deleteProduct = () => {
  domElements.cmsTableBody.addEventListener('click', async e => {
    const target = e.target;
    if (target.closest('.js-cms-delete-product')) {
      const objectId = target.closest('.cms-table__body-row')
          .dataset.productId;
      const objectName = target.closest('.cms-table__body-row')
          .dataset.productName;
      const result = await showDeleteModal(objectName);
      if (result) {
        target.closest('.cms-table__body-row').remove();
        fetchRequest(URL + PRODUCTS_LIST + objectId, {
          method: 'delete',
          callback: (err, data) => {
            if (!err) {
              fetchRequest(URL + PRODUCTS_TOTAL_PRICE, {
                method: 'get',
                callback: renderTotalPrice,
              });
              fetchRequest(URL + PRODUCTS_LIST, {
                method: 'get',
                callback: updatePageInfo,
              });
            }
          },
        });
      }
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

const listenModalInputs = (modalInput, regExp) => {
  modalInput.addEventListener('input', () => {
    modalInput.value = modalInput.value.replace(regExp, '');
  });
};


//! Запрос в поисковике

function debounce(func, delay) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const fetchData = (val) => {
  if (val.trim()) {
    fetchRequest(URL + PRODUCTS_LIST + SEARCH_PARAM + val, {
      method: 'get',
      callback: renderGoods,
    });
  } else {
    fetchRequest(URL + PRODUCTS_LIST, {
      method: 'get',
      callback: renderGoods,
    });
  }
};

const debouncedFetch = debounce(fetchData, 300);

domElements.cmsSearchInput.addEventListener('input'
    , e => debouncedFetch(e.target.value));

export default {
  modalControl,
  deleteProduct,
  listenPictureButtons,
  pageNavigationControl,
  listenModalInputs,
};
