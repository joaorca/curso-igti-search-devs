/**
 * Objeto de estado global da aplicação,
 * que será manipulado pelo usuário através dos inputs
 */
const globalState = {
  allDevs: [],
  filteredDevs: [],
  loadingData: true,
  checkboxJava: true,
  checkboxJavaScript: true,
  checkboxPython: true,
  radioAnd: false,
  radioOr: true,
};

/**
 * Variáveis globais que mapeiam elementos HTML
 */
const $ = document.querySelector.bind(document);
const globalDivDevs = $('#divDevs');
const globalInputName = $('#inputName');
const globalCheckboxJava = $('#checkboxJava');
const globalCheckboxJavaScript = $('#checkboxJavaScript');
const globalCheckboxPython = $('#checkboxPython');
const globalRadioAnd = $('#radioAnd');
const globalRadioOr = $('#radioOr');

/**
 * Tudo começa aqui. A invocação desta função é feita
 * na última linha de código deste arquivo
 */
function start() {
  console.log("Let's Start");
}
/**
 * Inicializando o app
 */
start();
