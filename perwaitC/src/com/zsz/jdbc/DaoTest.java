package com.zsz.jdbc;

import java.util.List;

public class DaoTest {

	public static void main(String[] args) {
	//insertTest();
	//deleteTest();
//		queryTest();
//	updateTest();
//		deleteTest();
//		queryTest();
//queryName();
// queryUpw();		
	//querySQL();	
		//queryaforb();
		//getxy();
		//getlist();
		gettable();
	}	
	public static void gettable3(){
		Dao dao=new Dao();
		int a=dao.getReplyNum("one test", "19");
		System.out.println(a);
		
	}
	
	public static void gettable2(){
		Dao dao=new Dao();
		List<Reply> rp=dao.getReplyList("one test", "1");
		for(Reply k:rp){
			System.out.println(k.getRid());
		}
		
	}
	
	public static void gettable(){
		Dao dao=new Dao();
		List<Theme> th=dao.getThemeList("theme");
		for(Theme k:th){
			System.out.println(k.getTauthor());
		}
		
	}
		public static void getlist(){
			Dao dao=new Dao();
			List<Posts> test=dao.getList("posts");
			for(Posts k:test){
				System.out.println(k.getPid()+" "+k.getTid()+" "+k.getPname()+" "+k.getPauthor());
			}
			
		}
	
		public static  void getxy(){
			Dao dao=new Dao();
			String a="admin1";
			String test= dao.getXXval("usr", "uname", "admin", "uid");
			System.out.println(test+" ok");
		}
		
		public static void queryaforb(){
			Dao dao=new Dao();
		//	int iex=dao.getSqlAForB("uname", "admin", "ulv", "a");
			int iex=dao.getSqlAForB("posts", "pauthor", "admin");
			System.out.println(iex);
		}
			
		public static void querySQL(){
			Dao dao=new Dao();
			int uex=dao.getUserName("uemail", "admin@admin.com");
			System.out.println(uex);
		}
	
		public static void queryUpw(){
			Dao dao=new Dao();
			int pw=dao.getUserInPw("adada", "adadad");
			System.out.println(pw);
		}
		public static void queryName(){
			Dao dao=new Dao();
			int name=dao.getUserName("admin@admin.com");
			System.out.println(name);
		}
	
		public static void queryTest(){
			Dao dao=new Dao();
			List<Users> Luser=dao.getAllUsers();
			for(Users user:Luser){
			
				System.out.println(user.getUid()+"\t"
						+user.getUname()+"\t"
						+user.getUpassword()+"\t"
						+user.getUemail());
		}
		}
		public static void insertTest(){
			Users user=new Users();
			user.setUid(2111);
			user.setUname("nameTest");
			user.setUpassword("sssss");
			user.setUemail("111@qqq.com");
			new Dao().insert(user);
			
			
		}
		public static void deleteTest(){
			
			new Dao().delete(1);
		}
		public static void updateTest(){
			Users user=new Users();
			user.setUid(211);
			user.setUname("nameTest21");
			user.setUpassword("aaa111aa");
			user.setUemail("asd@s.com");
			new Dao().update(user);
		}

	}


