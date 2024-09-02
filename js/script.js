'use strict';

const modalTitle = document.querySelector('.js-modal-title');
const closeModal = document.querySelector('.js-modal-close');
const modalProductId = document.querySelector('.js-id-product');
const formAddProduct = document.querySelector('.js-form-add-product');
const modalCheckbox = document.querySelector('.js-modal-checkbox');
const modalDscountText = document.querySelector('.js-discount-text');
const modalTotalCost = document.querySelector('.js-modal-total-cost');
const cmsTableBody = document.querySelector('.js-cms-table-body');
const userArray = [
  {
    'id': 253842678,
    'title': 'Смартфон Xiaomi 11T 8/128GB',
    'price': 27000,
    'description': 'Смартфон Xiaomi 11T – это представитель флагманской ' +
      'линейки, выпущенной во второй половине 2021 года. И он полностью' +
      ' соответствует такому позиционированию, предоставляя своим' +
      ' обладателям возможность пользоваться отличными камерами, ни в чем' +
      ' себя не ограничивать при запуске игр и' +
      ' других требовательных приложений.',
    'category': 'mobile-phone',
    'discont': false,
    'count': 3,
    'units': 'шт',
    'images': {
      'small': 'img/smrtxiaomi11t-m.jpg',
      'big': 'img/smrtxiaomi11t-b.jpg',
    },
  },
  {
    'id': 296378448,
    'title': 'Радиоуправляемый автомобиль Cheetan',
    'price': 4000,
    'description': 'Внедорожник на дистанционном управлении.' +
      ' Скорость 25км/ч. Возраст 7 - 14 лет',
    'category': 'toys',
    'discont': 5,
    'count': 1,
    'units': 'шт',
    /* 'images': {
      'small': 'img/cheetancar-m.jpg',
      'big': 'img/cheetancar-b.jpg',
    }, */
  },
  {
    'id': 215796548,
    'title': 'ТВ приставка MECOOL KI',
    'price': 12400,
    'description': 'Всего лишь один шаг сделает ваш телевизор умным, Быстрый' +
      ' и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе' +
      ' прочный процессор Cortex-A53 с чипом Amlogic S905D',
    'category': 'tv-box',
    'discont': 15,
    'count': 4,
    'units': 'шт',
    'images': {
      'small': 'img/tvboxmecool-m.jpg',
      'big': 'img/tvboxmecool-b.jpg',
    },
  },
  {
    'id': 246258248,
    'title': 'Витая пара PROConnect 01-0043-3-25',
    'price': 22,
    'description': 'Витая пара Proconnect 01-0043-3-25 является сетевым' +
      ' кабелем с 4 парами проводов типа UTP, в качестве проводника в' +
      ' которых используется алюминий, плакированный медью CCA. Такая' +
      ' неэкранированная витая пара с одножильными проводами диаметром' +
      ' 0.50 мм широко применяется в процессе сетевых монтажных работ.' +
      ' С ее помощью вы сможете обеспечить развертывание локальной сети' +
      ' в домашних условиях или на предприятии, объединить все необходимое' +
      ' вам оборудование в единую сеть.',
    'category': 'cables',
    'discont': false,
    'count': 420,
    'units': 'v',
    'images': {
      'small': 'img/lan_proconnect43-3-25.jpg',
      'big': 'img/lan_proconnect43-3-25-b.jpg',
    },
  },
];

const createRow = (obj) => {
  const newRaw = document.createElement('tr');
  newRaw.classList.add('cms-table__body-row');
  newRaw.setAttribute('data-product_id', `${obj.id}`);
  const imageObj = obj?.images ? `
    <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href="../images/sprite.svg#picture"></use>
    </svg>` :
    `
    <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href="../images/sprite.svg#picture-none"></use>
    </svg>
  `;

  newRaw.insertAdjacentHTML('beforeend',
      `<td class="cms-table__body-cell">${obj.id}</td>
      <td class="cms-table__body-cell">${obj.title}</td>
      <td class="cms-table__body-cell">${obj.category}</td>
      <td class="cms-table__body-cell cms-table__body-cell_position_center 
        cms-table__body-cell_font_color">${obj.units}</td>
      <td class="cms-table__body-cell cms-table__body-cell_position_center">
        ${obj.count}</td>
      <td class="cms-table__body-cell cms-table__body-cell_position_right">
        ${obj.price} руб.</td>
      <td class="cms-table__body-cell cms-table__body-cell_position_right">
        ${obj.price * obj.count} руб.</td>
      <td class="cms-table__body-box-button">
        <button class="cms-table__body-button js-cms-create-picture" 
        type="button">${imageObj}</button>
        <button class="cms-table__body-button js-cms-create-product" 
          type="button">
          <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="../images/sprite.svg#create-product"></use>
          </svg>
        </button>
        <button class="cms-table__body-button js-cms-delete-product" 
          type="button">
          <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="../images/sprite.svg#delete-product"></use>
          </svg>
        </button>
      </td>
      `);

  return newRaw;
};

const renderGoods = (arr) => {
  arr.map((item) => {
    cmsTableBody.insertAdjacentElement('beforeend', createRow(item));
  });
};

renderGoods(userArray);
