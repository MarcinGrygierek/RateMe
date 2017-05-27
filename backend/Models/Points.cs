using System;
using System.Collections.Generic;

namespace Rate.ME.Models
{
    public partial class Points
    {
        public long Id { get; set; }
        public long? TokenId { get; set; }
        public long? UserId { get; set; }

        public virtual Token Token { get; set; }
        public virtual User User { get; set; }
    }
}
