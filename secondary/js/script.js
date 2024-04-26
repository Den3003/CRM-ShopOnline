'use strict'

{
const nameProductUser = prompt('Введите наименование товара', '');
const quantityProductUser = +prompt('Введите количество товара', '');
const categoryProductUser = prompt('Введите категорию товара', '');
const priceProductUser = +prompt('Введите цену товара', '');

if (typeof quantityProductUser === 'number'
    && !Number.isNaN(quantityProductUser)
    && typeof priceProductUser === 'number'
    && !Number.isNaN(priceProductUser)) {

  console.log(
    `Тип данных 'Наименование товара': ${typeof nameProductUser},
    Тип данных 'Количество товара': ${typeof quantityProductUser},
    Тип данных 'Категория товара': ${typeof categoryProductUser},
    Тип данных 'Цена товара': ${typeof priceProductUser}
    `
  );
  console.log(`На складе ${quantityProductUser} единицы товара "${nameProductUser}" на сумму ${priceProductUser * quantityProductUser} деревянных`);
} else {
  console.log('Вы ввели некорректные данные');
}
}
