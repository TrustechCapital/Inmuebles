<!DOCTYPE html>
<%@ page contentType="text/html;charset=iso-8859-1"
         import="mx.com.inscitech.actinver.ws.contract.test.ActinverServiceTest,
                mx.com.inscitech.actinver.ws.contract.*, mx.com.inscitech.fiduciaweb.services.GenericMessage, 
                mx.com.inscitech.fiduciaweb.services.*" %>
<%

    class HelperClass {
        private javax.servlet.ServletRequest rq = null;
        
        HelperClass(javax.servlet.ServletRequest rq) {
            this.rq = rq;
        }
        
        public String getValue(String name, String defaultValue) {
            return getValue(name, defaultValue, "");
        }
        
        public String getValue(String name, String defaultValue, String ifEmpty) {
            String value = rq.getParameter(name);
            if(value == null) {
                return defaultValue;
            } else if("".equals(value)) {
                return ifEmpty;
            } else {
                return value;
            }
        }
    }

    HelperClass h = new HelperClass(request);
    ServiceResponse svResp = null;
    GenericServiceResponse serviceData = null;
    
    if(!"".equals(h.getValue("makeCall", ""))) {
        ActinverServiceTest test = new ActinverServiceTest();
    
        test.setConfig(request);
        svResp = test.getClient(h.getValue("contractNumber", "7918857"), h.getValue("bankingArea", "999"));
        serviceData = svResp.getServiceData();
        
    }
%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1"/>
        <style>
            .field {
                padding-top: 10px;
                padding-bottom: 10px;
                padding-left: 10px;
            }
            .label { 
                width: 150px;
                padding-left: 10px;
                padding-right: 10px;
                display: inline-block;
            }
            .dvBoton {
                padding-left: 500px;
            }
        </style>        
    </head>
    <body>
    
        <form>
            <h1>Pruebas Cliente &Uacute;nico</h1>
            <br/><br/>
            <table>
                <tr>
                    <td>Contract Number</td>
                    <td><input type="text" name="contractNumber" size="100" value="<%=h.getValue("contractNumber", "7918857")%>" /></td>
                </tr>
                <tr>
                    <td>Banking Area</td>
                    <td><input type="text" name="bankingArea" size="100" value="<%=h.getValue("bankingArea", "999")%>" /></td>
                </tr>
                <tr>
                    <td colspan="2"><input type="submit" value="doTest" /></td>
                </tr>
            </table>

            <br/><hr/><h3>Configuración</h3>
            
            <input type="hidden" name="makeCall" value="doCall" />
            
            <div class="field"><div class="label">serviceURL:</div><input type="text" name="serviceURL" size="100" value="<%=h.getValue("serviceURL", "http://esb-qa.actinver.com.mx/ContractInfoWS")%>" /></div>
            <div class="field"><div class="label">namespaceURI:</div><input type="text" name="namespaceURI" size="100" value="<%=h.getValue("namespaceURI", "http://actinver.com.mx/ws/ContractInfoWS")%>" /></div>
            <div class="field"><div class="label">namespaceLocalPart:</div><input type="text" name="namespaceLocalPart" size="100" value="<%=h.getValue("namespaceLocalPart", "ContractInfoWS-service.serviceagent")%>" /></div>

            <div class="field"><div class="label">useCommonHeader:</div><input type="checkbox" name="useCommonHeader" value="false" /></div>
            <div class="field"><div class="label">useDateTime:</div><input type="checkbox" name="useDateTime" value="false" /></div>
            
            <div class="field"><div class="label">clientID:</div><input type="text" name="clientID" size="100" value="<%=h.getValue("clientID", "")%>" /></div>
            <div class="field"><div class="label">theIPAddress:</div><input type="text" name="theIPAddress" size="100" value="<%=h.getValue("theIPAddress", "127.0.0.1")%>" /></div>
            <div class="field"><div class="label">language:</div><input type="text" name="language" size="100" value="<%=h.getValue("language", "SPA")%>" /></div>
            <div class="field"><div class="label">operationName:</div><input type="text" name="operationName" size="100" value="<%=h.getValue("operationName", "ClientContractQuery")%>" /></div>
            <div class="field"><div class="label">operationVersion:</div><input type="text" name="operationVersion" size="100" value="<%=h.getValue("operationVersion", "1_0")%>" /></div>
            <div class="field"><div class="label">systemID:</div><input type="text" name="systemID" size="100" value="<%=h.getValue("systemID", "")%>" /></div>
            <div class="field"><div class="label">userName:</div><input type="text" name="userName" size="100" value="<%=h.getValue("userName", "")%>" /></div>
            
            <%if(svResp != null) {%>
            <br/><hr/><h3>Respuesta</h3>
                <div class="field"><div class="label">Result:</div><input type="text" name="result" size="100" value="<%=svResp.getResult()%>" /></div>
                <div class="field"><div class="label">Native Error Code:</div><input type="text" name="nativeErrorCode" size="100" value="<%=svResp.getNativeErrorCode()%>" /></div>
                <div class="field"><div class="label">Transaction ID:</div><input type="text" name="transactionID" size="100" value="<%=svResp.getTransactionID()%>" /></div>
                <div class="field"><div class="label">Client Number:</div><input type="text" name="clientNumber" size="100" value="<%=svResp.getClientNumber()%>" /></div>
                
                <%
                if(serviceData != null && serviceData.getMessages() != null && serviceData.getMessages().size() > 0) {
                %>
                <br/><hr/><h3>Mensajes</h3>
                <%
                    for(GenericMessage msg : serviceData.getMessages()) {
                        %>
                        <div class="field"><div class="label">Categoria: <%=msg.getCategory()%></div>
                        <div class="field"><div class="label">Código: <%=msg.getSystemCode()%></div>
                        <div class="field"><div class="label">Tipo: <%=msg.getType()%></div>
                        <div class="field"><div class="label">Mensaje: <%=msg.getMessage()%></div>
                        <br/>
                        <%
                    }
                %>
                    <%
                    if(svResp.getServiceData() != null && svResp.getServiceData().getErrorDetail() != null) {
                        mx.com.inscitech.fiduciaweb.services.ErrorData ed = svResp.getServiceData().getErrorDetail();
                    %>
                        <div class="field"><div class="label">Código Error: <%=ed.getErrorCode()%></div>
                        <div class="field"><div class="label">Mensaje: <%=ed.getMessage()%></div></div>
                        <div class="field"><div class="label">StackTrace:</div></div>
                        <pre><%=ed.getStackTrace()%></pre>
                        <br/>
                    <%}%>
                <%} else {%>
                        <div class="field"><div class="label">No se encontraron mensajes</div>
                        <br/>
                <%}%>
                
            <%}%>
        </form>
    </body>
</html>