
  <FORM name="frmDatos" id="frmDatos" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
      <tr>
        <td rowspan="7" width="10%" height="100%">&nbsp;</td>
        <td height="100%">&nbsp;</td>
        <td rowspan="7" width="10%" height="100%">&nbsp;</td>
      </tr>
      <tr>
        <td align="center" height="100%" class="titulo">Carga Masiva</td>
      </tr>
      <tr>
        <td height="100%">&nbsp;</td>
      </tr>
      <tr>
        <td height="100%">
          <table class="texto">
            <tr>
              <td>&nbsp;</td>
              <td nowrap colspan="5">&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </tr>            
            <tr>
              <td width="10%">&nbsp;</td>
              <td width="80%">
                <input type="text" name="txtFechaValor" id="txtFechaValor" size="10" ref="conFecCon" fun="loadTxtElementX" theValue="fecha" next="cmbTipoLiq" maxlength="10" tipo="Fecha" required message="La Fecha Valor es un campo obligatorio" style="width:150px;"/>
              </td> 
              
            </tr>
            
          <tr valign="middle">
            <td colspan="4" align="center" class="subtitulo" width="30%">
              <a id="ligaArchivo" href="#" style="visibility:hidden">Archivo</a>
            </td>
          </tr>
          <tr>
            <td colspan="4" align="center" class="subtitulo" width="30%">Carga</td>
          </tr>
          <tr  valign="middle">
            <td width="20%">&nbsp;</td>
            <td width="20%" align="left"><input type="checkbox" name="chkProvisiones" id="chkProvisiones" class="check" onclick="funGenPagos(0);"/>&nbsp;<label for="chkProvisiones">Provisiones</label></td>
            <td width="20%" align="right"><input type="checkbox" name="chkCondonacion" id="chkCondonacion" class="check" onclick="funGenPagos(0);"/>&nbsp;<label for="chkCondonacion">Condonacion</label></td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%" align="left"><input type="checkbox" name="chkCobros" id="chkCobros" class="check" onclick="funGenPagos(0);"/>&nbsp;<label for="chkCobros">Cobros</label></td>
            <td width="20%" align="right"><input type="checkbox" name="chkQuebrantos" id="chkQuebrantos" class="check" onclick="funGenPagos(0);"/>&nbsp;<label for="chkQuebrantos">Quebrantos</label></td>
          </tr>
          <tr>
            <td colspan="4" align="center" class="subtitulo" width="30%">Generaci&oacute;n</td>
          </tr>
          <tr  valign="middle">
            <td width="20%">&nbsp;</td>
            <td width="20%" align="left"><input type="checkbox" name="chkPagos" id="chkPagos" class="check" onclick="funGenPagos(1);"/>&nbsp;<label for="chkPagos">Pagos</label></td>
            <td width="20%" align="right"><input type="checkbox" name="chkCartera" id="chkCartera" class="check" onclick="funGenPagos(2);"/>&nbsp;<label for="chkCartera">Cartera</label></td>
            
          </tr>
          <tr  valign="middle">
            <td width="20%">&nbsp;</td>
            <td width="20%" align="left"><input type="checkbox" name="chkParHon" id="chkParHon" class="check" onclick="funGenPagos(2);"/>&nbsp;<label for="chkParHon">Parametros Honorarios</label></td>
            <td width="20%" align="right"><input type="checkbox" name="chkDomFisc" id="chkDomFisc" class="check" onclick="funGenPagos(2);"/>&nbsp;<label for="chkDomFisc">Domicilio Fiscal</label></td>
            
          </tr>
          
          <tr  valign="middle">
          <td width="20%">&nbsp;</td>
             <td width="44%" align="center">Datos de Archivo a Generar</td>
             <tr  valign="middle"><td width="20%">&nbsp;</td></tr>
             <tr  valign="middle">
                <td width="20%">&nbsp;</td>
                <td width="44%" align="center">Nombre de Archivo a Generar:<input type="text" name="txtNomArchGP" id="txtNomArchGP" size="30"  maxlength="40" disabled="true"/></td>
             </tr>
             <tr  valign="middle">
                <td width="30%" align="center"><input type="checkbox" name="chkBolsa" id="chkBolsa" class="check"/>&nbsp;<label name="chkBolsalbl" id="chkBolsalbl" for="chkBolsa" disabled="true">Casa de Bolsa</label></td>
                <td width="30%" align="center"><input type="checkbox" name="chkBanco" id="chkBanco" class="check"/>&nbsp;<label name="chkBancolbl" id="chkBancolbl" for="chkBanco" disabled="true">Banco Actinver</label></td>
                <td width="30%" align="center"><input type="checkbox" name="chkTodos" id="chkTodos" class="check"/>&nbsp;<label name="chkTodoslbl" id="chkTodoslbl" for="chkTodos" disabled="true">Todas las Provisiones</label></td>
             </tr>
          </tr>
          <tr  valign="middle"><td width="20%">&nbsp;</td></tr>
            <tr>
              <td width="10%">&nbsp;</td>
              <td width="80%">
                    
                <iframe id="frameUpload" name="frameUpload" align="center" style="z-index:1;visibility:visible;" src="<%=request.getContextPath()%>/modules/Honorarios/\CargaProvisiones/InformacionMasivaSATUpload.do" frameborder="0" scrolling="no" width="600" height="50" AllowTransparency></iframe>
                <div id="dvInterface" class="texto"></div>

              </td> 
              
            </tr>
            
            <tr>
              <td width="10%">&nbsp;</td>
              <td width="80%" colspan="5">
                
                  <input type="button" value="Subir Archivo " name="cmdCargar" class="boton" onclick="subirArchivo();" >
                  <input type="button" value="Aplicar" name="cmdAplicar" class="boton" onclick="funAplicaComprasVentas();" ><!--style="visibility:hidden"/>-->
                  <input type="button" value="Cancelar" name="cmdCancelar" class="boton_x" onclick="resetPantallaCarga()" ><!--style="visibility:hidden"/>-->
                     
              </td>     
            </tr>  
           
          </table>
        </td>
      </tr>
    
  </table>
</FORM>
