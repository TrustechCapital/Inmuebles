import React from 'react';
import {
    DataTable,
    Column
} from 'primereact/datatable';
const TABLE_STYLE = {
    width: '100%',
}
export default function GenericTable (props) {
    const {data, columns, onSelect} = props;
    const dynamicColumns = columns.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} style={{width:`${col.percentage}`,margin:'50px'}}/>;
    });
    //const carCount = this.state.cars ? this.state.cars.length: 0;


    return (
        <div>
            <DataTable value={data} paginator={true} rows={10} style={TABLE_STYLE} tableStyle={TABLE_STYLE}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} registros."
                selectionMode="single" onSelectionChange={e => onSelect(e.value)}>
                {dynamicColumns}
            </DataTable>
        </div>
    );
}
