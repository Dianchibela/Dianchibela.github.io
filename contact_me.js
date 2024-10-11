$(function() {
    $("form").on("submit", function(event) {
        event.preventDefault(); // Prevenir el envío por defecto del formulario
        
        // Obtiene los valores del formulario
        var name = $("#name").val();
        var email = $("#email").val();
        var message = $("#message").val();
        var firstName = name.split(' ')[0]; // Para personalizar el saludo
        
        // Verifica si el nombre está vacío
        if (firstName === "") {
            alert("Por favor ingrese su nombre.");
            return;
        }

        // Usa jQuery para realizar una solicitud AJAX
        $.ajax({
            url: "././mail/contact_me.php", // Archivo PHP para enviar el correo
            type: "POST",
            data: {
                name: name,
                email: email,
                message: message
            },
            cache: false,
            success: function() {
                // Muestra un mensaje de éxito
                $('#success').html("<div class='alert alert-success'>");
                $('#success > .alert-success')
                    .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                    .append("<strong>Tu mensaje ha sido enviado. </strong>")
                    .append('</div>');
                
                // Limpia el formulario
                $('#contactForm').trigger("reset");
            },
            error: function() {
                // Muestra un mensaje de error
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger')
                    .html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>")
                    .append("<strong>Lo siento " + firstName + ", parece que mi servidor de correo no está respondiendo. Por favor, intenta más tarde.</strong>")
                    .append('</div>');
                
                // Limpia el formulario
                $('#contactForm').trigger("reset");
            }
        });
    });
});
