barcodeOptions = { //настройки генератора штрихкода, если и придётся вносить
    displayValue: false, //какие-то изменения то скорее всего сюда
    width: 5,
    height: 150,
}

window.addEventListener("load", resolutionCheck); //проверка на мобилки

const input = document.querySelector("#input"); //куча элементов, ничего особенного
const barcode = document.querySelector("#barcode");
const sscc = document.querySelector(".sscc");
const logo = document.querySelector("#logo");
const downloadBtn = document.querySelector("#download");
const generateBtn = document.querySelector("#generate");
const resetBtn = document.querySelector("#reset");
const infoBtn = document.querySelector(".info");
const overlay = document.querySelector(".overlay");
const popupBtn = document.querySelector("#popupBtn");


generateBtn.addEventListener("click", toCanvas); //все ивентлисенеры, тоже ничего особенного
downloadBtn.addEventListener("click", download); //что бы понять что за фукнции во вторых аргументах - смотри ниже
resetBtn.addEventListener("click", reset);
input.addEventListener("input", generateBarcode);
input.addEventListener("focus", () => {input.placeholder = ""}); //оказывается, не все видят что они сфокусированы на импуте без этого ивента
input.addEventListener("blur", () => {input.placeholder = "(00)00000000000000000"});
logo.addEventListener("focus", () => {logo.placeholder = ""}); //если мне ещё раз приёдтся это писать, лучше сделаю это в отдельную функцию
logo.addEventListener("blur", () => {logo.placeholder = 'ООО "Компания "Органика", склад г. Воронеж'});
infoBtn.addEventListener("click", showInfo);
popupBtn.addEventListener("click", hideInfo);


//дальше идёт куча простых функций с говорящими именами, знаю, я мог и не объявлять их в таком количестве
//но посчитал что так будет лучше, модульный код йоу

function resolutionCheck(){ //проверка на мобильные устройства (нет, адаптивный дизайн в планы не входил)
    const windowHeightResolution = window.screen.availHeight;
    const windowWidthResolution = window.screen.availWidth;
    if(windowHeightResolution < 830 || windowWidthResolution < 1440){
        document.querySelector(".popup__header").innerHTML = "Ахтунг!";
        document.querySelector(".popup__content").innerHTML = "Я создавал сайт исключительно для десктопов. Если есть желание получить рак глаз - кнопка снизу ждёт тебя."
        document.querySelector("#popupBtn").classList.remove("btn__bg_blue");
        document.querySelector("#popupBtn").classList.add("btn__bg_red");
        showInfo();
        popupBtn.addEventListener("click", resolutionCheckReset, { once: true });
        return;
    } else return;
};

function resolutionCheckReset(){ //колбэк, убирающий инфу с попапа для мобильных устройств
    document.querySelector(".popup__header").innerHTML = "Инструкция";
    document.querySelector(".popup__content").innerHTML = 'Нажми на часть прямоугольника со штрих-кодом, которую хочешь изменить (пока что это либо цифры снизу, либо текст сверху).\n2. Введи своё значение (к сожалению, кириллицу машина не понимает).\n3. Нажми "Создать".\n4. Теперь нажми "Скачать" и(или) "Назад".\n(эти кнопки появятся после нажатия "Создать")';
    document.querySelector("#popupBtn").classList.remove("btn__bg_red");
function dataToURL(){
    let canvas = document.getElementsByTagName("canvas");
    return canvas[0].toDataURL("image/png");
}

function showInfo(){ //куча текста в одной строке, ну и кошмар, да-да
    overlay.classList.remove("hidden");
}

function hideInfo(){
    overlay.classList.add("hidden");
}

function hideSSCC(){
    logo.classList.add("hidden");
    barcode.classList.add("hidden");
    input.classList.add("hidden");
    generateBtn.classList.add("hidden");
    infoBtn.classList.add("hidden");
    downloadBtn.classList.remove("hidden");
    resetBtn.classList.remove("hidden");
}

function unHideSSCC(){
    logo.classList.remove("hidden");
    barcode.classList.remove("hidden");
    input.classList.remove("hidden");
    generateBtn.classList.remove("hidden");
    infoBtn.classList.remove("hidden");
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