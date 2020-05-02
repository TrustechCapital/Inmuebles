import React, { useState } from 'react';
import Funciones from '../Funciones'
import GenericTable from '../commons/GenericTable';

const COLUMNS = [
    {field:"fgarIdFideicomiso", header:"Fideicomiso", isKey: true},
    {field:"fgarCveGarantia2", header:"Tipo de Bien"},
    {field:"fgarImpGarantiaFormatted", header:"Importe", numeric: true},
    {field:"fgarImpGarantizadFormatted", header:"Importe Garantizado", numeric: true},
    {field:"fgarCveStatus", header:"Status"}
];

class BienesApi extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            datos:[
                {
                    "fgarImpGarantiaFormatted": "         245,834,654.77",
                    "fgarImpGarantizad": 245834654.77,
                    "fgarIdFideicomiso": 3623,
                    "fgarCveGarantia2": "OTROS BIENES",
                    "fgarCveStatus": "ACTIVO",
                    "fgarCveGarantia": 3,
                    "fgarIdSubcuenta": 0,
                    "disponibleBien": "         245,834,654.77",
                    "fgarImpGarantia": 245834654.77,
                    "fgarImpGarantizadFormatted": "         245,834,654.77",
                    "pagosBien": "                   0.00",
                    "ctoNumEscritura": null
                },
                {
                    "fgarImpGarantiaFormatted": "         316,608,415.65",
                    "fgarImpGarantizad": 316608415.65,
                    "fgarIdFideicomiso": 3624,
                    "fgarCveGarantia2": "INMUEBLES",
                    "fgarCveStatus": "ACTIVO",
                    "fgarCveGarantia": 2,
                    "fgarIdSubcuenta": 0,
                    "disponibleBien": "         316,608,415.65",
                    "fgarImpGarantia": 316608415.65,
                    "fgarImpGarantizadFormatted": "         316,608,415.65",
                    "pagosBien": "                   0.00",
                    "ctoNumEscritura": null
                },
                {
                    "fgarImpGarantiaFormatted": "         131,316,738.50",
                    "fgarImpGarantizad": 131316738.5,
                    "fgarIdFideicomiso": 3625,
                    "fgarCveGarantia2": "INMUEBLES",
                    "fgarCveStatus": "ACTIVO",
                    "fgarCveGarantia": 2,
                    "fgarIdSubcuenta": 0,
                    "disponibleBien": "         131,316,738.50",
                    "fgarImpGarantia": 131316738.5,
                    "fgarImpGarantizadFormatted": "         131,316,738.50",
                    "pagosBien": "                   0.00",
                    "ctoNumEscritura": null
                },
                {
                    "fgarImpGarantiaFormatted": "           4,229,232.03",
                    "fgarImpGarantizad": 4229232.03,
                    "fgarIdFideicomiso": 3627,
                    "fgarCveGarantia2": "INMUEBLES",
                    "fgarCveStatus": "ACTIVO",
                    "fgarCveGarantia": 2,
                    "fgarIdSubcuenta": 0,
                    "disponibleBien": "           4,229,232.03",
                    "fgarImpGarantia": 4229232.03,
                    "fgarImpGarantizadFormatted": "           4,229,232.03",
                    "pagosBien": "                   0.00",
                    "ctoNumEscritura": null
                },
                {
                    "fgarImpGarantiaFormatted": "             979,792.04",
                    "fgarImpGarantizad": 979792.04,
                    "fgarIdFideicomiso": 3632,
                    "fgarCveGarantia2": "OTROS BIENES",
                    "fgarCveStatus": "ACTIVO",
                    "fgarCveGarantia": 3,
                    "fgarIdSubcuenta": 0,
                    "disponibleBien": "             979,792.04",
                    "fgarImpGarantia": 979792.04,
                    "fgarImpGarantizadFormatted": "             979,792.04",
                    "pagosBien": "                   0.00",
                    "ctoNumEscritura": null
                },
                {
                    "fgarImpGarantiaFormatted": "         104,484,030.22",
                    "fgarImpGarantizad": 104484030.22,
                    "fgarIdFideicomiso": 3634,
                    "fgarCveGarantia2": "INMUEBLES",
                    "fgarCveStatus": "ACTIVO",
                    "fgarCveGarantia": 2,
                    "fgarIdSubcuenta": 0,
                    "disponibleBien": "         104,484,030.22",
                    "fgarImpGarantia": 104484030.22,
                    "fgarImpGarantizadFormatted": "         104,484,030.22",
                    "pagosBien": "                   0.00",
                    "ctoNumEscritura": null
                }
            ],
            electo: null
        };
    }

    async componentDidMount() {
        var llamados = new Funciones();

        //let datos = await llamados.datosTabla('json={"id":"funRegistroGarantias"}');
        //this.setState({datos:datos});

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