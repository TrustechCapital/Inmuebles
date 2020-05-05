package mx.com.inscitech.fiducia.models;


public class LayoutCargaBienes {

    private Integer fideicomiso;
    private Integer subcuenta;
    private Integer bien;
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
    private Integer medidas;
    private String estacionamiento1;
    private String estacionamiento2;
    private String estacionamiento3;
    private String roofGarden;
    private String sotano;
    private String sotanoSuperficie;
    private Integer indiviso;
    private String medidas2;
    private String superficie1;
    private String superficie2;
    private String superficie3;
    private String roofSuperficie;
    private Double precioCatastro;
    private Double precio;
    private Double valor;
    private String adquirente;
    private Double avaluo;
    private String fechaAvaluo;
    private Integer moneda;
    private String acto1;
    private String acto2;
    private String acto3;
    private String acto4;
    private String fechaReversion;
    private String libro;
    private String escritura;
    private String fechaEscritura;
    private Integer notario;
    private String localidad;
    private Integer folioReal;
    private String desarrollo;
    private String prototipo;
    private String numeroOficial;
    private String notaria;
    private String delegadosFiduciarios;
    private Integer status;

    public LayoutCargaBienes() {
        super();
    }


    public LayoutCargaBienes(Integer fideicomiso, Integer subcuenta, Integer bien, String edificio, String depto,
                             String niveles, String calle, String colonia, String poblacion, String codigoPostal,
                             String estado, String pais, String colindancia, Integer medidas, String estacionamiento1,
                             String estacionamiento2, String estacionamiento3, String roofGarden, String sotano,
                             String sotanoSuperficie, Integer indiviso, String medidas2, String superficie1,
                             String superficie2, String superficie3, String roofSuperficie, Double precioCatastro,
                             Double precio, Double valor, String adquirente, Double avaluo, String fechaAvaluo,
                             Integer moneda, String acto1, String acto2, String acto3, String acto4,
                             String fechaReversion, String libro, String escritura, String fechaEscritura,
                             Integer notario, String localidad, Integer folioReal, String desarrollo, String prototipo,
                             String numeroOficial, String notaria, String delegadosFiduciarios, Integer status) {
        this.fideicomiso = fideicomiso;
        this.subcuenta = subcuenta;
        this.bien = bien;
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
        this.estacionamiento2 = estacionamiento2;
        this.estacionamiento3 = estacionamiento3;
        this.roofGarden = roofGarden;
        this.sotano = sotano;
        this.sotanoSuperficie = sotanoSuperficie;
        this.indiviso = indiviso;
        this.medidas2 = medidas2;
        this.superficie1 = superficie1;
        this.superficie2 = superficie2;
        this.superficie3 = superficie3;
        this.roofSuperficie = roofSuperficie;
        this.precioCatastro = precioCatastro;
        this.precio = precio;
        this.valor = valor;
        this.adquirente = adquirente;
        this.avaluo = avaluo;
        this.fechaAvaluo = fechaAvaluo;
        this.moneda = moneda;
        this.acto1 = acto1;
        this.acto2 = acto2;
        this.acto3 = acto3;
        this.acto4 = acto4;
        this.fechaReversion = fechaReversion;
        this.libro = libro;
        this.escritura = escritura;
        this.fechaEscritura = fechaEscritura;
        this.notario = notario;
        this.localidad = localidad;
        this.folioReal = folioReal;
        this.desarrollo = desarrollo;
        this.prototipo = prototipo;
        this.numeroOficial = numeroOficial;
        this.notaria = notaria;
        this.delegadosFiduciarios = delegadosFiduciarios;
        this.status = status;
    }


    public void setFideicomiso(Integer fideicomiso) {
        this.fideicomiso = fideicomiso;
    }

    public Integer getFideicomiso() {
        return fideicomiso;
    }

    public void setSubcuenta(Integer subcuenta) {
        this.subcuenta = subcuenta;
    }

    public Integer getSubcuenta() {
        return subcuenta;
    }

    public void setBien(Integer bien) {
        this.bien = bien;
    }

    public Integer getBien() {
        return bien;
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

    public void setMedidas(Integer medidas) {
        this.medidas = medidas;
    }

    public Integer getMedidas() {
        return medidas;
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

    public void setSotanoSuperficie(String sotanoSuperficie) {
        this.sotanoSuperficie = sotanoSuperficie;
    }

    public String getSotanoSuperficie() {
        return sotanoSuperficie;
    }

    public void setIndiviso(Integer indiviso) {
        this.indiviso = indiviso;
    }

    public Integer getIndiviso() {
        return indiviso;
    }

    public void setMedidas2(String medidas2) {
        this.medidas2 = medidas2;
    }

    public String getMedidas2() {
        return medidas2;
    }

    public void setSuperficie1(String superficie1) {
        this.superficie1 = superficie1;
    }

    public String getSuperficie1() {
        return superficie1;
    }

    public void setSuperficie2(String superficie2) {
        this.superficie2 = superficie2;
    }

    public String getSuperficie2() {
        return superficie2;
    }

    public void setSuperficie3(String superficie3) {
        this.superficie3 = superficie3;
    }

    public String getSuperficie3() {
        return superficie3;
    }

    public void setRoofSuperficie(String roofSuperficie) {
        this.roofSuperficie = roofSuperficie;
    }

    public String getRoofSuperficie() {
        return roofSuperficie;
    }

    public void setPrecioCatastro(Double precioCatastro) {
        this.precioCatastro = precioCatastro;
    }

    public Double getPrecioCatastro() {
        return precioCatastro;
    }

    public void setPrecio(Double precio) {
        this.precio = precio;
    }

    public Double getPrecio() {
        return precio;
    }

    public void setValor(Double valor) {
        this.valor = valor;
    }

    public Double getValor() {
        return valor;
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

    public void setMoneda(Integer moneda) {
        this.moneda = moneda;
    }

    public Integer getMoneda() {
        return moneda;
    }

    public void setActo1(String acto1) {
        this.acto1 = acto1;
    }

    public String getActo1() {
        return acto1;
    }

    public void setActo2(String acto2) {
        this.acto2 = acto2;
    }

    public String getActo2() {
        return acto2;
    }

    public void setActo3(String acto3) {
        this.acto3 = acto3;
    }

    public String getActo3() {
        return acto3;
    }

    public void setActo4(String acto4) {
        this.acto4 = acto4;
    }

    public String getActo4() {
        return acto4;
    }

    public void setFechaReversion(String fechaReversion) {
        this.fechaReversion = fechaReversion;
    }

    public String getFechaReversion() {
        return fechaReversion;
    }

    public void setLibro(String libro) {
        this.libro = libro;
    }

    public String getLibro() {
        return libro;
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

    public void setLocalidad(String localidad) {
        this.localidad = localidad;
    }

    public String getLocalidad() {
        return localidad;
    }

    public void setFolioReal(Integer folioReal) {
        this.folioReal = folioReal;
    }

    public Integer getFolioReal() {
        return folioReal;
    }

    public void setDesarrollo(String desarrollo) {
        this.desarrollo = desarrollo;
    }

    public String getDesarrollo() {
        return desarrollo;
    }

    public void setPrototipo(String prototipo) {
        this.prototipo = prototipo;
    }

    public String getPrototipo() {
        return prototipo;
    }

    public void setNumeroOficial(String numeroOficial) {
        this.numeroOficial = numeroOficial;
    }

    public String getNumeroOficial() {
        return numeroOficial;
    }

    public void setNotaria(String notaria) {
        this.notaria = notaria;
    }

    public String getNotaria() {
        return notaria;
    }

    public void setDelegadosFiduciarios(String delegadosFiduciarios) {
        this.delegadosFiduciarios = delegadosFiduciarios;
    }

    public String getDelegadosFiduciarios() {
        return delegadosFiduciarios;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getStatus() {
        return status;
    }

}
