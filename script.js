barcodeOptions = {
    displayValue: false,
    width: 5,
    height: 150,
}

const input = document.querySelector("#input");
const barcode = document.querySelector("#barcode");
const sscc = document.querySelector(".sscc");
const logo = document.querySelector("#logo");
const downloadBtn = document.querySelector("#download");
const generateBtn = document.querySelector("#generate");
const resetBtn = document.querySelector("#reset");

function dataToURL(){
    let canvas = document.getElementsByTagName("canvas");
    return canvas[0].toDataURL("image/png");
}


generateBtn.addEventListener("click", toCanvas);
downloadBtn.addEventListener("click", download);
resetBtn.addEventListener("click", reset);
sscc.addEventListener("click", () => { input.focus() });
input.addEventListener("input", generateBarcode);


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

function toCanvas(){
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


JsBarcode("#barcode", "(00)00000000000000000", barcodeOptions);