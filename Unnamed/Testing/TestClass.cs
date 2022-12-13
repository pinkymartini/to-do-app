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
            _context.Entry.Add(
                new Entry
                {
                    Date= DateTime.Now,
                    Description = "nono",
                    IsCompleted =true,
                    PriorityLevel = PriorityLevel.HIGH.ToString(),
                    Name = "no name",
                    ListId = new Guid("C0D7D9CA-B9FF-4D7F-3B99-08DAD109B167"),

                });
            _context.SaveChanges();

            return Ok("Database populated.");
        }


    }
}
