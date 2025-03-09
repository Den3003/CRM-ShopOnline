import controls from './control.js';

export const createRow = (obj) => {
  const newRaw = document.createElement('tr');
  newRaw.classList.add('cms-table__body-row');
  newRaw.setAttribute('data-product-Id', `${obj.id}`);
  const imageObj = obj?.images ? `
    <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href="#picture"></use>
    </svg>` :
    `
    <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <use href="#picture-none"></use>
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
        ${controls.getTotalPrice(obj.count, obj.price, obj.discount)} руб.</td>
      <td class="cms-table__body-box-button">
        <button class="cms-table__body-button js-cms-create-picture" 
        type="button">${imageObj}</button>
        <button class="cms-table__body-button js-cms-create-product" 
          type="button">
          <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="#create-product"></use>
          </svg>
        </button>
        <button class="cms-table__body-button js-cms-delete-product" 
          type="button">
          <svg class="cms-table__button-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use href="#delete-product"></use>
          </svg>
        </button>
      </td>
      `);

  return newRaw;
};
