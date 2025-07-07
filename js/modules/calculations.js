import domElements from "./domElements.js";
import {statePages} from "./variables.js";

export const getTotalPrice = (count, price, discount) => {
  const totalPrice = +count * +price;
  const discountPercent = +discount / 100;

  return totalPrice - (totalPrice * discountPercent);
};

export const updatePageInfo = (err, arr) => {
  statePages.itemsPerPages = 10;
  statePages.totalCount = arr.totalCount;
  statePages.totalPages = arr.pages;

  const showPerTotalProducts =
  (statePages.currentPage - 1) * statePages.itemsPerPages;
  const start = showPerTotalProducts + 1;
  const end = Math.min(statePages.currentPage * statePages.itemsPerPages
      , statePages.totalCount);

  domElements.cmsStartProductsPage.innerHTML = start;
  domElements.cmsEndProductsPage.innerHTML = end;
  domElements.cmsTotalProducts.innerHTML = statePages.totalCount;
  domElements.cmsPrevButton.disabled = statePages.currentPage === 1;
  domElements.cmsNextButton.disabled = end >= statePages.totalCount;
};


