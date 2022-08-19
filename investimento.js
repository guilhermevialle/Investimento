const print = (...args) => console.log(...args)

const tabelaIOF = () => {
  let y = 3
  let counter = 0
  let tabela = []

  for (let x = 99; x > -1; x -= y) {
    if (counter == 3) {
      counter = 0
      y = 4
    }
    else {
      y = 3
    }

    counter++
    tabela.push(x)
  }

  tabela.shift()
  return tabela
}

const formatarMeses = (meses) => {
  let anos = -1
  let months = 0

  for (let x = 0; x <= meses; x += 12) {
    anos++
    months = meses - x
  }

  if (anos == 0) {
    if (months > 1) {
      return `${months} meses`
    }
    else {
      return `${months} mes`
    }
  }
  else if (months == 0) {
    if (anos > 1) {
      return `${anos} anos`
    }
    else {
      return `${anos} ano`
    }
  }
  else {
    if (anos == 1 && months == 1) {
      return `${anos} ano e ${months} mes`
    }
    else if (anos != 1 && months != 1) {
      return `${anos} anos e ${months} meses`
    }
    else if (anos == 1) {
      return `${anos} ano e ${months} meses`
    }
    else {
      return `${anos} anos e ${months} mes`
    }
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const calc = ({ montante, porcento, imposto, tempo, saidas, entradas, divida, tempoEstimado }) => {
  let res = montante;
  porcento /= 100;
  imposto /= 100;
  gastoTotal = 0;
  entradaTotal = 0;
  rendimento = 0

  print("........................");
  print(`Saldo atual: R$ ${montante}`);
  print("........................");
  print("");

  for (let x = 1; x <= tempo; x++) {
    IOF = 0
    let diaDoSaque = false

    if (saidas.min > 0 || saidas.max > 0) {
      diaDoSaque = getRandomInt(0, 31)
      IOF = tabelaIOF()[diaDoSaque] / 100

      if (IOF == undefined || isNaN(IOF)) {
        IOF = 0
      }
    }

    anterior = res.toFixed(2);
    xMensal = getRandomInt(saidas.min, saidas.max);
    xMensalEntrada = getRandomInt(entradas.min, entradas.max);
    gastoTotal += xMensal;
    entradaTotal += xMensalEntrada;
    res -= xMensal;
    res += xMensalEntrada;

    if (tempoEstimado && divida.valor != 0) {
      if (rendimento > divida.valor) {
        print("Você quitou sua divida")
        print(`Tempo estimado: ${formatarMeses(x - 1)}`)
        break
      }
    }

    print(`${formatarMeses(x)}:`);
    print(`Saidas: R$ ${xMensal} | Entradas: R$ ${xMensalEntrada}`);
    retorno = res * porcento
    diaDoSaque ? print(`Dia do saque: ${diaDoSaque + 1}`) : false
    print(`IOF: R$ -${(retorno * IOF).toFixed(2)} | IR: R$ -${(retorno * imposto).toFixed(2)} de R$ ${retorno.toFixed(2)} do CDI`)
    taxaIOF = retorno * IOF
    taxaIR = retorno * imposto
    retorno -= taxaIR + taxaIOF
    print(`Retorno liquido (com taxas): R$ ${retorno.toFixed(2)}`);
    rendimento += retorno
    res += retorno;
    print(`Acumulo: R$ ${res.toFixed(2)}`);

    if (anterior > res) {
      let calc = (100 - (res * 100) / anterior).toFixed(2);
      print(`Seu investimento caiu em ${calc}%`);
    } else {
      let calc = (100 - (anterior * 100) / res).toFixed(2);
      print(`Seu investimento aumentou em ${calc}%`);
    }
    print(".....................................");
    print("");
  }

  diferenca = entradaTotal - gastoTotal;

  print(`Rendimento total de: R$ ${rendimento.toFixed(2)}`)
  print(`Gastos total: R$ ${gastoTotal.toFixed(2)}`);
  print(`Entradas total: R$ ${entradaTotal.toFixed(2)}`);
  print(`Saldo entre entradas e saidas: R$ ${diferenca.toFixed(2)}`);
  print(
    `Voce possuia R$ ${montante} ha ${formatarMeses(tempo)} atras e Agora R$ ${res.toFixed(
      2
    )}`
  );

  if (res < 0 || res < montante) {
    print("");
    print("Resultado: Prejuizo");
  } else {
    print("");
    print("Resultado: Lucro");
  }
};

calc({
  montante: 0,
  porcento: 11.2 / 12,
  imposto: 22.5,
  tempo: 6,
  min: 0,
  saidas: {
    min: 30,
    max: 75,
  },
  entradas: {
    min: 250.50,
    max: 607.32,
  },
  divida: {
    valor: 0,
    juros: 0
  },
  tempoEstimado: true
});
