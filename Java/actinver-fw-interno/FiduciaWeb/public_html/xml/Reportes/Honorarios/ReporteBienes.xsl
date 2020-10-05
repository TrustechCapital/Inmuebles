<?xml version='1.0' encoding='utf-8'?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0"
                xmlns:fo="http://www.w3.org/XSL/Format/1.0">
    <xsl:template match="/">
    <fo:root xmlns:fo="http://www.w3.org/1999/XSL/Format" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <fo:layout-master-set>
                <fo:simple-page-master master-name="hojaCartaVertical" page-width="216mm" page-height="279mm"
                                       margin-top="10mm" margin-bottom="1cm" margin-left="2cm" margin-right="2cm">
                    <fo:region-body region-name="xsl-region-body" margin-top="20mm"/>
                    <fo:region-before extent="50mm" region-name="xsl-region-header"/>
                    <fo:region-after extent="62mm" region-name="xsl-region-footer"/>
                </fo:simple-page-master>
                <fo:simple-page-master master-name="hojaCartaHorizontal" page-width="279mm" page-height="216mm"
                                       margin-top="10mm" margin-bottom="5mm" margin-left="1cm" margin-right="1cm">
                    <fo:region-body region-name="xsl-region-body" margin-top="42mm" margin-bottom="15mm"/>
                    <fo:region-before extent="50mm" region-name="xsl-region-header"/>
                    <fo:region-after extent="10mm" region-name="xsl-region-footer"/>
                </fo:simple-page-master>
            </fo:layout-master-set>
            <fo:page-sequence master-reference="hojaCartaHorizontal">
                <fo:static-content flow-name="xsl-region-header">
                    <!-- Header Inicio -->
                    <fo:block border="0.5mm solid black" border-bottom="0.5mm solid black"
                                border-left="0.5mm solid black" border-right="0.5mm solid black">
                        <fo:table background-color="rgb(188,200,192)">
                            <!--259 -->
                            <fo:table-column column-width="20mm"/>
                            <fo:table-column column-width="70mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="20mm"/>
                            <fo:table-column column-width="20mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-body>
                                <fo:table-row>
                                    <fo:table-cell text-align="center" number-columns-spanned="10">
                                        <fo:block font-size="7px" font-weight="bold"
                                                    background-color="rgb(188,200,192)">Reporte de Bienes</fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                                <fo:table-row>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">No. Fideicomiso</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Nombre Fideicomiso</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Descripcion del Inmueble</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Tipo de Bien</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Valor del Inmueble</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Fecha de Aportacion</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">No. Catastro</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Aportante</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Estado</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Municipio</fo:block>
                                    </fo:table-cell>
                                    <fo:table-cell text-align="center">
                                        <fo:block font-size="7px">Estatus</fo:block>
                                    </fo:table-cell>
                                </fo:table-row>
                            </fo:table-body>
                        </fo:table>
                    </fo:block>
                    <!-- Header Fin -->
                </fo:static-content>
                <fo:flow flow-name="xsl-region-body">
                    <!-- Contenido Inicio -->
                    <fo:block>
                        <fo:table>
                            <fo:table-column column-width="20mm"/>
                            <fo:table-column column-width="70mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="20mm"/>
                            <fo:table-column column-width="20mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-column column-width="22mm"/>
                            <fo:table-body>
                                <xsl:for-each select="ReportInfo/QueryInfo/RowInfo">
                                    <fo:table-row>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="funiIdFideicomiso"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="left">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="ctoNomContrato"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="center">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="forsTextoDescrip"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="center">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="descripcionClaveTipoBien"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="format-number(number(funiUltimoAvaluo),'#,##0.00')"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="funiFechaUltimoAvaluo"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="funiNumeroCatastro"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="funiNombreAdquiriente"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="funiNumEstado"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="funiNomPoblacion"/>
                                            </fo:block>
                                        </fo:table-cell>
                                        <fo:table-cell text-align="right">
                                            <fo:block font-size="7px">
                                                <xsl:value-of select="funiStatus"/>
                                            </fo:block>
                                        </fo:table-cell>
                                    </fo:table-row>
                  
                                </xsl:for-each>
                            </fo:table-body>
                        </fo:table>
                    </fo:block>
                    <!-- Contenido Fin -->
                </fo:flow>
            </fo:page-sequence>
        </fo:root>
  </xsl:template>
</xsl:stylesheet>
