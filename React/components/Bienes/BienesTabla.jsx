import React, { useState } from 'react';
import {
    DataTable,
    Column
} from 'primereact/datatable';
import Funciones from '../Funciones'

class BienesApi extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            datos:[]
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

    render() {

        return (
            <div>
                <DataTable value={this.state.datos} paginator={true} rows={10}
                    selectionMode="single"
                    footer={this.displaySelection(this.state.electo)}
                    selection={this.state.electo} onSelectionChange={e => this.setState({electo: e.value})}>
                    <Column field="fgarIdFideicomiso" header="Fideicomiso" sortable={true}/>
                    <Column field="fgarCveGarantia2" header="Tipo de Bien"/>
                    <Column field="fgarImpGarantiaFormatted" header="Importe"/>
                    <Column field="fgarImpGarantizadFormatted" header="Importe Garantizado"/>
                    <Column field="fgarCveStatus" header="Status"/>
                </DataTable>
            </div>
        );
    }
}

export default BienesApi;