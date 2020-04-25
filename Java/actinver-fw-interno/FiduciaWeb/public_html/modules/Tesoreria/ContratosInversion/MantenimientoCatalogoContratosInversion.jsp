<form name="frmMantenimientoContratosInversion" id="frmMantenimientoContratosInversion">
  <table cellspacing="1" cellpadding="1" border="0" width="100%" align="center" style="height:auto; ">
    <tr>
      <td align="center" height="100%" class="titulo">Mantenimiento a Cat&aacute;logo de Contratos de Inversi&oacute;n</td>
    </tr>
    <tr>
      <td height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%">
        <table width="90%" align="center" class="texto" border="0">
          <tr valign="middle">
            <td width="20%">&nbsp;</td>
            <td width="20%">No. Fideicomiso</td>
            <td>
              <input type="text" name="cprNumContrato" id="cprNumContrato" size="10" maxlength="10" tipo="Num" required message="El Fideicomiso es un campo obligatorio" onblur="consultaNombreFideicomiso('nomFideicomiso',this);" onchange="CargaComboCuentas();"/>
            </td>
            <td>
              <div id="nomFideicomiso" class="textoNegrita" ref="conNomFid" fun="asignaValor2DivFideicomiso" param="divNombreFideicomisoParam">&nbsp;</div>
            </td>
            <td>&nbsp;</td>
          </tr>

          <tr valign="middle">
            <td width="20%">&nbsp;</td>
            <td width="20%">No. Sub Cuenta</td>
            <td>
              <select size="1" name="cprSubContrato" id="cprSubContrato" ref="conPriSubCuentas" fun="loadComboElement" keyValue="fsctIdSubCuenta" param="Fideicomiso" theValue="fsctNombreSubCuenta" next="cprCveAreaInst"/>            
            </td>
            <td>
            &nbsp;
            </td>
            <td>&nbsp;</td>
          </tr>
          
          <tr  valign="middle">
              <td width="10%">&nbsp;</td>
              <td nowrap width="20%">&Aacute;rea de la Instituci&oacute;n</td>
              <td colspan="4">
                <select size="1" name="cprCveAreaInst" id="cprCveAreaInsts" ref="claves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" next="cprEntidadFin" param="clavesCombo1003" required message="El Área de la Institución es un dato obligatorio"/>
              </td>
              <td width="10%">&nbsp;</td>
            </tr>

          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Intermediario</td>
            <td colspan="2">
              <select size="1" name="cprEntidadFin" id="cprEntidadFin" ref="conNumIntNomInt" fun="loadComboElement" keyValue="intEntidadFin" theValue="intIntermediario" next="cprCveFormaMan" required message="El Intermediario es un campo obligatorio" onchange="cprNomIntermed.value = this.options[this.selectedIndex].text;"/>
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td nowrap width="20%">&nbsp;</td>
            <td nowrap width="20%">Contrato de Inversi&oacute;n</td>
            <td>
              <input type="text" name="cprContratoInter" id="cprContratoInter" size="10" maxlength="10" tipo="Num" required message="El Contrato de Inversion es un campo obligatorio" onblur="getDatosCU(this)" />
            </td>
            <td width="37%">&nbsp;</td>
            <td width="37%">&nbsp;</td>
          </tr>
          
          <!-- 01/Dic/2018 EAC-->
          <tr>
            <td nowrap width="20%">&nbsp;</td>
            <td nowrap width="20%">Cliente unico</td>
            <td>
              <input type="hidden" name="cprClienteUnico" id="cprClienteUnico" />
              <div id="cprClienteUnicoDV">N/D</div>
            </td>
            <td width="37%">&nbsp;</td>
            <td width="37%">&nbsp;</td>
          </tr>
          <!-- 01/Dic/2018 EAC-->
          
          <tr>
            <td width="20%">&nbsp;
            </td>
            <td colspan="3">
              <hr/>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Forma Manejo</td>
            <td>
              <select size="1" name="cprCveFormaMan" id="cprCveFormaMan" ref="cves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" param="cmbFormaManejoParam" next="cprCveOrigRec"/>
            </td>
            <td>
              <input type="text" name="cprNomIntermed" id="cprNomIntermed" size="5" style="visibility:hidden"/>
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Origen de Recursos</td>
            <td>
              <select size="1" name="cprCveOrigRec" id="cprCveOrigRec" ref="cves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" param="cmbOrigenRecursosParam" next="cprNumPais"/>
            </td>
            <td>
              <input type="checkbox" name="cprCveIsrExenChk" id="cprCveIsrExenChk" tv="1" fv="0" class="check"/>&nbsp;No Retener ISR
            </td>
            <td>&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Moneda</td>
            <td width="11%">
              <select name="cprNumPais" id="cprNumPais" ref="conNumMonNomMon" fun="loadComboElement" keyValue="monNumPais" theValue="monNomMoneda" next="cprNumCuenta" required message="La Moneda es un campo obligatorio"/>
            </td>
            <td width="37%">
              <input type="text" name="cprNumBanco" id="cprNumBanco" style="visibility:hidden;"/>
              <input type="text" name="cprNumSucursal" id="cprNumSucursal" style="visibility:hidden;"/>
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Cuenta Bancaria</td>
            <td width="11%">
              <select name="cprNumCuenta" id="cprNumCuenta" ref="muestraCuentaBancaria" fun="loadComboElement" keyValue="fcbaClabeCba" theValue="fcbaClabeCba"  param="fideo" next="cprNumTelef1"  onchange="muestraClave();" />
            </td>
            <td width="37%">&nbsp;</td>
            <td width="37%">&nbsp;</td>
          </tr>
          
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Tipo Persona Asociada</td>
            <td width="11%">
                <select id="cprNumTelef1" name="cprNumTelef1" ref="claves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" next="cprCveStContint" param="clavesCombo29" required message="El Tipo de Persona es un campo obligatorio"/>
            </td>
            <td width="37%">&nbsp;</td>
            <td width="37%">&nbsp;</td>
          </tr>          
          
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Status</td>
            <td width="11%">
              <select id="cprCveStContint" name="cprCveStContint" ref="cves" fun="loadComboElement" keyValue="cveDescClave" theValue="cveDescClave" param="cmbStatusParam" next="asignaValues2ObjHTML" required message="El Status es un campo obligatorio"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <!--Marzo 2020-->
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">RFC del Fideicomiso</td>
            <td width="11%">
              <input type="checkbox"  name="cprRfcClienteChk" id="cprRfcClienteChk" class="check" tv="1" fv="0"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Inversi&oacute;n</td>
            <td width="11%">
              <input type="checkbox"  name="cprInversionChk" id="cprInversionChk" class="check" tv="1" fv="0"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">intermediaci&oacute;n</td>
            <td width="11%">
              <input type="checkbox"  name="cprIntermediacionChk" id="cprIntermediacionChk" class="check" tv="1" fv="0"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
              <td align="center" width="25%">&nbsp;
              </td>
              <td nowrap colspan="3">Terceros Autorizados &nbsp;
              <textarea name="cprTercerosAut" id="cprTercerosAut" style="width:800px;height:200px"></textarea></td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
              <td align="center" width="25%">&nbsp;
              </td>
              <td nowrap colspan="3">Especif. firmas externas y por despachos
              <textarea name="cprEspcFirm" id="cprEspcFirm" style="width:800px;height:200px" ></textarea></td>
              <td width="5%">&nbsp;</td>
            </tr>
            <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Medio de Acceso</td>
            <td width="11%">
              <input type="checkbox"  name="cprMedAcceChk" id="cprMedAcceChk" class="check" tv="1" fv="0"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Facultades de Consulta</td>
            <td width="11%">
              <input type="checkbox"  name="cprFacConsulChk" id="cprFacConsulChk" class="check" tv="1" fv="0"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Facultades de Operador</td>
            <td width="11%">
              <input type="checkbox"  name="cprFacOperChk" id="cprFacOperChk" class="check" tv="1" fv="0"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td width="20%">&nbsp;</td>
            <td width="20%">Facultades de Autorizador</td>
            <td width="11%">
              <input type="checkbox"  name="cprFacAutoriChk" id="cprFacAutoriChk" class="check" tv="1" fv="0"/>
            </td>
            <td width="37%">
            </td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td nowrap width="20%">&nbsp;</td>
            <td nowrap width="20%">Correo</td>
            <td>
              <input type="text" name="cprCorreo" id="cprCorreo" size="20" maxlength="255" />
            </td>
            <td width="37%">&nbsp;</td>
            <td width="37%">&nbsp;</td>
          </tr>
          <tr>
            <td nowrap width="20%">&nbsp;</td>
            <td nowrap width="20%">Telefono</td>
            <td>
              <input type="text" name="cprTel" id="cprTel" size="20" maxlength="50" />
            </td>
            <td width="37%">&nbsp;</td>
            <td width="37%">&nbsp;</td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td width="60%" height="100%">&nbsp;</td>
    </tr>
    <tr>
      <td height="100%" align="center">
        <input type="BUTTON" value="Aceptar" name="cmdAceptar" id="cmdAceptar" class="boton" onclick="ejecutaOperacionContratosInversion();" style="visibility:hidden"/>
        <input type="BUTTON" value="Cancelar" name="cmdCancelar" id="cmdCancelar" class="boton_x" onclick="onButtonClickPestania('Tesoreria.ContratosInversion.PrincipalCatalogoContratosInversion','');" style="visibility:hidden"/>
      </td>
    </tr>
  </table>
</form>
