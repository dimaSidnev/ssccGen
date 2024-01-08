barcodeOptions = { //настройки генератора штрихкода, если и придётся вносить
    displayValue: false, //какие-то изменения то скорее всего сюда
    width: 5,
    height: 150,
}


let resolutionCheck = new Promise(function(resolve, reject){ //согласен, странное использование промиса, но в отличие от функции его не нужно
    const windowHeightResolution = window.screen.availHeight; //лишний раз вызывать
    const windowWidthResolution = window.screen.availWidth;
    if(windowHeightResolution < 830 || windowWidthResolution < 1440){
        alert("Я создавал сайт исключительно под компьютеры. Если что-то не работает или коряво выглядит, то я предупреждал. Чао!");
        resolve();
    } else resolve();
});

const input = document.querySelector("#input"); //куча элементов, ничего особенного
const barcode = document.querySelector("#barcode");
const sscc = document.querySelector(".sscc");
const logo = document.querySelector("#logo");
const downloadBtn = document.querySelector("#download");
const generateBtn = document.querySelector("#generate");
const resetBtn = document.querySelector("#reset");
const infoBtn = document.querySelector(".info");


generateBtn.addEventListener("click", toCanvas); //все ивентлисенеры, тоже ничего особенного
downloadBtn.addEventListener("click", download); //что бы понять что за фукнции во вторых аргументах - смотри ниже
resetBtn.addEventListener("click", reset);
input.addEventListener("input", generateBarcode);
sscc.addEventListener("click", () => { input.focus() });
infoBtn.addEventListener("click", showInfo);


//дальше идёт куча простых функций с говорящими именами, знаю, я мог и не объявлять их в таком количестве
//но посчитал что так будет лучше, модульный код йоу
function dataToURL(){
    let canvas = document.getElementsByTagName("canvas");
    return canvas[0].toDataURL("image/png");
}

function showInfo(){ //куча текста в одной строке, ну и кошмар, да-да
    alert('Как пользоваться моим генератором для "чайников".\n1. Нажми на большой прямоугольник (штрих-код).\n2. Введи своё значение.\n3. Нажми "Создать".\n4. Теперь нажми "Скачать" и(или) "Назад".\n(эти кнопки появятся после нажатия "Создать")')
}

function hideSSCC(){
    logo.classList.add("hidden");
    barcode.classList.add("hidden");
    input.classList.add("hidden");
    generateBtn.classList.add("hidden");
    downloadBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
}

function unHideSSCC(){
    logo.classList.remove("hidden");
    barcode.classList.remove("hidden");
    input.classList.remove("hidden");
    generateBtn.classList.remove("hidden");
    downloadBtn.classList.add("hidden");
    resetBtn.classList.add("hidden");
}

function generateBarcode(){
    return JsBarcode("#barcode", input.value, barcodeOptions);
}

function toCanvas(){ //вроде бы простая функция, но на удивление я с ней неплохо провозился
    html2canvas(document.getElementById("capture")).then(function(childCanvas) {
        sscc.appendChild(childCanvas);
    })
    hideSSCC();
}

function download(){
    downloadBtn.href = dataToURL();
}

function reset(){
    let canvas = document.getElementsByTagName("canvas");
    canvas[0].remove();
    input.value = "";
    unHideSSCC();
    JsBarcode("#barcode", "(00)00000000000000000", barcodeOptions);
}


JsBarcode("#barcode", "(00)00000000000000000", barcodeOptions); //задаёт изначальное значение штрихкоду