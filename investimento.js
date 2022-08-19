const print = (...args) => console.log(...args)

const formatarMeses = (meses) => {
  anos = -1
  months = 0

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

print(formatarMeses(24))

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
    anterior = res.toFixed(2);
    xMensal = getRandomInt(saidas.min, saidas.max);
    xMensalEntrada = getRandomInt(entradas.min, entradas.max);
    gastoTotal += xMensal;
    entradaTotal += xMensalEntrada;
    res -= xMensal;
    res += xMensalEntrada;

    if (tempoEstimado) {
      if (rendimento > divida.valor) {
        print("Você quitou sua divida")
        print(`Tempo estimado: ${formatarMeses(x - 1)}`)
        break
        return
      }
    }

    print(`${formatarMeses(x)}:`);
    print(`Saidas: R$ ${xMensal} | Entradas: R$ ${xMensalEntrada}`);
    retorno = res * porcento
    retorno -= retorno * imposto
    print(`Retorno liquido: R$ ${retorno.toFixed(2)}`);
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
    `Seu dinheiro valia R$ ${montante} ha ${formatarMeses(tempo)} atras. Agora equivale a: R$ ${res.toFixed(
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
  montante: 100000,
  porcento: (13.65 / 12) + (0.65 / 12),
  imposto: 22.5,
  tempo: 30,
  saidas: {
    min: 250,
    max: 500,
  },
  entradas: {
    min: 2500,
    max: 2900,
  },
  divida: {
    valor: 35000,
    juros: 16.6 / 12
  },
  tempoEstimado: true
});
