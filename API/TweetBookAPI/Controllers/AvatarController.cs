using System.Data.SqlTypes;
using Microsoft.AspNetCore.Mvc;
using System.Web;
using DataAccess;

namespace TweetBookAPI;

    [ApiController]
[Route("tweetbookapi/[controller]")]
public class AvatarController : Controller
{

    //private string fileDir = "/home/parker/Documents/Code/TweetBook/public/avatars/";
    private string fileDir = "/var/www/tweetbook/html/avatars/";
    [HttpPost("upload")]
    public async Task<IActionResult> Upload([FromForm] IFormFile file, [FromForm] int userID)
    {
        string ext = Path.GetExtension(file.FileName);
        var fileName = Path.GetRandomFileName().Replace(".", "");
        var filePath = fileDir + fileName + ext;

        using (var stream = System.IO.File.Create(filePath))
        {
            await file.CopyToAsync(stream);
        }

        await Queries.UpdateAvatar(fileName + ext,userID);
        string loc = fileName + ext;
        Console.WriteLine(loc);
        return Ok(Json(loc));
    }

    [HttpGet]
    public async Task Download()
    {

    }
    private async Task<string> readFile(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return "";
        }

        using (var reader = new StreamReader(file.OpenReadStream()))
        {
            return await reader.ReadToEndAsync();

        }
    }
}
