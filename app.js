const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');
var latitud, longitud;



const argv = require('yargs').options({ // unas opciones que tiene que digitar por el terminal ejemplo node app -d "nombre de la ciudad y pais"
    direccion: {
        alias: 'd',
        desc: 'Direccion de la ciudad para obtener el clima',
        demand: true //porque esto debe ser true?
    }
}).argv; //segun la documentacion se debe finalizar en .argv


//siempre que una funcion es un async los metodos pueden ser await
let getInfo = async(direccion) => { //una funcion de flecha, el meotodo principal que se ejecuta

    try {
        let coors = await lugar.getLugarLatLng(direccion); //se guarda la respuesta en coors, con el await espera a tener respuesta, y llama el lugar.js para llamar el metodo y el parametro del lugar
        let temp = await clima.getClima(coors.lat, coors.lng); // lo mismo que arriba

        //console.log(temp.temperatura);


        return `El clima en ${coors.direccion} es de una temperatura de: ${temp.temperatura} centigrados`;


    } catch (e) {
        return `No se pudo obtener el clima de: ${direccion}`
    }

}


getInfo(argv.direccion) //siempre que se utiliza con async se puede trabajar con promesas
    .then(resp => {
        console.log(resp);
    })
    .catch(e => {
        console.log('error!!', e);
    });
// lugar.getLugarLatLng(argv.direccion)
//     .then(resp => {
//         //console.log(resp);

//         latitud = resp.lat;
//         longitud = resp.lng;
//     })
//     .catch(e => console.log(e));


// clima.getClima(latitud, longitud)
//     .then(temp => console.log(temp))
//     .catch(e => console.log('error', e));