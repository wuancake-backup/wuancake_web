package com.zsz.test;

public class test {
	public static void main(String[] args) {
		regex reg=new regex();
		boolean b=reg.Regex("^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$", "123@qq.com");
	System.out.println(b);
	}
}
