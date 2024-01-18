document.addEventListener('DOMContentLoaded', () => {
    // OBJETO
    const email = {
        email: '',
        nombre: ''
    };

    // VARIABLES
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.querySelector('#email');
    const formulario = document.querySelector('#formulario');
    const btnFormulario = document.querySelector('#boton button[type="submit"]');
    const resetFormulario = document.querySelector('#boton2 button[type="submit"]');

    // Función para validar y mostrar alertas
    function validar(e) {
        const nombreValor = e.target.value.trim();
        if (nombreValor === '') {
            mostrarAlerta(`Introduce datos en ${e.target.id}`, e.target.parentElement);
            comprobarEmail();
            console.log('Input VACIO');
            return;
        }

        const emailValor = e.target.id === 'email';

        if (emailValor && !validarEmail(e.target.value)) {
            mostrarAlerta(`El ${e.target.id} NO es válido`, e.target.parentElement);
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);
    }

    // Función para mostrar alertas
    function mostrarAlerta(alerta, etiquetaPadre) {
        const alertaRep = etiquetaPadre.querySelector('.error');
        alertaRep && alertaRep.remove();

        const error = document.createElement('p');
        error.classList.add('error');
        error.textContent = alerta;
        etiquetaPadre.appendChild(error);

        llenarObjeto();
    }

    // Función para limpiar alertas
    function limpiarAlerta(etiquetaPadre) {
        const alertaRep = etiquetaPadre.querySelector('.error');
        alertaRep && alertaRep.remove();
    }

    // Función para validar email
    function validarEmail(correo) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        return regex.test(correo);
    }

    // Función para comprobar email
    function comprobarEmail() {
        const nombreValor = nombreInput.value.trim();
        const emailValor = emailInput.value.trim();

        if (nombreValor === '' || emailValor === '') {
            btnFormulario.classList.add('opacity');
            btnFormulario.disabled = true;
        } else {
            btnFormulario.classList.remove('opacity');
            btnFormulario.disabled = false;
        }
    }

    // Función para llenar el objeto
    function llenarObjeto() {
        email.nombre = nombreInput.value.trim();
        email.email = emailInput.value.trim();
        console.log(email);
    }

    // Función para enviar el email
    function enviarEmail(e) {
        e.preventDefault();

        // Verificar si ya hay un mensaje de éxito
        const exitoExistente = formulario.querySelector('.exito');
        if (exitoExistente) {
            return;
        }

        // Crear mensaje de éxito
        const exitoMensaje = document.createElement('p');
        exitoMensaje.classList.add('exito');
        exitoMensaje.textContent = 'Mensaje enviado con éxito';

        // Agregar mensaje al formulario
        formulario.appendChild(exitoMensaje);

        // Eliminar mensaje después de 3 segundos
        setTimeout(() => {
            exitoMensaje.remove();
        }, 3000);
    }

    // Agregar event listeners
    nombreInput.addEventListener('blur', validar);
    emailInput.addEventListener('blur', validar);
    formulario.addEventListener('submit', enviarEmail);
    resetFormulario.addEventListener('click', (e) => {
        e.preventDefault();
        formulario.reset();
        comprobarEmail();
    });
});
