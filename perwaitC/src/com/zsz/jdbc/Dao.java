package com.zsz.jdbc;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


public class Dao {

	public void insert(Users user){
		Connection conn=null;
		PreparedStatement stmt=null;
		try {
			conn=myUtils.getConnection();				
			String sql="insert into usr(uid,uname,upw,uemail) values(?,?,?,?)";
			stmt=conn.prepareStatement(sql);
			stmt.setInt(1,user.getUid());
			stmt.setString(2, user.getUname());
			stmt.setString(3,user.getUpassword());
			stmt.setString(4, user.getUemail());
			stmt.executeUpdate();

		} catch (Exception e) {
			System.out.println("【dao】insert  use error");
			e.printStackTrace();
		}finally
		{
			myUtils.closePreparedStatement(stmt);
			myUtils.closeConnection();
		}

	}
	public void insert(Theme theme){
		Connection conn=null;
		PreparedStatement stmt=null;
		try {
			conn=myUtils.getConnection();				
			String sql="insert into theme(tname,tauthor,tdate) values(?,?,?)";
			stmt=conn.prepareStatement(sql);
			stmt.setString(1,theme.getTname());
			stmt.setString(2, theme.getTauthor());
			stmt.setString(3,theme.getTdate());
			stmt.executeUpdate();

		} catch (Exception e) {
			System.out.println("【dao】insert  theme error");
			e.printStackTrace();
		}finally
		{
			myUtils.closePreparedStatement(stmt);
			myUtils.closeConnection();
		}

	}
	public void insert(Reply reply){
		Connection conn=null;
		PreparedStatement stmt=null;
		try {
			conn=myUtils.getConnection();				
			String sql="insert into reply(rid,tname,pid,rarticle,rauthor,rdate) values(?,?,?,?,?,?)";
			stmt=conn.prepareStatement(sql);
			stmt.setInt(1,reply.getRid());
			stmt.setString(2, reply.getTname());
			stmt.setInt(3,reply.getPid());
			stmt.setString(4, reply.getRarticle());
			stmt.setString(5, reply.getRauthor());
			stmt.setString(6, reply.getRdate());
			
			stmt.executeUpdate();
			System.out.println(sql);

		} catch (Exception e) {
			System.out.println("【dao】insert  reply error");
			e.printStackTrace();
		}finally
		{
			myUtils.closePreparedStatement(stmt);
			myUtils.closeConnection();
		}

	}
	
	public void insert(Posts posts){
		Connection conn=null;
		PreparedStatement stmt=null;
		try {
			conn=myUtils.getConnection();				
			String sql="insert into posts(pid,tid,pname,particle,pauthor,pdate) values(?,?,?,?,?,?)";
			stmt=conn.prepareStatement(sql);
			stmt.setInt(1,posts.getPid());
			stmt.setInt(2, posts.getTid());
			stmt.setString(3,posts.getPname());
			stmt.setString(4, posts.getParticle());
			stmt.setString(5, posts.getPauthor());
			stmt.setString(6, posts.getPdate());
			stmt.executeUpdate();
			System.out.println(sql);

		} catch (Exception e) {
			System.out.println("【dao】insert  posts error");
			e.printStackTrace();
		}finally
		{
			myUtils.closePreparedStatement(stmt);
			myUtils.closeConnection();
		}

	}

	public void update(Users user){

		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try
		{	
			new com.mysql.jdbc.Driver();
			conn = myUtils.getConnection();
			String sql="update usr set uname=? , upw=? , uemail=?  where uid=?";
			stmt = conn.prepareStatement(sql);
			stmt.setString(1,user.getUname());
			stmt.setString(2, user.getUpassword());
			stmt.setString(3, user.getUemail());
			stmt.setInt(4, user.getUid());
//			String sql="update users set uname=? ,upw=?  where uid=?";
//			stmt = conn.prepareStatement(sql);
//			stmt.setString(1,user.getUname());
//			stmt.setString(2, user.getUpassword());
//			stmt.setInt(3, user.getUid());
			stmt.executeUpdate();
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
	}

	public void delete(int uid){

		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try
		{	
			new com.mysql.jdbc.Driver();
			conn =myUtils.getConnection();
			String sql="delete from usr where uid=?";
			stmt = conn.prepareStatement(sql);
			stmt.setInt(1,uid);
			int i=stmt.executeUpdate();
			
		}
		catch (Exception e)
		{
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
			}
	}
	public int getUserName(String name){
		int uname=0;
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try {
			conn = myUtils.getConnection();
			String sql="select * from usr where uname=?";
			stmt=conn.prepareStatement(sql);
			stmt.setString(1,name);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				uname++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return uname;
	}
	public int getUserName(String SQLname,String name){
		int uex=0;
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try {
			conn = myUtils.getConnection();
			String sql="select * from usr where "+SQLname+"=?";
			stmt=conn.prepareStatement(sql);
			//stmt.setString(1,SQLname);
			stmt.setString(1,name);
		
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				uex++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return uex;
	}
	
	public List<Posts> getList(String table,String SQLname,Object name){
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		List<Posts> posts=new ArrayList<Posts>();
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table+" where "+SQLname+"="+"\""+name+"\"";
			stmt=conn.prepareStatement(sql);
			//stmt.setString(1,SQLname);
			//stmt.setString(1,name+"");
			
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				Posts _posts=new Posts();
				_posts.setPid(rs.getInt("pid"));
				_posts.setTid(rs.getInt("tid"));
				_posts.setPname(rs.getString("pname"));
				_posts.setParticle(rs.getString("particle"));
				_posts.setPclick(rs.getInt("pclicks"));
				_posts.setPreplies(rs.getInt("preplies"));
				_posts.setPdate(rs.getString("pdate"));
				_posts.setPauthor(rs.getString("pauthor"));
				posts.add(_posts);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return posts;
	}
	public List<Posts> getList(String table){
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		List<Posts> posts=new ArrayList<Posts>();
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table;
			stmt=conn.prepareStatement(sql);
			
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				Posts _posts=new Posts();
				_posts.setPid(rs.getInt("pid"));
				_posts.setTid(rs.getInt("tid"));
				_posts.setPname(rs.getString("pname"));
				_posts.setParticle(rs.getString("particle"));
				_posts.setPclick(rs.getInt("pclicks"));
				_posts.setPreplies(rs.getInt("preplies"));
				_posts.setPdate(rs.getString("pdate"));
				_posts.setPauthor(rs.getString("pauthor"));
				posts.add(_posts);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return posts;
	}
	
	public List<Theme> getThemeList(String table){
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		List<Theme> theme=new ArrayList<Theme>();
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table;
			stmt=conn.prepareStatement(sql);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				
				Theme _theme=new Theme();
				_theme.setTid(rs.getInt("tid"));
				_theme.setTname(rs.getString("tname"));
				_theme.setTarticle(rs.getString("tarticle"));
				_theme.setTdate(rs.getString("tdate"));
				_theme.setTauthor(rs.getString("tauthor"));
				_theme.setTlv(rs.getString("tlv"));
				_theme.setTlogo(rs.getString("tlogo"));
				theme.add(_theme);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return theme;
	}
	public List<Theme> getThemeList(String table,String SQLA,String a){
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		List<Theme> theme=new ArrayList<Theme>();
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table+" where "+SQLA+"=\""+a+"\"";
			stmt=conn.prepareStatement(sql);
			System.out.println(sql);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				
				Theme _theme=new Theme();
				_theme.setTid(rs.getInt("tid"));
				_theme.setTname(rs.getString("tname"));
				_theme.setTarticle(rs.getString("tarticle"));
				_theme.setTdate(rs.getString("tdate"));
				_theme.setTauthor(rs.getString("tauthor"));
				_theme.setTlv(rs.getString("tlv"));
				_theme.setTlogo(rs.getString("tlogo"));
				theme.add(_theme);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return theme;
	}
	
	public List<Reply> getReplyList(Object tname,Object pid){
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		List<Reply> reply=new ArrayList<Reply>();
		try {
			conn = myUtils.getConnection();
			String sql="select * from reply where tname="+"\""+tname+"\""+" and pid="+"\""+pid+"\"";
			stmt=conn.prepareStatement(sql);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				
				Reply _reply=new Reply();
				_reply.setPid(rs.getInt("pid"));
				_reply.setRid(rs.getInt("rid"));
				_reply.setTname(rs.getString("tname"));
				_reply.setRauthor(rs.getString("rauthor"));
				_reply.setRdate(rs.getString("rdate"));
				_reply.setRarticle(rs.getString("rarticle"));
				reply.add(_reply);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return reply;
	}
	public int getReplyNum(Object tname,Object pid){
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		int numReply=0;
		try {
			conn = myUtils.getConnection();
			String sql="select * from reply where tname="+"\""+tname+"\""+" and pid="+"\""+pid+"\"";
			stmt=conn.prepareStatement(sql);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				
				numReply++;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return numReply;
	}
	
	public int getUserInPw(String name,String pw){
		int ipw=0;
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try {
			conn = myUtils.getConnection();
			String sql="select * from usr where uname=? and upw=?";
			stmt=conn.prepareStatement(sql);
			stmt.setString(1,name);
			stmt.setString(2,pw);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				ipw++;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return ipw;
		
		
	}
	
	//通过a查询b的数量
	public int getSqlAForB(String table,String SQLa,Object a){
		int iex=0;
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table+" where "+SQLa+"=\""+a+"\"";
			stmt=conn.prepareStatement(sql);
			
			
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				iex++;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return iex;
		
		
	}
	
	
	
	public int getSqlAForB(String SQLa,String a,String SQLb, String b){
		int iex=0;
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try {
			conn = myUtils.getConnection();
			String sql="select * from usr where "+SQLa+"=? and "+SQLb+"=?";
			stmt=conn.prepareStatement(sql);
			stmt.setString(1,a);
			stmt.setString(2,b);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				iex++;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return iex;
		
		
	}
	
	public int getSqlAForB(String table, String SQLa,String a,String SQLb, Object b){
		int iex=0;
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table+" where "+SQLa+"="+"\""+a+"\""+" and "+SQLb+"="+"\""+b+"\"";
			stmt=conn.prepareStatement(sql);
			//stmt.setString(1,a);
			//stmt.setString(2,(String)b);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				iex++;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return iex;
		
		
	}
	
	public int getSqlAForB(String table, String SQLa,String a,String SQLb, Object b,String SQLc, Object c){
		int iex=0;
		Connection conn = null;
		PreparedStatement stmt = null;
		ResultSet rs =null;
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table+" where "+SQLa+"="+"\""+a+"\""+" and "+SQLb+"="+"\""+b+"\" "+"and "+SQLc+"=\""+c+"\"";
			stmt=conn.prepareStatement(sql);
			//stmt.setString(1,a);
			//stmt.setString(2,(String)b);
			rs=	stmt.executeQuery();
			while(rs.next())
			{	
				iex++;
				
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return iex;
		
		
	}
	
	//查询x 得到y 
	//查询  某表中   字段（val1）=值（val2）的列 ，查询 结果中 val3列段的值
	public String getXXval(String table,Object val1,Object val2,Object val3){
		String val=null;
		PreparedStatement stmt=null;
		ResultSet   rs=null;
		Connection conn=null;
		
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table+" where "+val1+"="+"\""+val2+"\"";
			
			
			stmt=conn.prepareStatement(sql);
			//stmt.setString(1,(String)val2);
			rs=	stmt.executeQuery();
		
			
			while(rs.next())
			{	
				
				val=rs.getString(val3+"");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		
		return val;
	}
	
	
	//查询x 得到y 
	//查询  某表中   字段（val1）=值（val2）的列 ，查询 结果中 val3列段的值
	public String getXXval(String table,Object val1,Object val2,Object val3,Object val4,Object val5){
		String val=null;
		PreparedStatement stmt=null;
		ResultSet   rs=null;
		Connection conn=null;
		
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table+" where "+val1+"="+"\""+val2+"\""+" and "+val4+"="+"\""+val5+"\"";
			
			
			stmt=conn.prepareStatement(sql);
			//stmt.setString(1,(String)val2);
			rs=	stmt.executeQuery();
			
			while(rs.next())
			{	
				
				val=rs.getString(val3+"");

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		
		return val;
	}
	
	public List<Users> getAllUsers(){

		PreparedStatement stmt=null;
		ResultSet   rs=null;
		Connection conn=null;
		List<Users> users=new ArrayList<Users>();
		try {
			conn = myUtils.getConnection();
			String sql="select * from usr";
			stmt=conn.prepareStatement(sql);
			rs=	stmt.executeQuery();
			
			
			while(rs.next())
			{	
				
				Users user =new Users();
				user.setUid(rs.getInt("uid"));
				user.setUname(rs.getString("uname"));
				user.setUpassword(rs.getString("upw"));
				user.setUemail(rs.getString("uemail"));
				users.add(user);
				

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return users;
	}
	public int getAllUsers(String val1,Object val2){
		int pid=0;
		PreparedStatement stmt=null;
		ResultSet   rs=null;
		Connection conn=null;
		List<Users> users=new ArrayList<Users>();
		try {
			conn = myUtils.getConnection();
			String sql="select * from usr where "+val1+"="+"\""+val2+"\"";
			stmt=conn.prepareStatement(sql);
			rs=	stmt.executeQuery();
			
			
			while(rs.next())
			{	
				
				
				pid=rs.getInt("uid");
			
				

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return pid;
	}
	public int getTableNumber(String table){

		PreparedStatement stmt=null;
		ResultSet   rs=null;
		Connection conn=null;
		int num=0;
		try {
			conn = myUtils.getConnection();
			String sql="select * from "+table;
			stmt=conn.prepareStatement(sql);
			rs=	stmt.executeQuery();
			
			
			while(rs.next())
			{	
				
				num++;
				

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally
		{
			myUtils.closeConnection();
			myUtils.closeResultSet(rs);
			myUtils.closePreparedStatement(stmt);
		}
		return num;
	}
}