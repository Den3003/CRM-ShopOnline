import { createRow } from "./createElements.js";
import controls from './control.js';

export const renderGoods = (arr) => {
  const cmsTableBody = document.querySelector('.js-cms-table-body');

  cmsTableBody.innerHTML = '';
  controls.getCmsTotalPrice(arr);

  arr.map((item) => {
    cmsTableBody.insertAdjacentElement('beforeend', createRow(item));
  });

  return {
    cmsTableBody,
  }
};