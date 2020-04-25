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
        <table width="90%" align="center" class="texto">
            <tr>
            <td width="12%">&nbsp;</td>
            <td nowrap width="15%">Num Proyecto</td>
            <td>
              <input type="text" name="paramnumProyec" id="paramnumProyec" size="10" maxlength="10"/>
            </td>
            <td width="10%">&nbsp;</td>
          </tr>
          <tr>
            <td width="12%">&nbsp;</td>
            <td nowrap width="15%">Num Persona</td>
            <td>
              <input type="text" name="paramnumPersona" id="paramnumPersona" size="10" maxlength="10"/>
            </td>
            <td width="10%">&nbsp;</td>
          </tr>
          <tr>
              <td width="25%">&nbsp;</td>
              <td width="10%" nowrap>Tipo Persona</td>
              <td>
                <input type="text" name="paramTipoPer" id="paramTipoPer" size="50" maxlength="50" /><!--style="visibility:hidden"-->
                <!--<select id="paramTipoPer" name="paramTipoPer" ref="claves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" next="formsLoaded()" param="clavesCombo23" style="visibility:hidden"/>-->
              </td>
              <td width="10%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              
              <td>
                <input type="text" name="pantORIG" id="pantORIG" size="10" maxlength="10" style="visibility:hidden"/>
              </td>
              <td width="10%">&nbsp;</td>
            </tr>
          
          <tr>
            <td colspan="8" align="center">&nbsp;
            <input type="BUTTON" value="Regresar" id="cmdRegresar" name="cmdRegresar" class="boton" ref="qryDoctoxVigencia" fun="loadTableElement" tabla="tblReg" onclick="regresar();"/></td> <!--ref="conPriDirFid"-->            
          </tr>
          <tr>
            <td align="center" colspan="8">
              <input type="BUTTON" value="  Alta   " id="cmdAlta" name="cmdAlta" class="boton" onclick="cargaMantenimientoCuentas(1);"/>
              <input type="BUTTON" value="  Baja   " id="cmdBaja" name="cmdBaja" class="boton" onclick="cargaMantenimientoCuentas(3);"/>
            </td>
          </tr>
          <tr>
            <td colspan="8">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="8" align="center">
              <table cellspacing="0" cellpadding="0" border="0" class="texto">
                <tr class="cabeceras">
                  <td width="25" nowrap>&nbsp;</td>
                  <td width="60" nowrap>Seq</td>
                  <td width="60" nowrap>ID Doc</td>
                  <td width="60" nowrap>ID Doc Hijo</td>
                  <td width="300" nowrap>Nombre</td>
                  <td width="150" nowrap>Fecha Renov</td>
                </tr>
              </table>
              <div style="height:150px; overflow:auto; position:relative; vertical-align:top;">
                <table id="tblReg" border="0" cellspacing="0" cellpadding="0" dataInfo="arrTblDatProsp" keys="fdocNumVigSeq" fun="clickTablaProsp" radioWidth="23" NoRecordsMsg="No existen Registros para estos criterios de busqueda">
                </table>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</FORM>
