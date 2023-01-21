const form = document.querySelector("form");
const nlwSetup = new NLWSetup(form);
const button = document.querySelector("header button");

// addEventListener: sempre que houver o "click", ira executar a função "add"
button.addEventListener("click", add);
form.addEventListener("change", save);

function add() {
  // new Date: Adicionada uma nova data. "toLocaleDateString" pega a data atual "americanizada"(MM-DD), "abrasileira" ela com "pt-br", e o tira a parte do ano com o "slice".
  // slice: Ele corta uma parte da string, "0" no começo, ou seja, nao corta nada no começo, e "-5" no final, ou seja, corta 5 letras de trás pra frente da string.
  const today = new Date().toLocaleDateString("pt-br").slice(0, -5);
  const dayExists = nlwSetup.dayExists(today);

  if (dayExists) {
    alert("Dia já incluso!");
    return;
  }

  alert("Adicionado com sucesso!");
  nlwSetup.addDay(today);
}

// Função "setItem" salva no "localStorage", a string que foi transformada do objeto pela funçao "stringify", que foi pega do "nlwSetup.data".
// Stringify: Transforma o objeto em string para adicionar ao "localStorage"
// setItem: Esse método/função faz os valores serem guardados no "localStorage"
// localStorage: Database do navegador, ou seja, nao vai retornar a data de outro navegador, ou de outro aparelho.
function save() {
  localStorage.setItem("NLWSetup@habits", JSON.stringify(nlwSetup.data));
}

// Função "getItem" pega o valor do "localStorage", transforme em objeto com o "parse", e salva na variável "data".
// Parse: Inverso do "stringify, transforma a string em objeto/data, para adcionar ao "data".
// getItem: Pega o valor entre parenteses, do "localStorage"
const data = JSON.parse(localStorage.getItem("NLWSetup@habits")) || {};
nlwSetup.setData(data);
nlwSetup.load();
