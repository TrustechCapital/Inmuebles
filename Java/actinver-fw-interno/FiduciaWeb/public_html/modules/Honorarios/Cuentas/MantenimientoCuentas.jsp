<FORM name="frmDatos" id="frmDatos" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
    <tr>
      <td align="center" height="100%" class="titulo">Contratos de Inversi&oacute;n</td>
    </tr>
    <tr>
      <td height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%">
        <table width="90%" align="center" class="texto" border="0">
          <tr>
            <td width="12%">&nbsp;</td>
            <td nowrap width="15%">No. Fideicomiso</td>
            <td>
              <input type="text" name="dirNumContrato" id="dirNumContrato" tipo="Num" size="10" maxlength="10" onblur="validarPkAlta(this);" required message="El N�mero de Fideicomiso es un campo obligatorio"/>
            </td>
            <td nowrap>
              <div id="nomFideicomiso" class="textoNegrita" ref="conNomFid" fun="asignaValor2DivFideicomiso" param="divNombreFideicomisoParam">&nbsp;</div>
            </td>
            <td width="10%">&nbsp;</td>
          </tr>
            <tr>
              <td width="12%">&nbsp;</td>
              <td nowrap width="15%">Contrato de Inversi&oacute;n</td>
              <td colspan="2">
                <select size="1" name="ctoCveInver" id="ctoCveInver" ref="cves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" next="asignaValues2ObjHTML" param="cmbCntInv" required message="El Contrato de Inversi&oacute;n es un campo obligatorio"/>
              </td>
              <td align="left" width="10%">&nbsp;</td>
            </tr>
          </div>
        </table>
      </td>
    </tr>
    <tr>
      <td width="60%" height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%" align="center">
        <input type="BUTTON" value="Aceptar " name="cmdAceptar" class="boton" onclick="ejecutaOperacionCuenta();" style="visibility:hidden"/>
        <input type="BUTTON" value="Cancelar" name="cmdCancelar" class="boton_x" onclick="cargaPrincipalCuenta2();" style="visibility:hidden"/>
      </td>
    </tr>
  </table>
</FORM>
