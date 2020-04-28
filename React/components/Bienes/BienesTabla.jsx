import React, { useState } from 'react';
import Funciones from '../Funciones'
import GenericTable from '../commons/GenericTable';

const COLUMNS = [
    {field:"fgarIdFideicomiso", header:"Fideicomiso"},
    {field:"fgarCveGarantia2", header:"Tipo de Bien"},
    {field:"fgarImpGarantiaFormatted", header:"Importe"},
    {field:"fgarImpGarantizadFormatted", header:"Importe Garantizado"},
    {field:"fgarCveStatus", header:"Status"}
];

class BienesApi extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            datos:[],
            electo:null
        };
    }

    async componentDidMount() {
        var llamados = new Funciones();

        let datos=await llamados.datosTabla('json={"id":"funRegistroGarantias"}');
        console.log(datos);
        this.setState({datos:datos});
        /*this.llamada().then(data => {
            this.setState({fiduca: data});
        });*/
    }

    displaySelection(data) {
        console.log(data);
        if(!data || data.length === 0) {
            return <div style={{textAlign: 'left'}}>Sin Selección</div>;
        }
        else {
            
            if(data instanceof Array)
                return <ul style={{textAlign: 'left', margin: 0}}>{data.map((bien,i) => <li key={bien.fgarIdFideicomiso}>{bien.fgarIdFideicomiso + ' - ' + bien.fgarCveGarantia2}</li>)}</ul>;
            else
                return <div style={{textAlign: 'left'}}>Datos elegidos: {data.fgarIdFideicomiso + ' - ' + data.fgarCveGarantia2}</div>
        }
    }
    handleSelect=(valueS)=>{
        console.log(valueS)
        this.setState({electo: valueS})
        this.props.onSelect(valueS)
    }

    render() {

        return (
                <GenericTable data={this.state.datos} columns={COLUMNS} onSelect={this.handleSelect}/>
        );
    }
}

export default BienesApi;