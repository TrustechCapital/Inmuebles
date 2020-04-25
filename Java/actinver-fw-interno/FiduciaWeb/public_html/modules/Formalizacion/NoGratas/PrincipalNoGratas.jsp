<FORM name="frmDatosFideicomitentesConsulta" id="frmDatosFideicomitentesConsulta" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
      <tr>
        <td height="100%">&nbsp;</td>
      </tr>
      <tr>
        <td align="center" height="100%" class="titulo">Personas No Gratas</td>
      </tr>
      <tr>
        <td height="100%">&nbsp;</td>
      </tr>
      <tr>
        <td height="100%">
          <table width="90%" align="center" class="texto">
            <tr valign="middle">
              <td width="30%">&nbsp;</td>
              <td width="16%" nowrap>N&uacute;mero</td>
              <td width="216">
                <input type="text" name="paramSecuencial" id="paramSecuencial" tipo="Num" size="10" maxlength="10"/> <!--onblur="mostrarDatosInformativos(1);"-->
              </td>
              <td width="217">&nbsp;<!--<input type="text" name="txtNomProspecto" id="txtNomProspecto" tipo="AlphaNumeric" size="40">-->
              </td>
              <td width="10%">&nbsp;</td>
            </tr>
            <tr valign="middle">
              <td width="30%">&nbsp;</td>
              <td width="16%" nowrap>Nombre</td>
              <td width="216">
                <input type="text" name="paramNomNG" id="paramNomNG" tipo="text" size="50"/>
              </td>
              <td width="217">&nbsp;</td>
              <td width="10%">&nbsp;</td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">
              <table width="224" cellpadding="0" cellspacing="0">
                <tr>
                <td width="112"  align="center" valign="middle">
                  <input type="BUTTON" id="Aceptar" name="CmdAceptar" value="Aceptar" class="boton_left" onmouseover="this.className='boton_leftSobre'" onmouseout="this.className='boton_left';" ref="muestraNoGratos" fun="loadTableElement" tabla="tablaRegistrosFideicomitentes" onclick="consultar(this, GI('frmDatosFideicomitentesConsulta'), false);"/>
                  </td>
                  <td width="112" align="center" valign="middle">
                  <input type="BUTTON" value="Limpiar" name="CmdLimpiar" class="boton_right" onmouseover="this.className='boton_rightSobre'" onmouseout="this.className='boton_right';" onclick="RF(GI('frmDatosFideicomitentesConsulta'));"/>
                </td>
                </tr>
              </table>
                
                
              </td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">&nbsp;</td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">
              <table cellpadding="0" cellspacing="0">
                <tr>                  
                   <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="  Alta   " id="cmdAlta" name="cmdAlta" onmouseover="this.className='boton_leftSobre'" onmouseout="this.className='boton_left';" class="boton_left" onclick="cargaMantenimientoFideicomitentes(1)"/> </td>
                   <!-- <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="Modificar" id="cmdModificar" name="cmdModificar" onmouseover="this.className='boton_middleSobre'" onmouseout="this.className='boton_middle';" class="boton_middle" onclick="cargaMantenimientoFideicomitentes(2)"/> </td> -->
                   <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="  Baja   " id="cmdBaja" name="cmdBaja" onmouseover="this.className='boton_middleSobre'" onmouseout="this.className='boton_middle'" class="boton_middle" onclick="eliminarRegistro();"/> </td>
                   <!-- <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="Consultar" id="cmdConsultar" name="cmdConsultar" onmouseover="this.className='boton_middleSobre'" onmouseout="this.className='boton_middle';" class="boton_middle" onclick="cargaMantenimientoFideicomitentes(3)"/> </td> -->                  
                  </td>
                </tr>
              </table>   
               
              </td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">&nbsp;</td>
            </tr>
            <tr align="center">
              <td colspan="5">
                <table cellspacing="0" cellpadding="0" border="0" class="texto">
                  <tr class="cabeceras">
                    <td width="23" align="center">&nbsp;</td>
                    <td width="60">No.</td>
                    <td width="200">Nombre</td>
                  </tr>
                </table>
                <div style="height:250px; overflow:auto; position:relative; vertical-align:top; width:100%;">
                  <table id="tablaRegistrosFideicomitentes" border="0" cellspacing="0" cellpadding="0" dataInfo="tablaFideicomitentesData" keys="pngNumSec" fun="clickTabla" radioWidth="23" NoRecordsMsg="No existen Registros para estos criterios de b&uacute;squeda">
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  </table>
</FORM>