using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Unnamed.Models
{
    public class Entry
    {
       

        public Entry() { }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        //[JsonIgnore]
        //public virtual List List { get; set; }
        public Guid ListId { get; set; }

        
        public DateTime Date { get; set; }

    }

}
