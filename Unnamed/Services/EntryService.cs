using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Unnamed.Data;
using Unnamed.Models;

namespace Unnamed.Services
{
    public interface IEntryService
    {
        public Task<ICollection<Unnamed.Models.Entry?>> getEntries();

        public Task<Unnamed.Models.Entry?> getEntry([FromRoute] Guid id);

        public Task<Unnamed.Models.Entry?> updateEntry([FromRoute] Guid id, Entry updatedEntry);

        public Task<Unnamed.Models.Entry?> deleteEntry([FromRoute] Guid id);

        public Task <ICollection<Entry>> getPagedEntries(ListParameters listParameters);

    }

    public class EntryService : IEntryService
    {
        private readonly ToDoListDbContext _repo;
        
        public EntryService(ToDoListDbContext repo)
        {

            _repo = repo;
        }

        public async Task<ICollection<Unnamed.Models.Entry>> getEntries()
        {
            var entries = await _repo.Entry.ToListAsync();

            

            return entries;
        }

     



        public async Task<Unnamed.Models.Entry?> getEntry([FromRoute] Guid id)
        {
            var list = await _repo.Entry.FirstOrDefaultAsync(x => x.Id == id);

            return list;

        }

        public async Task <ICollection<Entry>>getPagedEntries(ListParameters listParameters)
        {
            var lists = await _repo.Entry
               .OrderBy(x => x.Id)
               .Skip((listParameters.PageNumber - 1) * listParameters.PageSize)
               .Take(listParameters.PageSize)
               .ToListAsync();


            
            return lists;

        }

        public async Task<Unnamed.Models.Entry?> updateEntry([FromRoute] Guid id, Entry updatedEntry)
        {
            var entry = await _repo.Entry.FindAsync(id);

            if (entry != null)
            {
                entry.Description = updatedEntry.Description;
                entry.Name = updatedEntry.Name;
                entry.Date = updatedEntry.Date;
                entry.IsCompleted= updatedEntry.IsCompleted;
                entry.PriorityLevel = updatedEntry.PriorityLevel;
                await _repo.SaveChangesAsync();
                return entry;
            }
            else
            {
                return null;

            }

        }

        public async Task<Unnamed.Models.Entry?> deleteEntry([FromRoute] Guid id)
        {
            var entry = await _repo.Entry.FindAsync(id);

            if (entry != null)
            {
                _repo.Remove(entry);
                await _repo.SaveChangesAsync();
                return entry;
            }
            else return null;

           

        }





    }
}
