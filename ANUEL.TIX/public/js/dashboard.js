// ========================= MENU Y SECCIONES =========================
const botones = document.querySelectorAll(".menu-item");
const secciones = document.querySelectorAll(".section");

botones.forEach(btn => {
    btn.addEventListener("click", () => {
        botones.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const target = btn.getAttribute("data-section");
        secciones.forEach(sec => sec.classList.remove("active-section"));
        const seccionActiva = document.getElementById(target);
        if (seccionActiva) seccionActiva.classList.add("active-section");

        if (target === "usuarios") cargarUsuarios();
        if (target === "boletos") {
            cargarBoletos();
            cargarBoletosCotizados();
        }
    });
});

// ========================= USUARIOS =========================
const tablaUsuarios = document.querySelector("#tablaUsuarios tbody");
const btnAgregar = document.getElementById("btnAgregar");
const modalAgregar = new bootstrap.Modal(document.getElementById("modalAgregar"));
const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));

btnAgregar.addEventListener("click", () => {
    document.getElementById("addCorreo").value = "";
    document.getElementById("addPass").value = "";
    modalAgregar.show();
});

document.getElementById("guardarAgregar").addEventListener("click", async () => {
    const datos = { 
        correo: document.getElementById("addCorreo").value, 
        contraseña: document.getElementById("addPass").value 
    };
    await fetch("/Tickets/usuarios", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) });
    modalAgregar.hide();
    cargarUsuarios();
});

async function cargarUsuarios() {
    const res = await fetch("/Tickets/usuarios");
    const data = await res.json();
    tablaUsuarios.innerHTML = "";
    data.forEach(u => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${u.correo}</td>
                        <td>${u.contraseña}</td>
                        <td>
                            <button class="btn btn-warning btn-sm me-2" onclick="editarUsuario('${u._id}','${u.correo}','${u.contraseña}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario('${u._id}')">Eliminar</button>
                        </td>`;
        tablaUsuarios.appendChild(tr);
    });
}

window.editarUsuario = (id, correo, pass) => {
    document.getElementById("editCorreo").value = correo;
    document.getElementById("editPass").value = pass;
    document.getElementById("editID").value = id;
    modalEditar.show();
};

document.getElementById("guardarEditar").addEventListener("click", async () => {
    const id = document.getElementById("editID").value;
    const datos = { correo: document.getElementById("editCorreo").value, contraseña: document.getElementById("editPass").value };
    await fetch(`/Tickets/usuarios/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) });
    modalEditar.hide();
    cargarUsuarios();
});

window.eliminarUsuario = async (id) => {
    if(!confirm("¿Eliminar este usuario?")) return;
    await fetch(`/Tickets/usuarios/${id}`, { method: "DELETE" });
    cargarUsuarios();
};

// ========================= BOLETOS =========================
const tablaBoletos = document.querySelector("#tablaBoletos tbody");
const modalEditarBoleto = new bootstrap.Modal(document.getElementById("modalEditarBoleto"));

async function cargarBoletos() {
    const res = await fetch("/Tickets/CompraBoletos");
    const data = await res.json();
    tablaBoletos.innerHTML = "";
    data.forEach(b => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td><img src="${b.imagen}" width="80"></td>
                        <td>${b.titulo}</td>
                        <td>${b.fecha}</td>
                        <td>$${b.precio}</td>
                        <td>
                            <button class="btn btn-warning btn-sm me-2" onclick="editarBoleto('${b._id}','${b.titulo}','${b.fecha}',${b.precio},'${b.imagen}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="eliminarBoleto('${b._id}')">Eliminar</button>
                        </td>`;
        tablaBoletos.appendChild(tr);
    });
}

window.editarBoleto = (id, titulo, fecha, precio, imagen) => {
    document.getElementById("editTitulo").value = titulo;
    document.getElementById("editFecha").value = fecha;
    document.getElementById("editPrecio").value = precio;
    document.getElementById("editImagen").value = imagen;
    document.getElementById("editBoletoID").value = id;
    modalEditarBoleto.show();
};

document.getElementById("guardarEditarBoleto").addEventListener("click", async () => {
    const id = document.getElementById("editBoletoID").value;
    const datos = {
        titulo: document.getElementById("editTitulo").value,
        fecha: document.getElementById("editFecha").value,
        precio: parseFloat(document.getElementById("editPrecio").value),
        imagen: document.getElementById("editImagen").value
    };
    await fetch(`/Tickets/CompraBoletos/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) });
    modalEditarBoleto.hide();
    cargarBoletos();
});

window.eliminarBoleto = async (id) => {
    if(!confirm("¿Eliminar este boleto?")) return;
    await fetch(`/Tickets/CompraBoletos/${id}`, { method: "DELETE" });
    cargarBoletos();
};

// ========================= BOLETOS COTIZADOS =========================
const tablaBoletosCotizados = document.querySelector("#tablaCompras tbody");
const btnAgregarBoleto = document.getElementById("btnAgregarCompra");
const modalBoleto = new bootstrap.Modal(document.getElementById("modalCompra"));

btnAgregarBoleto.addEventListener("click", () => {
    ["compNombre","compEdad","compCantidad","compEventos","compTotal","compID"].forEach(id => document.getElementById(id).value = "");
    modalBoleto.show();
});

document.getElementById("guardarCompra").addEventListener("click", async () => {
    const id = document.getElementById("compID").value;
    const datos = {
        nombre: document.getElementById("compNombre").value.trim(),
        edad: parseInt(document.getElementById("compEdad").value),
        cantidad: parseInt(document.getElementById("compCantidad").value),
        eventos: document.getElementById("compEventos").value.split(",").map(e => e.trim()),
        total: parseFloat(document.getElementById("compTotal").value)
    };

    // Validación
    if (!datos.nombre || !datos.edad || !datos.cantidad || !datos.eventos.length || isNaN(datos.total)) {
        alert("Completa todos los campos antes de guardar.");
        return;
    }

    try {
        let res;
        if (id) {
            res = await fetch(`/Tickets/boletos/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) });
        } else {
            res = await fetch(`/Tickets/boletos`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(datos) });
        }

        if (!res.ok) {
            const err = await res.json();
            alert("Error al guardar boleto: " + (err.msg || "Error desconocido"));
            return;
        }

        modalBoleto.hide();
        alert(id ? "Boleto actualizado correctamente." : "Boleto comprado con éxito ✅");
        cargarBoletosCotizados();
    } catch (error) {
        console.error(error);
        alert("Error de conexión con el servidor");
    }
});

async function cargarBoletosCotizados() {
    try {
        const res = await fetch("/Tickets/boletos");
        const data = await res.json();
        tablaBoletosCotizados.innerHTML = "";
        if (!Array.isArray(data)) return;
        data.forEach(c => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${c.nombre}</td>
                <td>${c.edad}</td>
                <td>${c.cantidad}</td>
                <td>${c.eventos.join(", ")}</td>
                <td>$${c.total}</td>
                <td>
                    <button class="btn btn-warning btn-sm me-2" onclick="editarBoletoCotizado('${c._id}','${c.nombre}',${c.edad},${c.cantidad},'${c.eventos.join(",")}','${c.total}')">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarBoletoCotizado('${c._id}')">Eliminar</button>
                </td>
            `;
            tablaBoletosCotizados.appendChild(tr);
        });
    } catch (error) {
        console.error("Error al cargar boletos cotizados:", error);
    }
}

window.editarBoletoCotizado = (id, nombre, edad, cantidad, eventos, total) => {
    document.getElementById("compNombre").value = nombre;
    document.getElementById("compEdad").value = edad;
    document.getElementById("compCantidad").value = cantidad;
    document.getElementById("compEventos").value = eventos;
    document.getElementById("compTotal").value = total;
    document.getElementById("compID").value = id;
    modalBoleto.show();
};

window.eliminarBoletoCotizado = async (id) => {
    if (!confirm("¿Eliminar este boleto?")) return;
    await fetch(`/Tickets/boletos/${id}`, { method: "DELETE" });
    cargarBoletosCotizados();
};

// ========================= INICIALIZACIÓN =========================
cargarUsuarios();
cargarBoletos();
cargarBoletosCotizados();
