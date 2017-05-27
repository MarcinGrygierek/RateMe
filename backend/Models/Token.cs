using System;
using System.Collections.Generic;

namespace Rate.ME.Models
{
    public partial class Token
    {
        public Token()
        {
            Points = new HashSet<Points>();
        }

        public long Id { get; set; }
        public long ClientId { get; set; }
        public byte[] TokenText { get; set; }
        public string ExpirationDate { get; set; }

        public virtual ICollection<Points> Points { get; set; }
        public virtual BusinessClient Client { get; set; }
    }
}
