<form name="frmDatosInterfase" id="frmDatosInterfase">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
    <tr>
      <td align="center" height="100%" class="titulo">Valoriza</td>
    </tr>
    <tr>
      <td height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%">
        <table width="100%" align="center" class="texto">
          <tr valign="middle">
            <td colspan="4" align="center" class="subtitulo" width="30%">
              <a id="ligaArchivo" href="#" style="visibility:hidden">Archivo</a>
            </td>
          </tr>
          <tr valign="middle">
            <td align="left" width="4%">&nbsp;</td>
            <td align="right" width="10%">Fecha Valor&nbsp;</td>
            <td align="left" width="60%">
              <input type="text" name="txtFechaValor" id="txtFechaValor" size="10" ref="conFecCon" fun="loadTxtElementX" theValue="fecha" next="asignaFechaValor" maxlength="10" tipo="Fecha" required message="La Fecha Valor es un campo obligatorio"/>
            </td>
            <td align="left" width="20%">&nbsp;</td>
            <td align="left" width="4%">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="4" align="center" class="subtitulo" width="30%">Acumulado</td>
          </tr>
          <tr  valign="middle">
            <td width="20%" align="right"><input type="radio" name="chkPeriodicidad" id="chkAV" class="radio" value="1" onclick="ponerNombreArchivo();" />&nbsp;<label for="chkAV">Valores</label></td>
            <td width="20%" align="middle"><input type="radio" name="chkPeriodicidad" id="chkAB" class="radio" value="2" onclick="ponerNombreArchivo();" />&nbsp;<label for="chkAB">Bienes</label></td></td>
            <td width="20%" align="left"><input type="radio" name="chkPeriodicidad" id="chkAE" class="radio" value="3" onclick="ponerNombreArchivo();"/>&nbsp;<label for="chkAE">Efectivo</label></td>
          </tr>
          <tr>
            <td colspan="4" align="center" class="subtitulo" width="30%">Desglosado</td>
          </tr>
          <tr  valign="middle">
            <td width="20%" align="right"><input type="radio" name="chkPeriodicidad" id="chkDV" class="radio" value="4" onclick="ponerNombreArchivo();" />&nbsp;<label for="chkDV">Valores</label></td>
            <td width="20%" align="middle"><input type="radio" name="chkPeriodicidad" id="chkDB" class="radio" value="5" onclick="ponerNombreArchivo();" />&nbsp;<label for="chkDB">Bienes</label></td></td>
            <td width="20%" align="left"><input type="radio" name="chkPeriodicidad" id="chkDE" class="radio" value="6" onclick="ponerNombreArchivo();"/>&nbsp;<label for="chkDE">Efectivo</label></td>
          </tr>
          <tr valign="middle">
            <td align="left" width="29%">&nbsp;</td>
            <td align="right" nowrap width="3%">Nombre de Archivo</td>
            <td align="left" nowrap width="44%">
              <input type="text" name="txtNomArch" id="txtNomArch" size="30"  maxlength="40" disabled="disabled"/>
            </td>
            <td align="left" width="24%">&nbsp;</td>
          </tr>
          
        </table>
      </td>
    </tr>
    <tr>
      <td width="60%" height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td align="center">&nbsp;
        <input type="button" value="Aceptar" name="cmdAceptar" id="cmdAceptar" class="boton" onclick="ejecutaStoreInterfase();"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="button" value="Limpiar" name="cmdLimpiar" id="cmdLimpiar" class="boton" onclick="onButtonClickPestania('Interfases.InterfaseSalomon.PrincipalInterfaseSalomon','');"/>
      </td>
    </tr>
  </table>
   
</form>
<a id="linkReporte" href="#" style="visibility:hidden">Archivo</a> 
<a id="linkReporteNew" href="#" style="visibility:hidden" target="_new">Archivo</a> 