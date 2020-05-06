class Bien {
    fgarIdFideicomiso?: number;
    fgarIdSubcuenta?: number;
    fgarCveGarantia?: number;
    fgarCveGarantia2?: string;
    fgarCveStatus?: string;
    disponibleBien?: string;
    fgarImpGarantia?: number;
    fgarImpGarantiaFormatted?: string;
    fgarImpGarantizad?: number;
    fgarImpGarantizadFormatted?: string;
    pagosBien?: string;
    ctoNumEscritura?: string;

    getIdentifier(): string {
        return `${this.fgarIdFideicomiso}-${this.fgarIdSubcuenta}-${this.fgarCveGarantia}`;
    }
}

export default Bien;
