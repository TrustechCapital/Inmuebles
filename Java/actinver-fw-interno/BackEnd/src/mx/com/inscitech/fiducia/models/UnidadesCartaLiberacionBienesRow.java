package mx.com.inscitech.fiducia.models;

public class UnidadesCartaLiberacionBienesRow {

    private String calle;
    private String colonia;
    private String poblacion;
    private String nomEstado;
    private double indiviso;
    private String numEscritura;
    private int regimen;
    private String estacionamiento1;
    private String estacionamiento2;
    private String estacionamiento3;
    private String roofGarden;
    private String sotano;

    public UnidadesCartaLiberacionBienesRow() {
        super();
    }


    public UnidadesCartaLiberacionBienesRow(String calle, String colonia, String poblacion, String nomEstado,
                                            int indiviso, String numEscritura, int regimen, String estacionamiento1,
                                            String estacionamiento2, String estacionamiento3, String roofGarden,
                                            String sotano) {
        this.calle = calle;
        this.colonia = colonia;
        this.poblacion = poblacion;
        this.nomEstado = nomEstado;
        this.indiviso = indiviso;
        this.numEscritura = numEscritura;
        this.regimen = regimen;
        this.estacionamiento1 = estacionamiento1;
        this.estacionamiento2 = estacionamiento2;
        this.estacionamiento3 = estacionamiento3;
        this.roofGarden = roofGarden;
        this.sotano = sotano;
    }


    public void setCalle(String calle) {
        this.calle = calle;
    }

    public String getCalle() {
        return calle;
    }

    public void setColonia(String colonia) {
        this.colonia = colonia;
    }

    public String getColonia() {
        return colonia;
    }

    public void setPoblacion(String poblacion) {
        this.poblacion = poblacion;
    }

    public String getPoblacion() {
        return poblacion;
    }

    public void setNomEstado(String nomEstado) {
        this.nomEstado = nomEstado;
    }

    public String getNomEstado() {
        return nomEstado;
    }

    public void setIndiviso(double indiviso) {
        this.indiviso = indiviso;
    }

    public double getIndiviso() {
        return indiviso;
    }

    public void setNumEscritura(String numEscritura) {
        this.numEscritura = numEscritura;
    }

    public String getNumEscritura() {
        return numEscritura;
    }

    public void setRegimen(int regimen) {
        this.regimen = regimen;
    }

    public int getRegimen() {
        return regimen;
    }

    public void setEstacionamiento1(String estacionamiento1) {
        this.estacionamiento1 = estacionamiento1;
    }

    public String getEstacionamiento1() {
        return estacionamiento1;
    }

    public void setEstacionamiento2(String estacionamiento2) {
        this.estacionamiento2 = estacionamiento2;
    }

    public String getEstacionamiento2() {
        return estacionamiento2;
    }

    public void setEstacionamiento3(String estacionamiento3) {
        this.estacionamiento3 = estacionamiento3;
    }

    public String getEstacionamiento3() {
        return estacionamiento3;
    }

    public void setRoofGarden(String roofGarden) {
        this.roofGarden = roofGarden;
    }

    public String getRoofGarden() {
        return roofGarden;
    }

    public void setSotano(String sotano) {
        this.sotano = sotano;
    }

    public String getSotano() {
        return sotano;
    }


}
