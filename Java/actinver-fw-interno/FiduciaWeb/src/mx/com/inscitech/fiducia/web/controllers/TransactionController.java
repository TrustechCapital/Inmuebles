package mx.com.inscitech.fiducia.web.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import mx.com.inscitech.fiducia.dml.GenericDML;
import mx.com.inscitech.fiducia.dml.vo.DataRow;

import org.springframework.web.servlet.ModelAndView;

public class TransactionController extends JsonActionController {

    private static final String SQL_INSERT = "INSERT INTO F_TRANSACTIONS (TRANSACTION_ID, TRANSACTION_DATA) values (?, ?)";
    private static final String SQL_SELECT = "SELECT TRANSACTION_ID as ID, TRANSACTION_DATA as DATA FROM F_TRANSACTIONS WHERE TRANSACTION_ID = ?" + 
                                             " and transaction_date = (select max(transaction_date) FROM F_TRANSACTIONS WHERE TRANSACTION_ID = ?)";

    public ModelAndView ejecutaQuery(HttpServletRequest request, HttpServletResponse response) throws Exception {
        Transaction tr = new Transaction(request.getSession().getId(), "", "");
        
        String sid = request.getParameter("sid");
        
        GenericDML genericDML = new GenericDML();

        System.out.println("TransactionController::sid:[" + sid + "]");
        if(sid != null) {
            
            DataRow trData = genericDML.getDataRow(SQL_SELECT, new Object[] { sid, sid });
            System.out.println("TR-DB::ID:[" + trData.getString("ID") + "] Data: [" + trData.getString("DATA") + "]");
            tr = new Transaction(trData.getString("ID"), trData.getString("DATA"));
            System.out.println("TransactionController::ID:[" + tr.getId() + "] Data: [" + tr.getData() + "]");
            
        } else {

            genericDML.executeUpdate(SQL_INSERT, new String[] {tr.getId(), "{}"});            

        }
        
        return respondObject(response, tr);
    }

}
