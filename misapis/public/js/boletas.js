const API_URL = "/api/boleterias/";
const form = document.getElementById('ticketForm');
const totalDisplay = document.getElementById('total');
const boletosContainer = document.getElementById('boletosContainer');
const eventChecks = document.querySelectorAll('.event-check');
const cantidadInput = document.getElementById('cantidad');

let total = 0;
let editingId = null;

function actualizarTotal() {
  let subtotal = 0;
  eventChecks.forEach(check => {
    if (check.checked) subtotal += parseFloat(check.value);
  });
  const cantidad = parseInt(cantidadInput.value || 1);
  total = subtotal * cantidad;
  totalDisplay.textContent = `Total: $${total}`;
}

eventChecks.forEach(check => check.addEventListener('change', actualizarTotal));
cantidadInput.addEventListener('input', actualizarTotal);

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value.trim();
  const edad = parseInt(document.getElementById('edad').value);
  const cantidad = parseInt(cantidadInput.value);
  const eventosSeleccionados = Array.from(eventChecks)
    .filter(chk => chk.checked)
    .map(chk => chk.nextElementSibling.textContent);

  if (!nombre || !edad || cantidad < 1 || eventosSeleccionados.length === 0) {
    alert("Por favor completa todos los campos y selecciona al menos un evento.");
    return;
  }

  const boleto = { nombre, edad, cantidad, eventos: eventosSeleccionados, total };

  try {
    if (editingId) {
      const res = await fetch(API_URL + editingId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(boleto)
      });
      if (!res.ok) {
        const err = await res.json();
        alert("Error al actualizar: " + (err.msg || "error"));
        return;
      }
    } else {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(boleto)
      });
      if (!res.ok) {
        const err = await res.json();
        alert("Error al guardar: " + (err.msg || "error"));
        return;
      }
    }

    form.reset();
    editarLimpiarEstados();
    actualizarTotal();
    await getBoletos();
  } catch (error) {
    alert("Error de conexión con el servidor");
  }
});

async function getBoletos() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    boletosContainer.innerHTML = "";
    if (res.ok && Array.isArray(data.boletos) && data.boletos.length > 0) {
      data.boletos.forEach((b) => {
        const div = document.createElement('div');
        div.classList.add('ticket-card');
        div.innerHTML = `
          <div>
            <strong>${escapeHtml(b.nombre)}</strong> — ${escapeHtml(String(b.edad))} años<br>
            <span>${escapeHtml(b.eventos.join(', '))}</span><br>
            <span>Boletos: ${escapeHtml(String(b.cantidad))} | Total: $${escapeHtml(String(b.total))}</span>
          </div>
          <div class="ticket-actions">
            <button class="btn btn-sm btn-warning" data-id="${b._id}" data-action="edit">Editar</button>
            <button class="btn btn-sm btn-danger" data-id="${b._id}" data-action="delete">Eliminar</button>
          </div>
        `;
        boletosContainer.appendChild(div);
      });

      boletosContainer.querySelectorAll('button[data-action="edit"]').forEach(btn => {
        btn.addEventListener('click', () => editarBoleto(btn.dataset.id));
      });

      boletosContainer.querySelectorAll('button[data-action="delete"]').forEach(btn => {
        btn.addEventListener('click', () => eliminarBoleto(btn.dataset.id));
      });
    }
  } catch (error) {
    console.error("Error al obtener boletos", error);
  }
}

async function eliminarBoleto(id) {
  if (!confirm("¿Eliminar este boleto?")) return;
  try {
    const res = await fetch(API_URL + id, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      alert("Error al eliminar: " + (err.msg || "error"));
      return;
    }
    await getBoletos();
  } catch (error) {
    alert("Error de conexión con el servidor");
  }
}

async function editarBoleto(id) {
  try {
    const res = await fetch(API_URL + id);
    if (!res.ok) {
      alert("No se encontró el boleto");
      return;
    }
    const data = await res.json();
    const b = data.boleto || data;
    document.getElementById('nombre').value = b.nombre || "";
    document.getElementById('edad').value = b.edad || "";
    document.getElementById('cantidad').value = b.cantidad || 1;

    eventChecks.forEach(chk => {
      const label = chk.nextElementSibling.textContent;
      chk.checked = Array.isArray(b.eventos) && b.eventos.includes(label);
    });

    actualizarTotal();
    editingId = id;
  } catch (error) {
    alert("Error al cargar el boleto para editar");
  }
}

function editarLimpiarEstados() {
  editingId = null;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

getBoletos();
actualizarTotal();
