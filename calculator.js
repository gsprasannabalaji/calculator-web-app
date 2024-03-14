$(document).ready(function () {

    $('#welcome-message').text(`Welcome, ${sessionStorage.getItem('username')}`);
    $(".error-message").hide();
    let regex = /^[+-]?([0-9]*[.])?[0-9]+$/;

    const validate = (num, errorId) => {
        if(num === '') {
            $(errorId).text(`${errorId == "#number1Error" ? 'Number 1' : 'Number 2'} is required.`);
            $(errorId).show();
        } else if(!isFinite(parseFloat(num))) {
            $(errorId).text(`${errorId == "#number1Error" ? 'Number 1' : 'Number 2'} must be a finite number.`);
            $(errorId).show();
        } else if(!regex.test(num)) {
            $(errorId).text(`${errorId == "#number1Error" ? 'Number 1' : 'Number 2'} field will only accept numbers. Special Characters is not allowed`);
            $(errorId).show();
        }
        else {
            $(errorId).hide();
        }
    }

    const isValidNumbers = (num1, num2) => {
        let isValid = false;
        
        validate(num1, "#number1Error");
        validate(num2, "#number2Error");

        if(num1 !== '' && num2 !== '' && isFinite(parseFloat(num1)) && isFinite(parseFloat(num2)) && regex.test(num1) && regex.test(num2)) {
            isValid = true;
            $(".error-message").hide();
        }
 
        return isValid;
    }

    $("#number1").on("input", () => {
        let num1 = $('#number1').val();
        validate(num1, "#number1Error");
    });

    $("#number2").on("input", () => {
        let num2 = $('#number2').val();
        validate(num2, "#number2Error");
    });

    $('#add, #subtract, #multiply, #divide').on('click', (event) => {
        let num1 = $('#number1').val();
        let num2 = $('#number2').val();
        if(isValidNumbers(num1, num2)) {
            let operator = $(event.target).data('operation');
            let result = 0;
            switch (operator) {
                case '+':
                    result = parseFloat(num1) + parseFloat(num2);
                    break;
                case '-':
                    result = parseFloat(num1) - parseFloat(num2);
                    break;
                case '*':
                    result = parseFloat(num1) * parseFloat(num2);
                    break;
                case '/':
                    if((parseFloat(num1) / parseFloat(num2)) == Infinity){
                        result = "Not a number";
                        $('#number2Error').text("For division by zero is not allowed.");
                        $('#number2Error').show();
                    } else {
                        result = parseFloat(num1) / parseFloat(num2);
                        $('#number2Error').hide();
                    }
                    break;
                default:
                    break;
            }
            // result = Number.isInteger(result)? result : result.toFixed(2);
            $('#result').val(result);
        }
    });

});