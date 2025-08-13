import domElements from "./domElements.js";
import {createRow} from "./createElements.js";
import {updatePageInfo} from "./calculations.js";
import {statePages} from "./variables.js";

export const renderTotalPrice = (err, data) => {
  domElements.cmsTotalCost.innerHTML = data + ' руб.';
};

export const renderGoods = (err, arr) => {
  domElements.cmsTableBody.innerHTML = '';
  if (err) {
    domElements.cmsTableBody.innerHTML = err;
    return;
  }
  statePages.currentPage = arr.page;

  if (!arr.goods.length) {
    domElements.cmsTableBody.innerHTML = 'Ничего не найдено';
  }

  updatePageInfo(err, arr);

  arr.goods.map((item) => {
    domElements.cmsTableBody
        .insertAdjacentElement('beforeend', createRow(item));
  });
};

