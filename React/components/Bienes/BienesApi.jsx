import React, { useState } from 'react';
import axios from 'axios';
import {
    DataTable,
    Column
} from 'primereact/datatable';

class BienesApi extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            fiduca: {
                data:[]
            }
        };

    }

    async llamada() {
        return axios.get('http://127.0.0.1:7101/FiduciaWeb/getRef.do?json={"id":"funRegistroGarantias"}')
               .then(res => res);
    }

    async componentDidMount() {
        this.llamada().then(data => {
            this.setState({fiduca: data});
        });
    }

    setFiso(datos){
        
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
                <DataTable value={this.state.fiduca.data} paginator={true} rows={10}
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