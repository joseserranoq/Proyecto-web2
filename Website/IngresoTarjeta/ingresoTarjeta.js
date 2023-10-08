function updateDate() {
    var year = document.getElementById("expirationYear");
    var month = document.getElementById("expirationMonth");
    var date = new Date();
    var yearActual = date.getFullYear() -1;
    for (var i = 1 ; i <= 12; i++) {
        var option1 = document.createElement("option");
        var option2 = document.createElement("option");
        option1.textContent = i + yearActual;
        year.appendChild(option1);
        option2.textContent = i;
        month.appendChild(option2);
    }
    console.log('se realiza la actualizacion de los años')
}

function verifyExp(){
    var month = document.getElementById("expM");
    var year = document.getElementById("expY");
    var alert = document.getElementById("alert1");
    const submit = document.getElementById("addCard");
    alert.style.color = "red";
    var date = new Date();
    if(year.value!="00" && month.value!="00"){
        //console.log(` anno ${year.value}  mes ${month.value}`)
        var monthActual = date.getMonth() + 1;
        var yearActual = date.getFullYear();
    }

    if (year.value == yearActual && month.value < monthActual) {

        alert.textContent = "La tarjeta ha expirado,por favor ingrese otra tarjeta";
        submit.disabled = true;
        return false;
    } else {
        alert.textContent = "";
        submit.disabled = false;
        return true;
    }
}
// function verify(){
//     const form = document.getElementById('creditCardForm');
//         const expirationDateInput = document.getElementById('expirationDate');

//         form.addEventListener('submit', function(event) {
//             event.preventDefault();

//             // Validate expiration date
//             const expirationDateValue = expirationDateInput.value;
//             const expirationDateRegex = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
            
//             if (!expirationDateRegex.test(expirationDateValue)) {
//                 alert('Please enter a valid expiration date in the format MM/YYYY');
//                 expirationDateInput.focus();
//                 return false;
//             }

//             // Continue with form submission if all validations pass
//             alert('Form submitted successfully!');
//             // Add further submission logic here
//         });
// }

function confirmPurchase(){
    if(confirm("Are you sure to complete the purchase?")){
        //href to another page
        window.location.href = "pagoRealizado.html";
        
    }
}