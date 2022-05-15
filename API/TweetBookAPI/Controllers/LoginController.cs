using Microsoft.AspNetCore.Mvc;
using DataAccess.Models;
using DataAccess;
using System.Linq;
namespace TweetBookAPI
{
    [Route("login")]
    public class LoginController : Controller
    {
        [HttpGet]
        public async Task<List<User>> Get()
        {
           var users = await Queries.GetUsers();
           return users;
        }

    }
}
