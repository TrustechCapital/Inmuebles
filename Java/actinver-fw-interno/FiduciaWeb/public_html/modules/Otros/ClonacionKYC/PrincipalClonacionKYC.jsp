<FORM name="frmDatos" id="frmDatos" onsubmit="">
  <table width="100%" style="height:auto;">
    <tr>
      <td align="center" class="titulo">Clonacion KYC</td>
    </tr>
    <tr>
      <td>&nbsp;</td>
    </tr>
    <tr>
      <td height="100%">
        <table align="center" class="texto" width="90%">
          <tr>
            <td width="25%">&nbsp;</td>
            <td width="20%">Proyecto</td>
            <td>
              <input type="text" name="paramFideicomiso" id="paramFideicomiso" tipo="Num" size="10" maxlength="10" onblur="verificacionActivo(this);"/>
            </td>
            <td width="25%">
              <div id="nomFideicomiso" class="textoNegrita" ref="conNomProyecto" fun="asignaValor2DivFideicomiso" param="divNombreFideicomisoParam">&nbsp;</div>
            </td>
          </tr>
          <tr>
            <td width="25%">&nbsp;</td>
            <td width="20%">Nombre Persona:</td>
            <td>
              <input type="text" name="paramTipoPersona" id="paramTipoPersona"  size="50" maxlength="255"  onblur="ConvierteMayusculas(this);"/>
            </td>
            <td width="25%">&nbsp;
            </td>
          </tr>          
          <tr>
            <td colspan="4" align="center">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4" align="center">
              <table cellpadding="0" cellspacing="0">
                <tr>                  
                   <td width="112"  align="center" valign="middle"> <input type="button" value="Aceptar" name="cmdAceptar" id="cmdAceptar" onmouseover="this.className='boton_leftSobre'" onmouseout="this.className='boton_left';" class="boton_left" ref="qryClonacionKYCProyecto" fun="loadTableElement" tabla="tblReg" onclick="consultaClonacionKyc(this)"/> </td>
                   <td width="112"  align="center" valign="middle"> <input type="button" value="Limpiar" name="cmdLimpiar"  onmouseover="this.className='boton_rightSobre'" onmouseout="this.className='boton_right';" class="boton_right" onclick="limpiar(frmDatos);"/> </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td colspan="4" align="center">
              <input type="text" name="paramorder" id="paramorder" size="2" value="s" style="visibility:hidden;"/>
              <input type="text" name="paramIdPersona" id="paramIdPersona" size="2" value="" style="visibility:hidden;"/>
            </td>
          </tr>
          <tr>
            <td colspan="4" align="center">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2" align="center" class="subtitulo">Original</td>
            <td colspan="2" align="center">&nbsp;</td>
          </tr>
          <tr align="center">
            <td colspan="4">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr class="cabeceras" align="left">
                  <td align="center" width="23" nowrap>&nbsp;</td>
                  <td width="100" nowrap>Proyecto</td>
                  <td width="100" nowrap>Fiso</td>
                  <td width="150" nowrap>Tipo Persona</td>
                  <td width="150" nowrap>Num Persona</td>
                  <td width="200" nowrap>Persona</td>
                  <td width="100" nowrap>Tipo KYC</td>
                </tr>
              </table>
              <div style="height:150px; overflow:auto; position:relative; vertical-align:top; width:823px;">
                <table border="0" cellpadding="0" cellspacing="0" class="texto" id="tblReg" dataInfo="arrTblDat" keys="proyecto,contrato,tipoPersona,numPersona,idPersona" fun="clickTabla" radioWidth="23px" NoRecordsMsg="No existen Registros para estos criterios de b&uacute;squeda">
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="4" align="center">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="2" align="center" class="subtitulo">
              Clon
            </td>
            <td colspan="2" align="left" class="subtitulo">
            <input type="button" value="Consultar" name="cmdAceptarClon" id="cmdAceptarClon" class="boton" ref="qryClonacionKYCClonProyecto" fun="loadTableElement" tabla="tblRegClon" onclick="consultar(this,frmDatos, false);"/>
            </td>
          </tr>
          <tr align="center">
            <td colspan="4">
              <table border="0" cellpadding="0" cellspacing="0">
                <tr class="cabeceras" align="left">
                  <td align="center" width="23" nowrap>&nbsp;</td>
                  <td width="100" nowrap>Proyecto</td>
                  <td width="100" nowrap>Fiso</td>
                  <td width="150" nowrap>Tipo Persona</td>
                  <td width="150" nowrap>Num Persona</td>
                  <td width="200" nowrap>Persona</td>
                  <td width="100" nowrap>Tipo KYC</td>
                </tr>
              </table>
              <div style="height:150px; overflow:auto; position:relative; vertical-align:top; width:823px;">
                <table border="0" cellpadding="0" cellspacing="0" class="texto" id="tblRegClon" dataInfo="arrTblDat" keys="proyecto,contrato,tipoPersona,numPersona,idPersona" fun="clickTablaClon" radioWidth="23px">
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td colspan="4" align="center">
              <input type="button" value="Clonar" name="cmbClonar" id="cmbClonar" class="boton" onclick="generaClonacionKyc()"/>&nbsp;&nbsp;&nbsp;
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</FORM>
