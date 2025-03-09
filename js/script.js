import data from "./modules/dataArray.js";
import { renderGoods } from "./modules/render.js";
import controls from './modules/control.js';





const init = () => {
  console.log('data.cloneUserArray: ', data.cloneUserArray);
  const { cmsTableBody } = renderGoods(data.cloneUserArray);
  // console.log('cloneUserArray: ', cloneUserArray);
  const { 
    closeModal,
    modalProductId,
    modalOverlayClose,
  } = controls.modalControl();
  const { 
    modalTotalCost,
    formAddProduct,
    modalDiscountText, 
  } = controls.addProduct(modalProductId, modalOverlayClose);
  controls.checkboxToggle(modalDiscountText, modalTotalCost, formAddProduct);
  controls.showChangePrice(formAddProduct, modalTotalCost);
  controls.deleteProduct(cmsTableBody);


};

init();
