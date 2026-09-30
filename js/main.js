const productos = [
    { id: 1, nombre: "Café", precio: 2500 },
    { id: 2, nombre: "Té", precio: 1800 },
    { id: 3, nombre: "Medialuna", precio: 1200 }
];

const carrito = [];

const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorCarrito = document.getElementById("contenedorCarrito");
const total = document.getElementById("total");
const mensaje = document.getElementById("mensaje");
const aviso = document.getElementById("aviso");
const finalizarCompra = document.getElementById("finalizarCompra");

function mostrarMensaje(texto, tipo) {
    mensaje.textContent = texto;
    mensaje.className = tipo;
}

function mostrarProductos() {
    contenedorProductos.innerHTML = "";

    productos.forEach(function (producto) {
        const tarjeta = document.createElement("article");
        tarjeta.classList.add("producto");

        tarjeta.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button type="button">Agregar al pedido</button>
        `;

        const boton = tarjeta.querySelector("button");

        boton.addEventListener("click", function () {
            carrito.push(producto);
            mostrarCarrito();
            mostrarMensaje(producto.nombre + " agregado al pedido.", "exito");
        });

        contenedorProductos.appendChild(tarjeta);
    });
}

function mostrarCarrito() {
    contenedorCarrito.innerHTML = "";

    if (carrito.length === 0) {
        contenedorCarrito.textContent = "Todavía no agregaste productos.";
        total.textContent = "Total: $0";
        return;
    }

    carrito.forEach(function (producto) {
        const item = document.createElement("p");
        item.textContent = producto.nombre + " - $" + producto.precio;
        contenedorCarrito.appendChild(item);
    });

    const totalCompra = carrito.reduce(function (acumulador, producto) {
        return acumulador + producto.precio;
    }, 0);

    total.textContent = "Total: $" + totalCompra;
}

function procesarCompra() {
    try {
        if (carrito.length === 0) {
            throw new Error("Agregá al menos un producto antes de finalizar.");
        }

        const totalCompra = carrito.reduce(function (acumulador, producto) {
            return acumulador + producto.precio;
        }, 0);

        mostrarMensaje(
            "Compra realizada con éxito. Total abonado: $" + totalCompra,
            "exito"
        );

        carrito.length = 0;
        mostrarCarrito();
    } catch (error) {
        mostrarMensaje(error.message, "error");
    } finally {
        console.log("Proceso de compra finalizado.");
    }
}

setTimeout(function () {
    aviso.textContent = "Cupón disponible: SANTI10 para obtener 10% de descuento.";
}, 3000);

finalizarCompra.addEventListener("click", procesarCompra);

mostrarProductos();
mostrarCarrito();