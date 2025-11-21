document.querySelectorAll('.nav-links a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll(".btn-buy").forEach(btn => {
  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    const card = btn.closest(".card-dark");
    const datos = {
      titulo: card.querySelector(".card-title").textContent,
      descripcion: card.querySelector(".meta").textContent,
      fecha: card.querySelector(".meta").textContent,
      precio: parseFloat(card.querySelector(".price").textContent.replace("$","")),
      imagen: card.querySelector(".thumb").style.backgroundImage.slice(5,-2)
    };
    await fetch("/Tickets/CompraBoletos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos)
    });
    alert("Boleto agregado al dashboard");
  });
});
