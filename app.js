/*Listar productos */
const productos = [
    {id: 1, nombre: "Laptop Lenovo", precio: 1000, categoria: "Electronica", stock: 10},
    {id: 2, nombre: "Smartphone Samsung", precio: 800, categoria: "Electronica", stock: 15},
    {id: 3, nombre: "Tablet Apple", precio: 1200, categoria: "Electronica", stock: 3},
    {id: 4, nombre: "Auriculares Sony", precio: 150, categoria: "Audio", stock: 20},
    {id: 5, nombre: "Altavoz Bluetooth JBL", precio: 200, categoria: "Audio", stock: 8}, 
]

let acumuladorProductos = "";

const renderizarProductos = () => {
    productos.forEach((producto) => {
    const {id, nombre, precio, categoria, stock} = producto;
    acumuladorProductos += `
    <div class="tarjeta">
        <h2>${nombre}</h2>
        <p>Precio: $${precio}</p>
        <p>Categoría: ${categoria}</p>
        <p>Stock: ${stock}</p>
        <button type="button" class="boton" data-id=${id}>Agregar al carrito</button>
    </div>
    ` 
})
}

renderizarProductos();

const contenedorTarjetas = document.getElementById('contenedor_Tarjetas');
contenedorTarjetas.innerHTML = acumuladorProductos;

/*Filtrar productos por categoria */
const inputCategoria = document.getElementById('categoria');
inputCategoria.addEventListener('change', () => {
    const eventoCategoria = inputCategoria.value;
    const productosFiltrados = productos.filter(producto => producto.categoria === eventoCategoria);
    if(productosFiltrados.length > 0){
        acumuladorProductos = "";
        renderizarProductos();
        contenedorTarjetas.innerHTML = acumuladorProductos;
    }else if(eventoCategoria === ""){
        acumuladorProductos = "";
        renderizarProductos();
        contenedorTarjetas.innerHTML = acumuladorProductos;
    }else{
        renderizarProductos();
        contenedorTarjetas.innerHTML = acumuladorProductos;
    }
})  

contenedorTarjetas.addEventListener('click', (eventoClick) => {
    if (eventoClick.target.classList.contains('boton')) {
        const idProducto = eventoClick.target.dataset.id;
        const productoSeleccionado = productos.find(producto => producto.id === Number(idProducto));
        const productoCarrito = carrito.find(producto=> producto.id === Number(idProducto));
        if(productoCarrito){
            if(productoCarrito.cantidad == productoCarrito.stock){
                productoCarrito.cantidad += 0;
            }else{
                productoCarrito.cantidad += 1;
                productoCarrito.subtotal += productoCarrito.precio;
                document.getElementById('contenedor_Carrito_Productos').innerHTML = mostrarCarrito();
                alert ('producto agregado al carrito: ' + productoCarrito.nombre)
            }
        }else{
            const productoNuevo = {
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.nombre,
                precio: productoSeleccionado.precio,
                categoria: productoSeleccionado.categoria,
                stock: productoSeleccionado.stock,
                cantidad: 1,
                subtotal: productoSeleccionado.precio
            }
            carrito.push(productoNuevo);
            document.getElementById('contenedor_Carrito_Productos').innerHTML = mostrarCarrito();
            alert ('producto agregado al carrito: ' + productoSeleccionado.nombre)        
        }
    }    
})

/* Agregar al carrito */
const carrito = [];

/*Botones */
    const mostrarCarrito = () => {
        let acumuladorCarrito = "";
        let acumuladorPrecio = 0;
        carrito.forEach((producto) => {
            const {nombre, precio, stock, cantidad, subtotal} = producto;
            acumuladorCarrito +=
            
            `
            Nombre: ${nombre}<br>
            Precio: $${precio}<br>
            Cantidad: 
            <button type="button" class="buttonMenos" data-id=${producto.id}>[-]</button>
            ${cantidad}
            <button type="button" class="buttonMas" data-id=${producto.id}>[+]</button><br>
            Subtotal: ${subtotal}<br>
            <button type="button">Eliminar</button><br><br>
            ` 
            acumuladorPrecio += subtotal;
        })
        if (carrito.length === 0) {
            return `<p>El carrito está vacío</p>`;
        }else{
            return acumuladorCarrito + `<p>---------------------------------</p><br><h3>Total: $${acumuladorPrecio}</h3>
            <button class="vaciarCarrito">Vaciar carrito</button>`;
        }
    }

const carritoContenedor = document.getElementById('contenedor_Carrito_Productos');
document.getElementById('contenedor_Carrito_Productos').innerHTML = mostrarCarrito();

function buscarProductoCarrito(idCarrito) {
    const cantidadCarrito = carrito.find(carritoProducto => carritoProducto.id === Number(idCarrito));
    return cantidadCarrito;
}

carritoContenedor.addEventListener('click', (eventoCarrito)=>{   
            if(eventoCarrito.target.classList.contains('buttonMenos')){
                const idCarrito = eventoCarrito.target.dataset.id;
                let cantidadCarrito = buscarProductoCarrito(idCarrito);
                if(cantidadCarrito.cantidad == 1){
                    carrito.forEach((elemento, indice)=>{
                        if(cantidadCarrito.id == elemento.id){carrito.splice(indice, 1)
                        }
                        })
                    document.getElementById('contenedor_Carrito_Productos').innerHTML = mostrarCarrito();
                    return
                }else{
                    cantidadCarrito.cantidad -=1;
                    cantidadCarrito.subtotal -= cantidadCarrito.precio;
                    document.getElementById('contenedor_Carrito_Productos').innerHTML = mostrarCarrito();
                }
            }else if(eventoCarrito.target.classList.contains('vaciarCarrito')){
                carrito.length -= carrito.length;
                document.getElementById('contenedor_Carrito_Productos').innerHTML = mostrarCarrito();
            }else{
                    if(eventoCarrito.target.classList.contains('buttonMas')){
                        const idCarrito = eventoCarrito.target.dataset.id;
                        let cantidadCarrito = buscarProductoCarrito(idCarrito);
                        if(cantidadCarrito.cantidad == cantidadCarrito.stock){
                            return;                
                        }else{
                            cantidadCarrito.cantidad +=1;
                            cantidadCarrito.subtotal += cantidadCarrito.precio;
                            document.getElementById('contenedor_Carrito_Productos').innerHTML = mostrarCarrito();
                        }
                    }
            }
        })


        