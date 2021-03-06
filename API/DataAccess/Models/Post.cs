
using DataAccess.Models;

public class Post{

    public int PostID {get;set;}
    public int? ParentPostID {get;set;}
    public int UserID { get; set;}
    public string Username { get; set; }
    public string Content {get;set;}
    public string Avatar {get;set;}
    public DateTime TimePosted {get;set;}
    public List<Post> Comments { get; set; }
    public User User { get; set; }
}
