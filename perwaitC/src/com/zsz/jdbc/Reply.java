package com.zsz.jdbc;

public class Reply {
	private int rid=0,pid=0;
	private String tname=null,rarticle=null,rauthor=null,rdate=null,rshow=null,rshowdate=null;
	public String getRshow() {
		return rshow;
	}
	public void setRshow(String rshow) {
		this.rshow = rshow;
	}
	public String getRshowdate() {
		return rshowdate;
	}
	public void setRshowdate(String rshowdate) {
		this.rshowdate = rshowdate;
	}
	public int getRid() {
		return rid;
	}
	public void setRid(int rid) {
		this.rid = rid;
	}
	public int getPid() {
		return pid;
	}
	public void setPid(int pid) {
		this.pid = pid;
	}
	public String getTname() {
		return tname;
	}
	public void setTname(String tname) {
		this.tname = tname;
	}
	public String getRarticle() {
		return rarticle;
	}
	public void setRarticle(String rarticle) {
		this.rarticle = rarticle;
	}
	public String getRauthor() {
		return rauthor;
	}
	public void setRauthor(String rauthor) {
		this.rauthor = rauthor;
	}
	public String getRdate() {
		return rdate;
	}
	public void setRdate(String rdate) {
		this.rdate = rdate;
	}
	
}
