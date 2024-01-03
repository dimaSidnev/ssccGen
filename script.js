barcodeOptions = {
    displayValue: false,
    width: 5,
    height: 150,
}

//допиши логику для скачивания canvas и займись рефакторингом

const input = document.querySelector("#input");
const btn = document.querySelector("#btn");
const sscc = document.querySelector(".sscc");
const organica = document.querySelector(".sscc__organica");
const download = document.querySelector("#download");

function renderBarcode(){
    download.classList.add("guide__download_red");
    download.href = document.getElementsByTagName("canvas");
    return JsBarcode("#barcode", input.value, barcodeOptions);

}

function toImage(){
    html2canvas(sscc).then(function(canvas) {
        sscc.appendChild(canvas);
    });
    sscc.classList.add("sscc_hidden");
}

JsBarcode("#barcode", "(00)00000000000000000", barcodeOptions)

sscc.addEventListener("click", () => { input.focus() });
input.addEventListener("input", renderBarcode);
download.addEventListener("click", toImage);