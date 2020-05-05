package mx.com.inscitech.fiducia.models;

import java.math.BigDecimal;

import java.util.Date;

public class CartaLiberacionBienes {

    private BigDecimal idFideicomiso;
    private BigDecimal idSubcuenta;
    private String idBien;
    private String idEdificio;
    private String idDepto;
    private String nomEmpresa;
    private String nomArea;
    private String direccion;
    private String sitio;
    private Date fecha;
    private String nomNotario;
    private String nomPuesto;
    private String descFidBen;
    private String descSaneamiento;
    private String descResponsabilidad;
    private String descOtorgamiento;
    private String transmisionReversion;
    private String parcialTotal;
    private String descripcionInmueble;
    private int sujetoRegimen;
    private String descripcionRegimen1;
    private String descripcionRegimen2;
    private String descripcionRegimen3;
    private String nomAdquirente;
    private String nomCalle;
    private String nomColonia;
    private String delegacionMunicipio;
    private String nomPoblacion;
    private String nomEstado;
    private String tipoInmueble;
    private double indiviso;
    private String numEscritura;
    private String nomEnvio;
    private String emailEnvio;
    private String observacion;
    private String nomDelegado;
    private String nomFirma;


    public CartaLiberacionBienes() {
        super();
    }


    public CartaLiberacionBienes(BigDecimal idFideicomiso, BigDecimal idSubcuenta, String idBien, String idEdificio,
                                 String idDepto, String nomEmpresa, String nomArea, String direccion, String sitio,
                                 Date fecha, String nomNotario, String nomPuesto, String descFidBen,
                                 String descSaneamiento, String descResponsabilidad, String descOtorgamiento,
                                 String transmisionReversion, String parcialTotal, String descripcionInmueble,
                                 int sujetoRegimen, String descripcionRegimen1, String descripcionRegimen2,
                                 String descripcionRegimen3, String nomAdquirente, String nomCalle, String nomColonia,
                                 String delegacionMunicipio, String nomPoblacion, String nomEstado, String tipoInmueble,
                                 double indiviso, String numEscritura, String nomEnvio, String emailEnvio,
                                 String observacion, String nomDelegado, String nomFirma) {
        this.idFideicomiso = idFideicomiso;
        this.idSubcuenta = idSubcuenta;
        this.idBien = idBien;
        this.idEdificio = idEdificio;
        this.idDepto = idDepto;
        this.nomEmpresa = nomEmpresa;
        this.nomArea = nomArea;
        this.direccion = direccion;
        this.sitio = sitio;
        this.fecha = fecha;
        this.nomNotario = nomNotario;
        this.nomPuesto = nomPuesto;
        this.descFidBen = descFidBen;
        this.descSaneamiento = descSaneamiento;
        this.descResponsabilidad = descResponsabilidad;
        this.descOtorgamiento = descOtorgamiento;
        this.transmisionReversion = transmisionReversion;
        this.parcialTotal = parcialTotal;
        this.descripcionInmueble = descripcionInmueble;
        this.sujetoRegimen = sujetoRegimen;
        this.descripcionRegimen1 = descripcionRegimen1;
        this.descripcionRegimen2 = descripcionRegimen2;
        this.descripcionRegimen3 = descripcionRegimen3;
        this.nomAdquirente = nomAdquirente;
        this.nomCalle = nomCalle;
        this.nomColonia = nomColonia;
        this.delegacionMunicipio = delegacionMunicipio;
        this.nomPoblacion = nomPoblacion;
        this.nomEstado = nomEstado;
        this.tipoInmueble = tipoInmueble;
        this.indiviso = indiviso;
        this.numEscritura = numEscritura;
        this.nomEnvio = nomEnvio;
        this.emailEnvio = emailEnvio;
        this.observacion = observacion;
        this.nomDelegado = nomDelegado;
        this.nomFirma = nomFirma;
    }


    public void setIdFideicomiso(BigDecimal idFideicomiso) {
        this.idFideicomiso = idFideicomiso;
    }

    public BigDecimal getIdFideicomiso() {
        return idFideicomiso;
    }

    public void setIdSubcuenta(BigDecimal idSubcuenta) {
        this.idSubcuenta = idSubcuenta;
    }

    public BigDecimal getIdSubcuenta() {
        return idSubcuenta;
    }

    public void setIdBien(String idBien) {
        this.idBien = idBien;
    }

    public String getIdBien() {
        return idBien;
    }

    public void setIdEdificio(String idEdificio) {
        this.idEdificio = idEdificio;
    }

    public String getIdEdificio() {
        return idEdificio;
    }

    public void setIdDepto(String idDepto) {
        this.idDepto = idDepto;
    }

    public String getIdDepto() {
        return idDepto;
    }

    public void setNomEmpresa(String nomEmpresa) {
        this.nomEmpresa = nomEmpresa;
    }

    public String getNomEmpresa() {
        return nomEmpresa;
    }

    public void setNomArea(String nomArea) {
        this.nomArea = nomArea;
    }

    public String getNomArea() {
        return nomArea;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setSitio(String sitio) {
        this.sitio = sitio;
    }

    public String getSitio() {
        return sitio;
    }

    public void setFecha(Date fecha) {
        this.fecha = fecha;
    }

    public Date getFecha() {
        return fecha;
    }

    public void setNomNotario(String nomNotario) {
        this.nomNotario = nomNotario;
    }

    public String getNomNotario() {
        return nomNotario;
    }

    public void setNomPuesto(String nomPuesto) {
        this.nomPuesto = nomPuesto;
    }

    public String getNomPuesto() {
        return nomPuesto;
    }

    public void setDescFidBen(String descFidBen) {
        this.descFidBen = descFidBen;
    }

    public String getDescFidBen() {
        return descFidBen;
    }

    public void setDescSaneamiento(String descSaneamiento) {
        this.descSaneamiento = descSaneamiento;
    }

    public String getDescSaneamiento() {
        return descSaneamiento;
    }

    public void setDescResponsabilidad(String descResponsabilidad) {
        this.descResponsabilidad = descResponsabilidad;
    }

    public String getDescResponsabilidad() {
        return descResponsabilidad;
    }

    public void setDescOtorgamiento(String descOtorgamiento) {
        this.descOtorgamiento = descOtorgamiento;
    }

    public String getDescOtorgamiento() {
        return descOtorgamiento;
    }

    public void setTransmisionReversion(String transmisionReversion) {
        this.transmisionReversion = transmisionReversion;
    }

    public String getTransmisionReversion() {
        return transmisionReversion;
    }

    public void setParcialTotal(String parcialTotal) {
        this.parcialTotal = parcialTotal;
    }

    public String getParcialTotal() {
        return parcialTotal;
    }

    public void setDescripcionInmueble(String descripcionInmueble) {
        this.descripcionInmueble = descripcionInmueble;
    }

    public String getDescripcionInmueble() {
        return descripcionInmueble;
    }

    public void setSujetoRegimen(int sujetoRegimen) {
        this.sujetoRegimen = sujetoRegimen;
    }

    public int getSujetoRegimen() {
        return sujetoRegimen;
    }

    public void setDescripcionRegimen1(String descripcionRegimen1) {
        this.descripcionRegimen1 = descripcionRegimen1;
    }

    public String getDescripcionRegimen1() {
        return descripcionRegimen1;
    }

    public void setDescripcionRegimen2(String descripcionRegimen2) {
        this.descripcionRegimen2 = descripcionRegimen2;
    }

    public String getDescripcionRegimen2() {
        return descripcionRegimen2;
    }

    public void setDescripcionRegimen3(String descripcionRegimen3) {
        this.descripcionRegimen3 = descripcionRegimen3;
    }

    public String getDescripcionRegimen3() {
        return descripcionRegimen3;
    }

    public void setNomAdquirente(String nomAdquirente) {
        this.nomAdquirente = nomAdquirente;
    }

    public String getNomAdquirente() {
        return nomAdquirente;
    }

    public void setNomCalle(String nomCalle) {
        this.nomCalle = nomCalle;
    }

    public String getNomCalle() {
        return nomCalle;
    }

    public void setNomColonia(String nomColonia) {
        this.nomColonia = nomColonia;
    }

    public String getNomColonia() {
        return nomColonia;
    }

    public void setDelegacionMunicipio(String delegacionMunicipio) {
        this.delegacionMunicipio = delegacionMunicipio;
    }

    public String getDelegacionMunicipio() {
        return delegacionMunicipio;
    }

    public void setNomPoblacion(String nomPoblacion) {
        this.nomPoblacion = nomPoblacion;
    }

    public String getNomPoblacion() {
        return nomPoblacion;
    }

    public void setNomEstado(String nomEstado) {
        this.nomEstado = nomEstado;
    }

    public String getNomEstado() {
        return nomEstado;
    }

    public void setTipoInmueble(String tipoInmueble) {
        this.tipoInmueble = tipoInmueble;
    }

    public String getTipoInmueble() {
        return tipoInmueble;
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

    public void setNomEnvio(String nomEnvio) {
        this.nomEnvio = nomEnvio;
    }

    public String getNomEnvio() {
        return nomEnvio;
    }

    public void setEmailEnvio(String emailEnvio) {
        this.emailEnvio = emailEnvio;
    }

    public String getEmailEnvio() {
        return emailEnvio;
    }

    public void setObservacion(String observacion) {
        this.observacion = observacion;
    }

    public String getObservacion() {
        return observacion;
    }

    public void setNomDelegado(String nomDelegado) {
        this.nomDelegado = nomDelegado;
    }

    public String getNomDelegado() {
        return nomDelegado;
    }

    public void setNomFirma(String nomFirma) {
        this.nomFirma = nomFirma;
    }

    public String getNomFirma() {
        return nomFirma;
    }
}
