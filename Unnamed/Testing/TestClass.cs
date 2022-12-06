using Microsoft.AspNetCore.Mvc;
using Unnamed.Data;
using Unnamed.Models;

using Faker;

namespace Unnamed.Testing
{
    [ApiController]
    [Route("[controller]")]
    public class TestClass : Controller
    {

        private readonly ToDoListDbContext _context;
        public TestClass(ToDoListDbContext context)
        {

            _context = context;
        }

        [HttpGet]

        public IActionResult PopulateUsers()
        {




            _context.Users.Add(
                new User { Password = "1234", UserName = "magician", Role = "Admin" }
                );

            _context.Users.Add(
                new User { Password = "5678", UserName = "emotion", Role = "Admin" }
                );

            _context.Users.Add(
            new User { Password = "1423", UserName = "casper", Role = "Visitor" }
                );

            _context.Users.Add(
            new User { Password = "8996", UserName = "user_" + Name.First, Role = "Visitor" }
                );

            _context.SaveChanges();

            return Ok("Database populated.");
        }


    }
}
