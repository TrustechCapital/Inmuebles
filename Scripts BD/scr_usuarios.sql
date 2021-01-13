Insert into F_USUARIO (FUSU_ID_USUARIO,FUSU_CONTRASENA,
					   FUSU_NOMBRE_USUARIO,FUSU_PREGUNTA_SECRETA,
					   FUSU_RESPUESTA_SECRETA,FUSU_STATUS,FUSU_EMAIL,
					   FPER_ID_PERFIL,FUSU_IMP_MAXIMO,FUSU_ULT_ACCESO,FUSU_MTEO) 
					   values ('maria.galvan@pruebasbanregio.dev','116971161051154857',
							   'USUARIO ADMINISTRADOR',null,null,
							   'ACTIVO','@',2,0,
							   to_date('07/11/19','DD/MM/RR'),0);
Insert into F_USUARIO (FUSU_ID_USUARIO,FUSU_CONTRASENA,
					   FUSU_NOMBRE_USUARIO,FUSU_PREGUNTA_SECRETA,
					   FUSU_RESPUESTA_SECRETA,FUSU_STATUS,FUSU_EMAIL,
					   FPER_ID_PERFIL,FUSU_IMP_MAXIMO,FUSU_ULT_ACCESO,FUSU_MTEO) 
					   values ('agustin.romero@pruebasbanregio.dev',
							   '116971161051154857',
							   'USUARIO ADMINISTRADOR',null,null,
							   'ACTIVO','@',2,0,
							   to_date('07/11/19','DD/MM/RR'),0);							   
							   

Insert into USUARIOS (USU_NUM_USUARIO,USU_NOM_USUARIO,USU_TIPO_USUARIO,
					  USU_NUM_PUESTO,USU_NOM_PUESTO,USU_PASSWORD,
					  USU_ANO_ALTA_REG,USU_MES_ALTA_REG,
					  USU_DIA_ALTA_REG,USU_ANO_ULT_MOD,USU_MES_ULT_MOD,
					  USU_DIA_ULT_MOD,USU_CVE_ST_USUARIO,USU_NUM_NIVEL1,
					  USU_NUM_NIVEL2,USU_NUM_NIVEL3,USU_NUM_NIVEL4,
					  USU_NUM_NIVEL5,USU_CENTRO_LOGRO,USU_CENTRO_COSTO,
					  USU_PTCE_GPOT,USU_FECHA_ULT_ACCESO,USU_FECHA_PASSWORD,
					  USU_ESTATUS_SEGURIDAD,USU_TOKEN,USU_MONTO_AUTORIZADO,
					  USU_PERFIL_INTERNO) values (1,'agustin.romero@pruebasbanregio.dev',
												  'SISTEMAS',2,'ADMINISTRADOR',
												  'banregio',
												  2009,8,24,2009,8,24,'ACTIVO',
												  1000,10,10,10,0,0,0,0,
												  to_date('27/12/18','DD/MM/RR'),
												  to_date('24/10/18','DD/MM/RR'),
												  0,1,0,null);
Insert into USUARIOS (USU_NUM_USUARIO,USU_NOM_USUARIO,USU_TIPO_USUARIO,
					  USU_NUM_PUESTO,USU_NOM_PUESTO,USU_PASSWORD,
					  USU_ANO_ALTA_REG,USU_MES_ALTA_REG,
					  USU_DIA_ALTA_REG,USU_ANO_ULT_MOD,USU_MES_ULT_MOD,
					  USU_DIA_ULT_MOD,USU_CVE_ST_USUARIO,USU_NUM_NIVEL1,
					  USU_NUM_NIVEL2,USU_NUM_NIVEL3,USU_NUM_NIVEL4,
					  USU_NUM_NIVEL5,USU_CENTRO_LOGRO,USU_CENTRO_COSTO,
					  USU_PTCE_GPOT,USU_FECHA_ULT_ACCESO,USU_FECHA_PASSWORD,
					  USU_ESTATUS_SEGURIDAD,USU_TOKEN,USU_MONTO_AUTORIZADO,
					  USU_PERFIL_INTERNO) values (2,'maria.galvan@pruebasbanregio.dev',
												  'SISTEMAS',2,'ADMINISTRADOR',
												  'banregio',
												  2009,8,24,2009,8,24,'ACTIVO',
												  1000,10,10,10,0,0,0,0,
												  to_date('27/12/18','DD/MM/RR'),
												  to_date('24/10/18','DD/MM/RR'),
												  0,1,0,null);		

COMMIT;