package com.zsz.jdbc;

public class getRid {
	public int getId(String tname,String pid){
		int rid=0;
		
try {
		rid=(new Dao().getSqlAForB("reply", "tname", tname,"pid",pid	))+1;
		while(true){
			if(getUnId(tname, pid,rid)){
				break;
			}
			rid++;
		}
		
} catch (Exception e) {
	System.out.println("getRid .java  error");
	e.printStackTrace();
}
return rid;
	}
	
	public  boolean getUnId(String tname,Object pid,Object rid){
		
		if(new Dao().getSqlAForB("reply", "tname",tname, "pid",pid,"rid",rid)==0){
			return true;
		}
		
		return false;
	}
}
