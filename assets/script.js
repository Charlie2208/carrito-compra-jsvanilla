const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaPasteles = document.querySelector('#lista-pasteles');
let articulosCarrito = [];

let cargarEventListeners = () => {

    listaPasteles.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; //reseteamos el arreglo
        limpiarHTML(); //Eliminamos todo el HTML
    })


}

let agregarProducto = (e) => {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement
        console.log(e.target.parentElement.parentElement)
        leerDatosProducto(productoSeleccionado)
    }
}

let eliminarProducto = (e) => {
    if(e.target.classList.contains('borrar-curso')) {
        const ProductoId = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== ProductoId);

        carritoHTML();
    }
}

let leerDatosProducto = (producto) => {
    console.log(producto)

    const infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h5').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        const productos = articulosCarrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto;
            }
        })
        articulosCarrito = [...productos]
    } else {
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    console.log(articulosCarrito);

    carritoHTML();

}

let carritoHTML = () => {

     limpiarHTML();

    articulosCarrito.forEach(producto => {
        const { imagen, titulo, precio, cantidad, id } = producto
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td> 
        <td>${cantidad}</td> 
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>          
        `

        contenedorCarrito.appendChild(row);
    })
}

let limpiarHTML = () => {
    
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}


cargarEventListeners();

