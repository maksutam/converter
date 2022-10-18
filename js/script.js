// Обект с курсами 3-х валют
const rates = {};

// Элементы для отображения курса валют
const elementUSD = document.querySelector('[data-value="USD"]');
const elementEUR = document.querySelector('[data-value="EUR"]');
const elementGBP = document.querySelector('[data-value="GBP"]');

// Элементы формы, ввод суммы, поле с результатом
const input = document. querySelector('#input');
const result = document. querySelector('#result');
const select = document. querySelector('#select');

getCurrencies();
setInterval(getCurrencies, 10000);

// Функция получения курса валют и отображения их на странице
async function getCurrencies() {

const response = await fetch('http://www.floatrates.com/daily/mdl.json');
const data = await response.json();
const result = await data;
// console.log(result);

rates.usd = result.usd.inverseRate;
rates.eur = result.eur.inverseRate;
rates.gbp = result.gbp.inverseRate;


elementUSD.textContent = rates.usd.toFixed(2);
elementEUR.textContent = rates.eur.toFixed(2);
elementGBP.textContent = rates.gbp.toFixed(2);

}

// Слушаем изменение в текстовом поле и в селект
input.oninput = convertValue;
select.oninput = convertValue;

// Функция конвертации
function convertValue() {
    result.value = (parseFloat(input.value) / rates[select.value.toLowerCase()]).toFixed(2);
}