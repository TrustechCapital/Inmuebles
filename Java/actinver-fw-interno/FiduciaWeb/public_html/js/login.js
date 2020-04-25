var loginURL = ctxRoot + '/login.do';
var testObj = {};

function validateResponse(el, data) {
    var response = JSON.parse(data);
    var dvMensajes = GI('dvMensajesLogin');
    var msgHTML = '<h1>No Message<\/h1>';
    
    //response.valid = false;
    //response.responseCode = 'PWDC';
    
    if(response.valid) {
        window.location = ctxRoot + '/principal.do';
    } else {
        hideWaitLayer();
        switch(response.responseCode) {
            case 'NVLD':
                msgHTML = '<h2 class="redH2">Usuario o Contrase&ntilde;a no v&aacute;lidos<\/h2>';
                break;
            case 'BLKD':
                msgHTML = '<h2 class="redH2">El Usuario ha sido bloqueado!<\/h2>';
                break;
            case 'PWDC':
                msgHTML = '<h2>La contrase&ntilde;a ha expirado, es necesario cambiarla<\/h2>';
                document.getElementById("cambiaPassword").style.visibility='visible';
                window.location.hash = '#cambiaPassword';
                //GI("cambiaPassword").visible=true;
                break;
            case 'FPWD':
                msgHTML = '<h2 class="redH2">La contrase&ntilde;a no cumple con las Reglas de PWD.<\/h2>';
                break;
            case 'UPWD':
                msgHTML = '<h2 class="redH2">La contrase&ntilde;a ya esta en uso.<\/h2>';
                break;
            default:
                break;                
        }
        
        dvMensajes.innerHTML = msgHTML;
    }
}

function doLogin() {
    var accessData = {};
    accessData.username = GI('username').value;
    accessData.password = GI('password').value;
    accessData.expired = false;
    showWaitLayer();
    makeAjaxRequest(loginURL, {}, validateResponse, {}, accessData);
}

function doCambiaPWD() {
 //hacer la invocacion de la funcion SEGURIDAD.CAMBIA_PW   
 //usuario GI('username').value;
 //contrasenia (document.getElementById("password2").value
 //la funcion regreso 0 si todo bien
 //la funcion regresa 1 si la contrasenia es la misma que uso la ultima vez
    var accessData = {};
    accessData.username = GI('username').value;
    accessData.password = GI('password3').value;
    accessData.expired = true;
    showWaitLayer();
    makeAjaxRequest(loginURL, {}, validateResponse, {}, accessData);
}

function validaPassword()
{
  if(document.getElementById("password2").value==document.getElementById("password3").value)
    doCambiaPWD();
  else
    alert("Las contraseñas no coinciden")
}