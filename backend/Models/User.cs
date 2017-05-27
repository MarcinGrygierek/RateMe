using System;
using System.Collections.Generic;

namespace Rate.ME.Models
{
    public partial class User
    {
        public User()
        {
            Points = new HashSet<Points>();
        }

        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Points> Points { get; set; }
    }
}
