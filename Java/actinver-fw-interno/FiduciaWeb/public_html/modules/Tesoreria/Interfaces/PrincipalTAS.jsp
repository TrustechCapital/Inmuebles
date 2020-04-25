<form name="frmDatos" id="frmDatos" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
    <tr>
      <td rowspan="7" width="10%" height="100%">
        &nbsp; 
        <input type="hidden" id="paramInterfaceID" name="paramInterfaceID" value=""/>
         
        <input type="hidden" id="paramFechaAnt" name="paramFechaAnt" value=""/>
         
        <input type="hidden" id="paramMesAbierto" name="paramMesAbierto" value="1"/>
         
        <input type="hidden" id="paramUsuario" name="paramUsuario" value="603"/>
      </td>
      <td height="100%">&nbsp;</td>
      <td rowspan="7" width="10%" height="100%">&nbsp;</td>
    </tr>
     
    <tr>
      <td align="center" height="100%" class="titulo">Interfase Movimientos CB Y BANCO / REPORTOS</td>
    </tr>
     
    <tr>
      <td height="100%">&nbsp;</td>
    </tr>
     
    <tr>
      <td height="100%">
        <table class="texto">
          <tr>
            <td>&nbsp;</td>
            <td nowrap="nowrap" colspan="5">&nbsp;</td>
            <td>&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
     
    <tr>
      <td width="80%">
        Fecha: &nbsp;<input type="text" id="paramFecha" name="paramFecha" tipo="Fecha" onblur="descomponeFecha(this)" required="required" style="width:100px;"/>
      </td>
    </tr>
     
    <tr>
      <td width="80%">Interfase a Ejecutar:
        <select id="slcReportes" name="slcReportes" border="0" onchange="cambiaInterface(this.value)" required="required"
                style="width:100px;">
          <option value="-1">
            -- Seleccione --
          </option>
          <option value="1">
            CB Y BANCO
          </option>
          <option value="9">
            REPORTOS
          </option>
          <option value="10">
            BIENES
          </option>
        </select>
      </td>
    </tr>
     
    <tr>
      <td width="80%">Tipo de Archivo<br/>
        <input type="radio" id="tipoXLS" name="tipoArch" value="XLS" checked="true"/>Excel 
        <input type="radio" name="tipoArch" value="TXT"/>Texto
      </td>
    </tr>
     
    <tr valign="middle">
      <td colspan="4" align="center" class="subtitulo" width="30%">
        <a id="ligaArchivo" href="#" style="visibility:hidden">Archivo</a>
      </td>
     
    <tr>
      <td width="10%">&nbsp;</td>
      <td width="80%">
        <iframe id="frameUpload" name="frameUpload" align="center" style="z-index:1;visibility:visible;" src="<%=request.getContextPath()%>/modules/Honorarios/\CargaProvisiones/InformacionMasivaSATUpload.do" frameborder="0" scrolling="no" width="600" height="50" allowtransparency="AllowTransparency"></iframe><!--iframe id="frameUpload" name="frameUpload" align="center" style="z-index:1;" src="<%=request.getContextPath()%>/modules/Tesoreria/Interfaces/TasUpload.do" frameborder="0" scrolling="no" width="600" height="50" AllowTransparency></iframe-->
        <div id="dvInterface" class="texto"></div>
      </td>
    </tr>
     
    <tr>
      <td width="80%" colspan="5">
        <input type="button" value="Recuperar" name="cmdCargar" class="boton" onclick="subirArchivo();"/> <!--Subir Archivo-->
         
        <input type="button" value="Validar" id="cmdValidar" name="cmdValidar"  class="boton" onclick="validaTAS();"/>
         
        <input type="button" value="Transferir" id="cmdTransferir" name="cmdTransferir"  class="boton" onclick="transfiereTas();" disabled/>
         
        <input type="button" value="Procesar" name="cmdAplicar" class="boton" onclick="ejecutaResultadoTransferencia();" disabled/><!--style="visibility:hidden"/>--><!--Aplicar-->
        
        <input type="button" value="Cif. Ctrl. Proc." name="cmdGenerar" id="cmdGenerar" class="boton" onclick="generar();" disabled/><!--style="visibility:hidden"/>--><!--Aplicar-->
      </td>
    </tr>
     <tr>
      <td width="80%" colspan="5">
        <input type="button" value="Procesar otro archivo" name="cmdNuevo" id="cmdNuevo" class="boton" onclick="onButtonClickPestania("Tesoreria.Interfaces.PrincipalTAS","");" style="visibility:hidden"/> <!--Subir Archivo-->         
        </td>
    </tr>
  </table>
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
  <tr>
    <td colspan="4">
      <hr/>
    </td>
  </tr>
  <tr>
    <td colspan="4">
      <h4>Cifras de Control</h4>
    </td>
  </tr>
  <tr>
     <tr valign="middle">
              <td nowrap width="9%">N&uacute;m. de Operaciones</td>
              <td width="8%">
                <input type="text" name="fttSeq" id="fttSeq" tipo="Num" size="10" maxlength="10" disabled/> <!---->
              </td>
              <td nowrap width="9%">Importe Total de Operaciones</td>
              <td width="8%">
                <input type="text" name="fttImp" id="fttImp"  size="20" maxlength="20" disabled/> <!---->
              </td>
            </tr>
  </tr>
  <tr>
    <td colspan="4">
      <hr/>
    </td>
  </tr>
  <tr>
    <td colspan="4">
    <br/>
      <h4>Registros de Archivo</h4>
    </td>
  </tr>
  <tr>
     <tr valign="middle">
              <td nowrap width="9%">Transferidos</td>
              <td width="8%">
                <input type="text" name="transf" id="transf" tipo="Num" size="10" maxlength="10" disabled style="text-align:right;"/> <!---->
              </td>
              <td nowrap width="9%">Importe Transferidos</td>
              <td width="8%">
                <input type="text" name="imptransf" id="imptransf"  size="20" maxlength="20" disabled style="text-align:right;"/> <!---->
              </td>
    </tr>
    <tr valign="middle">
              <td nowrap width="9%">Reg. Erroneos</td>
              <td width="8%">
                <input type="text" name="regerr" id="regerr" tipo="Num" size="10" maxlength="10" disabled style="text-align:right;"/> <!---->
              </td>
              <td nowrap width="9%">Importe Errores</td>
              <td width="8%">
                <input type="text" name="imperr" id="imperr" size="20" maxlength="20" disabled style="text-align:right;"/> <!---->
              </td>
    </tr>
    <tr valign="middle">
              <td nowrap width="9%">Regs. No Aplican </td>
              <td width="8%">
                <input type="text" name="regna" id="regna" tipo="Num" size="10" maxlength="10" disabled style="text-align:right;"/> <!---->
              </td>
              <td nowrap width="9%">Importe No Aplica</td>
              <td width="8%">
                <input type="text" name="impna" id="impna" size="20" maxlength="20" disabled style="text-align:right;"/> <!---->
              </td>
    </tr>
    <tr valign="middle">
              <td nowrap width="9%">Reg. Procesados</td>
              <td width="8%">
                <input type="text" name="regproc" id="regproc" tipo="Num" size="10" maxlength="10" disabled style="text-align:right;"/> <!---->
              </td>
              <td nowrap width="9%">Importe Procesados</td>
              <td width="8%">
                <input type="text" name="impproc" id="impproc"  size="20" maxlength="20" disabled style="text-align:right;"/> <!---->
              </td>
    </tr>
    <tr valign="middle">
              <td nowrap width="9%" >N&uacute;m Operaciones</td>
              <td width="8%">
                <input type="text" name="numoperf" id="numoperf" size="10" maxlength="10" disabled style="text-align:right;"/> <!---->
              </td>
              <td nowrap width="9%">Importe Total</td>
              <td width="8%">
                <input type="text" name="imptotl" id="imptotl" size="20" maxlength="20" disabled style="text-align:right;"/> <!---->
              </td>
    </tr>
  </tr>
  </table>
</form>