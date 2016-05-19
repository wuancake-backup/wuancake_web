using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Number 的摘要说明
/// </summary>
public class AdNumber
{
    //
    // TODO: 在此处添加构造函数逻辑
    //
    private static string adNumber;
    public static string adnumber
    {
        set { adNumber = value; }
        get { return adNumber; }
    }
}