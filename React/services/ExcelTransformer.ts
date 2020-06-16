type TableLayout = {
    field: string;
    header: string;
}[];

const uri = 'data:application/vnd.ms-excel;base64,';

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

    toBase64(data: any) {
        return window.btoa(unescape(encodeURIComponent(data)));
    }

    download(filename: string) {
        const element = window.document.createElement('a');
        element.href = uri + this.toBase64(this.toHtml());
        element.download = filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

export default ExcelTransformer;
