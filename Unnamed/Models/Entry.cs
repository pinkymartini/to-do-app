using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Unnamed.Models
{
    public enum PriorityLevel
    {
        HIGH,
        LOW,
        MEDIUM
    } 

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

        public bool IsCompleted { get; set; }


         [RegularExpression("HIGH|LOW|MEDIUM", ErrorMessage ="please enter a valid priority value")]

        //[EnumDataType(typeof(PriorityLevel))]
        public string PriorityLevel { get; set; }

    }

}
