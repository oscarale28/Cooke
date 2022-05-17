// Constante para establecer la ruta y parámetros de comunicación con la API.
const API_SUBCATEPRODUCTOS = SERVER + 'private/subcategoriapd.php?action=';
const ENDPOINT_CATEGORIA = SERVER + 'private/categoriapd.php?action=readAll';
const ENDPOINT_ESTADO = SERVER + 'private/estado_general.php?action=readAll';

// Método manejador de eventos que se ejecuta cuando el documento ha cargado.
document.addEventListener('DOMContentLoaded', function () {
    /* Cargando propiedades de datatable */
    $('#table-subcategorias-productos').DataTable({
        "info": false,
        "searching": false,
        "dom":
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-5'l><'col-sm-7 d-flex justify-content-end pe-3'p>>",
        "language": {
            "lengthMenu": "Mostrando _MENU_ registros",
            "paginate": {
                "next": '<i class="fa-solid fa-angle-right"></i>',
                "previous": '<i class="fa-solid fa-angle-left"></i>'
            }
        },
        "lengthMenu": [[10, 15, 20, -1], [10, 15, 20, "Todos"]]
    });
    // Se llama a la función que obtiene los registros para llenar la tabla. Se encuentra en el archivo components.js
    readRows(API_SUBCATEPRODUCTOS);
});

//Función que se ejecuta cada vez que apretamos una tecla dentro del input #search, sirve para buscador en tiempo real
$(document).on('keyup', '#search', function () {
    var valor = $(this).val();
    if (valor != "") {
        //SearchRows se encuentra en componentes.js y mandamos la ruta de la api, el formulario el cual contiene nuestro input para buscar (id) y el input de buscar (id)
        searchRows(API_SUBCATEPRODUCTOS, 'search-form', 'search');
    }
    else {
        //Cuando el input este vacío porque borramos el texto manualmente
        readRows(API_SUBCATEPRODUCTOS);
    }
});

// Función para preparar el modal al momento de insertar un registro.
function openCreate() {

    //Limpiamos los campos del modal
    $("#save-modal").find("input,textarea,select").val("");

    // Se asigna el título para la caja de diálogo (modal).
    document.getElementById('modal-title').textContent = 'Agregar subcategoría';

    //Añadimos la clase que esconde el select estado ya que todos los usuarios ingresados, tendrán el valor de activo y este se manda automaticamente
    document.getElementById('estado').classList.add('input-hide')
    document.getElementById('estado-label').classList.add('input-hide')


    /* Se llama a la función que llena el select del formulario. Se encuentra en el archivo components.js, 
     * mandar de parametros la ruta de la api de la tabla que utiliza el select, y el id del select*/
    fillSelect(ENDPOINT_CATEGORIA, 'categoria', null);
}

// Función para preparar el formulario al momento de modificar un registro.
function openUpdate(id) {
    //Limpiamos los campos del modal
    $("#save-modal").find("input,textarea,select").val("");
    // Se asigna el título para la caja de diálogo (modal).
    document.getElementById('modal-title').textContent = 'Actualizar subcategoría';
    //Mostramos el campo de estado ya que se podrá modificar
    document.getElementById('estado').classList.remove('input-hide')
    document.getElementById('estado-label').classList.remove('input-hide')
    // Se establece el campo de archivo como opcional.
    document.getElementById('archivo').required = false;

    // Se define un objeto con los datos del registro seleccionado.
    const data = new FormData();
    data.append('id', id);
    // Petición para obtener los datos del registro solicitado.
    fetch(API_SUBCATEPRODUCTOS + 'readOne', {
        method: 'post',
        body: data
    }).then(function (request) {
        // Se verifica si la petición es correcta, de lo contrario se muestra un mensaje en la consola indicando el problema.
        if (request.ok) {
            // Se obtiene la respuesta en formato JSON.
            request.json().then(function (response) {
                // Se comprueba si la respuesta es satisfactoria, de lo contrario se muestra un mensaje con la excepción.
                if (response.status) {
                    // Se inicializan los campos del formulario con los datos del registro seleccionado.
                    document.getElementById('id').value = response.dataset.idSubCategoriaP;
                    document.getElementById('nombre').value = response.dataset.nombreSubCategoriaP;
                    document.getElementById('descripcion').value = response.dataset.descripcionSubCategoriaP;
                    fillSelect(ENDPOINT_CATEGORIA, 'categoria', response.dataset.idCategoriaP);
                    fillSelect(ENDPOINT_ESTADO, 'estado', response.dataset.estado);

                } else {
                    sweetAlert(2, response.exception, null);
                }
            });
        } else {
            console.log(request.status + ' ' + request.statusText);
        }
    });
}

// Función para mandar el id de la row seleccionada al modal eliminar-------------------..
function openDelete(id) {
    document.getElementById('id-delete').value = id;
}

// Método manejador de eventos que se ejecuta cuando se envía el modal de eliminar-------------------..
document.getElementById('delete-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario-------------------.
    event.preventDefault();
    //Llamamos al método que se encuentra en la api y le pasamos la ruta de la API y el id del formulario dentro de nuestro modal eliminar-------------------..
    confirmDelete(API_SUBCATEPRODUCTOS, 'delete-form');
});

//Función para refrescar la tabla manualmente al darle click al botón refresh-------------------..
document.getElementById('refresh').addEventListener('click', function () {
    readRows(API_SUBCATEPRODUCTOS);
    document.getElementById('search').value = "";
});

// Función para llenar la tabla con los datos de los registros. Se manda a llamar en la función readRows().
function fillTable(dataset) {
    let content = '';
    // Se recorre el conjunto de registros (dataset) fila por fila a través del objeto row.
    dataset.map(function (row) {
        // Se crean y concatenan las filas de la tabla con los datos de cada registro.
        content += `
            <tr>
                <td><img src="${SERVER}images/subcategoriaspd/${row.imagenSubcategoria}" class="img-fluid" height="100"></td>
                <td>${row.nombreSubCategoriaP}</td>
                <td>${row.descripcionSubCategoriaP}</td>
                <td>${row.nombreCategoriaP}</td>
                <td>${row.estado}</td>
                <td class="botones-table">
                    <div class="acciones d-flex mx-auto">
                        <span onclick="openUpdate(${row.idSubCategoriaP})" class="accion-btn" type="button"
                        data-bs-toggle="modal" data-bs-target="#save-modal">
                        <i class="fa-solid fa-pen-to-square"></i>
                        </span>
                        <span onclick="openDelete(${row.idSubCategoriaP})" class="accion-btn" type="button"
                            data-bs-toggle="modal" data-bs-target="#modal-eliminar">
                            <i class="fa-solid fa-trash-can fa-lg"></i>
                        </span>
                    </div>
                </td>
            </tr>
        `;
    });
    // Se agregan las filas al cuerpo de la tabla mediante su id para mostrar los registros.
    document.getElementById('tbody-rows').innerHTML = content;
}

// Método manejador de eventos que se ejecuta cuando se envía el formulario de guardar.
document.getElementById('save-form').addEventListener('submit', function (event) {
    // Se evita recargar la página web después de enviar el formulario.
    event.preventDefault();
    // Se define una variable para establecer la acción a realizar en la API.
    let action = '';
    // Se comprueba si el campo oculto del formulario esta seteado para actualizar, de lo contrario será para crear.
    (document.getElementById('id').value) ? action = 'update' : action = 'create';
    // Se llama a la función para guardar el registro. Se encuentra en el archivo components.js
    saveRow(API_SUBCATEPRODUCTOS, action, 'save-form', 'save-modal');
});
