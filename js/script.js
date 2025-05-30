import {renderGoods, renderTotalPrice} from "./modules/render.js";
import controls from './modules/control.js';
import {PRODUCTS_LIST, PRODUCTS_TOTAL_PRICE, URL} from "./modules/variables.js";
import {httpRequest} from "./modules/serverRequest.js";

const init = () => {
  httpRequest(URL + PRODUCTS_LIST, {
    method: 'get',
    callback: renderGoods,
  });
  httpRequest(URL + PRODUCTS_TOTAL_PRICE, {
    method: 'get',
    callback: renderTotalPrice,
  });
  controls.pageNavigationControl();
  controls.modalControl();
  controls.addProduct();
  controls.checkboxToggle();
  controls.showChangePrice();
  controls.deleteProduct();
};

init();
