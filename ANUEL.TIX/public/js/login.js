document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const correo = form.querySelector("input[type='email']").value;
        const contraseña = form.querySelector("input[type='password']").value;

        const respuesta = await fetch("http://localhost:3000/Tickets/usuarios/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contraseña })
        });

        const data = await respuesta.json();

        if (!respuesta.ok) {
            alert(data.msg);
            return;
        }

        window.location.href = "dashboard.html";
    });
});
