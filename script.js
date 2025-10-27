// ==============================================================================
//                      1. LÓGICA DEL ENTRENADOR (Datos y Variables)
// ==============================================================================

const correos = [
    // CORREO 1: BANCO SANTANDER (PHISHING)
    {remitente: 'seguridad@banco-santander.com', asunto: 'Urgente: Actualice su información de seguridad', cuerpo: "Estimado cliente,\nHemos detectado actividad sospechosa en su cuenta. Por favor, haga clic en el enlace a continuación para verificar su identidad:\n[http://banco-santander-verificacion.tk/login]\nTiene 24 horas para completar este proceso o su cuenta será suspendida.\nAtentamente,\nEquipo de Seguridad", es_phishing: true, explicacion: 'El dominio del enlace (banco-santander-verificacion.tk) no es el oficial del banco. La urgencia y amenaza de suspensión son tácticas de phishing.'},
    // CORREO 2: NETFLIX (LEGÍTIMO)
    {remitente: 'noreply@netflix.com', asunto: 'Tu factura de Netflix', cuerpo: "Hola,\nTu factura mensual de Netflix está disponible. Puedes revisarla en tu cuenta o descargar el PDF adjunto.\nGracias por ser suscriptor de Netflix.\nEquipo de Netflix", es_phishing: false, explicacion: 'Este correo parece una notificación estándar de Netflix. No pide información sensible ni contiene enlaces sospechosos.'},
    // CORREO 3: MICROSOFT Lotería (PHISHING)
    {remitente: 'microsoft-security@outlook.com', asunto: '¡FELICIDADES! Has ganado $1.000.0000', cuerpo: "¡FELICIDADES!\nHas sido seleccionado para recibir $1.000.000 en nuestra lotería internacional de Microsoft.\nPara reclamar tu premio, envía los siguientes datos:\n• Nombre completo\n• Número de documento\n• Número de cuenta bancaria\nResponde INMEDIATAMENTE para no perder tu premio.\nSIMULACIÓN DE ENTRENAMIENTO", es_phishing: true, explicacion: 'Correos de loterías inesperadas que solicitan datos personales y bancarios son clásicos ataques de phishing/fraude. El remitente genérico (outlook.com) es otra señal.'},
    // CORREO 4: INTERNO DE EMPRESA (LEGÍTIMO)
    {remitente: 'admin@miempresa.com', asunto: 'Cambio de contraseña del sistema', cuerpo: "Estimado colaborador,\nInformamos que el sistema de gestión tendrá mantenimiento este fin de semana. No es necesario realizar ninguna acción.\nLos cambios entrarán en vigor el lunes.\nIT Support", es_phishing: false, explicacion: 'Este correo es una notificación interna de TI sobre un mantenimiento, no solicita ninguna acción ni credenciales.'},
    // CORREO 5: PAYPAL (PHISHING)
    {remitente: 'support@paypal.com', asunto: 'Verificación de cuenta requerida', cuerpo: "Su cuenta de PayPal ha sido limitada debido a actividad inusual.\nPara restaurar el acceso, haga clic aquí:\n[http://paypal-verification.net/restore]\nIngrese su usuario, contraseña y número de tarjeta para verificar su identidad.\nEste proceso debe completarse en 48 horas.\nSIMULACIÓN DE ENTRENAMIENTO", es_phishing: true, explicacion: 'El dominio del enlace (paypal-verification.net) no es el oficial de PayPal. Solicitar usuario, contraseña y número de tarjeta directamente en un enlace es una táctica de phishing común.'},
    // CORREO 6: SLACK (LEGÍTIMO)
    {remitente: 'team@slack.com', asunto: 'Nuevo mensaje en tu workspace', cuerpo: "Tienes 3 mensajes nuevos en tu workspace 'Equipo Desarrollo'.\n[Abrir Slack]\nSi no deseas recibir estas notificaciones, puedes configurarlas desde tu perfil.", es_phishing: false, explicacion: 'Una notificación estándar de Slack sobre nuevos mensajes, con un enlace que probablemente lleva al sitio oficial. No hay peticiones de credenciales.'},
    // CORREO 7: AMAZON (LEGÍTIMO)
    {remitente: 'security@amazon.com', asunto: 'Inicio de sesión desde nuevo dispositivo', cuerpo: "Hola,\nDetectamos un nuevo inicio de sesión en tu cuenta desde:\n- Dispositivo: iPhone\n- Ubicación: Bogotá, Colombia\n- Fecha: 4 de julio, 2025\nSi no fuiste tú, cambia tu contraseña inmediatamente.\nEquipo de Seguridad de Amazon", es_phishing: false, explicacion: 'Las empresas legítimas, como Amazon, envían alertas de seguridad ante inicios de sesión sospechosos. La recomendación es cambiar la contraseña, no hacer clic en un enlace específico proporcionado en el correo.'},
    // CORREO 8: APPLE (PHISHING)
    {remitente: 'no-reply@apple.com', asunto: 'Su Apple ID ha sido deshabilitado', cuerpo: "Su Apple ID ha sido deshabilitado por violación de términos de servicio.\nPara reactivarlo, debe verificar su identidad haciendo clic aquí:\n[http://apple-id-verification.com/unlock]\nProporcione su ID, contraseña y respuestas de seguridad.\nTiene 24 horas antes de que se elimine permanentemente.\nSIMULACIÓN DE ENTRENAMIENTO", es_phishing: true, explicacion: 'La amenaza de deshabilitación permanente y la solicitud de múltiples datos sensibles (ID, contraseña, respuestas de seguridad) junto con un dominio de enlace no oficial de Apple (apple-id-verification.com) son claras señales de phishing.'},
    // CORREO 9: GOOGLE (LEGÍTIMO)
    {remitente: 'support@google.com', asunto: 'Alerta de seguridad crítica', cuerpo: "Hola [NOMBRE_USUARIO],\nGoogle ha bloqueado un intento de inicio de sesión sospechoso en su cuenta de Gmail.\nFecha: 15 de agosto, 2024\nUbicación: Desconocida\nSi esto no fuiste tú, revisa tu actividad de seguridad de inmediato en tu cuenta de Google.\nEquipo de Seguridad de Google", es_phishing: false, explicacion: 'Google a menudo envía alertas de seguridad para intentos de inicio de sesión inusuales, recomendando revisar la actividad directamente en la cuenta oficial, no a través de un enlace específico en el correo.'},
    // CORREO 10: FACTURACIÓN EMPRESA (LEGÍTIMO)
    {remitente: 'facturas@tuempresa.com', asunto: 'Recordatorio: Pago pendiente de factura #12345', cuerpo: "Estimado cliente,\nLe recordamos que tiene una factura pendiente de pago con fecha de vencimiento próxima.\nPara ver los detalles de la factura y realizar el pago, por favor, inicie sesión en nuestro portal de clientes.\n[https://portal.tuempresa.com/login]\nGracias por su pronta atención.\nDepartamento de Facturación", es_phishing: false, explicacion: 'Este correo es un recordatorio de pago con un enlace a un portal de clientes que parece legítimo y no pide credenciales directamente en el correo.'}
];

let nombreUsuario = "";
let correoUsuario = "";
let preguntaActual = 0;
let preguntasCorrectas = 0;

// Referencias a los elementos HTML
const vistas = {
    bienvenida: document.getElementById('vista-bienvenida'),
    pregunta: document.getElementById('vista-pregunta'),
    resultados: document.getElementById('vista-resultados'),
    estadisticas: document.getElementById('vista-estadisticas'),
};

const inputNombre = document.getElementById('nombre-usuario');
const inputCorreo = document.getElementById('correo-usuario');
const checkTerminos = document.getElementById('acepto-terminos');
const btnIniciar = document.getElementById('btn-iniciar');

// ==============================================================================
//                      2. LÓGICA DE NAVEGACIÓN Y ALMACENAMIENTO (localStorage)
// ==============================================================================

function _limpiarPantalla() {
    Object.values(vistas).forEach(vista => vista.classList.add('hidden'));
}

function _guardarResultadosWeb() {
    const resultadosGuardados = _cargarEstadisticasWeb();
    
    const nuevoResultado = {
        nombre: nombreUsuario,
        correo: correoUsuario,
        aciertos: preguntasCorrectas,
        total: correos.length
    };
    
    resultadosGuardados.push(nuevoResultado);
    localStorage.setItem('estadisticasPhishing', JSON.stringify(resultadosGuardados));
}

function _cargarEstadisticasWeb() {
    const data = localStorage.getItem('estadisticasPhishing');
    return data ? JSON.parse(data) : [];
}

function procesarCuerpoCorreo(cuerpo) {
    let html = cuerpo.replace(/\n/g, '<br>');
    
    // Reemplazar enlaces [etiqueta] por etiquetas <span> con estilo de enlace
    html = html.replace(/\[(.*?)\]/g, (match, linkText) => {
        return `<span class="mail-link">${linkText}</span>`;
    });
    
    // Si la simulación está presente, la eliminamos del cuerpo visible
    html = html.replace(/SIMULACIÓN DE ENTRENAMIENTO/g, '').trim();
    
    return html;
}

// ==============================================================================
//                      3. FLUJO DE LA APLICACIÓN
// ==============================================================================

function _habilitarBotonInicio() {
    // FUNCIÓN DE HABILITACIÓN PARA EL BOTÓN DE INICIO
    btnIniciar.disabled = !checkTerminos.checked;
}

function _mostrarPantallaBienvenida() {
    _limpiarPantalla();
    vistas.bienvenida.classList.remove('hidden');
    
    // Los inputs reflejan las variables de usuario
    inputNombre.value = nombreUsuario; 
    inputCorreo.value = correoUsuario;
    
    // Asegurar que el estado del checkbox y botón se actualice
    _habilitarBotonInicio();
}

function _iniciarEntrenamiento() {
    nombreUsuario = inputNombre.value.trim();
    correoUsuario = inputCorreo.value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!nombreUsuario || !correoUsuario) {
        alert("🚨 Datos incompletos: Por favor, ingresa tu nombre y correo electrónico.");
        return;
    }

    if (!emailRegex.test(correoUsuario)) {
        alert("🚨 Correo inválido: Por favor, ingresa un correo electrónico válido.");
        return;
    }

    preguntasCorrectas = 0;
    preguntaActual = 0;
    alert(`🎉 ¡Bienvenido, ${nombreUsuario}! Comencemos el entrenamiento.`);
    _mostrarPregunta();
}

function _mostrarPregunta() {
    if (preguntaActual >= correos.length) {
        _mostrarResultados();
        return;
    }

    _limpiarPantalla();
    vistas.pregunta.classList.remove('hidden');
    
    const correoData = correos[preguntaActual];
    
    // Actualizar barra de progreso y contador
    document.getElementById('barra-progreso').style.width = `${((preguntaActual + 1) / correos.length) * 100}%`;
    document.getElementById('contador-pregunta').textContent = `Pregunta ${preguntaActual + 1} de ${correos.length}`;
    
    // Actualizar contenido del correo
    document.getElementById('mail-remitente').textContent = `De: ${correoData.remitente}`;
    document.getElementById('mail-asunto').textContent = `Asunto: ${correoData.asunto}`;
    
    // Insertar cuerpo procesado
    document.getElementById('mail-cuerpo').innerHTML = procesarCuerpoCorreo(correoData.cuerpo);
    
    // Mostrar/Ocultar tag de simulación
    const simulacionTag = document.getElementById('simulacion-tag');
    if (correoData.cuerpo.includes("SIMULACIÓN DE ENTRENAMIENTO")) {
        simulacionTag.classList.remove('hidden');
    } else {
        simulacionTag.classList.add('hidden');
    }
}

function _responder(esPhishingSeleccionado) {
    const correoActual = correos[preguntaActual];
    let esCorrecto = false;
    
    if (esPhishingSeleccionado === correoActual.es_phishing) {
        preguntasCorrectas++;
        esCorrecto = true;
    }
    
    if (esCorrecto) {
        alert(`✅ ¡Correcto! ¡Bien hecho!\nExplicación: ${correoActual.explicacion}`);
    } else {
        alert(`❌ Incorrecto. Te explicamos por qué:\nExplicación: ${correoActual.explicacion}`);
    }

    preguntaActual++;
    _mostrarPregunta();
}

function _mostrarResultados() {
    _guardarResultadosWeb();

    _limpiarPantalla();
    vistas.resultados.classList.remove('hidden');

    const totalPreguntas = correos.length;
    const scoreElement = document.getElementById('resultado-score');
    const iconElement = document.getElementById('resultado-icon');
    const mensajeElement = document.getElementById('resultado-mensaje');
    const tipElement = document.getElementById('resultado-tip-mensaje');
    
    scoreElement.textContent = `${preguntasCorrectas}/${totalPreguntas}`;

    if (preguntasCorrectas < totalPreguntas) {
        iconElement.textContent = "📚";
        mensajeElement.textContent = "Necesitas reforzar algunos conceptos.";
        scoreElement.style.color = '#F44336'; // Rojo
        tipElement.textContent = "No te preocupes, la práctica hace al maestro. ¡Inténtalo de nuevo!";
    } else {
        iconElement.textContent = "🎉";
        mensajeElement.textContent = "¡Excelente! Has superado el entrenamiento.";
        scoreElement.style.color = '#4CAF50'; // Verde
        tipElement.textContent = "¡Sigue practicando para mantenerte seguro en línea!";
    }
}

function _mostrarPantallaEstadisticas() {
    _limpiarPantalla();
    vistas.estadisticas.classList.remove('hidden');

    const resultados = _cargarEstadisticasWeb();
    const cuerpoTabla = document.getElementById('estadisticas-cuerpo');
    const noEstadisticas = document.getElementById('no-estadisticas');
    
    cuerpoTabla.innerHTML = ''; // Limpiar filas anteriores

    if (resultados.length === 0) {
        noEstadisticas.classList.remove('hidden');
        return;
    }

    noEstadisticas.classList.add('hidden');
    
    resultados.forEach(res => {
        const fila = cuerpoTabla.insertRow();
        const porcentaje = res.total > 0 ? `(${(res.aciertos / res.total * 100).toFixed(0)}%)` : "(0%)";
        
        fila.insertCell().textContent = res.nombre;
        fila.insertCell().textContent = res.correo;
        fila.insertCell().textContent = `${res.aciertos}/${res.total} ${porcentaje}`;
        fila.insertCell().textContent = res.total;
    });
}

function _reiniciarEntrenamiento() {
    // LIMPIEZA TOTAL: Variables de usuario
    nombreUsuario = ""; 
    correoUsuario = ""; 
    
    preguntasCorrectas = 0;
    preguntaActual = 0;
    
    // Desmarcamos el checkbox para asegurar que el botón de inicio esté deshabilitado
    checkTerminos.checked = false; 

    _mostrarPantallaBienvenida();
}

// ==============================================================================
//                      4. INICIALIZACIÓN (Event Listeners)
// ==============================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Eventos de VISTA BIENVENIDA
    checkTerminos.addEventListener('change', _habilitarBotonInicio); // Usa la nueva función de habilitación
    btnIniciar.addEventListener('click', _iniciarEntrenamiento);
    
    document.getElementById('btn-ver-estadisticas').addEventListener('click', _mostrarPantallaEstadisticas);
    
    // Eventos de VISTA PREGUNTA
    document.getElementById('btn-phishing').addEventListener('click', () => _responder(true));
    document.getElementById('btn-legitimo').addEventListener('click', () => _responder(false));

    // Eventos de VISTA RESULTADOS (Reiniciar y limpiar campos)
    document.getElementById('btn-reiniciar').addEventListener('click', _reiniciarEntrenamiento);
    document.getElementById('btn-ver-historial').addEventListener('click', _mostrarPantallaEstadisticas);
    
    // Eventos de VISTA ESTADÍSTICAS (Volver al Inicio y limpiar campos)
    document.getElementById('btn-volver-inicio').addEventListener('click', _reiniciarEntrenamiento);

    _mostrarPantallaBienvenida(); // Iniciar la aplicación
});