using System;
using System.Collections.Generic;

namespace Rate.ME.Models
{
    public partial class Vote
    {
        public long Id { get; set; }
        public long TokenId { get; set; }
        public double ProductRate { get; set; }
        public double ServiceRate { get; set; }
        public double RatioRate { get; set; }
        public string Comment { get; set; }

        public virtual Token Token { get; set; }
    }
}
