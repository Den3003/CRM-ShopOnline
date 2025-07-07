import domElements from "./domElements.js";
import {createRow} from "./createElements.js";
import {updatePageInfo} from "./calculations.js";
import {statePages} from "./variables.js";
import {httpRequest} from "./serverRequest.js";
import {PRODUCTS_TOTAL_PRICE, URL} from "./variables.js";

export const renderTotalPrice = (err, data) => {
  domElements.cmsTotalCost.innerHTML = data + ' руб.';
};

export const renderGoods = (err, arr) => {
  domElements.cmsTableBody.innerHTML = '';
  if (err) {
    domElements.cmsTableBody.innerHTML = arr;
    return;
  }
  statePages.currentPage = arr.page;

  httpRequest(URL + PRODUCTS_TOTAL_PRICE, {
    method: 'get',
    callback: renderTotalPrice,
  });
  updatePageInfo(err, arr);

  arr.goods.map((item) => {
    domElements.cmsTableBody
        .insertAdjacentElement('beforeend', createRow(item));
  });
};

