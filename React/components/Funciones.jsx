import Axio from './AxiosCalls'

export default class Funciones{
    constructor(){
        this.data = null;
        this.filas = null;

    }

    datosTabla(params) {
        return Axio.get('getRef.do?'+params)
        .then((response)=>response.data)
        .then(function(data){
            this.data=data;
            this.objetificador();
            return this.filas; // <--- added return statement
        }.bind(this))
    }
    objetificador(){
        this.filas=JSON.stringify(this.data);
    }
}