using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Unnamed.Data;
using Unnamed.Models;

namespace Unnamed.Services
{
    public interface IListService
    {
        public Task<ICollection<Unnamed.Models.List?>> getLists();
        public Task<Unnamed.Models.List?> getList([FromRoute] Guid id);
        public Task<Unnamed.Models.List?> postList([FromBody] List list);
        public Task<Unnamed.Models.List?> updateList([FromRoute] Guid id, List updatedList);
        public Task<Unnamed.Models.List?> addEntryToList([FromRoute] Guid id, Entry entry);
        public Task<Unnamed.Models.List?> deleteList([FromRoute] Guid id);
    }


    public class ListService : IListService
    {
        private readonly ToDoListDbContext _repo;

        public ListService(ToDoListDbContext repo)
        {
            _repo = repo;
        }

        public async Task<ICollection<Unnamed.Models.List?>> getLists()
        {

            var lists = await _repo.ToDoLists.ToListAsync();

            return lists;
        }

        public async Task<Unnamed.Models.List?> getList([FromRoute] Guid id)
        {
            var list = await _repo.ToDoLists.FirstOrDefaultAsync(x => x.Id == id);

            return list;
        }

        public async Task<Unnamed.Models.List?> postList([FromBody] List list)
        {
            list.Id = Guid.NewGuid();

             await _repo.ToDoLists.AddAsync(list);
            //await _repo.ToDoLists.Append(list);
            await  _repo.SaveChangesAsync();

            return list;

        }

        public async Task<Unnamed.Models.List?> updateList([FromRoute] Guid id, List updatedList)
        {
            var list = await _repo.ToDoLists.FindAsync(id);

            if (updatedList != null)
            {
                list.Name = updatedList.Name;
                await _repo.SaveChangesAsync();
                return list;
            }
                
            else return null;

        }

        public async Task<Unnamed.Models.List?> addEntryToList([FromRoute] Guid id, Entry entry)
        {
            var list = await _repo.ToDoLists.FindAsync(id);

            if (list != null)
            {
                list.Entries.Add(entry);
                await _repo.SaveChangesAsync();
                return list;
            }
            else return null;
        }

        public async Task<Unnamed.Models.List?> deleteList([FromRoute] Guid id)
        {
            var list = await _repo.ToDoLists.FindAsync(id);

            if (list != null)
            {
                _repo.ToDoLists.Remove(list);
                
                await _repo.SaveChangesAsync();
                return list;
            }
            else
            {
                return null;
            }

        }


    }
}
