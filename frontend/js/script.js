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
  /**
   * Adicionando eventos aos inputs, checkboxes e radio buttons
   */
  globalInputName.addEventListener('input', handleInputChange);

  globalCheckboxJava.addEventListener('input', handleCheckboxClick);
  globalCheckboxJavaScript.addEventListener('input', handleCheckboxClick);
  globalCheckboxPython.addEventListener('input', handleCheckboxClick);

  globalRadioAnd.addEventListener('input', handleRadioClick);
  globalRadioOr.addEventListener('input', handleRadioClick);

  filterDevs();
}

/**
 * Em toda mudança no texto de input,
 * haverá uma nova filtragem e renderização
 * de dev's
 */
function handleInputChange() {
  filterDevs();
}

/**
 * Refletimos os cliques de cada checkbox no state.
 * Identificamos qual checkbox foi clicado através
 * do respectivo id. Em seguida, filtramos os dev's.
 */
function handleCheckboxClick({ target }) {
  const checkboxId = target.id;
  globalState[checkboxId] = !globalState[checkboxId];

  filterDevs();
}

/**
 * Aqui garantimos que uma e somente uma das opções
 * de radio de state permaneça como true. Em seguida,
 * filtramos os dev's
 */
function handleRadioClick({ target }) {
  const radioId = target.id;
  globalState.radioAnd = radioId === 'radioAnd';
  globalState.radioOr = radioId === 'radioOr';

  filterDevs();
}

/**
 * Principal função deste app.
 *
 * Filtra os dev's conforme definições
 * do usuário e invoca a renderização
 * da tela
 */
function filterDevs() {
  console.log('filter Devs');
}

/**
 * Inicializando o app
 */
start();
