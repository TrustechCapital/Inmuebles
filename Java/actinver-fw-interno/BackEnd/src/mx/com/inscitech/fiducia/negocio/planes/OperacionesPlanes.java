package mx.com.inscitech.fiducia.negocio.planes;

import java.math.BigDecimal;

import java.text.DecimalFormat;

import java.text.SimpleDateFormat;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import mx.com.inscitech.fiducia.common.ProceadureData;
import mx.com.inscitech.fiducia.domain.Feccont;
import mx.com.inscitech.fiducia.domain.Feriados;
import mx.com.inscitech.fiducia.repository.FeriadosRepository;
import mx.com.inscitech.fiducia.repository.FechaContableRepository;


public class OperacionesPlanes {
    
    private FeriadosRepository feriadosRepository;
    private FechaContableRepository fechaContableRepository;
    
    public OperacionesPlanes() {
        
    }
    public OperacionesPlanes(FeriadosRepository feriadosRepository, FechaContableRepository fechaContableRepository) {
        this.feriadosRepository = feriadosRepository;
        this.fechaContableRepository = fechaContableRepository;
    }
    @ProceadureData(id = "funEjecutaAperturaCierre",
                    fields = { "fechaFront","fechaAplica"})
    public void cambiaFechaContable(String fecha, String fechaAplica) throws Exception {
        Feccont fechaContable = fechaContableRepository.getFecha("CONTABLE");
        //Feriados diaFeriado = feriadosRepository.findFeriado(feriado);
        
        if(fechaContable.getFcoAnoApliConta().intValue() != 0){ //Validar A�o
            if(fechaContable.getFcoMesApliConta().intValue() != 0){ //Validar mes
                if(fechaContable.getFcoDiaApliConta().intValue() != 0){//Validar Dia con dia feriado
                    
                    int isFeriado = 1;
                    Date nFecha=new SimpleDateFormat("dd/MM/yyyy").parse(fecha);
                    Calendar cal = Calendar.getInstance();
                    cal.setTime(nFecha);
                    cal.add(Calendar.DATE, 1);//Obtiene el siguiente dia inmediato
                    
                    Date apliFecha=new SimpleDateFormat("dd/MM/yyyy").parse(fechaAplica);
                    Calendar cal2 = Calendar.getInstance();
                    cal2.setTime(apliFecha);
                    BigDecimal aMes = BigDecimal.valueOf(cal2.get(Calendar.MONTH));
                    BigDecimal aDia = BigDecimal.valueOf(cal2.get(Calendar.DAY_OF_MONTH));
                    BigDecimal aAno = BigDecimal.valueOf(cal2.get(Calendar.YEAR));
                    
                    do{
                        
                        BigDecimal nMes = BigDecimal.valueOf(cal.get(Calendar.MONTH));
                        BigDecimal nDia = BigDecimal.valueOf(cal.get(Calendar.DAY_OF_MONTH));
                        BigDecimal nAno = BigDecimal.valueOf(cal.get(Calendar.YEAR));
                        BigDecimal pais = BigDecimal.valueOf(1);    
                        Feriados diaFeriado = feriadosRepository.findByPK(nMes, nDia, nAno, pais); 
                        BigDecimal dFeriado = diaFeriado.getFerFecAno();
                        BigDecimal mFeriado = diaFeriado.getFerFecMes();
                        
                        if(nMes == mFeriado && nDia == dFeriado){
                            //Saltar un d�a al ser feriado contar dia +1
                            cal.add(Calendar.DATE, 1);
                        }else if((cal.get(Calendar.DAY_OF_WEEK)==Calendar.SATURDAY)||(cal.get(Calendar.DAY_OF_WEEK)==Calendar.SUNDAY)){
                            //No es feriado pero es fin de semana
                            cal.add(Calendar.DATE, 1);
                        }else{
                            fechaContable.setFcoAnoApliConta(nAno);
                            fechaContable.setFcoMesApliConta(nMes);
                            fechaContable.setFcoDiaApliConta(nDia);
                            fechaContable.setFcoAnoUltMod(aAno);
                            fechaContable.setFcoMesUltMod(aMes);
                            fechaContable.setFcoDiaUltMod(aDia);
                            fechaContableRepository.update(fechaContable);
                        }
                    }while(isFeriado!=0);
                }
            }
        } 
    }
}
