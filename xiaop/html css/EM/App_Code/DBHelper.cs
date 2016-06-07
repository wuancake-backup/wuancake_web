using System;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
public class DBHelper
{

    public static string connstr = System.Configuration.ConfigurationSettings.AppSettings["hk"];

   private DBHelper()
    {
   
    }
    // 执行sql并返回影响行数
    public static int execSql(string sql)
    {
        int result;

        SqlConnection conn = new SqlConnection(connstr);

        SqlCommand cmd = new SqlCommand(sql, conn);
        conn.Open();
        try
        {
            result = cmd.ExecuteNonQuery();
        }
        finally
        {
            conn.Close();

        }
        return result;
    }
    // 执行sql并返回影响行数
    public static int execSql(string sql, params SqlParameter[] values)
    {
        int result = 0;

        SqlConnection conn = new SqlConnection(connstr);

        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddRange(values);
        conn.Open();
        try
        {
            result = cmd.ExecuteNonQuery();
        }
        finally
        {
            conn.Close();

        }
        return result;

    }
    // 执行sql并返回执行结果中的第一列
    public static int execScalar(string sql)
    {
        int result;

        SqlConnection conn = new SqlConnection(connstr);

        SqlCommand cmd = new SqlCommand(sql, conn);
        conn.Open();
        try
        {
            result = Convert.ToInt32(cmd.ExecuteScalar());
        }
        finally
        {
            conn.Close();

        }
        return result;
    }
    public static bool execScalar1(string sql)
    {
        SqlConnection conn = new SqlConnection(connstr);
        SqlCommand cmd = new SqlCommand(sql, conn);
        conn.Open();
        int count = Convert.ToInt32(cmd.ExecuteScalar());//用count来存贮查询出来的值（用的是int）
        if (count != 0)//判断是否为空。。是返回true不是返回false
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    public static string IsExist11(string sql)//参数为select
    {
        SqlConnection conn = new SqlConnection(connstr);
        SqlCommand cmd = new SqlCommand(sql, conn);
        conn.Open();
        string count = cmd.ExecuteScalar().ToString();//用count来存贮查询出来的值
        return count;//返回这个值
    }
    // 执行sql并返回执行结果中的第一列
    public static int execScalar(string sql, params SqlParameter[] values)
    {
        int result;

        SqlConnection conn = new SqlConnection(connstr);

        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddRange(values);
        conn.Open();
        try
        {
            result = Convert.ToInt32(cmd.ExecuteScalar());
        }
        finally
        {
            conn.Close();

        }
        return result;
    }
    // 执行sql并返回sqldatareader
    public static SqlDataReader execReader(string sql)
    {
        SqlConnection conn = new SqlConnection(connstr);

        SqlCommand cmd = new SqlCommand(sql, conn);
        conn.Open();
        SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
        return reader;
    }
    // 执行sql并返回获得sqldatareader
    public static SqlDataReader execReader(string sql, params SqlParameter[] values)
    {
        SqlConnection conn = new SqlConnection(connstr);

        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddRange(values);
        conn.Open();
        SqlDataReader reader = cmd.ExecuteReader(CommandBehavior.CloseConnection);
        return reader;
    }
    // 执行sql并返回DataSet
    public static DataSet execDataSet(string sql)
    {
        SqlConnection conn = new SqlConnection(connstr);

        DataSet ds = new DataSet();
        SqlCommand cmd = new SqlCommand(sql, conn);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        da.Fill(ds);
        return ds;
    }
    // 执行sql并返回DataSet
    public static DataSet execDataSet(string sql, params SqlParameter[] values)
    {
        SqlConnection conn = new SqlConnection(connstr);

        DataSet ds = new DataSet();
        SqlCommand cmd = new SqlCommand(sql, conn);
        cmd.Parameters.AddRange(values);
        SqlDataAdapter da = new SqlDataAdapter(cmd);
        da.Fill(ds);
        return ds;
    }


}
