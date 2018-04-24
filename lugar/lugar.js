const axios = require('axios'); //el axios se utiliza para hacer peticiones a links, o apis

//se utiliza peticiones async y await

const getLugarLatLng = async(direccion) => { // un funcion flecha que recibe un parametro, el cual lo almacena solo en encodeUrl


    let encodeUrl = encodeURI(direccion); //transformarlo a un url amigable para que pueda ser utilizado

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodeUrl }&key=AIzaSyCXdH1HzXZCRtX4MHlUCyE2NuolyUj8PhM`) //la peticion usando la api utilizando el parametro encodeUrl

    if (resp.data.status === "ZERO_RESULTS") { //si su respuesta es no tiene sentido
        throw new Error('No hay resultados para la ciudad digitada')
    }



    let Ubicacion = resp.data.results[0].formatted_address; // tomando la respuesta que ha tenido en el resp, se empieza a buscar dentro de la data hasta encontrar lo que se necesita, en este caso la direccion
    let locationLatitud = resp.data.results[0].geometry.location.lat;
    let locationLongitud = resp.data.results[0].geometry.location.lng;
    // console.log(JSON.stringify('Direccion:' + Ubicacion.formatted_address, undefined, 4));
    // console.log(JSON.stringify('Latitud:' + locationLatitud, undefined, 4));
    // console.log(JSON.stringify('Longitud: ' + locationLongitud, undefined, 4));

    //console.log(JSON.stringify(resp.data.location, undefined, 4));


    //console.log(resp.data);
    //console.log(resp.status);

    return { // lo que retorna y lo que va a recibir la promesa donde se este llamando
        direccion: Ubicacion,
        lat: locationLatitud,
        lng: locationLongitud
    }

}

//siempre exportar!!

module.exports = {
    getLugarLatLng
}