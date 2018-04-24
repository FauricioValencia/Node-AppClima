const axios = require('axios'); //para poder hacer las peticiones


const getClima = async(lat, lng) => { // una funcion asincrona que recibe 2 parametros 

    //axios

    //los 2 parametros se utilizan para usar la api, y &units=metric para pasar las medidas
    //y el appid=6308492003e5f91cf9d4a4db7f17168d clave que se genera en la pagina
    let resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&units=metric&appid=6308492003e5f91cf9d4a4db7f17168d`)

    let temperatura = resp.data.main.temp; //se toma resp y se empieza a filtrar hasta encontrar lo que se necesita, en esta caso la temperatura solamente


    return { // lo que va a recibir la promesa
        temperatura: temperatura
    }
    // return resp...main.temp;

}

module.exports = {
    getClima
}