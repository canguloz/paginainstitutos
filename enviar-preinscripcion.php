<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Recibir datos del formulario
    $nombres = htmlspecialchars($_POST['Nombres']);
    $apellidos = htmlspecialchars($_POST['Apellidos']);
    $email = htmlspecialchars($_POST['Correo']);
    $celular = htmlspecialchars($_POST['Celular']);
    $carrera = htmlspecialchars($_POST['Carrera de interés']);
    $modalidad = htmlspecialchars($_POST['Turno de preferencia']);
    $mensaje = htmlspecialchars($_POST['Mensaje']);
    $terminos = isset($_POST['Terminos aceptados']) ? "Aceptado" : "No aceptado";
    
    // Configuración del correo
    $to = "matiasanguloruiz4@gmail.com";
    $subject = "Nueva Preinscripción - IESTP Paiján";
    
    // Cuerpo del mensaje
    $body = "
    <html>
    <head>
        <title>Nueva Preinscripción</title>
    </head>
    <body>
        <h2>Datos del Preinscrito</h2>
        <table border='1' cellpadding='5' cellspacing='0' style='border-collapse: collapse;'>
            <tr><td><strong>Nombres:</strong></td><td>$nombres</td></tr>
            <tr><td><strong>Apellidos:</strong></td><td>$apellidos</td></tr>
            <tr><td><strong>Correo electrónico:</strong></td><td>$email</td></tr>
            <tr><td><strong>Celular:</strong></td><td>$celular</td></tr>
            <tr><td><strong>Carrera de interés:</strong></td><td>$carrera</td></tr>
            <tr><td><strong>Turno de preferencia:</strong></td><td>$modalidad</td></tr>
            <tr><td><strong>Mensaje adicional:</strong></td><td>$mensaje</td></tr>
            <tr><td><strong>Términos y condiciones:</strong></td><td>$terminos</td></tr>
        </table>
        <br>
        <p>Este mensaje fue enviado desde el formulario de preinscripción del IESTP Paiján.</p>
    </body>
    </html>
    ";
    
    // Headers del correo
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    // Enviar correo
    if(mail($to, $subject, $body, $headers)) {
        header("Location: gracias.html?status=success");
    } else {
        header("Location: error.html?status=error");
    }
} else {
    header("Location: admision.html");
}
?>