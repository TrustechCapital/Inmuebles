package mx.com.inscitech.fiducia.dml;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

import java.math.BigDecimal;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Types;

import java.text.SimpleDateFormat;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;

import mx.com.inscitech.fiducia.common.services.ConfigurationService;
import mx.com.inscitech.fiducia.common.services.LoggingService;
import mx.com.inscitech.fiducia.common.util.ServiceLocator;
import mx.com.inscitech.fiducia.dml.vo.DataRow;
import mx.com.inscitech.fiducia.dml.vo.DataSet;

import oracle.sql.BLOB;

public class GenericDML {

    private LoggingService logger = null;

    public GenericDML() {
        super();
        logger = LoggingService.getNewInstance();
    }

    public boolean executeUpdate(String strSQL) {
        return executeUpdate(strSQL, null);
    }

    public boolean executeUpdate(String strSQL, Object[] values) {
        return ((Boolean) executeUpdate(strSQL, values, null)[0]).booleanValue();
    }

    public Object[] executeUpdate(String strSQL, Object[] values, Object[] outParameters) {
        ArrayList resultObject = new ArrayList();

        boolean result = false;
        int i = 0;

        Connection cn = null;
        CallableStatement ps = null;

        //if(strSQL.indexOf(";") < 0) strSQL += ";";

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "strSQL: " + strSQL, null);

        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Have values: " + (values != null), null);
        if (values != null) {
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "Total Values: " + values.length,
                       null);
        }

        try {

            cn = ServiceLocator.getInstance()
                               .getDatasource(ConfigurationService.getInstance().getProperty("systemDataSource"))
                               .getConnection();

            ps = cn.prepareCall(strSQL);

            if (values != null) {

                for (i = 1; i <= values.length; i++) {

                    int k = i - 1;

                    logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                               "VALUES(" + k + ") = \"" + values[k] + "\"", null);

                    if (values[k] == null) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to null.", null);
                        ps.setNull(i, Types.NULL);

                    } else if (values[k] instanceof BigDecimal) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to " + values[k] + " as BigDecimal.", null);
                        ps.setBigDecimal(i, (BigDecimal) values[k]);

                    } else if (values[k] instanceof Long) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to " + values[k] + " as Long.", null);
                        ps.setLong(i, ((Long) values[k]).longValue());

                    } else if (values[k] instanceof Integer) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to " + values[k] + " as Integer.", null);
                        ps.setInt(i, ((Integer) values[k]).intValue());

                    } else if (values[k] instanceof byte[]) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " as byte[].", null);
                        ps.setBytes(i, (byte[]) values[k]);

                    } else {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to \"" + values[k] + "\" as String.", null);
                        ps.setString(i, (String) values[k]);

                    }
                }
            }

            if (outParameters != null) {

                for (i = 0; i < outParameters.length; i++) {

                    if (outParameters[i] instanceof BigDecimal) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting out parameter " + (values.length + i + 1) + " as NUMERIC.", null);
                        ps.registerOutParameter(values.length + i + 1, Types.NUMERIC);

                    } else if (outParameters[i] instanceof Long) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting out parameter " + (values.length + i + 1) + " as BIGINT.", null);
                        ps.registerOutParameter(values.length + i + 1, Types.BIGINT);

                    } else if (outParameters[i] instanceof Integer) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting out parameter " + (values.length + i + 1) + " as INTEGER.", null);
                        ps.registerOutParameter(values.length + i + 1, Types.INTEGER);

                    } else {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting out parameter " + (values.length + i + 1) + " as VARCHAR.", null);
                        ps.registerOutParameter(values.length + i + 1, Types.VARCHAR);

                    }

                }

            }

            int retunValue = 0;
            boolean executeResult = false;

            if (strSQL.indexOf("INSERT") > -1 || strSQL.indexOf("UPDATE") > -1 || strSQL.indexOf("DELETE") > -1) {
                retunValue = ps.executeUpdate();
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "retunValue: " + retunValue, null);
            } else {
                executeResult = ps.execute();
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "executeResult: " + executeResult,
                           null);
            }

            result = true;
            resultObject.add(true);

            if (outParameters != null) {

                for (i = 0; i < outParameters.length; i++) {

                    if (outParameters[i] instanceof BigDecimal) {
                        resultObject.add(ps.getBigDecimal(values.length + i + 1));
                    } else if (outParameters[i] instanceof Long) {
                        resultObject.add(new Long(ps.getLong(values.length + i + 1)));
                    } else if (outParameters[i] instanceof Integer) {
                        resultObject.add(new Integer(ps.getInt(values.length + i + 1)));
                    } else {
                        resultObject.add(ps.getString(values.length + i + 1));
                    }

                }

            }

        } catch (SQLException e) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "strSQL: " + strSQL);
            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, e);

        } catch (Exception ex) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, ex);
            ex.printStackTrace();

        } finally {

            if (ps != null)
                try {
                    ps.close();
                } catch (Exception e) {
                }

            if (cn != null) {
                //El commit o rollback puede fallar por el siguiente error:
                //calling commit() is not allowed on a container-managed transactions Connection
                //En cuyo caso mmm no importa...(creo yo :-) )
                try {
                    if (result == true) {
                        cn.commit();
                    } else {
                        cn.rollback();
                    }
                } catch (Exception e) {
                    //System.out.println("GenericTransactionBean(Exception)::" + e.getMessage());
                } finally {
                    try {
                        cn.close();
                    } catch (Exception e) {
                    }
                }
            }

            ps = null;
            cn = null;
        }

        if (resultObject.isEmpty())
            resultObject.add(false);

        return resultObject.toArray();
    }

    public DataRow getDataRow(String strSQL) {
        return getDataRow(strSQL, new Object[] { });
    }

    public DataRow getDataRow(String strSQL, Object[] values) {
        String dataSource = ConfigurationService.getInstance().getProperty("systemDataSource");
        return getDataRow(dataSource, strSQL, values);
    }

    public DataSet getDataSet(String strSQL) {
        return getDataSet(strSQL, new Object[] { });
    }

    public DataSet getDataSet(String strSQL, Object[] values) {
        String dataSource = ConfigurationService.getInstance().getProperty("systemDataSource");
        return getDataSet(dataSource, strSQL, values);
    }

    public DataRow getDataRow(String data_source, String strSQL) {
        return getDataRow(data_source, strSQL, null);
    }

    public DataRow getDataRow(String data_source, String strSQL, Object[] values) {
        Connection cn = null;

        try {

            if (data_source != null && !"".equals("")) {
                cn = ServiceLocator.getInstance()
                                   .getDatasource(data_source)
                                   .getConnection();
            } else {
                cn = ServiceLocator.getInstance()
                                   .getDatasource(ConfigurationService.getInstance().getProperty("systemDataSource"))
                                   .getConnection();
            }

            return getDataRow(cn, strSQL, values);

        } catch (SQLException e) {
            e.printStackTrace();
            if (cn != null)
                try {
                    cn.rollback();
                } catch (SQLException ex) {
                }
        }

        return new DataRow();
    }

    public DataRow getDataRow(Connection cn, String strSQL) {
        return getDataRow(cn, strSQL, null);
    }

    public DataRow getDataRow(Connection cn, String strSQL, Object[] values) {
        PreparedStatement ps = null;

        int i = 0, k = 0;

        try {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "strSQL: " + strSQL, null);
            ps = cn.prepareStatement(strSQL);

            if (values != null) {

                for (i = 1; i <= values.length; i++) {
                    k = i - 1;

                    if (values[k] == null) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to null.", null);
                        ps.setNull(i, Types.VARCHAR);

                    } else if (values[k] instanceof BigDecimal) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to " + values[k] + " as BigDecimal.", null);
                        ps.setBigDecimal(i, (BigDecimal) values[k]);

                    } else if (values[k] instanceof Integer) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to " + values[k] + " as BigDecimal.", null);
                        ps.setInt(i, ((Integer) values[k]).intValue());

                    } else if (values[k] instanceof Long) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to " + values[k] + " as BigDecimal.", null);
                        ps.setLong(i, ((Long) values[k]).longValue());

                    } else {
                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to \"" + values[k] + "\" as String.", null);
                        ps.setString(i, (String) values[k]);
                    }
                }
            }

            return getDataRow(ps);

        } catch (SQLException e) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "Error excecuting sql: " + strSQL, e);

            if (cn != null)
                try {
                    cn.rollback();
                } catch (SQLException ex) {
                }
        }

        return new DataRow();
    }

    public DataRow getDataRow(PreparedStatement ps) {
        DataRow row = new DataRow();

        Connection cn = null;
        ResultSet rs = null;
        ResultSetMetaData mdata = null;
        Object obj = null;

        try {
            cn = ps.getConnection();
            rs = ps.executeQuery();

            if (rs.next()) {

                mdata = rs.getMetaData();

                for (int i = 1; i <= mdata.getColumnCount(); i++) {
                    obj = rs.getObject(i);

                    if (obj instanceof java.util.Date || obj instanceof java.sql.Date) {

                        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
                        obj = formatter.format((java.util.Date) obj);

                    } else if (obj instanceof BLOB) {

                        try {

                            BLOB blobFile = (BLOB) obj;

                            InputStream binaryBlob = blobFile.getBinaryStream();
                            int size = (int) blobFile.length();
                            int length = 0;

                            ByteArrayOutputStream fileInfo = new ByteArrayOutputStream();

                            byte bytesBuffer[] = new byte[1048576]; //1MB de buffer
                            while ((length = binaryBlob.read(bytesBuffer)) == -1) {
                                fileInfo.write(bytesBuffer, 0, length);
                            }

                            obj = fileInfo;

                        } catch (IOException ie) {
                            obj = ie;
                        }
                    }

                    row.addData(mdata.getColumnLabel(i), obj);
                }
            }

            if (cn.getAutoCommit()) {
                logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG, "AutoCommit is true");
            } else {
                cn.commit();
            }

        } catch (SQLException e) {

            e.printStackTrace();
            if (cn != null)
                try {
                    cn.rollback();
                } catch (SQLException ex) {
                }

        } finally {
            if (rs != null)
                try {
                    rs.close();
                } catch (SQLException e) {
                }
            if (ps != null)
                try {
                    ps.close();
                } catch (SQLException e) {
                }
            if (cn != null)
                try {
                    cn.close();
                } catch (SQLException e) {
                }

            mdata = null;
            rs = null;
            ps = null;
            cn = null;
        }

        return row;
    }

    public DataSet getDataSet(Connection cn, String strSQL) {
        return getDataSet(cn, strSQL, null);
    }

    public DataSet getDataSet(Connection cn, String strSQL, Object[] values) {

        PreparedStatement ps = null;

        int i = 0, k = 0;

        try {
            ps = cn.prepareStatement(strSQL);

            if (values != null) {

                for (i = 1; i <= values.length; i++) {
                    k = i - 1;

                    if (values[k] == null) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to null.", null);
                        ps.setNull(i, Types.VARCHAR);

                    } else if (values[k] instanceof BigDecimal) {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to " + values[k] + " as BigDecimal.", null);
                        ps.setBigDecimal(i, (BigDecimal) values[k]);

                    } else {

                        logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                   "Setting parameter " + i + " to \"" + values[k] + "\" as String.", null);
                        ps.setString(i, (String) values[k]);

                    }
                }
            }

            return getDataSet(ps);

        } catch (SQLException e) {

            e.printStackTrace();
            if (cn != null)
                try {
                    cn.rollback();
                } catch (SQLException ex) {
                }

        } finally {
            if (cn != null)
                try {
                    cn.close();
                } catch (SQLException e) {
                }
            cn = null;
        }

        return new DataSet();
    }

    public DataSet getDataSet(String data_source, String strSQL) {
        return getDataSet(data_source, strSQL, null);
    }

    public DataSet getDataSet(String data_source, String strSQL, Object[] values) {
        Connection cn = null;

        try {

            cn = ServiceLocator.getInstance()
                               .getDatasource(data_source)
                               .getConnection();

            return getDataSet(cn, strSQL, values);

        } catch (SQLException e) {

            //System.out.println("GenericDML Command: " + strSQL);
            e.printStackTrace();
            if (cn != null)
                try {
                    cn.rollback();
                } catch (SQLException ex) {
                }

        } finally {

            if (cn != null)
                try {
                    cn.close();
                } catch (SQLException e) {
                }
            cn = null;

        }

        return new DataSet();
    }

    public DataSet getDataSet(PreparedStatement ps) {
        DataSet datos = new DataSet();

        Connection cn = null;
        ResultSet rs = null;
        ResultSetMetaData mdata = null;
        Object obj = null;
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");

        try {

            cn = ps.getConnection();
            rs = ps.executeQuery();

            boolean getHeader = true;

            while (rs.next()) {

                if (getHeader) {
                    mdata = rs.getMetaData();
                    getHeader = false;
                }

                DataRow row = new DataRow();

                for (int i = 1; i <= mdata.getColumnCount(); i++) {
                    obj = rs.getObject(i);

                    if (obj instanceof java.util.Date || obj instanceof java.sql.Date) {
                        obj = formatter.format((java.util.Date) obj);
                    }

                    row.addData(mdata.getColumnLabel(i), obj);
                }

                datos.addRow(row);
            }

        } catch (SQLException e) {

            datos.setOnError(true);
            datos.setErrorMessage(e.getMessage());
            datos.setTheException(e);
            datos.setSqlErrorCode(e.getErrorCode());

            //System.out.println("Error en la consulta: " + e.getSQLState());
            e.printStackTrace();

            if (cn != null)
                try {
                    cn.rollback();
                } catch (SQLException ex) {
                }

        } finally {

            if (rs != null)
                try {
                    rs.close();
                } catch (SQLException e) {
                }
            if (ps != null)
                try {
                    ps.close();
                } catch (SQLException e) {
                }
            if (cn != null)
                try {
                    cn.close();
                } catch (SQLException e) {
                }

            mdata = null;
            rs = null;
            cn = null;
        }

        return datos;
    }

    public HashMap executeCall(String strSQL, Object[] values, HashMap outKeys) {
        HashMap result = new HashMap();

        Connection cn = null;
        CallableStatement call = null;

        try {
            String dataSource = ConfigurationService.getInstance().getProperty("systemDataSource");
            cn = ServiceLocator.getInstance()
                               .getDatasource(dataSource)
                               .getConnection();

            call = cn.prepareCall(strSQL);

            if (values != null) {
                for (int i = 1; i <= values.length; i++) {
                    int k = i - 1;

                    if (outKeys.containsKey(new Long(i))) {
                        if (outKeys.get(new Long(i)) instanceof BigDecimal) {
                            call.registerOutParameter(i, Types.NUMERIC);
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Registering output parameter " + i + " as numeric (BigDecimal).", null);
                        } else if (outKeys.get(new Long(i)) instanceof Long) {
                            call.registerOutParameter(i, Types.NUMERIC);
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Registering output parameter " + i + " as numeric. (Long)", null);
                        } else if (outKeys.get(new Long(i)) instanceof Integer) {
                            call.registerOutParameter(i, Types.NUMERIC);
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Registering output parameter " + i + " as numeric. (Integer)", null);
                        } else if (outKeys.get(new Long(i)) instanceof Date) {
                            call.registerOutParameter(i, Types.DATE);
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Registering output parameter " + i + " as date.", null);
                        } else {
                            call.registerOutParameter(i, Types.VARCHAR);
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Registering output parameter " + i + " as String.", null);
                        }
                    } else {
                        if (values[k] == null) {
                            call.setNull(i, Types.VARCHAR);
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Setting parameter " + i + " to null.");
                        } else if (values[k] instanceof BigDecimal) {
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Setting parameter " + i + " to " + values[k] + " as BigDecimal.", null);
                            call.setBigDecimal(i, (BigDecimal) values[k]);
                        } else if (values[k] instanceof Long) {
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Setting parameter " + i + " to " + values[k] + " as Long.", null);
                            call.setLong(i, ((Long) values[k]).longValue());
                        } else if (values[k] instanceof Integer) {
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Setting parameter " + i + " to " + values[k] + " as Integer.", null);
                            call.setInt(i, ((Integer) values[k]).intValue());
                        } else if (values[k] instanceof Date) {
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Setting parameter " + i + " to " + values[k] + " as Date.", null);
                            call.setDate(i, new java.sql.Date(((Date) values[k]).getTime()));
                        } else if (values[k] instanceof byte[]) {
                            call.setBytes(i, (byte[]) values[k]);
                        } else {
                            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.DEBUG,
                                       "Setting parameter " + i + " to \"" + values[k] + "\" as String.", null);
                            call.setString(i, (String) values[k]);
                        }
                    }
                }
            }

            call.executeUpdate();

            Iterator itOutKeys = outKeys.keySet().iterator();

            while (itOutKeys.hasNext()) {
                Object key = itOutKeys.next();
                Object fieldValue = null;

                int fieldId = ((Long) key).intValue();

                if (outKeys.get(key) instanceof BigDecimal)
                    result.put(key, call.getBigDecimal(fieldId));
                else if (outKeys.get(key) instanceof Long)
                    result.put(key, new Long(call.getLong(fieldId)));
                else if (outKeys.get(key) instanceof Integer)
                    result.put(key, new Integer(call.getInt(fieldId)));
                else if (outKeys.get(key) instanceof Date)
                    result.put(key, call.getDate(fieldId));
                else
                    result.put(key, call.getString(fieldId));
            }

            try {
                cn.commit();
            } catch (SQLException e) {
                //System.out.println("executeCall(SQLException):"+e.getErrorCode());
                //System.out.println("executeCall(SQLException):"+e.getMessage());
                e.printStackTrace();
            }

        } catch (SQLException e) {

            logger.log(this, Thread.currentThread(), LoggingService.LEVEL.ERROR, "strSQL: " + strSQL, e);

            result.put("SQL_EXCEPTION", e);

            if (cn != null)
                try {
                    cn.rollback();
                } catch (SQLException ex) {
                }

        } finally {

            if (call != null)
                try {
                    call.close();
                } catch (Exception e) {
                }
            if (cn != null)
                try {
                    cn.close();
                } catch (SQLException e) {
                }

            call = null;
        }

        return result;
    }
}
