import domElements from "./domElements.js";
import {createRow} from "./createElements.js";
import {getCmsTotalPrice} from "./calculations.js";

export const renderGoods = (arr) => {
  domElements.cmsTableBody.innerHTML = '';
  getCmsTotalPrice(arr);

  arr.map((item) => {
    domElements.cmsTableBody
        .insertAdjacentElement('beforeend', createRow(item));
  });
};
