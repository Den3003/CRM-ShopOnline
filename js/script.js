import {renderGoods, renderTotalPrice} from "./modules/render.js";
import controls from './modules/control.js';
import {PRODUCTS_LIST, URL, PRODUCTS_TOTAL_PRICE} from "./modules/variables.js";
import {fetchRequest} from "./modules/serverRequest.js";

const init = () => {
  fetchRequest(URL + PRODUCTS_LIST, {
    method: 'get',
    callback: renderGoods,
  });
  fetchRequest(URL + PRODUCTS_TOTAL_PRICE, {
    method: 'get',
    callback: renderTotalPrice,
  });
  controls.pageNavigationControl();
  controls.modalControl();
  controls.deleteProduct();
};

init();
