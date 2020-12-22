package mx.com.inscitech.fiducia.web.controllers;

public class Transaction {
    
    private String id = null;
    private String data = null;
    private String date = null;    
    
    public Transaction() {
        super();
    }

    public Transaction(String id, String data) {
        this.id = id;
        this.data = data;
    }

    public Transaction(String id, String data, String date) {
        this.id = id;
        this.data = data;
        this.date = date;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getData() {
        return data;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getDate() {
        return date;
    }
}
