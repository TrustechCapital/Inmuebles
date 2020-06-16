type TableLayout = {
    field: string;
    header: string;
}[];

class ExcelTransformer {
    rows: any[];
    layout: TableLayout;

    constructor(rows: any[], layout: TableLayout) {
        this.rows = rows;
        this.layout = layout;
    }

    toHtml(): string {
        const headers = this.layout.map((columns) => {
            `<th>${columns.header}</th>`;
        });

        const tableHead = `<thead><tr>${headers.join('')}</tr></thead>`;

        const rows = this.rows.map((row) => {
            const rowColumns = this.layout.map((column) => {
                `<td>${row[column.field]}</td>`;
            });

            return `<tr>${rowColumns.join('')}</tr>`;
        });

        const tableBody = `<tbody>${rows.join('')}</tbody>`;

        const table = `<table>${tableHead}${tableBody}</table>`;

        return table;
    }
}

export default ExcelTransformer;
