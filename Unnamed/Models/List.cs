using System.Text.Json.Serialization;

namespace Unnamed.Models

{
    public class List
    {

        public List() {
 
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        
        public virtual ICollection<Entry> Entries { get; set; } = new List <Entry>();


        //public void addEntry(Entry entry)
        //{
        //   Entries.Add(entry);

        //}
    }
}
