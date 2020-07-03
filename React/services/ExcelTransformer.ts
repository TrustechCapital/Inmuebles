type TableLayout = {
    field: string;
    header: string;
}[];

const uri = 'data:application/vnd.ms-excel;base64,';

class ExcelTransformer {
    rows: any[];
    layout: TableLayout;
    docname: string;
    filename: string;

    constructor(
        rows: any[],
        layout: TableLayout,
        docname: string,
        filename: string
    ) {
        this.rows = rows;
        this.layout = layout;
        this.docname = docname;
        this.filename = `${String(filename)}.xls`;
    }

    toHtml(): string {
        const headers = this.layout.map(
            (columns) => `<th>${columns.header}</th>`
        );

        const tableHead = `<thead><tr>${headers.join('')}</tr></thead>`;

        const rows = this.rows.map((row) => {
            const rowColumns = this.layout.map(
                (column) => `<td>${row[column.field]}</td>`
            );

            return `<tr>${rowColumns.join('')}</tr>`;
        });

        const tableBody = `<tbody>${rows.join('')}</tbody>`;

        const table = `<table>${tableHead}${tableBody}</table>`;
        //console.log('STRING', table);
        return table;
    }

    toXls(): string {
        const xlsTemplate = `
            <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                <head>
                <meta charset="UTF-8">
                    <!--[if gte mso 9]>
                        <xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${
                            this.docname
                        }</x:Name><x:WorksheetOptions><x:DisplayGridlines/>
                        </x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml>
                    <![endif]-->
                </head>
                <body>
                    ${this.toHtml()}
                </body>
            </html>`;
        return xlsTemplate;
    }

    toBase64(data: any) {
        return window.btoa(unescape(encodeURIComponent(data)));
    }

    download() {
        //download(filename: string) {
        //debugger;
        const element = window.document.createElement('a');
        element.href = uri + this.toBase64(this.toXls());
        element.download = this.filename;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }
}

export default ExcelTransformer;
