//JsBarcode("#barcode", "Hi!");

html2canvas(document.querySelector("#screenshot")).then(function(canvas) {
    document.body.appendChild(canvas);
});