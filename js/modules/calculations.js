import domElements from "./domElements.js";
import data from "./dataArray.js";

export const getTotalPrice = (count, price, discount) => {
  const totalPrice = +count * +price;
  const discountPercent = +discount / 100;

  return totalPrice - (totalPrice * discountPercent);
};

export const getCmsTotalPrice = (arr) => {
  const cost = arr.reduce((acc, item) =>
    acc + (getTotalPrice(item.count, item.price, item.discount)), 0);
  domElements.cmsTotalCost.textContent = `${cost} руб.`;
};

export const getRandomId = () => {
  const randomId = Math.floor(Math.random() * (300000000 - 1 + 1)) + 1;

  data.cloneUserArray.forEach(item => {
    if (randomId === item.id) {
      return getRandomId();
    }
  });

  return randomId;
};

