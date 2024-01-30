let productos = [
    { id: 1, name: 'jamon', precio: 9.99, descripcion: 'El mejor jamon del condado.' },
    { id: 2, name: 'pollo', precio: 2.99, descripcion: 'El mas fresco. ' },
    { id: 3, name: 'tocineta', precio: 3.99, descripcion: 'Para tus antojos del dia a dia. ' }
];
let rolUsuario = 'Cliente'

document.addEventListener('DOMContentLoaded', () => {

    const contProductos = document.getElementById('productos');
    const agregarProductosForm = document.getElementById('agregar_producto_form');

    //mostrar productos
    function mostrarProductos() {
        contProductos.innerHTML = '';
        productos.forEach(producto => {
            const tarjetaProducto = document.createElement('div');
            tarjetaProducto.classList.add('tarjeta-producto');
            tarjetaProducto.innerHTML =
                `<h3>${producto.name}</h3>
            <p>${producto.precio}</p>
            <p>${producto.descripcion}</p>
            ${rolUsuario === 'Admin' ?
                    `<button onclick='editProducto(${producto.id})'>Editar</button>
            <button onclick='eliminarProducto(${producto.id})'>Eliminar</button>` : ''}
            `;
            contProductos.appendChild(tarjetaProducto)

        })

    }
    //mostras en pantall al cargar el documento  
    mostrarProductos();
    function agregarProducto() {
        const nombre_producto = document.getElementById('nombre-producto').value;
        const precio_producto = document.getElementById('precio-producto').value;
        const descripcion_producto = document.getElementById('descripcion-producto').value;

        if (nombre_producto && !isNaN(precio_producto)) {

            const nuevoProducto = {
                id: productos.length + 1,
                name: nombre_producto,
                precio: precio_producto,
                descripcion: descripcion_producto
            }

            productos.push(nuevoProducto);
            mostrarProductos();
            clearForm();
        } else {
            alert('Por favor ingrese un nombre, un precio y una descripcion valida. ');
        }
    }

    window.editProducto = function (productoId) {
        const productoEditado = prompt('Editar nombre, precio, descripcion del producto. (Separados por coma )', productos.find(p => p.id === productoId).name + ', ' +
            productos.find(p => p.id === productoId).precio + ', ' +
            productos.find(p => p.id === productoId).descripcion);

        if (productoEditado) {
            const [nombreEditado, precioEditado, descripcionEditado] = productoEditado.split(',').map(item => item.trim())
            if (nombreEditado && !isNaN(precioEditado) && descripcionEditado != '') {
                productos = productos.map(producto => {
                    if (producto.id === productoId) {
                        return {
                            ...producto,
                            name: nombreEditado,
                            precio: parseFloat(precioEditado),
                            descripcion: descripcionEditado
                        };
                    }
                    return producto;
                });
                mostrarProductos();
            } else { alert('Ingrese los datos solicitados. ') };
        }
    };

    window.eliminarProducto = function (productoId) {
        const confirmarEliminacion = confirm('Seguro desea eliminar este producto');
        if (confirmarEliminacion) {
            productos = productos.filter(producto => producto.id !== productoId);
            mostrarProductos();

        }
    };

    function clearForm() {
        if (agregarProductosForm && typeof agregarProductosForm.reset === 'function') {
            agregarProductosForm.reset();
        } else {
            console.error('No se pudo resetear el formulario.');
        }
    }

    agregarProductosForm.addEventListener('submit', function (event) {
        event.preventDefault();
        agregarProducto();
    });

    function initPage() {
        mostrarProductos()
        if (window.location.pathname.includes('/admin')) {
            agregarProductosForm.style.display = 'block';
        } else {
            agregarProductosForm.style.display = 'none';
        }
    }
    initPage()

});

