'use strict'

const nameProduct = 'Телевизор';
const quantityProduct = 5;
const categoryProduct = 'Техника для дома';
const priceProduct = 150;

console.log(`Общая сумма товара ${nameProduct}: ${priceProduct * quantityProduct}$` );


const nameProductUser = prompt('Введите наименование товара', '');
const quantityProductUser = +prompt('Введите количество товара', '');
const categoryProductUser = prompt('Введите категорию товара', '');
const priceProductUser = +prompt('Введите цену товара', '');

console.log(
  `Тип данных 'Наименование товара': ${typeof nameProductUser},
  Тип данных 'Количество товара': ${typeof quantityProductUser},
  Тип данных 'Категория товара': ${typeof categoryProductUser},
  Тип данных 'Цена товара': ${typeof priceProductUser}
  `
);

console.log(`На складе ${quantityProductUser} единицы товара "${nameProductUser}" на сумму ${priceProductUser * quantityProductUser} деревянных`);

