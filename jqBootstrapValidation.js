/*!
 * jqBootstrapValidation
 * https://github.com/ReactiveRaven/jqBootstrapValidation
 */
(function($) {
    "use strict";

    var defaultValidators = {
        required: {
            message: "Este campo es obligatorio",
            validate: function($element) {
                return $element.val().trim() !== "";
            }
        },
        email: {
            message: "Introduce un correo electrónico válido",
            validate: function($element) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test($element.val());
            }
        },
        number: {
            message: "Este campo debe ser un número",
            validate: function($element) {
                return !isNaN($element.val());
            }
        },
        minlength: {
            message: "Este campo debe tener al menos {min} caracteres",
            validate: function($element, param) {
                return $element.val().length >= param;
            }
        }
    };

    // Método para validar el formulario
    $.fn.jqBootstrapValidation = function() {
        return this.each(function() {
            var $form = $(this);
            $form.find('input, textarea').each(function() {
                var $input = $(this);
                var validators = [];

                $.each($input.data(), function(key, value) {
                    if (defaultValidators[key]) {
                        validators.push($.extend({}, defaultValidators[key], { param: value }));
                    }
                });

                $input.on('input change', function() {
                    var isValid = true;
                    var errorMessage = "";

                    $.each(validators, function(index, validator) {
                        if (!validator.validate($input, validator.param)) {
                            isValid = false;
                            errorMessage = validator.message.replace("{min}", validator.param);
                            return false; // salir del bucle
                        }
                    });

                    if (isValid) {
                        $input.removeClass('is-invalid').addClass('is-valid');
                        $input.next('.invalid-feedback').remove();
                    } else {
                        $input.removeClass('is-valid').addClass('is-invalid');
                        if (!$input.next('.invalid-feedback').length) {
                            $input.after('<div class="invalid-feedback">' + errorMessage + '</div>');
                        }
                    }
                });
            });
        });
    };

    $(document).ready(function() {
        $('form').jqBootstrapValidation();
    });
})(jQuery);
