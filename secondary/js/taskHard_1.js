'use strict'

{
  const revenue = +prompt('Введите сумму дохода');

  switch (true) {
    case revenue > 50000:
      console.log(`Налог 30%. С дохода ${revenue} ₽. сумма налога составит ${revenue * 0.3} ₽.`);
      break;
    case revenue > 15000:
      console.log(`Налог 20%. С дохода ${revenue} ₽. сумма налога составит ${revenue * 0.2} ₽.`);
      break;
    case revenue > 0:
      console.log(`Налог 13%. С дохода ${revenue} ₽. сумма налога составит ${revenue * 0.13} ₽.`);
      break;
    
    default:
      break;
  }
}