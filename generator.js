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
    //verificamos si hay datos para llenar la tabla
    if (localStorage.getItem('IDs')) {

        llenartabla();
    }
});

const storage = (firstName, BirthName, dateBirth, PlaceBirth, motherMaidenName, ID) => {
    //primero verificamos si ya se ha creado el almacenaje
    if (localStorage.getItem('IDs')) {
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
        alert('registrado con exito 2');
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