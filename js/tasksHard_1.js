'use strict'

{
  const revenue = +prompt('Введите сумму дохода');

  if (revenue <= 15000 && revenue > 0) {
    let sum = revenue * 0.13;
    console.log(`Налог 13%. С дохода ${revenue} ₽. сумма налога составит ${sum} ₽.`);
  }

  if (revenue > 15000 && revenue <= 50000) {
    let sum = revenue * 0.2;
    console.log(`Налог 20%. С дохода ${revenue} ₽. сумма налога составит ${sum} ₽.`);
  }

  if (revenue > 50000) {
    let sum = revenue * 0.3;
    console.log(`Налог 30%. С дохода ${revenue} ₽. сумма налога составит ${sum} ₽.`);
  }
}