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
  const { allDevs, radioOr } = globalState;

  /**
   * Obtendo texto "limpo" do input
   */
  const textFromInput = globalInputName.value.toLocaleLowerCase().trim();

  /**
   * Obtendo array de linguagens de programação a partir dos
   * checkboxes
   */
  const filterProgrammingLanguages = getFilteredProgrammingLanguages();

  let filteredDevs = allDevs;

  /**
   * Após o primeiro filtro, filtramos mais uma vez
   * conforme o texto do input
   */
  if (textFromInput) {
    filteredDevs = filteredDevs.filter(({ searchName }) =>
      searchName.includes(textFromInput)
    );
  }

  /**
   * Definimos os dev's filtrados no estado do app
   * e invocamos a função de renderização em seguida.
   */
  globalState.filteredDevs = filteredDevs;
  renderDevs();
}

/**
 * Montamos um array de linguagens de programação,
 * conforme a marcação dos checkboxes
 */
function getFilteredProgrammingLanguages() {
  const { checkboxJava, checkboxJavaScript, checkboxPython } = globalState;

  let filterProgrammingLanguages = [];

  if (checkboxJava) {
    filterProgrammingLanguages.push('java');
  }

  if (checkboxJavaScript) {
    filterProgrammingLanguages.push('javascript');
  }

  if (checkboxPython) {
    filterProgrammingLanguages.push('python');
  }

  return filterProgrammingLanguages;
}

/**
 * Função de renderização dos dev's em tela
 */
function renderDevs() {
  const { filteredDevs } = globalState;

  const devsToShow = filteredDevs
    .map((dev) => {
      return renderDev(dev);
    })
    .join('');

  const renderedHTML = `
       <div>
         <h2>${filteredDevs.length} dev(s) encontrado(s)</h2>
         <div class='row'>
           ${devsToShow}
         </div>
       </div>
    `;

  globalDivDevs.innerHTML = renderedHTML;
}

/**
 * Isolamos a função para renderizar um dev,
 * utilizando algumas classes do Materialize
 * e o próprio CSS do app
 */
function renderDev(dev) {
  const { name, picture, programmingLanguages } = dev;

  return `
      <div class='col s12 m6 l4'>
        <div class='dev-card'>
          <img class='avatar' src="${picture}" alt="${name}" />
          <div class='data'>
            <span>${name}</span>
            <span>${renderProgrammingLanguages(programmingLanguages)}</span>
          </div>
        </div>
      </div>
    `;
}

/**
 * Função para renderizar as linguagens de programação
 * através de ícones. Os ícones já foram fornecidos pelo
 * app na pasta "img"
 */
function renderProgrammingLanguages(programmingLanguages) {
  return programmingLanguages
    .map(({ language }) => {
      const src = `./img/${language.toLocaleLowerCase()}.png`;
      return `<img class='language' src='${src}' alt='${language}' title='${language}' />`;
    })
    .join(' ');
}

/**
 * Inicializando o app
 */
start();
