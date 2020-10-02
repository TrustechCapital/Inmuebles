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
    private String medidas;
    private String estacionamiento1;
    private String superficie1;
    private String numeroCatastro;
    private Double valorBien;
    private Integer tipoValorBien;
    private String nombreAdquiriente;
    private String escritura;
    private String fechaEscritura;
    private String nombreNotario;
    private Integer numeroNotario;
    private Integer status;

    public LayoutCargaBienes() {
        super();
    }

    public LayoutCargaBienes(Integer idfideicomiso, Integer idBien, String edificio, String depto, String niveles,
                             String calle, String colonia, String poblacion, String codigoPostal, String estado,
                             String pais, String colindancia, String medidas, String estacionamiento1,
                             String superficie1, String numeroCatastro, Double valorBien, Integer tipoValorBien,
                             String nombreAdquirente, String escritura, String fechaEscritura, String nombreNotario,
                             Integer notario, Integer status) {
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
        this.valorBien = valorBien;
        this.tipoValorBien = tipoValorBien;
        this.nombreAdquiriente = nombreAdquirente;
        this.escritura = escritura;
        this.fechaEscritura = fechaEscritura;
        this.nombreNotario = nombreNotario;
        this.numeroNotario = notario;
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


    public void setTipoValorBien(Integer tipoValorBien) {
        this.tipoValorBien = tipoValorBien;
    }

    public Integer getTipoValorBien() {
        return tipoValorBien;
    }

    public void setValorBien(Double valorBien) {
        this.valorBien = valorBien;
    }

    public Double getValorBien() {
        return valorBien;
    }

    public void setNombreAdquiriente(String adquirente) {
        this.nombreAdquiriente = adquirente;
    }

    public String getNombreAdquiriente() {
        return nombreAdquiriente;
    }


    public void setFechaEscritura(String fechaEscritura) {
        this.fechaEscritura = fechaEscritura;
    }

    public String getFechaEscritura() {
        return fechaEscritura;
    }

    public void setEscritura(String escritura) {
        this.escritura = escritura;
    }

    public String getEscritura() {
        return escritura;
    }


    public void setNombreNotario(String nombreNotario) {
        this.nombreNotario = nombreNotario;
    }

    public String getNombreNotario() {
        return nombreNotario;
    }

    public void setNotario(Integer notario) {
        this.numeroNotario = notario;
    }

    public Integer getNotario() {
        return numeroNotario;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

}
