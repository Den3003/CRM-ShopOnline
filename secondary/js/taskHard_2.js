'use strict'

{
  let revenue = +prompt('Введите сумму дохода');
  let tax = 0;

  switch (true) {
    case revenue > 50000:
      tax += (revenue - 50000) * 0.3;
      revenue = 50000;
      console.log(`Налог 30% на доход выше 50 000 ₽. составит: ${tax} ₽.`);
    case revenue > 15000 && revenue <= 50000:
      tax += (revenue - 15000) * 0.2;
      console.log(`Налог 20% на доход выше 15 000 ₽. составит: ${(revenue - 15000) * 0.2} ₽.`);
      revenue = 15000;
    case revenue <= 15000 && revenue > 0:
      tax += revenue * 0.13;
      console.log(`Налог 15% на доход до 15 000 ₽. составит: ${revenue * 0.13} ₽.`);
    default:
      console.log(`Общая сумма налога составит ${tax} ₽.`);
      break;
  }
}