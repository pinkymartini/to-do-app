using Microsoft.EntityFrameworkCore;
using Unnamed.Models;
using Microsoft.EntityFrameworkCore.Infrastructure;


namespace Unnamed.Data
{
    public class ToDoListDbContext : DbContext
    {
        public ToDoListDbContext(DbContextOptions options) : base(options) {
        }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<List>(entity =>
        //    {
        //        entity.HasMany(x => x.Entries)
        //        .WithOne(x=>x.List)
        //        .OnDelete(DeleteBehavior.Cascade);
        //    });

        //}


        //this fixed one-to-many issue??
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
            

        }
        public DbSet<List> ToDoLists { get; set; }
        public DbSet<Entry> Entry { get; set; }

        public DbSet<User> Users { get; set; }

    }
}