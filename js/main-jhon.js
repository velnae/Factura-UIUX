
arrayProducts = [ 
    { id: 1, name: 'Laptop lenovo legion y540', priceUnit: 100 },
    { id: 2, name: 'Impresora HP', priceUnit: 200 },
    { id: 3, name: 'Mouse Logitech', priceUnit: 300 },
    { id: 4, name: 'Teclado Logitech', priceUnit: 400 },
    { id: 5, name: 'Monitor LG', priceUnit: 500 },
    { id: 6, name: 'Audifonos JBL', priceUnit: 600 },
    { id: 7, name: 'Cable HDMI', priceUnit: 700 },
    { id: 8, name: 'Cable USB', priceUnit: 800 },
    { id: 9, name: 'Cable VGA', priceUnit: 900 },
    { id: 10, name: 'Cable RJ45', priceUnit: 1000 },
];

var selectProducts = document.getElementById('selectProducts');
var btnAddTable = document.getElementById('btnAddTable');
var tableProducts = document.getElementById('tbl-productos');
var tableProductsTxt = document.getElementById('tbl-productos-txt');

arrayProducts.forEach(function(product) {
    var option = document.createElement('option');
    option.value = product.id;
    option.innerHTML = product.name;
    selectProducts.appendChild(option);
});

btnAddTable.addEventListener('click', function() {
    // ids seleccionados
    var ids = Array.from(selectProducts.selectedOptions).map(function(option) {
        return option.value;
    });

    // productos seleccionados
    var products = arrayProducts.filter(function(product) {
        return ids.indexOf(product.id.toString()) > -1;
    });

    // limpiar tabla

    // agregar productos a la tabla
    products.forEach(function(product) {
        // insertar fila en el tbody
        var tbody = tableProducts.querySelector('tbody');
        var tbodyTxt = tableProductsTxt.querySelector('tbody');

        var row = tbody.insertRow();
        var rowTxt = tbodyTxt.insertRow();

        row.insertCell().innerHTML = "<input id='cantidad' type='number' class='form-control' value='1' style='text-align: right'>"
        rowTxt.insertCell().innerHTML = '1';

        row.insertCell().innerHTML = product.name;
        rowTxt.insertCell().innerHTML = product.name;

        row.insertCell().innerHTML = product.priceUnit;
        rowTxt.insertCell().innerHTML = product.priceUnit;

        var cantidad = row.querySelector('#cantidad').value;
        var precieTotal = product.priceUnit * cantidad;

        row.insertCell().innerHTML = precieTotal;
        rowTxt.insertCell().innerHTML = precieTotal;

        $(rowTxt).effect("highlight", {color: 'yellow'}, 1000);

        // si cambia la cantidad
        row.querySelector('#cantidad').addEventListener('change', function() {
            var cantidad = row.querySelector('#cantidad').value;
            var precieTotal = product.priceUnit * cantidad;

            row.querySelector('td:nth-child(4)').innerHTML = precieTotal;
            rowTxt.querySelector('td:nth-child(1)').innerHTML = cantidad;
            rowTxt.querySelector('td:nth-child(4)').innerHTML = precieTotal;

            $(rowTxt).find('td:nth-child(1)').effect("highlight", {color: 'yellow'}, 1000);
            $(rowTxt).find('td:nth-child(4)').effect("highlight", {color: 'yellow'}, 1000);

            // calculando el total y tambien el total 
            calcularTotal();
        });

        // agregar boton eliminar
        var cell = row.insertCell();
        cell.innerHTML = "<button id='btnDeleteTable' class='btn btn-danger' title='Quitar producto'class='btn-quitar-producto'><i class='fa fa-solid fa-trash'></i></button>";
        cell.style = 'text-align: center; vertical-align: middle;'

        // agregar evento al boton eliminar con el id btnDeleteTable
        cell.querySelector('#btnDeleteTable').addEventListener('click', function() {

                    row.remove();
                    rowTxt.remove();
                    // calculando el total y tambien el total
                    calcularTotal();

        });
    });

    // poner estilos al td
    var tds = tableProducts.querySelectorAll('td');
    tds.forEach(function(td) {
        td.style = 'text-align: center; vertical-align: middle;'
    } );

    // borrando los productos seleccionados
    Array.from(selectProducts.selectedOptions).forEach(function(option) {
        option.remove();
    });

    // calculando el total y tambien el total
    calcularTotal();
});

function calcularTotal() {
    // calculando el total y tambien el total 
    let subTotal = 0;
    let $subTotal = document.getElementById('subTotal');
    let $txtSubTotal = document.getElementById('txtSubtotal');

    let $igv = document.getElementById('igv');
    let $txtIGV = document.getElementById('txtIGV');

    let $precioTotal = document.getElementById('precioTotal');
    let $txtTotal = document.getElementById('txtTotal');

    let total = 0;
    let $tds = tableProducts.querySelectorAll('td:nth-child(4)');

    $tds.forEach(function($td) {
        total += parseFloat($td.innerHTML);
    });

    subTotal = (total / 1.18).toFixed(2);
    $subTotal.innerHTML = subTotal;
    $txtSubTotal.innerHTML = subTotal;
    $($txtSubTotal).effect("highlight", {color: 'yellow'}, 1000);

    $igv.innerHTML = (total - subTotal).toFixed(2);
    $txtIGV.innerHTML = (total - subTotal).toFixed(2);
    $($txtIGV).effect("highlight", {color: 'yellow'}, 1000);;

    $precioTotal.innerHTML = total;
    $txtTotal.innerHTML = total;
    $($txtTotal).effect("highlight", {color: 'yellow'}, 1000);

    let  $quatityProducts = document.getElementById('quatityProducts');
    $quatityProducts.innerHTML = $tds.length;
}