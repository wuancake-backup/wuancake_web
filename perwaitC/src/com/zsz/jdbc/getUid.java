package com.zsz.jdbc;

public class getUid {
	public int getId(){
		int uid=0;
try {
		uid=(new Dao().getTableNumber("usr"))+1;
		while(true){
			if(getUnId(uid)){
				break;
			}
			uid++;
		}
		
} catch (Exception e) {
	System.out.println("getPid .java  error");
	e.printStackTrace();
}
return uid;
	}
	
	public  boolean getUnId(int uid){
		
		if(new Dao().getSqlAForB("usr", "uid",uid)==0){
			return true;
		}
		
		return false;
	}
}
