using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Principal;
using Unnamed.Data;
using Unnamed.Models;
using Unnamed.Services;

namespace Unnamed.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize(Roles ="Admin")]
    public class ListController : Controller
    {
        private readonly IListService _listService;

        private readonly ToDoListDbContext _db;

        public delegate Task<IActionResult> FlagDelegate(Guid id, int flag);

        public ListController(IListService listService , ToDoListDbContext db)
        {
            _listService = listService;
            _db = db;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> getLists()
        {
            var lists = await _listService.getLists();

            if (lists == null)
            {
                return NotFound();
            }
            else return Ok(lists);

        }

        [HttpGet]
        [Route("{id:Guid}")]
        [AllowAnonymous]
        public async Task<IActionResult> getList([FromRoute] Guid id)
        {
            var list = await _listService.getList(id);
            if (list == null)
            {
                return NotFound();
            }
            else return Ok(list);

        }

        [HttpPost]
        public async Task<IActionResult> postList([FromBody] List list)
        {
            await _listService.postList(list);

            return Ok(list);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        //add entry to a list
        public async Task<IActionResult> updateList([FromRoute] Guid id, List updatedList)
        {
            var list = await _listService.updateList(id, updatedList);

            if (list == null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }
        }

        [HttpPut]
        [Route("{id:Guid}/addEntry")]
        //add entry to a list
        public async Task<IActionResult> addEntryToList([FromRoute] Guid id, Entry entry)
        {
            var list = await _listService.addEntryToList(id, entry);
            if (list == null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> deleteList([FromRoute] Guid id)
        {
            var list = await _listService.deleteList(id);
            

            if (list == null)
            {
                return NotFound();
            }
            else
            {
                return Ok();
            }

        }

        [HttpGet]
        [Route("{id:Guid}/FilterByDate")]
        [AllowAnonymous]
        public async Task<IActionResult> OrderEntriesByDate([FromRoute] Guid id, int flag)
        {
            var list = await _db.ToDoLists.FindAsync(id);
            ICollection<Entry> filteredList;

            if (list == null) return NotFound("list not found"); 

            //from latest to earliest
            else if (flag == 0)  filteredList = list.Entries.OrderByDescending(x => x.Date).ToList(); 
            //form earliest to latest
            else if(flag==1)  filteredList = list.Entries.OrderBy(x => x.Date).ToList(); 

            else return BadRequest("enter a valid filter value"); 

            return Ok(filteredList);

        }

        [HttpGet]
        [Route("{id:Guid}/FilterAlphabetically")]
        [AllowAnonymous]
        public async Task <IActionResult> OrderEntriesAlphabetically([FromRoute] Guid id , int flag)
        {
            var list = await _db.ToDoLists.FindAsync(id);
            ICollection<Entry> filteredList;

            if (list == null) return NotFound("list not found");

            //from a-z
            else if (flag == 0) filteredList = list.Entries.OrderByDescending(x => x.Name).ToList();
            //form z-a
            else if (flag == 1) filteredList = list.Entries.OrderBy(x => x.Name).ToList();

            else return BadRequest("enter a valid filter value");

            return Ok(filteredList);

        }

        //public ICollection<Entry> order(Guid id, FlagDelegate filter)
        //{
        //  if(filter())
        //}

    }
}
