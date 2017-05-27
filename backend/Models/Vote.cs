using System;
using System.Collections.Generic;

namespace Rate.ME.Models
{
    public partial class Vote
    {
        public long Id { get; set; }
        public long TokenId { get; set; }
        public long StarsNumber { get; set; }

        public virtual Token Token { get; set; }
    }
}
