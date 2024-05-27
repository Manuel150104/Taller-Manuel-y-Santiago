const productos = JSON.parse(localStorage.getItem('productos')) || [];

document.getElementById('form-producto').addEventListener('submit', (e) => {
    e.preventDefault();
    const producto = {
        presupuesto: document.getElementById('presupuesto').value,
        unidad: document.getElementById('unidad').value,
        producto: document.getElementById('producto').value,
        cantidad: document.getElementById('cantidad').value,
        valorUnitario: document.getElementById('valorUnitario').value,
        valorTotal: document.getElementById('valorUnitario').value * document.getElementById('cantidad').value,
        fechaAdquisicion: document.getElementById('fechaAdquisicion').value,
        proveedor: document.getElementById('proveedor').value
    };
    productos.push(producto);
    localStorage.setItem('productos', JSON.stringify(productos)); // Almacenar en localStorage
    agregarFila(producto);
    limpiarFormulario();
});

// Función para cargar los productos almacenados en el localStorage al cargar la página
function cargarProductosDesdeLocalStorage() {
    productos.forEach(producto => {
        agregarFila(producto);
    });
}

// Función para agregar una fila a la tabla de productos
function agregarFila(producto) {
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${producto.presupuesto}</td>
        <td>${producto.unidad}</td>
        <td>${producto.producto}</td>
        <td>${producto.cantidad}</td>
        <td>${producto.valorUnitario}</td>
        <td>${producto.valorTotal}</td>
        <td>${producto.fechaAdquisicion}</td>
        <td>${producto.proveedor}</td>
        <td>
            <button class="btn-eliminar">Eliminar</button>
            <button class="btn-modificar">Modificar</button>
        </td>
    `;
    document.getElementById('tbody-productos').appendChild(fila);

    // Agregar eventos a los botones de eliminar y modificar
    fila.querySelector('.btn-eliminar').addEventListener('click', () => {
        eliminarProducto(producto, fila);
    });

    fila.querySelector('.btn-modificar').addEventListener('click', () => {
        cargarDatosEnFormulario(producto, fila);
    });
}

// Función para eliminar un producto de la lista y de la tabla
function eliminarProducto(producto, fila) {
    const indice = productos.indexOf(producto);
    productos.splice(indice, 1);
    localStorage.setItem('productos', JSON.stringify(productos)); // Actualizar en localStorage
    document.getElementById('tbody-productos').removeChild(fila);
}

// Función para cargar los datos de un producto en el formulario para su modificación
function cargarDatosEnFormulario(producto, fila) {
    document.getElementById('presupuesto').value = producto.presupuesto;
    document.getElementById('unidad').value = producto.unidad;
    document.getElementById('producto').value = producto.producto;
    document.getElementById('cantidad').value = producto.cantidad;
    document.getElementById('valorUnitario').value = producto.valorUnitario;
    document.getElementById('fechaAdquisicion').value = producto.fechaAdquisicion;
    document.getElementById('proveedor').value = producto.proveedor;

    // Remover el producto de la lista temporal para evitar duplicados al guardar modificaciones
    const indice = productos.indexOf(producto);
    productos.splice(indice, 1);

    // Remover la fila correspondiente
    document.getElementById('tbody-productos').removeChild(fila);
}

// Función para limpiar el formulario después de agregar un producto
function limpiarFormulario() {
    document.getElementById('presupuesto').value = '';
    document.getElementById('unidad').value = '';
    document.getElementById('producto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('valorUnitario').value = '';
    document.getElementById('fechaAdquisicion').value = '';
    document.getElementById('proveedor').value = '';
}

document.getElementById('btn-buscar').addEventListener('click', () => {
    const textoBusqueda = document.getElementById('busqueda').value.toLowerCase();
    const filas = document.querySelectorAll('#tbody-productos tr');

    filas.forEach(fila => {
        const nombreProducto = fila.querySelector('td:nth-child(3)').textContent.toLowerCase();
        if (nombreProducto.includes(textoBusqueda)) {
            fila.style.display = '';
        } else {
            fila.style.display = 'none';
        }
    });
});

// Llamada para cargar los productos al cargar la página
cargarProductosDesdeLocalStorage();

