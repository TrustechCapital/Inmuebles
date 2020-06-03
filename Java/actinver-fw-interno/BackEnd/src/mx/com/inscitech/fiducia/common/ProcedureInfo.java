package mx.com.inscitech.fiducia.common;

import java.lang.reflect.Method;

import java.util.List;

public class ProcedureInfo {

    Class theClass = null;
    Method theMethod = null;
    List<ParameterInfo> parameters = null;

    public ProcedureInfo() {
        super();
    }

    public ProcedureInfo(Class theClass, Method theMethod, List<ParameterInfo> parameters) {
        this.theClass = theClass;
        this.theMethod = theMethod;
        this.parameters = parameters;
    }

    public void setTheClass(Class theClass) {
        this.theClass = theClass;
    }

    public Class getTheClass() {
        return theClass;
    }

    public void setTheMethod(Method theMethod) {
        this.theMethod = theMethod;
    }

    public Method getTheMethod() {
        return theMethod;
    }

    public void setParameters(List<ParameterInfo> parameters) {
        this.parameters = parameters;
    }

    public List<ParameterInfo> getParameters() {
        return parameters;
    }
}
