<FORM name="frmDatos" id="frmDatos" onsubmit="">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto;">
      <tr>
        <td align="center" height="100%" class="titulo">Fideicomitentes</td>
      </tr>
      <tr>
        <td height="100%">&nbsp;</td>
      </tr>
      <tr>
        <td height="100%">
          <table width="90%" align="center" class="texto">
            <tr valign="middle">
              <td width="25%">&nbsp;</td>
              <td nowrap width="7%">Fideicomiso</td>
              <td>
                <input type="text" name="paramNumFiso" id="paramNumFiso" tipo="Num" size="10" maxlength="10" onblur="verificacionActivo();"/>
              </td>
              <td>
                <div id="nomFideicomiso" class="textoNegrita" ref="conNomFid" fun="asignaValor2DivFideicomiso" param="divNombreFideicomisoParam">&nbsp;</div>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr valign="middle">
              <td width="25%">&nbsp;</td>
              <td nowrap width="7%">No. Fideicomitente</td>
              <td>
                <input type="text" name="paramNumFideicomitente" id="paramNumFideicomitente" tipo="Num" size="10" maxlength="10"/>
              </td>
              <td>&nbsp;</td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td nowrap width="7%">Nombre</td>
              <td colspan="2">
                <input type="text" name="paramRazonSocial" id="paramRazonSocial" size="50" maxlength="50" onblur="this.value=this.value.toUpperCase()"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="25%">&nbsp;</td>
              <td nowrap width="7%">Status</td>
              <td colspan="2">
                <select size="1" name="paramStatus" id="paramStatus" ref="claves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" next="formsLoaded" param="clavesCombo31"/>
              </td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">&nbsp;</td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">
              <table width="224" cellpadding="0" cellspacing="0">
                <tr>
                <td width="112"  align="center" valign="middle">
                  <input type="BUTTON" value="Aceptar" id="cmdAceptar" name="cmdAceptar" class="boton_left" onmouseover="this.className='boton_leftSobre'" onmouseout="this.className='boton_left';" ref="muestraDatosFideicomitentesAdministracion" fun="loadTableElement" tabla="tablaRegistrosFideicomitentes" onclick="consultar(this, GI('frmDatos'), false);">
                  </td>
                  <td width="112" align="center" valign="middle">
                  <input type="BUTTON" value="Limpiar" id="cmdLimpiar" name="cmdLimpiar" class="boton_right" onmouseover="this.className='boton_rightSobre'" onmouseout="this.className='boton_right';" onclick="limpiar(frmDatos);"/>
                </td>
                </tr>
            </table> 
                
                
              </td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">
                <input type="text" name="paramorder" id="paramorder" size="2" value="s" style="visibility:hidden"/>
              </td>
            </tr>
            <tr>
              <td width="100%" colspan="5" align="center" valign="middle">
              <table cellpadding="0" cellspacing="0">
                <tr>                  
                   <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="  Alta   " id="cmdAlta" name="cmdAlta" onmouseover="this.className='boton_leftSobre'" onmouseout="this.className='boton_left';" class="boton_left" onclick="cargaMantenimientoFideicomitentes(1)"/> </td>
                   <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="Modificar" id="cmdModificar" name="cmdModificar" onmouseover="this.className='boton_middleSobre'" onmouseout="this.className='boton_middle';" class="boton_middle" onclick="cargaMantenimientoFideicomitentes(2)"/> </td>
                   <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="  Baja   " id="cmdBaja" name="cmdBaja" onmouseover="this.className='boton_middleSobre'" onmouseout="this.className='boton_middle'" class="boton_middle" onclick="eliminarRegistro();"/> </td>
                   <td width="112"  align="center" valign="middle"> <input type="BUTTON" value="Consultar" id="cmdConsultar" name="cmdConsultar" onmouseover="this.className='boton_rightSobre'" onmouseout="this.className='boton_right';" class="boton_right" onclick="cargaMantenimientoFideicomitentes(3)"/> </td>                   
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
                  <tr align="left" class="cabeceras">
                    <td width="23px" align="center" nowrap>&nbsp;</td>
                    <td width="100px" nowrap>No. Fideicomiso</td>
                    <td width="300px" nowrap>Fideicomitente</td>
                    <td width="90px" nowrap>Status</td>
                  </tr>
                </table>
                <div style="height:150px; overflow:auto; position:relative; vertical-align:top; width:550px;">
                  <table id="tablaRegistrosFideicomitentes" border="0" cellspacing="0" cellpadding="0" dataInfo="tablaFideicomitentesData" keys="fidNumContrato,fidFideicomitente" fun="clickTabla" radioWidth="23" NoRecordsMsg="No existen Registros para estos criterios de b&uacute;squeda">
                  </table>
                </div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
  </table>
</FORM>
