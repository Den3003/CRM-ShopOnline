import domElements from "./domElements.js";
import {statePages} from "./variables.js";

export const getTotalPrice = (count, price, discount) => {
  const totalPrice = +count * +price;
  const discountPercent = +discount / 100;

  return totalPrice - (totalPrice * discountPercent);
};

export const updatePageInfo = () => {
  const showPerTotalProducts =
  (statePages.currentPage - 1) * statePages.itemsPerPages;
  const start = showPerTotalProducts + 1;
  const end = Math.min(statePages.currentPage * statePages.itemsPerPages
      , statePages.totalPages);

  domElements.cmsStartProductsPage.innerHTML = start;
  domElements.cmsEndProductsPage.innerHTML = end;
  domElements.cmsTotalProducts.innerHTML = statePages.totalPages;
  domElements.cmsPrevButton.disabled = statePages.currentPage === 1;
  domElements.cmsNextButton.disabled = end >= statePages.totalPages;
};


