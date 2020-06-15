package mx.com.inscitech.fiducia.models;


public class LayoutCargaBienes {

    private Integer idfideicomiso;
    private Integer idBien;
    private String edificio;
    private String depto;
    private String niveles;
    private String calle;
    private String colonia;
    private String poblacion;
    private String codigoPostal;
    private String estado;
    private String pais;
    private String colindancia;
    private String medidas; //TODO: change type to string
    private String estacionamiento1;
    private String superficie1;
    private String numeroCatastro;
    private Double valorCatastro;
    private Double valorOperacion;
    private String adquirente;
    private Double avaluo;
    private String fechaAvaluo;
    private String escritura;
    private String fechaEscritura;
    private Integer notario;
    private Integer status;

    public LayoutCargaBienes() {
        super();
    }

    public LayoutCargaBienes(Integer idfideicomiso, Integer idBien, String edificio, String depto, String niveles,
                             String calle, String colonia, String poblacion, String codigoPostal, String estado,
                             String pais, String colindancia, String medidas, String estacionamiento1,
                             String superficie1, String numeroCatastro, Double valorCatastro, Double valorOperacion,
                             String adquirente, Double avaluo, String fechaAvaluo, String escritura,
                             String fechaEscritura, Integer notario, Integer status) {
        this.idfideicomiso = idfideicomiso;
        this.idBien = idBien;
        this.edificio = edificio;
        this.depto = depto;
        this.niveles = niveles;
        this.calle = calle;
        this.colonia = colonia;
        this.poblacion = poblacion;
        this.codigoPostal = codigoPostal;
        this.estado = estado;
        this.pais = pais;
        this.colindancia = colindancia;
        this.medidas = medidas;
        this.estacionamiento1 = estacionamiento1;
        this.superficie1 = superficie1;
        this.numeroCatastro = numeroCatastro;
        this.valorCatastro = valorCatastro;
        this.valorOperacion = valorOperacion;
        this.adquirente = adquirente;
        this.avaluo = avaluo;
        this.fechaAvaluo = fechaAvaluo;
        this.escritura = escritura;
        this.fechaEscritura = fechaEscritura;
        this.notario = notario;
        this.status = status;
    }


    public void setIdfideicomiso(Integer idfideicomiso) {
        this.idfideicomiso = idfideicomiso;
    }

    public Integer getIdfideicomiso() {
        return idfideicomiso;
    }

    public void setIdBien(Integer idBien) {
        this.idBien = idBien;
    }

    public Integer getIdBien() {
        return idBien;
    }

    public void setEdificio(String edificio) {
        this.edificio = edificio;
    }

    public String getEdificio() {
        return edificio;
    }

    public void setDepto(String depto) {
        this.depto = depto;
    }

    public String getDepto() {
        return depto;
    }

    public void setNiveles(String niveles) {
        this.niveles = niveles;
    }

    public String getNiveles() {
        return niveles;
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

    public void setCodigoPostal(String codigoPostal) {
        this.codigoPostal = codigoPostal;
    }

    public String getCodigoPostal() {
        return codigoPostal;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getEstado() {
        return estado;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public String getPais() {
        return pais;
    }

    public void setColindancia(String colindancia) {
        this.colindancia = colindancia;
    }

    public String getColindancia() {
        return colindancia;
    }

    public void setMedidas(String medidas) {
        this.medidas = medidas;
    }

    public String getMedidas() {
        return medidas;
    }

    public void setEstacionamiento1(String estacionamiento1) {
        this.estacionamiento1 = estacionamiento1;
    }

    public String getEstacionamiento1() {
        return estacionamiento1;
    }

    public void setSuperficie1(String superficie1) {
        this.superficie1 = superficie1;
    }

    public String getSuperficie1() {
        return superficie1;
    }

    public void setNumeroCatastro(String numeroCatastro) {
        this.numeroCatastro = numeroCatastro;
    }

    public String getNumeroCatastro() {
        return numeroCatastro;
    }

    public void setValorCatastro(Double valorCatastro) {
        this.valorCatastro = valorCatastro;
    }

    public Double getValorCatastro() {
        return valorCatastro;
    }

    public void setValorOperacion(Double valorOperacion) {
        this.valorOperacion = valorOperacion;
    }

    public Double getValorOperacion() {
        return valorOperacion;
    }

    public void setAdquirente(String adquirente) {
        this.adquirente = adquirente;
    }

    public String getAdquirente() {
        return adquirente;
    }

    public void setAvaluo(Double avaluo) {
        this.avaluo = avaluo;
    }

    public Double getAvaluo() {
        return avaluo;
    }

    public void setFechaAvaluo(String fechaAvaluo) {
        this.fechaAvaluo = fechaAvaluo;
    }

    public String getFechaAvaluo() {
        return fechaAvaluo;
    }

    public void setEscritura(String escritura) {
        this.escritura = escritura;
    }

    public String getEscritura() {
        return escritura;
    }

    public void setFechaEscritura(String fechaEscritura) {
        this.fechaEscritura = fechaEscritura;
    }

    public String getFechaEscritura() {
        return fechaEscritura;
    }

    public void setNotario(Integer notario) {
        this.notario = notario;
    }

    public Integer getNotario() {
        return notario;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

}
