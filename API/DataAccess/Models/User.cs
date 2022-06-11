using System;
namespace DataAccess.Models{

    public class User{
        public int? UserID {get;set;}
        public string? Username {get;set;}
        public string? Avatar {get;set;}
        public string? Hash { get; set; }
        public string? Salt { get; set; }
        public string? Password { get; set; }
    }
}
