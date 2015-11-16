package com.zsz.jdbc;

public class Users {
private int Uid;
private String Uname;
private String Upassword;
private String Uemail;

public String getUemail() {
	return Uemail;
}
public void setUemail(String uemail) {
	this.Uemail = uemail;
}
public int getUid() {
	return Uid;
}
public void setUid(int uid) {
	this.Uid = uid;
}
public String getUname() {
	return Uname;
}
public void setUname(String uname) {
	this.Uname = uname;
}
public String getUpassword() {
	return Upassword;
}
public void setUpassword(String upassword) {
	this.Upassword = upassword;
}

}
