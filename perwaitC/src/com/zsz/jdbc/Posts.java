package com.zsz.jdbc;

public class Posts {
private int pid=0,tid=0,pclick=0,preplies=0;
private String pname=null,particle=null,pauthor=null,pdate=null;
public String getPdate() {
	return pdate;
}
public void setPdate(String pdate) {
	this.pdate = pdate;
}
public int getPid() {
	return pid;
}
public void setPid(int pid) {
	this.pid = pid;
}
public int getTid() {
	return tid;
}
public void setTid(int tid) {
	this.tid = tid;
}
public int getPclick() {
	return pclick;
}
public void setPclick(int pclick) {
	this.pclick = pclick;
}
public int getPreplies() {
	return preplies;
}
public void setPreplies(int preplies) {
	this.preplies = preplies;
}
public String getPname() {
	return pname;
}
public void setPname(String pname) {
	this.pname = pname;
}
public String getParticle() {
	return particle;
}
public void setParticle(String particle) {
	this.particle = particle;
}
public String getPauthor() {
	return pauthor;
}
public void setPauthor(String pauthor) {
	this.pauthor = pauthor;
}

}
