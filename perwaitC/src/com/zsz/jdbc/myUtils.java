package com.zsz.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class myUtils {

	private myUtils(){}

	private static Connection conn=null;
	public static Connection  getConnection()
	{
		String url="jdbc:mysql://localhost/perwait";
		String user="root";
		String password="123456";
		try {
			new com.mysql.jdbc.Driver();
			conn=DriverManager.getConnection(url, user, password);
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return conn;
	}
	public static void closeConnection()
	{
		try {
			if(conn!=null)
			{
				conn.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public static void closePreparedStatement(PreparedStatement pstmt)
	{

		try {
			if(pstmt!=null)
			{
				pstmt.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
	public static void closeResultSet(ResultSet rs)
	{

		try {
			if(rs!=null)
			{
				rs.close();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
	}
}
