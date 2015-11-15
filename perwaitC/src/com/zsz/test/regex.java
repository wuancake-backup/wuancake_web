package com.zsz.test;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
public class regex {

public boolean Regex(String ex,String str){
	Pattern p=Pattern.compile(ex);
	Matcher m=p.matcher(str);
	if(m.matches()){
		return true;
	}else{
		return false;
	}
	  
}

}
