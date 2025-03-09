import data from "./modules/dataArray.js";
import { renderGoods } from "./modules/render.js";
import controls from './modules/control.js';

const init = () => {
  renderGoods(data.cloneUserArray);
  controls.modalControl();
  controls.addProduct();
  controls.checkboxToggle();
  controls.showChangePrice();
  controls.deleteProduct();
};

init();
