import React from 'react';
import {
    DataTable,
    Column
} from 'primereact/datatable';

export default function GenericTable (props) {
    const {data, columns, onSelect} = props;
    const dynamicColumns = columns.map((col) => {
        return <Column key={col.field} field={col.field} header={col.header} />;
    });
    return (
        <div>
            <DataTable value={data} paginator={true} rows={10}
                selectionMode="single" onSelectionChange={e => onSelect(e.value)}>
                {dynamicColumns}
            </DataTable>
        </div>
    );
}
