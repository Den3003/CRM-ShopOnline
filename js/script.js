import {renderGoods} from "./modules/render.js";
import controls from './modules/control.js';
import {PRODUCTS_LIST, URL} from "./modules/variables.js";
import {httpRequest} from "./modules/serverRequest.js";

const init = () => {
  httpRequest(URL + PRODUCTS_LIST, {
    method: 'get',
    callback: renderGoods,
  });
  controls.pageNavigationControl();
  controls.modalControl();
  controls.addProduct();
  controls.checkboxToggle();
  controls.showChangePrice();
  controls.deleteProduct();
  controls.closeModalErrorControl();
};

init();
