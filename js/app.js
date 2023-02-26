//variables
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners() {
    //Cuando agregas un curso presionando "Agregar al carrito"
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina Cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

}

//ELiminar curso del carrito
function eliminarCurso(e) {

    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulos carrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);


        carritoHTML(); //iterar sobre el carrito y mostrar su HTML

    }



}
//Vaciar carrito
vaciarCarritoBtn.addEventListener('click', () => {

    articulosCarrito = [];

    limpiarHTML();

});


//funciones

function agregarCurso(e) {
    e.preventDefault();
    //aplicando delegation
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }


}

//Extrayendo info del curso
function leerDatosCurso(curso) {
    // console.log(curso);
    //crear un objeto con el contenido del curso actual
    const infoCurso = {
        cantidad: 1,
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        //Obteniendo el ID del curso.
        id: curso.querySelector('a').getAttribute('data-id'),

    }
    //Revisa si  un elemento ya exite en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe) {
        //actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna EL objeto actualizado
            } else {

                return curso; //Retorna el objeto que no es duplicado
            }
        });

        articulosCarrito = [...cursos];

    } else {
        //Agrega el curso al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }



    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
    //limpiar el HTML
    limpiarHTML();




    //Recorre el Carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        //aplicando destructuring al objeto para simplificar codigo
        const {
            imagen,
            id,
            precio,
            cantidad,
            titulo
        } = curso;

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>
        <img src='${imagen}' width=150 >
     
        </td>
        <td>
     ${titulo}
        </td>
        <td>
     ${precio}
        </td>
        <td>
     ${cantidad}
        </td>
        <td>
     <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>

        `;

        //Agrega  el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);

    })

}
//ELimina los cursos del tbody
function limpiarHTML() {
    //forma lenta
    // contenedorCarrito.innerHTML = "";

    //forma Rapida para limpiar el HTML
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }

}