<FORM name="frmMantenimientoSeguridadPersonal" id="frmMantenimientoSeguridadPersonal" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
    <tr>
      <td align="center" height="100%" class="titulo">
        <P>Personal</P>
      </td>
    </tr>
    <tr>
      <td height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%">
        <table width="100%" class="texto">
          <!--<tr>
            <td class="subtitulo" width="20%">&nbsp;</td>
            <td nowrap width="7%">N&uacute;mero</td>
            <td width="35%">
              <input type="text" name="perNumUsuario" id="perNumUsuario" tipo="Num" size="10" maxlength="10" onblur="verificaExistenciaRegistro();" required message="El N�mero de Usuario es un dato obligatorio"/>
            </td>
            <td class="subtitulo" nowrap width="8%">&nbsp;</td>
            <td class="subtitulo">&nbsp;</td>
            <td class="subtitulo">&nbsp;</td>
          </tr>-->
          <tr>
            <td width="20%">&nbsp;</td>
            <td nowrap width="7%">Nombre</td>
            <td colspan="3">
              <input type="text" name="perNomUsuario" id="perNomUsuario" size="40" maxlength="50" required message="El Nombre es un campo obligatorio" onblur="convertirMayusculas(this)"/>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td nowrap width="7%">E-mail</td>
            <td  cplspan=3>
              <input type="text" name="perNivelEstudios" id="perNivelEstudios" size="40" maxlength="50" required message="El correo electr�nico es un campo obligatorio" next="ejeCveBanca"/>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td nowrap width="6%">Area</td>
            <td colspan="5">
              <select size="1" name="tmpnivel" id="tmpnivel" ref="claveEjepers" fun="loadComboElement" keyValue="valor" theValue="descrip" next="perStatus" onBlur="asginaNiveles()"/>
            </td>
            <td width="5%">&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td nowrap width="6%">Status</td>
            <td width="25%">
              <select size="1" name="perStatus" id="perStatus" ref="claves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" next="formsLoaded" param="clavesCombo31"/>
            </td>
            <td width="5%">&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td nowrap width="7%" colspan="4">
              <hr/>
            </td>
            <td>&nbsp;</td>
          </tr>
          <!--<tr>
            <td width="20%">&nbsp;</td>
            <td nowrap width="8%">Fecha de Ingreso</td>
            <td>
              <input type="text" name="txtFecIngreso" id="txtFecIngreso" tipo="Fecha" size="10" maxlength="10" onchange="descomponeFecha(this,GI('perDiaIng'),GI('perMesIng'),GI('perAnoIng'));" required message="La Fecha de Ingreso es un campo obligatorio" onKeyUp="formatDate(this.form.txtFecIngreso);"/>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td nowrap width="8%">Fecha de Nacimiento</td>
            <td>
              <input type="text" name="txtFecNacimiento" id="txtFecNacimiento" tipo="Fecha" size="10" maxlength="10" onchange="descomponeFecha(this,GI('perDiaNac'),GI('perMesNac'),GI('perAnoNac'));" required message="La Fecha de Nacimiento es un campo obligatorio" onKeyUp="formatDate(this.form.txtFecNacimiento);"/>
            </td>
            <td>&nbsp;</td>
          </tr>-->
        </table>
      </td>
    </tr>
    <tr>
      <td width="60%" height="100%">
        <input type="text" name="perNumContrato" id="perNumContrato" size="1" maxlength="40" value="0" style="visibility:hidden"/>
        <input type="text" name="perNumNivel1" id="perNumNivel1" size="1" maxlength="40"  style="visibility:hidden"/>
        <input type="text" name="perNumNivel2" id="perNumNivel2" size="1" maxlength="40"  style="visibility:hidden"/>
        <input type="text" name="perNumNivel3" id="perNumNivel3" size="1" maxlength="40"  style="visibility:hidden"/>
        <input type="text" name="perNumNivel4" id="perNumNivel4" size="1" maxlength="40"  style="visibility:hidden"/>
        <input type="text" name="perNumNivel5" id="perNumNivel5" size="1" maxlength="40"  style="visibility:hidden"/>
        <input type="text" name="perDiaIng" id="perDiaIng" tipo="Num" size="2" maxlength="2" style="visibility:hidden"/>
        <input type="text" name="perMesIng" id="perMesIng" tipo="Num" size="2" maxlength="2" style="visibility:hidden"/>
        <input type="text" name="perAnoIng" id="perAnoIng" tipo="Num" size="4" maxlength="4" style="visibility:hidden"/>
        <input type="text" name="perDiaNac" id="perDiaNac" tipo="Num" size="2" maxlength="2" style="visibility:hidden"/>
        <input type="text" name="perMesNac" id="perMesNac" tipo="Num" size="2" maxlength="2" style="visibility:hidden"/>
        <input type="text" name="perAnoNac" id="perAnoNac" tipo="Num" size="4" maxlength="4" style="visibility:hidden"/>
	
      </td>
    </tr>
    <tr>
      <td width="60%" height="100%" align="center">
        <input type="BUTTON" value="Aceptar " id="cmdAceptar" name="cmdAceptar" class="boton" onclick="AltaOModificaInfo();" style="visibility:hidden"/> &nbsp;&nbsp;&nbsp;&nbsp;
        <input type="BUTTON" value="Cancelar" id="cmdCancelar" name="cmdCancelar" class="boton_x" onclick="showWaitLayer(); cargaPrincipalSeguridadPersonal();" style="visibility:hidden"/>
      </td>
    </tr>
  </table>
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
    <tr/>
  </table>
</FORM>
