function togglePassword(id, icon) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        icon.textContent = "🙈";
    } else {
        input.type = "password";
        icon.textContent = "👁️";
    }
}
const form = document.querySelector("form");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = form.querySelector('input[type="email"]').value;
    const pass1 = document.getElementById("pass1").value;
    const pass2 = document.getElementById("pass2").value;

    if (pass1 !== pass2) {
        alert("Las contraseñas no coinciden");
        return;
    }

    const datos = { correo, contraseña: pass1 };

    try {
        const response = await fetch("/Tickets/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.msg);
            return;
        }

        alert("Cuenta creada correctamente");
        window.location.href = "./login.html";

    } catch (error) {
        alert("Error en la petición");
    }
});
