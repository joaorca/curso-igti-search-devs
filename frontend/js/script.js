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
async function start() {
  /**
   * Obtendo todos os dev's do backend
   * de forma assíncrona
   */
  await fetchAllDevs();
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
 * Esta função é executada somente uma vez
 * e traz todos os dev's do backend. Além disso,
 * faz uma transformação nos dados, incluindo um
 * campo para facilitar a pesquisa (removendo acentos,
 * espaços em branco e tornando todo o texto minúsculo) e
 * também um array contendo somente o nome das linguagens
 * de programação que determinado dev conhece
 */
async function fetchAllDevs() {
  const resource = await fetch('http://localhost:3001/devs');
  const json = await resource.json();

  const jsonWithImprovedSearch = json.map((item) => {
    const { name, programmingLanguages } = item;

    return {
      ...item,
      searchName: name
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f\s]/g, ''),
      onlyLanguages: getOnlyLanguagesFrom(programmingLanguages),
    };
  });

  globalState.allDevs = [...jsonWithImprovedSearch];
  globalState.filteredDevs = [...jsonWithImprovedSearch];
  globalState.loadingData = false;
}

/**
 * Função para varrer o array de linguagens de programação
 * e trazer somente o nome em minúsculas, de forma ordenada
 */
function getOnlyLanguagesFrom(programmingLanguages) {
  return programmingLanguages
    .map(({ language }) => language.toLocaleLowerCase())
    .sort();
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
  console.table(globalState.filteredDevs);
}

/**
 * Inicializando o app
 */
start();
