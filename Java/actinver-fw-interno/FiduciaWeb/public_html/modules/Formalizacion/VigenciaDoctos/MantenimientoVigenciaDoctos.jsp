<FORM name="frmDatos" id="frmDatos" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
    <tr>
      <td align="center" height="100%" class="titulo">Vigencia de Documentos</td>
    </tr>
    <tr>
      <td height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%">
        <table width="90%" align="center" class="texto" border="0">
          <tr>
            <td width="12%">&nbsp;</td>
            <td nowrap width="15%">Num proyecto</td>
            <td>
              <input type="text" name="fdocIdAnteproy" id="fdocIdAnteproy" size="10" maxlength="10" disabled/>
            </td>
            <td width="10%">&nbsp;</td>
          </tr>
          <tr>
            <td width="12%">&nbsp;</td>
            <td nowrap width="15%">Num Persona</td>
            <td>
              <input type="text" name="fdocNumPer" id="fdocNumPer" size="10" maxlength="10" disabled/>
            </td>
            <td width="10%">&nbsp;</td>
          </tr>
          <tr>
              <td width="25%">&nbsp;</td>
              <td width="10%" nowrap>Tipo Persona</td>
              <td>
                <input type="text" name="fdocTipoPer" id="fdocTipoPer" size="50" maxlength="50" disabled /><!--style="visibility:hidden"-->
                <!--<select id="fdocTipoPer" name="fdocTipoPer" ref="claves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" next="fdocIdDocumento" param="clavesCombo23" required message="El Tipo de Persona es un campo obligatorio"/>-->
              </td>
              <td width="10%">&nbsp;</td>
            </tr>
          <!--<tr>
              <td width="25%">&nbsp;</td>
              <td width="10%" nowrap>Documento</td>
              <td>
                <select id="fdocIdDocumento" name="fdocIdDocumento" ref="qrySelectDoctos" fun="loadComboElement" keyValue="fdocIdDocumento" theValue="fdocNombre" next="formsLoaded" param='fdocTipoPer' required message="El Documento es un campo obligatorio"/>
              </td>
              <td width="10%">&nbsp;</td>
            </tr>  -->
        <tr style="visibility:visible">
			<td width="25%">&nbsp;</td>
			<td colspan="2">
				Documento Padre:&nbsp;&nbsp;
				<select size="1" name="fdocIdDocumentovig" id="fdocIdDocumentovig" ref="qryDocumentsCbo" fun="loadComboElement" keyValue="fdocIdDocumento" theValue="fdocNombre" param = "paramsQryDocumentsCbo" next="cboNombre2" onchange="cargaTablaParaDocumentos();" required message="Seleccione un documento"/>
			</td>
			<td colspan="2">&nbsp;</td>
			<td nowrap>&nbsp;</td>
		</tr>
            <tr style="visibility:visible">
			<td width="25%">&nbsp;</td>
			<td colspan="2">
				SubCategoria Documento:&nbsp;&nbsp;
				<select size="1" name="fdocIdDocumentovigHijo" id="fdocIdDocumentovigHijo" ref="qryDocumentsCboHijo" fun="loadComboElement" keyValue="fdocIdDocumento" theValue="fdocNombre" param = "paramsQryDocumentsCbo2" next="formsLoaded"/><!--onchange="cargaTablaParaDocumentos2();"-->
			</td>
			<td colspan="2">&nbsp;</td>
			<td nowrap>&nbsp;</td>
		</tr>                
          <tr valign="middle">
            <td align="left" width="19%">&nbsp;</td>
            <td align="right" width="13%">Fecha de renovacion</td>
            <td align="left" width="44%">
                <input type="text" name="fdocFechaRenov" id="fdocFechaRenov" tipo="Fecha" size="10" maxlength="10"/>
            </td>
            <td align="left" width="24%">&nbsp;</td>
          </tr>
        
          </div>
        </table>
      </td>
    </tr>
    <tr>
      <td width="60%" height="22">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%" align="center">
        <input type="BUTTON" value="Aceptar " name="cmdAceptar" class="boton" onclick="ejecutaOperacionCuenta();" style="visibility:hidden"/>
        <input type="BUTTON" value="Cancelar" name="cmdCancelar" class="boton_x" onclick="cargaPrincipalDirecciones2();" style="visibility:hidden"/>
      </td>
    </tr>
  </table>
</FORM>
