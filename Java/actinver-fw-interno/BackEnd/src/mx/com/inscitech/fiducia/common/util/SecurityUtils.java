package mx.com.inscitech.fiducia.common.util;

import java.nio.charset.StandardCharsets;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

import mx.com.inscitech.fiducia.common.services.LoggingService;

public class SecurityUtils {
    
    private static final String ALGOTITHM = "AES"; //AES/CBC/PKCS5Padding
    
    private LoggingService logger = null;
    
    private static SecretKeySpec secretKey;
    private static byte[] key;
    
    private SecurityUtils(String secret) {
        super();
        logger = LoggingService.getInstance();
        setKey(secret);
    }
    
    public static SecurityUtils build(String secret) {        
        return new SecurityUtils(secret);
    }
    
    public void setKey(String myKey) {
        //MessageDigest md5 = null;

        try {
            /*key = myKey.getBytes(StandardCharsets.UTF_8);
            md5 = MessageDigest.getInstance("MD5");
            key = md5.digest(key);
            key = Arrays.copyOf(key, 16);
            secretKey = new SecretKeySpec(key, "AES");*/
            
            key = Base64.getDecoder().decode(myKey.getBytes());
            
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Unable to set the encryption Key: " + e.getMessage(), e);
        }
    }

    public String encrypt(String strToEncrypt) {
        try {
            Cipher cipher = Cipher.getInstance(ALGOTITHM);
            cipher.init(Cipher.ENCRYPT_MODE, secretKey);
            return Base64.getEncoder().encodeToString(cipher.doFinal(strToEncrypt.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Unable to encrypt the text! Error: " + e.getMessage(), e);
        }
        
        return null;
    }

    public String decrypt(String strToDecrypt) {
        try {
            Cipher cipher = Cipher.getInstance(ALGOTITHM);
            cipher.init(Cipher.DECRYPT_MODE, secretKey);
            return new String(cipher.doFinal(Base64.getDecoder().decode(strToDecrypt)));
        } catch (Exception e) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Unable to decrypt the text! Error: " + e.getMessage(), e);
        }
        
        return null;
    }

}
