using System;
using System.Collections.Generic;

namespace Rate.ME.Models
{
    public partial class BusinessClient
    {
        public BusinessClient()
        {
            Token = new HashSet<Token>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string IsVerified { get; set; }
        public string Description { get; set; }

        public virtual ICollection<Token> Token { get; set; }
    }
}
