const log = (...args) => console.log(...args)

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const calc = ({ montante, porcento, imposto, tempo, saidas, entradas }) => {
  let res = montante;
  porcento /= 100;
  imposto /= 100;
  gastoTotal = 0;
  entradaTotal = 0;

  log("........................");
  log(`Saldo atual: R$ ${montante}`);
  log("........................");
  log("");

  for (let x = 1; x <= tempo; x++) {
    anterior = res.toFixed(2);
    xMensal = getRandomInt(saidas.min, saidas.max);
    xMensalEntrada = getRandomInt(entradas.min, entradas.max);
    gastoTotal += xMensal;
    entradaTotal += xMensalEntrada;
    res -= xMensal;
    res += xMensalEntrada;

    log(`Mes ${x}:`);
    log(`Saidas: R$ ${xMensal} | Entradas: R$ ${xMensalEntrada}`);
    log(`Retorno liquido: R$ ${(res * porcento).toFixed(2)}`);
    res += res * porcento;
    log(`Acumulo: R$ ${res.toFixed(2)}`);

    if (anterior > res) {
      let calc = (100 - (res * 100) / anterior).toFixed(2);
      log(`Seu investimento caiu em ${calc}%`);
    } else {
      let calc = (100 - (anterior * 100) / res).toFixed(2);
      log(`Seu investimento aumentou em ${calc}%`);
    }
    log(".....................................");
    log("");
  }

  diferenca = entradaTotal - gastoTotal;

  log(`Diferenca: R$ ${diferenca.toFixed(2)}`);
  log(`Gastos total: R$ ${gastoTotal.toFixed(2)}`);
  log(`Entradas total: R$ ${entradaTotal.toFixed(2)}`);
  log(
    `Seu dinheiro valia R$ ${montante} ha ${tempo} meses atras. Agora equivale a: R$ ${res.toFixed(
      2
    )}`
  );

  if (res < 0 || diferenca < 0) {
    log("");
    log("Resultado: Prejuizo");
  } else {
    log("");
    log("Resultado: Lucro");
  }
};

calc({
  montante: 25000,
  porcento: 1.09,
  imposto: 50,
  tempo: 4,
  saidas: {
    min: 1500,
    max: 1900,
  },
  entradas: {
    min: 1212,
    max: 1700,
  },
});
