document.getElementById("formulario").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = this;
  const boton = form.querySelector("button");
  const datos = new FormData(form);

  const campos = {
    nombre: datos.get("nombre"),
    celular_estudiante: datos.get("celular_estudiante"),
    celular_padre: datos.get("celular_padre"),
    direccion: datos.get("direccion"),
    numero_vivienda: datos.get("numero_vivienda"),
  };

  // 🔄 Limpiar errores previos
  limpiarErrores();

  // 🔒 VALIDACIONES
  if (!campos.nombre) {
    marcarError("nombre");
    return mostrarModal("❌ Debes seleccionar un nombre");
  }

  if (!/^[0-9]{8}$/.test(campos.celular_estudiante)) {
    marcarError("celular_estudiante");
    return mostrarModal("❌ Celular del estudiante inválido (8 dígitos)");
  }

  if (!/^[0-9]{8}$/.test(campos.celular_padre)) {
    marcarError("celular_padre");
    return mostrarModal("❌ Celular del padre/madre/tutor inválido (8 dígitos)");
  }

  if (!campos.direccion.trim()) {
    marcarError("direccion");
    return mostrarModal("❌ Debes ingresar la dirección");
  }

  if (!campos.numero_vivienda.trim()) {
    marcarError("numero_vivienda");
    return mostrarModal("❌ Debes ingresar el número de vivienda");
  }

  const url = "https://script.google.com/macros/s/AKfycbzF6-NRW_Q5cvKFZfQrcjbT9pXRQjNPdUGpa6PKAS88UmTP71DXPgj30l13aXFEo8sRgg/exec";

  try {
    boton.disabled = true;
    boton.textContent = "Enviando...";

    const res = await fetch(url, {
      method: "POST",
      body: datos,
    });

    const resultado = await res.json();

    if (resultado.status !== "success") {
      throw new Error("Error en servidor");
    }

    mostrarModal("✅ ¡Formulario enviado correctamente!");
    form.reset();

  } catch (error) {
    mostrarModal("❌ Error al enviar. Intenta nuevamente.");
    console.error(error);
  } finally {
    boton.disabled = false;
    boton.textContent = "Enviar";
  }
});

// 🔴 Marcar campo con error
function marcarError(id) {
  const campo = document.getElementById(id);
  campo.style.border = "2px solid red";
}

// 🧹 Limpiar errores
function limpiarErrores() {
  document.querySelectorAll("input, select").forEach(el => {
    el.style.border = "1px solid #ccc";
  });
}

// 📢 Modal
function mostrarModal(mensaje) {
  document.getElementById("modal-mensaje").textContent = mensaje;
  document.getElementById("modal").style.display = "flex";
}

// ❌ Cerrar modal
document.getElementById("cerrar-modal").addEventListener("click", function () {
  document.getElementById("modal").style.display = "none";
});
