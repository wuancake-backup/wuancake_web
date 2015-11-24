package com.zsz.jdbc;

public class getPid {
	public int getId(String tid){
		int pid=0;
try {
		pid=(new Dao().getSqlAForB("posts", "tid", tid))+1;
		while(true){
			if(getUnId(tid, pid)){
				break;
			}
			pid++;
		}
		
} catch (Exception e) {
	System.out.println("getPid .java  error");
	e.printStackTrace();
}
return pid;
	}
	
	public  boolean getUnId(String tid,int pid){
		
		if(new Dao().getSqlAForB("posts", "tid",tid, "pid",pid)==0){
			return true;
		}
		
		return false;
	}
}
