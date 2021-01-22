package mx.com.inscitech.fiducia.common.util;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import mx.com.inscitech.fiducia.common.services.LoggingService;

public class SecurityUtils {
    
    private static final String ALGOTITHM = "AES/CBC/PKCS5Padding";
    private static final String SECRET_KEY_1 = "FiduciaWebBaNR3g";
    private static final String SECRET_KEY_2 = "eDrtRV4$345C%&7#";
    
    private LoggingService logger = null;
    
    private SecurityUtils() {
        super();
        logger = LoggingService.getInstance();
    }
    
    public static SecurityUtils build() {        
        return new SecurityUtils();
    }
    
    public String encrypt(String toEncrypt) {
        try {
            
            IvParameterSpec ivParam = new IvParameterSpec(SECRET_KEY_1.getBytes("UTF-8"));
            SecretKeySpec secretKey = new SecretKeySpec(SECRET_KEY_2.getBytes("UTF-8"), "AES");
            
            Cipher cipher = Cipher.getInstance(ALGOTITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey, ivParam);
            
            byte[] encrypted = cipher.doFinal(toEncrypt.getBytes());
            
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "toEncrypt: " + toEncrypt + " encrypted: " + Base64.getEncoder().encodeToString(encrypted));
            
            return Base64.getEncoder().encodeToString(encrypted);
            
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Unable to encrypt the text! Error: " + e.getMessage(), e);
        }
        
        return null;
    }

    public String decrypt(String toDecrypt) {
        return null;
    }

}
