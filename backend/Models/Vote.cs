using System;
using System.Collections.Generic;

namespace Rate.ME.Models
{
    public partial class Vote
    {
        public long Id { get; set; }
        public long TokenId { get; set; }
        public long ProductRate { get; set; }
        public long ServiceRate { get; set; }
        public long RatioRate { get; set; }
        public string Comment { get; set; }

        public virtual Token Token { get; set; }
    }
}
