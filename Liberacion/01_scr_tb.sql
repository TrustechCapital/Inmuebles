
--
-- Name: FIDUCIAWEB; Type: SCHEMA; Schema: -; 
--

--
-- Name: anteproy; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE anteproy (
    ant_num_prospecto numeric(10,0) NOT NULL,
    ant_fecha_apertura character varying(10),
    ant_num_promotor numeric(10,0) NOT NULL,
    ant_cve_form_man character varying(80),
    ant_cve_tipo_neg character varying(25),
    ant_cve_clasif_pro character varying(50),
    ant_num_producto numeric(10,0) NOT NULL,
    ant_cve_comite numeric(1,0),
    ant_cve_revocable numeric(1,0),
    ant_imp_apertura numeric(16,4),
    ant_cve_st_prospec character varying(25),
    ant_des_gestion character varying(250),
    ant_fec_gestion character varying(10),
    ant_patrimonio character varying(4000),
    ant_num_abogado numeric(10,0),
    ant_nom_negocio character varying(250),
    ant_cve_situacion character varying(25),
    ant_fec_pro_consti character varying(10),
    ant_nom_actividad character varying(250),
    ant_tipo_client character varying(25),
    ant_tipo_public character varying(25),
    ant_tipo_contacto character varying(25),
    ant_num_escritura character varying(25),
    ant_num_notario numeric(10,0),
    ant_tipo_admon character varying(25),
    ant_ano_conmod1 numeric(4,0),
    ant_mes_conmod1 numeric(2,0),
    ant_dia_conmod1 numeric(2,0),
    ant_ano_conmod2 numeric(4,0),
    ant_mes_conmod2 numeric(2,0),
    ant_dia_conmod2 numeric(2,0),
    ant_ano_conmod3 numeric(4,0),
    ant_mes_conmod3 numeric(2,0),
    ant_dia_conmod3 numeric(2,0),
    ant_num_contrato numeric(10,0),
    ant_seguimiento character varying(50),
    ant_tipo_neg_sat numeric(10,0),
    ant_moneda character varying(50),
    ant_cve_area_inst character varying(100),
    ant_archivos numeric(1,0),
    ant_cve_clasif_sub_pro character varying(255),
    ant_num_admin numeric(1000,53),
    ant_une numeric(1,0)
);


--
-- Name: async_transactions; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE async_transactions (
    transaction_id text NOT NULL,
    transaction_name text NOT NULL,
    transaction_completed numeric(1,0) NOT NULL,
    transaction_error text
);


--
-- Name: claves; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE claves (
    cve_num_clave numeric(10,0) NOT NULL,
    cve_num_sec_clave numeric(10,0) NOT NULL,
    cve_desc_clave character varying(50),
    cve_liminf_clave numeric(16,2),
    cve_limsup_clave numeric(38,0),
    cve_forma_emp_cve character varying(70),
    cve_ano_alta_reg numeric(4,0) NOT NULL,
    cve_mes_alta_reg numeric(2,0) NOT NULL,
    cve_dia_alta_reg numeric(2,0) NOT NULL,
    cve_ano_ult_mod numeric(4,0) NOT NULL,
    cve_mes_ult_mod numeric(2,0) NOT NULL,
    cve_dia_ult_mod numeric(2,0) NOT NULL,
    cve_cve_st_clave character varying(25),
    cve_param1 character varying(50),
    cve_desc_param1 character varying(50),
    cve_param2 character varying(50),
    cve_desc_param2 character varying(50),
    cve_param3 character varying(50),
    cve_desc_param3 character varying(50)
);


--
-- Name: contrato; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE contrato (
    cto_num_contrato numeric(10,0) NOT NULL,
    cto_num_cliente numeric(10,0),
    cto_num_cto_eje numeric(10,0),
    cto_cve_tipo_neg character varying(100),
    cto_cve_clas_prod character varying(100),
    cto_num_producto numeric(10,0),
    cto_nom_contrato character varying(1000),
    cto_cve_forma_man character varying(100),
    cto_cve_tipo_per character varying(25),
    cto_cve_retencion character varying(25),
    cto_cve_comite_tec numeric(4,0),
    cto_cve_art_28 numeric(4,0),
    cto_cve_exclu_30 numeric(4,0),
    cto_cve_mon_ext numeric(4,0),
    cto_cve_revocable numeric(4,0),
    cto_cve_rep_prod numeric(4,0),
    cto_num_oficio_exe character varying(20),
    cto_reg_nal_inv_ex character varying(20),
    cto_ano_apertura numeric(4,0),
    cto_mes_apertura numeric(2,0),
    cto_dia_apertura numeric(2,0),
    cto_ano_vencim numeric(4,0),
    cto_mes_vencim numeric(2,0),
    cto_dia_vencim numeric(2,0),
    cto_ano_anivers numeric(4,0),
    cto_mes_anivers numeric(2,0),
    cto_dia_anivers numeric(2,0),
    cto_ano_cancela numeric(4,0),
    cto_mes_cancela numeric(2,0),
    cto_dia_cancela numeric(2,0),
    cto_fec_insc_rnie character varying(20),
    cto_ano_alta_reg numeric(4,0),
    cto_mes_alta_reg numeric(2,0),
    cto_dia_alta_reg numeric(2,0),
    cto_ano_ult_mod numeric(4,0),
    cto_mes_ult_mod numeric(2,0),
    cto_dia_ult_mod numeric(2,0),
    cto_cve_st_contrat character varying(25),
    cto_cve_subcto numeric(4,0),
    cto_num_nivel1 numeric(10,0),
    cto_num_nivel2 numeric(10,0),
    cto_num_nivel3 numeric(10,0),
    cto_num_nivel4 numeric(10,0),
    cto_num_nivel5 numeric(10,0),
    cto_reg_shcp character varying(25),
    cto_cve_shcp numeric(2,0),
    cto_reg_gobdf character varying(25),
    cto_cve_gobdf numeric(2,0),
    cto_rama numeric(10,0),
    cto_sub_rama numeric(10,0),
    cto_nom_actividad character varying(80),
    cto_tipo_client character varying(25),
    cto_tipo_public character varying(25),
    cto_tipo_contacto character varying(25),
    cto_num_escritura character varying(25),
    cto_num_notario numeric(10,0),
    cto_tipo_admon character varying(25),
    cto_cve_req_sors numeric(10,0),
    cto_num_exp_sors character varying(14),
    cto_fec_act_shcp character varying(10),
    cto_foseg character varying(1),
    cto_envio_mens numeric(1,0),
    cto_firmas_mancomunadas numeric(1,0),
    cto_est_interfid character(2),
    cto_tipo_cont character varying(25),
    cto_tipo_fiso numeric(9,0),
    cto_moneda numeric(10,0),
    cto_cve_area_inst character varying(100)
);


--
-- Name: deposit; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE deposit (
    dpo_folio_rcp numeric(10,0) NOT NULL,
    dpo_folio_opera numeric(10,0) NOT NULL,
    dpo_num_operacion numeric(10,0) NOT NULL,
    dpo_num_sec_opera numeric(10,0) NOT NULL,
    dpo_num_modulo numeric(10,0),
    dpo_num_transac numeric(10,0),
    dpo_num_contrato numeric(10,0) NOT NULL,
    dpo_sub_contrato numeric(10,0),
    dpo_sub_programa numeric(10,0),
    dpo_num_pers_fid numeric(10,0),
    dpo_folio_oper_sis numeric(10,0),
    dpo_benef_xtercer numeric(10,0),
    dpo_cotizacion numeric(16,2),
    dpo_nom_pers_fid character varying(50),
    dpo_tipo_pers_fid character varying(20),
    dpo_cve_tipo_dep numeric(2,0) NOT NULL,
    dpo_imp_deposito numeric(16,2) NOT NULL,
    dpo_num_moneda numeric(10,0) NOT NULL,
    dpo_num_cheque numeric(10,0),
    dpo_cve_tipo_cta character varying(50),
    dpo_num_banco numeric(10,0),
    dpo_nom_banco character varying(50),
    dpo_num_plaza numeric(10,0),
    dpo_nom_plaza character varying(50),
    dpo_num_pais numeric(10,0),
    dpo_cta_banxico numeric(20,0),
    dpo_dir_aper_cta character varying(50),
    dpo_codigo_trans character varying(25),
    dpo_concepto character varying(250),
    dpo_num_cuenta numeric(30,0),
    dpo_fecha character varying(10),
    dpo_nom_institu character varying(50),
    dpo_num_refe numeric(10,0),
    dpo_num_sucursal numeric(10,0),
    dpo_nom_sucursal character varying(50),
    dpo_num_iniciativa numeric(10,0),
    dpo_num_ctam numeric(10,0),
    dpo_num_scta numeric(10,0),
    dpo_num_sscta numeric(10,0),
    dpo_num_ssscta numeric(10,0),
    dpo_num_ente numeric(10,0),
    dpo_nom_area character varying(25),
    dpo_entidad_fin numeric(10,0) NOT NULL,
    dpo_contrato_inter numeric(11,0) NOT NULL,
    dpo_politica numeric(2,0) NOT NULL,
    dpo_ano_rcp numeric(4,0) NOT NULL,
    dpo_mes_rcp numeric(2,0) NOT NULL,
    dpo_dia_rcp numeric(2,0) NOT NULL,
    dpo_ano_alta_reg numeric(4,0) NOT NULL,
    dpo_mes_alta_reg numeric(2,0) NOT NULL,
    dpo_dia_alta_reg numeric(2,0) NOT NULL,
    dpo_ano_ult_mod numeric(4,0) NOT NULL,
    dpo_mes_ult_mod numeric(2,0) NOT NULL,
    dpo_dia_ult_mod numeric(2,0) NOT NULL,
    dpo_cve_st_deposi character varying(25),
    dpo_coniva numeric(2,0),
    dpo_imp_iva numeric(16,2),
    dpo_folio_agend numeric(10,0),
    dpo_rubro numeric(10,0)
);


--
-- Name: detliqui; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE detliqui (
    del_folio_opera numeric(10,0) NOT NULL,
    del_num_operacion numeric(10,0) NOT NULL,
    del_num_sec_opera numeric(10,0) NOT NULL,
    del_num_modulo numeric(10,0) NOT NULL,
    del_num_transac numeric(10,0) NOT NULL,
    del_num_contrato numeric(10,0) NOT NULL,
    del_sub_contrato numeric(10,0) NOT NULL,
    del_sub_programa numeric(10,0) NOT NULL,
    del_num_pers_fid numeric(10,0) NOT NULL,
    del_nom_pers_fid character varying(100),
    del_tipo_pers_fid character varying(50) NOT NULL,
    del_folio_oper_sis numeric(10,0) NOT NULL,
    del_benef_xtercer numeric(10,0),
    del_imp_liquidar numeric(16,2) NOT NULL,
    del_paridad numeric(16,2),
    del_cve_tipo_liq numeric(2,0) NOT NULL,
    del_num_moneda numeric(2,0) NOT NULL,
    del_cve_tipo_cta character varying(25),
    del_num_banco numeric(10,0),
    del_nom_banco character varying(50),
    del_num_plaza numeric(5,0),
    del_nom_plaza character varying(50),
    del_num_sucursal numeric(10,0),
    del_num_cuenta character varying(35),
    del_num_pais numeric(10,0),
    del_num_cheque numeric(10,0) NOT NULL,
    del_cta_banxico character varying(20),
    del_dir_aper_cta character varying(50),
    del_codigo_trans character varying(30),
    del_num_iniciativa numeric(10,0),
    del_num_ctam numeric(10,0),
    del_num_scta numeric(10,0),
    del_num_sscta numeric(10,0),
    del_num_ssscta numeric(10,0),
    del_nom_area character varying(50),
    del_concepto character varying(250),
    del_ano_alta_reg numeric(4,0) NOT NULL,
    del_mes_alta_reg numeric(2,0) NOT NULL,
    del_dia_alta_reg numeric(2,0) NOT NULL,
    del_ano_ult_mod numeric(4,0) NOT NULL,
    del_mes_ult_mod numeric(2,0) NOT NULL,
    del_dia_ult_mod numeric(2,0) NOT NULL,
    del_cve_st_detliqu character varying(25),
    del_rubro numeric(10,0),
    del_entidad_fin numeric(10,0),
    del_contrato_inter numeric(11,0)
);


--
-- Name: diasfera; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE diasfera (
    dfa_num_pais numeric(10,0) NOT NULL,
    dfa_ano_fecha numeric(4,0) NOT NULL,
    dfa_mes_fecha numeric(2,0) NOT NULL,
    dfa_dia_fecha numeric(2,0) NOT NULL,
    dfa_desc_fecha character varying(50),
    dfa_num_tipo_dia numeric(4,0),
    dfa_cve_periodo character varying(30),
    dfa_cve_dia character varying(30),
    dfa_cve_mes character varying(30),
    dfa_periodicidad character varying(30),
    dfa_ano_alta_reg numeric(4,0),
    dfa_mes_alta_reg numeric(2,0),
    dfa_dia_alta_reg numeric(2,0),
    dfa_ano_ult_mod numeric(4,0),
    dfa_mes_ult_mod numeric(2,0),
    dfa_dia_ult_mod numeric(2,0),
    dfa_cve_st_diasfera character varying(25)
);


--
-- Name: diasfval; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE diasfval (
    dfv_num_programa numeric(10,0) NOT NULL,
    dfv_num_emision numeric(10,0) NOT NULL,
    dfv_num_pais numeric(4,0) NOT NULL,
    dfv_ano_alta_reg numeric(4,0),
    dfv_mes_alta_reg numeric(2,0),
    dfv_dia_alta_reg numeric(2,0),
    dfv_ano_ult_mod numeric(4,0),
    dfv_mes_ult_mod numeric(2,0),
    dfv_dia_ult_mod numeric(2,0),
    dfv_cve_st_diasfera character varying(25)
);


--
-- Name: estados; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE estados (
    edo_num_pais numeric(10,0) NOT NULL,
    edo_num_estado numeric(10,0) NOT NULL,
    edo_nom_estado character varying(50) NOT NULL,
    edo_abrv_estado character varying(4) NOT NULL,
    edo_hr_diferencia numeric(10,0),
    edo_min_diferencia numeric(10,0),
    edo_ano_alta_reg numeric(4,0) NOT NULL,
    edo_mes_alta_reg numeric(2,0) NOT NULL,
    edo_dia_alta_reg numeric(2,0) NOT NULL,
    edo_ano_ult_mod numeric(4,0) NOT NULL,
    edo_mes_ult_mod numeric(2,0) NOT NULL,
    edo_dia_ult_mod numeric(2,0) NOT NULL,
    edo_cve_st_estado character varying(25)
);


--
-- Name: f_adquirentes; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_adquirentes (
    fadq_id_fideicomiso numeric(10,0) NOT NULL,
    fadq_id_subcuenta numeric(10,0) NOT NULL,
    fadq_id_bien character varying(50) NOT NULL,
    fadq_id_edificio character varying(50) NOT NULL,
    fadq_id_depto character varying(50) NOT NULL,
    fadq_id_venta numeric(10,0) NOT NULL,
    fadq_periodo numeric(10,0),
    fadq_nombre_comprador character varying(125),
    fadq_valor numeric(16,2),
    fadq_moneda numeric(10,0),
    fadq_tipo_venta character varying(25),
    fadq_tipo_plazo character varying(25),
    fadq_num_plazo numeric(10,0),
    fadq_enganche numeric(16,2),
    fadq_abono numeric(16,2),
    fadq_saldo numeric(16,2),
    fadq_pagos numeric(10,0),
    fadq_notario numeric(10,0),
    fadq_localidad character varying(50),
    fadq_cv character varying(25),
    fadq_contrato character varying(35),
    fadq_folio character varying(35),
    fadq_reg_pub character varying(255),
    fadq_fec_alta timestamp without time zone,
    fadq_fec_mod timestamp without time zone,
    fadq_status character varying(25),
    fadq_nom_comprador character varying(255),
    fadq_num_escrcom character varying(30),
    fadq_fec_escricom timestamp without time zone,
    fadq_exp_catast character varying(1000),
    fadq_prototipo character varying(255),
    fadq_numero_oficial character varying(255),
    fadq_notaria character varying(255),
    fadq_delegado_fiduciario character varying(255)
);


--
-- Name: f_bgarliq; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_bgarliq (
    glbe_id_fideicomiso numeric(10,0),
    glbe_id_credito character varying(30),
    glbe_id_tipo_credito character varying(35),
    glbe_id_disposicion numeric(10,0),
    glbe_id_secuencial numeric(10,0),
    glbe_id_beneficiario character varying(30),
    glbe_nombre_ben character varying(130),
    glbe_imp_credito numeric(16,2),
    glbe_pje_garantia numeric(12,4),
    glbe_imp_garliq numeric(16,2),
    glbe_imp_garliq_lib numeric(20,3),
    glbe_imp_intereses numeric(16,2),
    glbe_folio_constancia numeric(10,0),
    glbe_folio_liberacion numeric(10,0),
    glbe_tipo_movto character varying(30),
    glbe_imp_movto_const numeric(16,2),
    glbe_imp_movto_libera numeric(16,2),
    glbe_cve_status character varying(25),
    glbe_rfc_curp character varying(25),
    glbe_fecha_sus character varying(10),
    glbe_fecha_ven character varying(10),
    glbe_fecha_pro character varying(10)
);


--
-- Name: f_bienes; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_bienes (
    fbif_id_fideicomiso numeric(10,0),
    fbif_id_sub_cuenta numeric(10,0),
    fbif_id_tipo_bien numeric(10,0),
    fbif_id_cve_bien character varying(80),
    fbif_id_bien character varying(25),
    fbif_imp_bien numeric(16,2),
    fbif_imp_ult_valua numeric(16,2),
    fbif_per_valuacion character varying(25),
    fbif_desc_bien character varying(255),
    fbif_fec_ult_valua timestamp without time zone,
    fbif_fec_inicio timestamp without time zone,
    fbif_fec_fin timestamp without time zone,
    fbif_moneda numeric(10,0),
    fbif_imp_moneda numeric(16,2),
    fbif_tipo_cambio numeric(16,2),
    fbif_tex_comentario character varying(300),
    fbif_st_bien character varying(25)
);


--
-- Name: f_bienesgar; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_bienesgar (
    fgrs_id_fideicomiso numeric(10,0) NOT NULL,
    fgrs_id_subcuenta numeric(10,0) NOT NULL,
    fors_id_garantia numeric(10,0) NOT NULL,
    fors_cve_tipo_garantia numeric(10,0) NOT NULL,
    fors_cve_tipo_bien numeric(10,0) NOT NULL,
    fors_identificacion character varying(25),
    fors_texto_descrip character varying(500),
    fors_tex_comentario character varying(255),
    fors_imp_bien numeric(16,2) NOT NULL,
    fors_moneda numeric(10,0),
    fors_cve_revalua numeric(2,0),
    fors_cve_per_valua character varying(25),
    fors_imp_ult_valua numeric(16,2),
    fors_fec_ult_valua timestamp without time zone,
    fors_fec_vencimiento timestamp without time zone,
    fors_num_escritura character varying(30),
    fors_num_notario character varying(20),
    fors_cve_status character varying(25),
    fors_cve_grahipo numeric(2,0),
    fors_num_hipoteca character varying(30),
    fors_a_favor character varying(80),
    fors_regimen numeric(10,0)
);


--
-- Name: f_carta_liberacion; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_carta_liberacion (
    flib_id_fideicomiso numeric(10,0),
    flib_id_subcuenta numeric(10,0),
    flib_id_bien character varying(50),
    flib_id_edificio character varying(50),
    flib_id_depto character varying(50),
    flib_nom_empresa character varying(125),
    flib_nom_area character varying(125),
    flib_direccion character varying(500),
    flib_sitio character varying(125),
    flib_fecha timestamp without time zone,
    flib_nom_notario character varying(125),
    flib_nom_puesto character varying(125),
    flib_desc_fid_ben character varying(500),
    flib_desc_saneamiento character varying(500),
    flib_desc_responsabilidad character varying(500),
    flib_desc_otorgamiento character varying(500),
    flib_transmision_reversion character varying(125),
    flib_parcial_total character varying(125),
    flib_descripcion_inmueble character varying(500),
    flib_sujeto_regimen numeric(10,0),
    flib_descripcion_regimen1 character varying(500),
    flib_descripcion_regimen2 character varying(500),
    flib_descripcion_regimen3 character varying(500),
    flib_nom_adquirente character varying(125),
    flib_nom_calle character varying(50),
    flib_nom_colonia character varying(50),
    flib_delegacion_municipio character varying(125),
    flib_nom_poblacion character varying(50),
    flib_nom_estado character varying(50),
    flib_tipo_inmueble character varying(125),
    flib_indiviso numeric(16,4),
    flib_num_escritura character varying(50),
    flib_nom_envio character varying(125),
    flib_email_envio character varying(125),
    flib_observacion character varying(500),
    flib_nom_delegado character varying(125),
    flib_nom_firma character varying(125)
);


--
-- Name: f_epassword; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_epassword (
    usu_num_usuario numeric(10,0) NOT NULL,
    usu_fec_error timestamp without time zone NOT NULL,
    usu_num_error numeric(10,0) NOT NULL
);


--
-- Name: f_funcion; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_funcion (
    ffun_id_funcion numeric(10,0) NOT NULL,
    ffun_nom_menu character varying(100),
    ffun_id_padre numeric(10,0),
    ffun_nombre_funcion character varying(255),
    ffun_orden numeric(2,0)
);


--
-- Name: f_garantias; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_garantias (
    fgar_id_fideicomiso numeric(10,0) NOT NULL,
    fgar_id_subcuenta numeric(10,0) NOT NULL,
    fgar_cve_garantia numeric(10,0) NOT NULL,
    fgar_tex_garantia character varying(500),
    fgar_tex_comentario character varying(255),
    fgar_cve_revalua numeric(10,0),
    fgar_imp_garantia numeric(16,2),
    fgar_imp_garantizad numeric(16,2),
    fgar_pje_picnorado numeric(16,4),
    fgar_imp_ult_valua numeric(16,2),
    fgar_cve_per_valua character varying(25),
    fgar_fec_ult_valua timestamp without time zone,
    fgar_fec_inicio timestamp without time zone,
    fgar_fec_fin timestamp without time zone,
    fgar_cve_status character varying(25),
    fgar_es_garantia numeric(1,0)
);


--
-- Name: f_garantiash; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_garantiash (
    fgar_id_fideicomiso numeric(10,0),
    fgar_id_subcuenta numeric(10,0),
    fgar_cve_garantia numeric(10,0),
    fgar_tex_garantia character varying(500),
    fgar_tex_comentario character varying(255),
    fgar_cve_revalua numeric(10,0),
    fgar_imp_garantia numeric(16,2),
    fgar_imp_garantizad numeric(16,2),
    fgar_pje_picnorado numeric(16,4),
    fgar_imp_ult_valua numeric(16,2),
    fgar_cve_per_valua character varying(25),
    fgar_fec_ult_valua timestamp without time zone,
    fgar_fec_inicio timestamp without time zone,
    fgar_fec_fin timestamp without time zone,
    fgar_cve_status character varying(25),
    fgar_es_garantia numeric(1,0)
);


--
-- Name: f_hpassword; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_hpassword (
    usu_num_usuario numeric(10,0) NOT NULL,
    usu_sec_password numeric(10,0) NOT NULL,
    usu_password character varying(2048),
    usu_fec_cambio timestamp without time zone NOT NULL
);


--
-- Name: f_liquidaciones_bienes; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_liquidaciones_bienes (
    flb_id_fideicomiso numeric(10,0) NOT NULL,
    flb_id_subcuenta numeric(10,0) NOT NULL,
    flb_id_garantia numeric(10,0) NOT NULL,
    flb_id_bien_garantia numeric(10,0) NOT NULL,
    flb_id_liquidacion numeric(10,0) NOT NULL,
    flb_importe numeric(16,2),
    flb_cve_moneda numeric(10,0),
    flb_tipo_cambio numeric(20,8),
    flb_importe_ext numeric(16,2),
    flb_fecha date,
    flb_comentario character varying(250),
    flb_afecta numeric
);


--
-- Name: f_per_fun; Type: TABLE; Schema: FIDUCIAWEB; Owner: postgres
--

CREATE TABLE f_per_fun (
    fper_id_perfil numeric(10,0) NOT NULL,
    ffun_id_funcion numeric(10,0) NOT NULL,
    ffun_lectura numeric(10,0) NOT NULL,
    ffun_escritura numeric(1,0) NOT NULL
);


--
-- Name: f_perfil; Type: TABLE; Schema: FIDUCIAWEB; Owner: postgres
--

CREATE TABLE f_perfil (
    fper_id_perfil numeric(10,0) NOT NULL,
    fper_nombre_perfil text NOT NULL
);

--
-- Name: f_proceso_liberacion; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_proceso_liberacion (
    fpl_id_fideicomiso numeric(10,0) NOT NULL,
    fpl_id_subcuenta numeric(10,0) NOT NULL,
    fpl_id_bien numeric(10,0) NOT NULL,
    fpl_id_edificio character varying(50) NOT NULL,
    fpl_id_depto character varying(50) NOT NULL,
    fpl_notario numeric(10,0),
    fpl_adquirente character varying(125),
    fpl_tercero character varying(125),
    fpl_fideicom_benefici character varying(125),
    fpl_nom_persona character varying(125),
    fpl_num_lugar character varying(125),
    fpl_nom_persona1 character varying(125),
    fpl_num_lugar1 character varying(125),
    fpl_fid_ben_saneamiento character varying(125),
    fpl_nom_saneamiento character varying(125),
    fpl_num_lugar_saneamiento character varying(125),
    fpl_nom_saneamiento1 character varying(125),
    fpl_num_lugar_saneamiento1 character varying(125),
    fpl_fid_ben_responsabilidad character varying(125),
    fpl_nom_responsabilidad character varying(125),
    fpl_num_lugar_responsabilidad character varying(125),
    fpl_nom_responsabilidad1 character varying(125),
    fpl_num_lugar_responsabilidad1 character varying(125),
    fpl_fid_ben_otorgamiento character varying(125),
    fpl_nom_otorgamiento character varying(125),
    fpl_num_lugar_otorgamiento character varying(125),
    fpl_nom_otorgamiento1 character varying(125),
    fpl_num_lugar_otorgamiento1 character varying(125),
    fpl_transmision_reversion character varying(125),
    fpl_parcial_total character varying(125),
    fpl_sujeto_regimen numeric(10,0),
    fpl_tipo_inmueble character varying(125),
    fpl_nom_envio character varying(125),
    fpl_email_envio character varying(125),
    fpl_observacion character varying(500),
    fpl_escritura character varying(50),
    fpl_fec_escritura timestamp without time zone,
    fpl_delegado character varying(125),
    fpl_fec_firma timestamp without time zone,
    fpl_cve_status character varying(80)
);


--
-- Name: f_reporte; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_reporte (
    frco_id_reporte numeric(10,0) NOT NULL,
    frco_nombre_reporte character varying(20),
    frco_status character varying(20),
    frco_num_columnas numeric(2,0)
);


--
-- Name: f_secuencial_fideicomiso; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_secuencial_fideicomiso (
    fsf_id_cve_fideicomiso character varying(10) NOT NULL,
    fsf_num_secuencial numeric(10,0) NOT NULL,
    fsf_cve_st_scuencial character varying(80)
);


--
-- Name: f_unidades; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_unidades (
    funi_id_fideicomiso numeric(10,0) NOT NULL,
    funi_id_subcuenta numeric(10,0) NOT NULL,
    funi_id_bien numeric(10,0) NOT NULL,
    funi_id_edificio character varying(50) NOT NULL,
    funi_id_depto character varying(50) NOT NULL,
    funi_tipo character varying(50),
    funi_niveles character varying(25),
    funi_calle_num character varying(50),
    funi_nom_colonia character varying(50),
    funi_nom_poblacion character varying(50),
    funi_codigo_postal character varying(10),
    funi_num_estado character varying(30),
    funi_num_pais character varying(30),
    funi_colindancias character varying(300),
    funi_medidas character varying(300),
    funi_estacionamiento1 character varying(10),
    funi_superficie1 character varying(10),
    funi_estacionamiento2 character varying(10),
    funi_superficie2 character varying(10),
    funi_estacionamiento3 character varying(10),
    funi_superficie3 character varying(10),
    funi_roof_garden character varying(10),
    funi_roof_superficie character varying(10),
    funi_sotano character varying(10),
    funi_sotano_superficie character varying(10),
    funi_indiviso numeric(16,4),
    funi_precio numeric(16,2),
    funi_precio_catastro numeric(16,2),
    funi_ultimo_avaluo numeric(16,2),
    funi_fecha_ultimo_avaluo timestamp without time zone,
    funi_moneda numeric(10,0),
    funi_acto1 character varying(255),
    funi_acto2 character varying(255),
    funi_acto3 character varying(255),
    funi_acto4 character varying(255),
    funi_notario numeric(10,0),
    funi_fecha_reversion timestamp without time zone,
    funi_localidad_nota character varying(50),
    funi_num_escritura character varying(50),
    funi_folio_real character varying(50),
    funi_fecha_traslado_dominio timestamp without time zone,
    funi_status character varying(25),
    funi_cve_grahipo numeric(2,0),
    funi_num_hipoteca character varying(30),
    funi_a_favor character varying(80),
    funi_num_catastro character varying(255),
    funi_nom_fideicomiso character varying(255),
    funi_numero_catastro numeric(16,0),
    funi_nombre_adquiriente character varying(100),
    funi_nombre_notario character varying(100)
);

--
-- Name: f_usuario; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_usuario (
    fusu_id_usuario character varying(100) NOT NULL,
    fusu_contrasena character varying(30),
    fusu_nombre_usuario character varying(150),
    fusu_pregunta_secreta character varying(150),
    fusu_respuesta_secreta character varying(20),
    fusu_status character varying(20),
    fusu_email character varying(100),
    fper_id_perfil numeric(10,0),
    fusu_imp_maximo numeric(10,0),
    fusu_ult_acceso timestamp without time zone,
    fusu_mteo numeric(1,0)
);


--
-- Name: f_usuarioc; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE f_usuarioc (
    fusu_id_usuario character varying(20) NOT NULL,
    fusu_contrasena character varying(30),
    fusu_nombre_usuario character varying(150),
    fusu_pregunta_secreta character varying(150),
    fusu_respuesta_secreta character varying(20),
    fusu_status character varying(20),
    fusu_email character varying(100),
    fper_id_perfil numeric(10,0),
    fusu_imp_maximo character varying(150),
    fusu_ult_acceso timestamp without time zone,
    fusu_mteo numeric(1,0)
);


--
-- Name: feccont; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE feccont (
    fco_cve_tipo_fecha character varying(25) NOT NULL,
    fco_ano_dia numeric(4,0) NOT NULL,
    fco_mes_dia numeric(2,0) NOT NULL,
    fco_dia_dia numeric(2,0) NOT NULL,
    fco_ano_apli_conta numeric(4,0) NOT NULL,
    fco_mes_apli_conta numeric(2,0) NOT NULL,
    fco_dia_apli_conta numeric(2,0) NOT NULL,
    fco_ano_ult_cierre numeric(4,0) NOT NULL,
    fco_mes_ult_cierre numeric(2,0) NOT NULL,
    fco_dia_ult_cierre numeric(2,0) NOT NULL,
    fco_dias_oper_ano numeric(10,0) NOT NULL,
    fco_dias_oper_sist numeric(10,0) NOT NULL,
    fco_ano_ini_opers numeric(4,0) NOT NULL,
    fco_mes_ini_opers numeric(2,0) NOT NULL,
    fco_dia_ini_opers numeric(2,0) NOT NULL,
    fco_ano_alta_reg numeric(4,0) NOT NULL,
    fco_mes_alta_reg numeric(2,0) NOT NULL,
    fco_dia_alta_reg numeric(2,0) NOT NULL,
    fco_ano_ult_mod numeric(4,0) NOT NULL,
    fco_mes_ult_mod numeric(2,0) NOT NULL,
    fco_dia_ult_mod numeric(2,0) NOT NULL,
    fco_cve_st_feccont character varying(25)
);


--
-- Name: feriados; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE feriados (
    fer_num_pais numeric(10,0) NOT NULL,
    fer_fec_mes numeric(10,0) NOT NULL,
    fer_fec_dia numeric(10,0) NOT NULL,
    fer_desc_dia_fer character varying(40),
    fer_ano_alta_reg numeric(4,0) NOT NULL,
    fer_mes_alta_reg numeric(2,0) NOT NULL,
    fer_dia_alta_reg numeric(2,0) NOT NULL,
    fer_ano_ult_mod numeric(4,0) NOT NULL,
    fer_mes_ult_mod numeric(2,0) NOT NULL,
    fer_dia_ult_mod numeric(2,0) NOT NULL,
    fer_cve_st_feriado character varying(25),
    fer_fec_ano numeric(4,0) NOT NULL
);


--
-- Name: fideicom; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE fideicom (
    fid_num_contrato numeric(10,0) NOT NULL,
    fid_fideicomitente numeric(10,0) NOT NULL,
    fid_num_pais numeric(10,0),
    fid_num_rama numeric(10,0),
    fid_num_srama numeric(10,0),
    fid_cve_migratoria character varying(25),
    fid_cve_sexo character varying(1),
    fid_cve_tipo_per character varying(25),
    fid_nom_fideicom character varying(250),
    fid_rfc character varying(15),
    fid_fec_nac numeric(10,0),
    fid_nom_nacional character varying(50),
    fid_num_lada_casa character varying(4),
    fid_num_telef_casa character varying(50),
    fid_num_lada_ofic character varying(4),
    fid_num_telef_ofic character varying(50),
    fid_num_ext_ofic character varying(10),
    fid_num_lada_fax character varying(4),
    fid_num_telef_fax character varying(50),
    fid_num_ext_fax character varying(10),
    fid_ano_alta_reg numeric(4,0),
    fid_mes_alta_reg numeric(2,0),
    fid_dia_alta_reg numeric(2,0),
    fid_ano_ult_mod numeric(4,0),
    fid_mes_ult_mod numeric(2,0),
    fid_dia_ult_mod numeric(2,0),
    fid_cve_st_fideico character varying(25),
    fid_curp character varying(20)
);


--
-- Name: folios; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE folios (
    fol_tipo_folio numeric(10,0) NOT NULL,
    fol_num_folio numeric(10,0),
    fol_cve_st_folio character varying(25),
    fol_num_prueba numeric(10,0) NOT NULL
);


--
-- Name: funcion; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE funcion (
    fun_id_opcion numeric(10,0) NOT NULL,
    fun_nom_menu character varying(100),
    fun_id_padre numeric(10,0),
    fun_nom_opcion character varying(100)
);


--
-- Name: garantia; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE garantia (
    grn_num_contrato numeric(10,0) NOT NULL,
    grn_sub_contrato numeric(10,0) NOT NULL,
    grn_cve_valores numeric(10,0),
    grn_cve_otros numeric(10,0),
    grn_cve_inmuebles numeric(10,0),
    grn_cve_muebles numeric(10,0),
    grn_cve_revalua numeric(10,0),
    grn_cve_numerario numeric(10,0),
    grn_imp_garanti numeric(16,2),
    grn_imp_garantizad numeric(16,2),
    grn_imp_ult_valua numeric(16,2),
    grn_cve_per_valua character varying(25),
    grn_fec_ano_inicio numeric(4,0),
    grn_fec_dia_inicio numeric(2,0),
    grn_fec_mes_inicio numeric(2,0),
    grn_fec_ano_fin numeric(4,0),
    grn_fec_mes_fin numeric(2,0),
    grn_fec_dia_fin numeric(2,0),
    grn_fec_ult_valua character varying(10),
    grn_tex_garantia text,
    grn_tex_comentario character varying(255),
    grn_cve_status character varying(25),
    grn_imp_numerario numeric(16,2),
    grn_fech_numerario character varying(10)
);


--
-- Name: garantiah; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE garantiah (
    grn_num_contrato numeric(10,0) NOT NULL,
    grn_sub_contrato numeric(10,0) NOT NULL,
    grn_cve_valores numeric(10,0),
    grn_cve_otros numeric(10,0),
    grn_cve_inmuebles numeric(10,0),
    grn_cve_muebles numeric(10,0),
    grn_cve_revalua numeric(10,0),
    grn_cve_numerario numeric(10,0),
    grn_imp_garanti numeric(16,2),
    grn_imp_garantizad numeric(16,2),
    grn_imp_ult_valua numeric(16,2),
    grn_cve_per_valua character varying(25),
    grn_fec_ano_inicio numeric(4,0),
    grn_fec_dia_inicio numeric(2,0),
    grn_fec_mes_inicio numeric(2,0),
    grn_fec_ano_fin numeric(4,0),
    grn_fec_mes_fin numeric(2,0),
    grn_fec_dia_fin numeric(2,0),
    grn_fec_ult_valua character varying(10),
    grn_tex_garantia text,
    grn_tex_comentario character varying(255),
    grn_cve_status character varying(25),
    grn_imp_numerario numeric(16,2),
    grn_fech_numerario character varying(10)
);


--
-- Name: indices; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE indices (
    ind_cve_indice character varying(25) NOT NULL,
    ind_ano_indice numeric(4,0) NOT NULL,
    ind_mes_indice numeric(2,0) NOT NULL,
    ind_dia_indice numeric(2,0) NOT NULL,
    ind_valor_indice numeric(16,8) NOT NULL,
    ind_ano_alta_reg numeric(4,0) NOT NULL,
    ind_mes_alta_reg numeric(2,0) NOT NULL,
    ind_dia_alta_reg numeric(2,0) NOT NULL,
    ind_ano_ult_mod numeric(4,0) NOT NULL,
    ind_mes_ult_mod numeric(2,0) NOT NULL,
    ind_dia_ult_mod numeric(2,0) NOT NULL,
    ind_cve_st_indice character varying(25)
);


--
-- Name: monedas; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE monedas (
    mon_num_pais numeric(10,0) NOT NULL,
    mon_nom_moneda character varying(50) NOT NULL,
    mon_ano_alta_reg numeric(4,0) NOT NULL,
    mon_mes_alta_reg numeric(2,0) NOT NULL,
    mon_dia_alta_reg numeric(2,0) NOT NULL,
    mon_ano_ult_mod numeric(4,0) NOT NULL,
    mon_mes_ult_mod numeric(2,0) NOT NULL,
    mon_dia_ult_mod numeric(2,0) NOT NULL,
    mon_cve_st_moneda character varying(25),
    mon_sigla character varying(5)
);


--
-- Name: movimien; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE movimien (
    mov_ano_movto numeric(4,0) NOT NULL,
    mov_mes_movto numeric(2,0) NOT NULL,
    mov_dia_movto numeric(2,0) NOT NULL,
    mov_num_contrato numeric(10,0) NOT NULL,
    mov_sub_contrato numeric(10,0) NOT NULL,
    mov_folio_opera numeric(10,0) NOT NULL,
    mov_num_modulo numeric(10,0) NOT NULL,
    mov_num_transac numeric(10,0) NOT NULL,
    mov_num_usuario numeric(10,0) NOT NULL,
    mov_desc_movto character varying(125),
    mov_hr_transac numeric(10,0) NOT NULL,
    mov_min_transac numeric(10,0) NOT NULL,
    mov_imp_movto numeric(16,2) NOT NULL,
    mov_cve_tipo_merca numeric(10,0) NOT NULL,
    mov_num_instrume numeric(10,0) NOT NULL,
    mov_num_sec_emis numeric(10,0) NOT NULL,
    mov_num_titulos numeric(10,0) NOT NULL,
    mov_cve_impre_edo numeric(10,0) NOT NULL,
    mov_cve_ent_sal character varying(1),
    mov_ano_alta_reg numeric(4,0) NOT NULL,
    mov_mes_alta_reg numeric(2,0) NOT NULL,
    mov_dia_alta_reg numeric(2,0) NOT NULL,
    mov_ano_ult_mod numeric(4,0) NOT NULL,
    mov_mes_ult_mod numeric(2,0) NOT NULL,
    mov_dia_ult_mod numeric(2,0) NOT NULL,
    mov_cve_st_movto character varying(25),
    mov_cve_acum_edcta character varying(2)
);


--
-- Name: notarios; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE notarios (
    not_num_notario numeric(10,0) NOT NULL,
    not_num_ofic_nota numeric(10,0) NOT NULL,
    not_nom_notario character varying(50),
    not_localidad_nota character varying(50),
    not_rfc character varying(15),
    not_calle_num character varying(50),
    not_nom_colonia character varying(50),
    not_nom_poblacion character varying(50),
    not_codigo_postal numeric(10,0),
    not_num_estado numeric(10,0),
    not_nom_estado character varying(50),
    not_num_pais numeric(3,0),
    not_nom_pais character varying(50),
    not_cve_lada1_ofic character varying(4),
    not_telef1_ofic character varying(20),
    not_num_ext1_ofic character varying(10),
    not_cve_lada2_ofic character varying(4),
    not_telef2_ofic character varying(20),
    not_num_ext2_ofic character varying(10),
    not_num_lada_fax character varying(4),
    not_num_telef_fax character varying(20),
    not_num_ext_fax character varying(10),
    not_ano_alta_reg numeric(4,0) NOT NULL,
    not_mes_alta_reg numeric(2,0) NOT NULL,
    not_dia_alta_reg numeric(2,0) NOT NULL,
    not_ano_ult_mod numeric(4,0) NOT NULL,
    not_mes_ult_mod numeric(2,0) NOT NULL,
    not_dia_ult_mod numeric(2,0) NOT NULL,
    not_cve_st_notario character varying(25),
    not_e_mail character varying(50),
    not_nom_operador character varying(50),
    not_nom_delegacion character varying(50)
);


--
-- Name: paises; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE paises (
    pai_num_pais numeric(10,0) NOT NULL,
    pai_nom_pais character varying(50),
    pai_abr_pais character varying(30),
    pai_ano_alta_reg numeric(4,0) NOT NULL,
    pai_mes_alta_reg numeric(2,0) NOT NULL,
    pai_dia_alta_reg numeric(2,0) NOT NULL,
    pai_ano_ult_mod numeric(4,0) NOT NULL,
    pai_mes_ult_mod numeric(2,0) NOT NULL,
    pai_dia_ult_mod numeric(2,0) NOT NULL,
    pai_cve_st_pais character varying(25)
);


--
-- Name: planes; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE planes (
    pla_cve_fase_prod character varying(36) NOT NULL,
    pla_desc_fase_prod character varying(255),
    pla_cve_per_aplica character varying(25),
    pla_cve_ch_control numeric(10,0) NOT NULL,
    pla_ano_aplicacion numeric(4,0) NOT NULL,
    pla_mes_aplicacion numeric(2,0) NOT NULL,
    pla_dia_aplicacion numeric(2,0) NOT NULL,
    pla_hora_aplica numeric(4,0) NOT NULL,
    pla_ano_alta_reg numeric(4,0) NOT NULL,
    pla_mes_alta_reg numeric(2,0) NOT NULL,
    pla_dia_alta_reg numeric(2,0) NOT NULL,
    pla_ano_ult_mod numeric(4,0) NOT NULL,
    pla_mes_ult_mod numeric(2,0) NOT NULL,
    pla_dia_ult_mod numeric(2,0) NOT NULL,
    pla_cve_st_plan character varying(25)
);


--
-- Name: puestos; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE puestos (
    pue_num_puesto numeric(10,0) NOT NULL,
    pue_nom_puesto character varying(50)
);




--
-- Name: reporte_poliza; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE reporte_poliza (
    ras_num_contrato numeric(10,0) NOT NULL,
    ras_folio_opera numeric(10,0) NOT NULL,
    ras_sec_asiento numeric(10,0) NOT NULL,
    ras_nom_contrato character varying(255),
    ras_desc_movto character varying(500),
    ras_desc_asiento character varying(500),
    ras_num_ctam numeric(4,0) NOT NULL,
    ras_num_scta numeric(2,0) NOT NULL,
    ras_num_sscta numeric(2,0) NOT NULL,
    ras_num_ssscta numeric(2,0) NOT NULL,
    ras_num_sssscta numeric(2,0) NOT NULL,
    ras_num_ssssscta numeric(2,0) NOT NULL,
    ras_num_aux2 numeric(10,0),
    ras_num_aux3 numeric(10,0),
    ras_imp_cargo numeric(16,2),
    ras_imp_abono numeric(16,2),
    ras_folio_cto numeric(10,0)
);


--
-- Name: reportes; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE reportes (
    rep_num_reporte numeric(10,0) NOT NULL,
    rep_nom_fisico_rep character varying(50),
    rep_nom_reporte character varying(50),
    rep_desc_reporte character varying(255),
    rep_cve_cliente numeric(10,0) NOT NULL,
    rep_cve_usuario numeric(10,0) NOT NULL,
    rep_cve_oficial numeric(10,0) NOT NULL,
    rep_tipo_papeleria character varying(25),
    rep_imp_costo_hoja numeric(16,2) NOT NULL,
    rep_ano_alta_reg numeric(4,0),
    rep_mes_alta_reg numeric(2,0),
    rep_dia_alta_reg numeric(2,0),
    rep_ano_ult_mod numeric(4,0),
    rep_mes_ult_mod numeric(2,0),
    rep_dia_ult_mod numeric(2,0),
    rep_cve_st_reporte character varying(25) NOT NULL
);


--
-- Name: rutinas; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE rutinas (
    rut_id_rutina character varying(36) NOT NULL,
    rut_nom_rutina character varying(36),
    rut_desc_rutina character varying(255),
    rut_cve_area_resp character varying(25),
    rut_cve_proceso character varying(25),
    rut_cve_period character varying(25),
    rut_cve_impresion numeric(10,0) NOT NULL,
    rut_cve_papeleria character varying(25),
    rut_cve_resp_datos numeric(10,0) NOT NULL,
    rut_num_usuario numeric(10,0) NOT NULL,
    rut_cve_bloqueo numeric(10,0) NOT NULL,
    rut_texto_bloqueo character varying(255),
    rut_fec_inic_bloq character varying(10),
    rut_fec_fin_bloq character varying(10),
    rut_ano_alta_reg numeric(4,0) NOT NULL,
    rut_mes_alta_reg numeric(2,0) NOT NULL,
    rut_dia_alta_reg numeric(2,0) NOT NULL,
    rut_ano_ult_mod numeric(4,0) NOT NULL,
    rut_mes_ult_mod numeric(2,0) NOT NULL,
    rut_dia_ult_mod numeric(2,0) NOT NULL,
    rut_cve_st_rutinas character varying(25)
);



--
-- Name: usuarios; Type: TABLE; Schema: FIDUCIAWEB; 
--

CREATE TABLE usuarios (
    usu_num_usuario numeric(10,0) NOT NULL,
    usu_nom_usuario character varying(50),
    usu_tipo_usuario character varying(50),
    usu_num_puesto numeric(10,0) NOT NULL,
    usu_nom_puesto character varying(50),
    usu_password character varying(50) NOT NULL,
    usu_ano_alta_reg numeric(4,0) NOT NULL,
    usu_mes_alta_reg numeric(2,0) NOT NULL,
    usu_dia_alta_reg numeric(2,0) NOT NULL,
    usu_ano_ult_mod numeric(4,0) NOT NULL,
    usu_mes_ult_mod numeric(2,0) NOT NULL,
    usu_dia_ult_mod numeric(2,0) NOT NULL,
    usu_cve_st_usuario character varying(25),
    usu_num_nivel1 numeric(10,0) NOT NULL,
    usu_num_nivel2 numeric(10,0) NOT NULL,
    usu_num_nivel3 numeric(10,0) NOT NULL,
    usu_num_nivel4 numeric(10,0) NOT NULL,
    usu_num_nivel5 numeric(10,0) NOT NULL,
    usu_centro_logro numeric(10,0) NOT NULL,
    usu_centro_costo numeric(10,0) NOT NULL,
    usu_ptce_gpot numeric(2,0),
    usu_fecha_ult_acceso timestamp without time zone,
    usu_fecha_password timestamp without time zone,
    usu_estatus_seguridad numeric(1,0),
    usu_token numeric(1,0),
    usu_monto_autorizado numeric(16,2),
    usu_perfil_interno character varying(50)
);

--
-- Name: ANTEPROY ANTEPROY_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "ANTEPROY"
    ADD CONSTRAINT "ANTEPROY_PK" PRIMARY KEY ("ANT_NUM_PROSPECTO");


--
-- Name: CLAVES CLAVES_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "CLAVES"
    ADD CONSTRAINT "CLAVES_PK" PRIMARY KEY ("CVE_NUM_CLAVE", "CVE_NUM_SEC_CLAVE");


--
-- Name: CONTRATO CONTRATO_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "CONTRATO"
    ADD CONSTRAINT "CONTRATO_PK" PRIMARY KEY ("CTO_NUM_CONTRATO");


--
-- Name: DEPOSIT DEPOSIT_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "DEPOSIT"
    ADD CONSTRAINT "DEPOSIT_PK" PRIMARY KEY ("DPO_FOLIO_RCP", "DPO_FOLIO_OPERA", "DPO_CVE_TIPO_DEP");


--
-- Name: DETLIQUI DETLIQUI_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "DETLIQUI"
    ADD CONSTRAINT "DETLIQUI_PK" PRIMARY KEY ("DEL_FOLIO_OPERA");


--
-- Name: DIASFERA DIASFERA_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "DIASFERA"
    ADD CONSTRAINT "DIASFERA_PK" PRIMARY KEY ("DFA_NUM_PAIS", "DFA_ANO_FECHA", "DFA_MES_FECHA", "DFA_DIA_FECHA");


--
-- Name: DIASFVAL DIASFVAL_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "DIASFVAL"
    ADD CONSTRAINT "DIASFVAL_PK" PRIMARY KEY ("DFV_NUM_PROGRAMA", "DFV_NUM_EMISION", "DFV_NUM_PAIS");


--
-- Name: FECCONT FECCONT_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "FECCONT"
    ADD CONSTRAINT "FECCONT_PK" PRIMARY KEY ("FCO_CVE_TIPO_FECHA");


--
-- Name: FERIADOS FERIADOS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "FERIADOS"
    ADD CONSTRAINT "FERIADOS_PK" PRIMARY KEY ("FER_FEC_MES", "FER_FEC_DIA", "FER_FEC_ANO", "FER_NUM_PAIS");


--
-- Name: FIDEICOM FIDEICOM_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "FIDEICOM"
    ADD CONSTRAINT "FIDEICOM_PK" PRIMARY KEY ("FID_NUM_CONTRATO", "FID_FIDEICOMITENTE");


--
-- Name: FOLIOS FOLIOS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "FOLIOS"
    ADD CONSTRAINT "FOLIOS_PK" PRIMARY KEY ("FOL_TIPO_FOLIO");


--
-- Name: F_SECUENCIAL_FIDEICOMISO FSF_ID_CVE_FIDEICOMISO_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_SECUENCIAL_FIDEICOMISO"
    ADD CONSTRAINT "FSF_ID_CVE_FIDEICOMISO_PK" PRIMARY KEY ("FSF_ID_CVE_FIDEICOMISO", "FSF_NUM_SECUENCIAL");


--
-- Name: FUNCION FUNCION_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "FUNCION"
    ADD CONSTRAINT "FUNCION_PK" PRIMARY KEY ("FUN_ID_OPCION");


--
-- Name: F_ADQUIRENTES F_ADQUIRENTES_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_ADQUIRENTES"
    ADD CONSTRAINT "F_ADQUIRENTES_PK" PRIMARY KEY ("FADQ_ID_FIDEICOMISO", "FADQ_ID_SUBCUENTA", "FADQ_ID_BIEN", "FADQ_ID_EDIFICIO", "FADQ_ID_DEPTO", "FADQ_ID_VENTA");


--
-- Name: F_BIENESGAR F_BIENESGAR_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_BIENESGAR"
    ADD CONSTRAINT "F_BIENESGAR_PK" PRIMARY KEY ("FGRS_ID_FIDEICOMISO", "FGRS_ID_SUBCUENTA", "FORS_ID_GARANTIA", "FORS_CVE_TIPO_GARANTIA", "FORS_CVE_TIPO_BIEN");


--
-- Name: F_EPASSWORD F_EPASSWORD_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_EPASSWORD"
    ADD CONSTRAINT "F_EPASSWORD_PK" PRIMARY KEY ("USU_NUM_USUARIO", "USU_FEC_ERROR");


--
-- Name: F_FUNCION F_FUNCION_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_FUNCION"
    ADD CONSTRAINT "F_FUNCION_PK" PRIMARY KEY ("FFUN_ID_FUNCION");


--
-- Name: F_GARANTIAS F_GARANTIAS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_GARANTIAS"
    ADD CONSTRAINT "F_GARANTIAS_PK" PRIMARY KEY ("FGAR_ID_FIDEICOMISO", "FGAR_ID_SUBCUENTA", "FGAR_CVE_GARANTIA");


--
-- Name: F_HPASSWORD F_HPASSWORD_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_HPASSWORD"
    ADD CONSTRAINT "F_HPASSWORD_PK" PRIMARY KEY ("USU_NUM_USUARIO", "USU_SEC_PASSWORD");


--
-- Name: F_PROCESO_LIBERACION F_PROCESO_LIBERACION_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_PROCESO_LIBERACION"
    ADD CONSTRAINT "F_PROCESO_LIBERACION_PK" PRIMARY KEY ("FPL_ID_FIDEICOMISO", "FPL_ID_SUBCUENTA", "FPL_ID_BIEN", "FPL_ID_EDIFICIO", "FPL_ID_DEPTO");


--
-- Name: F_UNIDADES F_UNIDADES_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_UNIDADES"
    ADD CONSTRAINT "F_UNIDADES_PK" PRIMARY KEY ("FUNI_ID_FIDEICOMISO", "FUNI_ID_SUBCUENTA", "FUNI_ID_BIEN", "FUNI_ID_EDIFICIO", "FUNI_ID_DEPTO");


--
-- Name: F_USUARIO F_USUARIO_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_USUARIO"
    ADD CONSTRAINT "F_USUARIO_PK" PRIMARY KEY ("FUSU_ID_USUARIO");


--
-- Name: GARANTIAH GARANTIAH_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "GARANTIAH"
    ADD CONSTRAINT "GARANTIAH_PK" PRIMARY KEY ("GRN_SUB_CONTRATO", "GRN_NUM_CONTRATO");


--
-- Name: GARANTIA GARANTIA_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "GARANTIA"
    ADD CONSTRAINT "GARANTIA_PK" PRIMARY KEY ("GRN_SUB_CONTRATO", "GRN_NUM_CONTRATO");


--
-- Name: INDICES INDICES_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "INDICES"
    ADD CONSTRAINT "INDICES_PK" PRIMARY KEY ("IND_CVE_INDICE", "IND_ANO_INDICE", "IND_MES_INDICE", "IND_DIA_INDICE");


--
-- Name: MONEDAS MONEDAS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "MONEDAS"
    ADD CONSTRAINT "MONEDAS_PK" PRIMARY KEY ("MON_NOM_MONEDA", "MON_NUM_PAIS");


--
-- Name: MOVIMIEN MOVIMIEN_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "MOVIMIEN"
    ADD CONSTRAINT "MOVIMIEN_PK" PRIMARY KEY ("MOV_ANO_MOVTO", "MOV_MES_MOVTO", "MOV_DIA_MOVTO", "MOV_NUM_CONTRATO", "MOV_SUB_CONTRATO", "MOV_FOLIO_OPERA", "MOV_NUM_MODULO", "MOV_NUM_TRANSAC");


--
-- Name: NOTARIOS NOTARIOS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "NOTARIOS"
    ADD CONSTRAINT "NOTARIOS_PK" PRIMARY KEY ("NOT_NUM_NOTARIO");


--
-- Name: PAISES PAISES_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "PAISES"
    ADD CONSTRAINT "PAISES_PK" PRIMARY KEY ("PAI_NUM_PAIS");


--
-- Name: PLANES PLANES_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "PLANES"
    ADD CONSTRAINT "PLANES_PK" PRIMARY KEY ("PLA_CVE_FASE_PROD");


--
-- Name: PUESTOS PUESTOS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "PUESTOS"
    ADD CONSTRAINT "PUESTOS_PK" PRIMARY KEY ("PUE_NUM_PUESTO");


--
-- Name: REPORTES REPORTES_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "REPORTES"
    ADD CONSTRAINT "REPORTES_PK" PRIMARY KEY ("REP_NUM_REPORTE");


--
-- Name: REPORTE_POLIZA REPORTE_POLIZA_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "REPORTE_POLIZA"
    ADD CONSTRAINT "REPORTE_POLIZA_PK" PRIMARY KEY ("RAS_NUM_CONTRATO", "RAS_FOLIO_OPERA", "RAS_SEC_ASIENTO", "RAS_NUM_CTAM", "RAS_NUM_SCTA", "RAS_NUM_SSCTA", "RAS_NUM_SSSCTA", "RAS_NUM_SSSSCTA", "RAS_NUM_SSSSSCTA");


--
-- Name: RUTINAS RUTINAS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "RUTINAS"
    ADD CONSTRAINT "RUTINAS_PK" PRIMARY KEY ("RUT_ID_RUTINA");


--
-- Name: F_REPORTE SYS_C00180796; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "F_REPORTE"
    ADD CONSTRAINT "SYS_C00180796" PRIMARY KEY ("FRCO_ID_REPORTE");


--
-- Name: USUARIOS USUARIOS_PK; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY "USUARIOS"
    ADD CONSTRAINT "USUARIOS_PK" PRIMARY KEY ("USU_NUM_USUARIO");


--
-- Name: anteproy anteproy_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY anteproy
    ADD CONSTRAINT anteproy_pk PRIMARY KEY (ant_num_prospecto);


--
-- Name: async_transactions async_transactions_pkey; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY async_transactions
    ADD CONSTRAINT async_transactions_pkey PRIMARY KEY (transaction_id);


--
-- Name: claves claves_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY claves
    ADD CONSTRAINT claves_pk PRIMARY KEY (cve_num_clave, cve_num_sec_clave);


--
-- Name: contrato contrato_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY contrato
    ADD CONSTRAINT contrato_pk PRIMARY KEY (cto_num_contrato);


--
-- Name: deposit deposit_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY deposit
    ADD CONSTRAINT deposit_pk PRIMARY KEY (dpo_folio_rcp, dpo_folio_opera, dpo_cve_tipo_dep);


--
-- Name: detliqui detliqui_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY detliqui
    ADD CONSTRAINT detliqui_pk PRIMARY KEY (del_folio_opera);


--
-- Name: diasfera diasfera_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY diasfera
    ADD CONSTRAINT diasfera_pk PRIMARY KEY (dfa_num_pais, dfa_ano_fecha, dfa_mes_fecha, dfa_dia_fecha);


--
-- Name: diasfval diasfval_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY diasfval
    ADD CONSTRAINT diasfval_pk PRIMARY KEY (dfv_num_programa, dfv_num_emision, dfv_num_pais);


--
-- Name: estados estados_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY estados
    ADD CONSTRAINT estados_pk PRIMARY KEY (edo_num_estado, edo_num_pais);


--
-- Name: f_adquirentes f_adquirentes_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_adquirentes
    ADD CONSTRAINT f_adquirentes_pk PRIMARY KEY (fadq_id_fideicomiso, fadq_id_subcuenta, fadq_id_bien, fadq_id_edificio, fadq_id_depto, fadq_id_venta);


--
-- Name: f_bienesgar f_bienesgar_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_bienesgar
    ADD CONSTRAINT f_bienesgar_pk PRIMARY KEY (fgrs_id_fideicomiso, fgrs_id_subcuenta, fors_id_garantia, fors_cve_tipo_garantia, fors_cve_tipo_bien);


--
-- Name: f_epassword f_epassword_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_epassword
    ADD CONSTRAINT f_epassword_pk PRIMARY KEY (usu_num_usuario, usu_fec_error);


--
-- Name: f_funcion f_funcion_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_funcion
    ADD CONSTRAINT f_funcion_pk PRIMARY KEY (ffun_id_funcion);


--
-- Name: f_garantias f_garantias_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_garantias
    ADD CONSTRAINT f_garantias_pk PRIMARY KEY (fgar_id_fideicomiso, fgar_id_subcuenta, fgar_cve_garantia);


--
-- Name: f_hpassword f_hpassword_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_hpassword
    ADD CONSTRAINT f_hpassword_pk PRIMARY KEY (usu_num_usuario, usu_sec_password);


--
-- Name: f_liquidaciones_bienes f_liquidaciones_bienes_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_liquidaciones_bienes
    ADD CONSTRAINT f_liquidaciones_bienes_pk PRIMARY KEY (flb_id_fideicomiso, flb_id_subcuenta, flb_id_garantia, flb_id_bien_garantia, flb_id_liquidacion);


--
-- Name: f_per_fun f_per_fun_pkey; Type: CONSTRAINT; Schema: FIDUCIAWEB; Owner: postgres
--

ALTER TABLE ONLY f_per_fun
    ADD CONSTRAINT f_per_fun_pkey PRIMARY KEY (fper_id_perfil, ffun_id_funcion);


--
-- Name: f_perfil f_perfil_pkey; Type: CONSTRAINT; Schema: FIDUCIAWEB; Owner: postgres
--

ALTER TABLE ONLY f_perfil
    ADD CONSTRAINT f_perfil_pkey PRIMARY KEY (fper_id_perfil);


--
-- Name: f_proceso_liberacion f_proceso_liberacion_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_proceso_liberacion
    ADD CONSTRAINT f_proceso_liberacion_pk PRIMARY KEY (fpl_id_fideicomiso, fpl_id_subcuenta, fpl_id_bien, fpl_id_edificio, fpl_id_depto);


--
-- Name: f_unidades f_unidades_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_unidades
    ADD CONSTRAINT f_unidades_pk PRIMARY KEY (funi_id_fideicomiso, funi_id_subcuenta, funi_id_bien, funi_id_edificio, funi_id_depto);


--
-- Name: f_usuario f_usuario_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_usuario
    ADD CONSTRAINT f_usuario_pk PRIMARY KEY (fusu_id_usuario);


--
-- Name: feccont feccont_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY feccont
    ADD CONSTRAINT feccont_pk PRIMARY KEY (fco_cve_tipo_fecha);


--
-- Name: feriados feriados_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY feriados
    ADD CONSTRAINT feriados_pk PRIMARY KEY (fer_fec_mes, fer_fec_dia, fer_fec_ano, fer_num_pais);


--
-- Name: fideicom fideicom_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY fideicom
    ADD CONSTRAINT fideicom_pk PRIMARY KEY (fid_num_contrato, fid_fideicomitente);


--
-- Name: folios folios_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY folios
    ADD CONSTRAINT folios_pk PRIMARY KEY (fol_tipo_folio);


--
-- Name: f_secuencial_fideicomiso fsf_id_cve_fideicomiso_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_secuencial_fideicomiso
    ADD CONSTRAINT fsf_id_cve_fideicomiso_pk PRIMARY KEY (fsf_id_cve_fideicomiso, fsf_num_secuencial);


--
-- Name: funcion funcion_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY funcion
    ADD CONSTRAINT funcion_pk PRIMARY KEY (fun_id_opcion);


--
-- Name: garantia garantia_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY garantia
    ADD CONSTRAINT garantia_pk PRIMARY KEY (grn_sub_contrato, grn_num_contrato);


--
-- Name: garantiah garantiah_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY garantiah
    ADD CONSTRAINT garantiah_pk PRIMARY KEY (grn_sub_contrato, grn_num_contrato);


--
-- Name: indices indices_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY indices
    ADD CONSTRAINT indices_pk PRIMARY KEY (ind_cve_indice, ind_ano_indice, ind_mes_indice, ind_dia_indice);


--
-- Name: monedas monedas_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY monedas
    ADD CONSTRAINT monedas_pk PRIMARY KEY (mon_nom_moneda, mon_num_pais);


--
-- Name: movimien movimien_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY movimien
    ADD CONSTRAINT movimien_pk PRIMARY KEY (mov_ano_movto, mov_mes_movto, mov_dia_movto, mov_num_contrato, mov_sub_contrato, mov_folio_opera, mov_num_modulo, mov_num_transac);


--
-- Name: notarios notarios_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY notarios
    ADD CONSTRAINT notarios_pk PRIMARY KEY (not_num_notario);


--
-- Name: paises paises_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY paises
    ADD CONSTRAINT paises_pk PRIMARY KEY (pai_num_pais);


--
-- Name: planes planes_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY planes
    ADD CONSTRAINT planes_pk PRIMARY KEY (pla_cve_fase_prod);


--
-- Name: puestos puestos_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY puestos
    ADD CONSTRAINT puestos_pk PRIMARY KEY (pue_num_puesto);


--
-- Name: reporte_poliza reporte_poliza_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY reporte_poliza
    ADD CONSTRAINT reporte_poliza_pk PRIMARY KEY (ras_num_contrato, ras_folio_opera, ras_sec_asiento, ras_num_ctam, ras_num_scta, ras_num_sscta, ras_num_ssscta, ras_num_sssscta, ras_num_ssssscta);


--
-- Name: reportes reportes_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY reportes
    ADD CONSTRAINT reportes_pk PRIMARY KEY (rep_num_reporte);


--
-- Name: rutinas rutinas_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY rutinas
    ADD CONSTRAINT rutinas_pk PRIMARY KEY (rut_id_rutina);


--
-- Name: f_reporte sys_c00180796; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY f_reporte
    ADD CONSTRAINT sys_c00180796 PRIMARY KEY (frco_id_reporte);


--
-- Name: usuarios usuarios_pk; Type: CONSTRAINT; Schema: FIDUCIAWEB; 
--

ALTER TABLE ONLY usuarios
    ADD CONSTRAINT usuarios_pk PRIMARY KEY (usu_num_usuario);
