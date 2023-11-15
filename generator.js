

const llenartabla = () => {
    datos = JSON.parse(localStorage.getItem('IDs'));
    //recorremos los datos guardados para ir agregandolos a la tabla
    $("#data > tbody").empty();//limpia solo los registros del body
    datos.map(item => {
        $('#data').append(
            '<tr><td>' + item.ID + '</td><td>' + item.firstName +
            '</td><td>' + item.BirthName + '</td><td>' + item.dateBirth +
            '</td><td>' + item.PlaceBirth + '</td><td>' + item.motherMaidenName +
            '</td></tr>');
    });
}

$(document).ready(function () {
    jQuery.validator.addMethod("specialChar", function(value, element) {
        return this.optional(element) || /([a-zA-Z\s])$/.test(value);
     }, "Este campo no admite numeros ni caracteres especiales.");

    //verificamos si hay datos para llenar la tabla
    if (localStorage.getItem('IDs')) {

        llenartabla();
    }
    $("#form").submit(function(event) {
        event.preventDefault();
    });
    $("#form").validate({
        
        rules: {
            firstName:{
                required:true,
                minlength:3,
                specialChar:true
            },
            birthName:{
                required:true,
                minlength:3,
                specialChar:true
            },
            dateBirth:{
                required:true,

            },
            placeBirth:{
                required:true,
                minlength:3,
                specialChar:true
            },
            motherMaidenName:{
                required:true,
                minlength:3,
                specialChar:true

            }   
        },
        messages: {
            firstName:{
                required:'campo requerido',
                minlength:'mino 3 letras',
                

            },birthName:{
                required:'campo requerido',
                minlength:'mino 3 letras',
            },
            dateBirth:{
                required:'campo requerido',

            },
            placeBirth:{
                required:'campo requerido',
                minlength:'mino 3 letras',
            },
            motherMaidenName:{
                required:'campo requerido',
                minlength:'mino 3 letras',
            } 
        },
        submitHandler: function() { generator(); }
    });
   
});

const storage = (firstName, BirthName, dateBirth, PlaceBirth, motherMaidenName, ID) => {
    //primero verificamos si ya se ha creado el almacenaje
    if (localStorage.getItem('IDs')) {

        //verificamos que no exista el codigo unico.
        let data =JSON.parse(localStorage.getItem('IDs'));
            data.map( item =>{
                if(item.ID === ID){
                    return alert('codigo unico ya existe')
                }else{
                    let IDs = [
                        ...JSON.parse(localStorage.getItem('IDs')),
                        {
                            ID,
                            firstName,
                            BirthName,
                            dateBirth,
                            PlaceBirth,
                            motherMaidenName
                        }
                    ];
                    localStorage.setItem('IDs', JSON.stringify(IDs));
                    alert('registrado con exito');
                }
            });

        
    }
    else {
        let IDs = [{
            ID,
            firstName,
            BirthName,
            dateBirth,
            PlaceBirth,
            motherMaidenName
        }];
        localStorage.setItem('IDs', JSON.stringify(IDs));
        alert('registrado con exito');
    }
    llenartabla();

}

const generator = () => {

    //obtenemos las dos primeras lestras del nombre.
    let twoLetterfirstName = $('#firstName').val().toUpperCase().substr(0, 2);
    //obtenemos las dos primeras lestras del birth name.
    let twoLetterBirthName = $('#birthName').val().toUpperCase().substr(0, 2);
    //obtenemos lados de la fecha de nacimiento DD/MM
    let dateBirth = $('#dateBirth').val().split('-');
    //obtenemos las dos primeras lestras del place of birth.
    let twoLetterPlaceBirth = $('#placeBirth').val().toUpperCase().substr(0, 2);
    //obtenemos las dos primeras lestras del mother’s maiden name.
    let twoLettermotherMaidenName = $('#motherMaidenName').val().toUpperCase().substr(0, 2);

    //creamos el codigo

    ID = twoLetterfirstName
        + "" + twoLetterBirthName
        + "" + dateBirth[2]
        + "" + dateBirth[1]
        + "" + twoLetterPlaceBirth
        + "" + twoLettermotherMaidenName
        ;
    //llamamos a la funcion que almacena
    storage($('#firstName').val(),
        $('#birthName').val(),
        $('#dateBirth').val(),
        $('#placeBirth').val(),
        $('#motherMaidenName').val(),
        ID
    );
    

    //vaciamos la tabla
    $('form :input').val('');

}