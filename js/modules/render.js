import domElements from "./domElements.js";
import {createRow} from "./createElements.js";
import {updatePageInfo} from "./calculations.js";
import {statePages} from "./variables.js";

export const renderGoods = (err, arr) => {
  domElements.cmsTableBody.innerHTML = '';
  if (err) {
    domElements.cmsTableBody.innerHTML = 'Ошибка';
    return;
  }
  statePages.currentPage = arr.page;
  statePages.itemsPerPages = 10;
  statePages.totalPages = arr.totalCount;
  updatePageInfo(arr);

  arr.goods.map((item) => {
    domElements.cmsTableBody
        .insertAdjacentElement('beforeend', createRow(item));
  });
};

export const renderTotalPrice = (err, data) => {
  domElements.cmsTotalCost.innerHTML = data + ' руб.';
};


