<FORM name="frmDomicilioFiscalHonorariosMantenimiento" id="frmDomicilioFiscalHonorariosMantenimiento" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
      <tr>
        <td align="center" height="100%" class="titulo">
          <P>Mantenimiento a Domicilio Fiscal del Fideicomiso</P>
        </td>
      </tr>
      <tr>
        <td height="100%">&nbsp;</td>
      </tr>
      <tr>
        <td height="100%">
          <table width="90%" align="center" class="texto" border="0">
            <tr valign="middle">
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>No. Fideicomiso</td>
              <td>
                <input type="text" name="dfNumContrato" id="dfNumContrato" tipo="Num" size="10" maxlength="10" onblur="verificarAltaPk();" required message="El N&uacute;mero de Fideicomiso es un dato obligatorio"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Domicilio Fiscal</td>
              <td>
                <textarea name="dfDomicilio" id="dfDomicilio" style="width:400px;height:80px" required message="El Domicilio Fiscal es un campo obligatorio" onkeydown="validaLongitud(this,255);"></textarea>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>RFC</td>
              <td>
                <input type="text" name="dfRfc" id="dfRfc" size="15" required message="El RFC es un campo obligatorio" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Correo Electr&oacute;nico</td>
              <td>
                <input type="text" name="dfEmail" id="dfEmail" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Nombre</td>
              <td>
                <textarea name="dfNombre" id="dfNombre" style="width:400px;height:80px" required message="El Nombre es un campo obligatorio" onkeydown="validaLongitud(this,255);"></textarea>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>N&uacute;mero Exterior</td>
              <td>
                <input type="text" name="dfNumExt" id="dfNumExt" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>N&uacute;mero Interior</td>
              <td>
                <input type="text" name="dfNumInt" id="dfNumInt" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Colonia</td>
              <td>
                <input type="text" name="dfColonia" id="dfColonia" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Delegaci&oacute;n</td>
              <td>
                <input type="text" name="dfDelegacion" id="dfDelegacion" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Estado</td>
              <td>
                <input type="text" name="dfEstado" id="dfEstado" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>C&oacute;digo Postal</td>
              <td>
                <input type="text" name="dfCp" id="dfCp" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Contacto</td>
              <td>
                <input type="text" name="dfContacto" id="dfContacto" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td width="12%" nowrap>Porcentaje</td>
              <td>
                <input type="text" name="dfPorcentaje" id="dfPorcentaje" size="40" maxlength="255"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td width="60%" height="100%">&nbsp;</td>
      </tr>
      <tr>
        <td height="100%" align="center">
          <input type="BUTTON" value="  Aceptar  " name="cmdAceptar" class="boton" onclick="AltaOModificaInfo();" style="visibility:hidden"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="BUTTON" value="Cancelar" name="cmdCancelar" class="boton_x" onclick="cargaPrincipalDomicilioFiscalHonorarios();" style="visibility:hidden"/>
        </td>
      </tr>
  </table>
</FORM>
