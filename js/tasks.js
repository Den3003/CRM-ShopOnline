'use strict'

{
  const rain = Math.round(Math.random());

  if (rain === 1) {
    alert('Пошел дождь. Возьмите зонт!');
  }
  if (rain === 0) {
    alert('Дождя нет!');
  }
}

// {
//   const sumScoresMathematics = +prompt('Введите кол-во баллов по математике', '');
//   const sumScoresRussianLanguage = +prompt('Введите кол-во баллов по русскому языку', '');
//   const sumScoresComputerScience = +prompt('Введите кол-во баллов по информатике', '');

//   if (sumScoresMathematics + sumScoresRussianLanguage + sumScoresComputerScience >= 265) {
//     alert('Поздравляю, вы поступили на бюджет!');
//   } else {
//     alert('Увы вы не поступили');
//   }
// }

// {
//   const cash = +prompt('Сколько денег вы хотите снять?');

//   if (cash % 100 === 0) {
//     alert('Заберите деньги');
//   } else {
//     alert('Банкомат выдаёт минимальные купюры 100р');
//   }
// }