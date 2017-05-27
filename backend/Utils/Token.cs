using System;
using Rate.ME.Models;

namespace Rate.ME.Utils
{
    class Token
    {
        public long ClientID {get; private set;}
        public long UserID {get; private set;}
        public DateTime ExpirationStamp {get; private set;}

        public Token(BusinessClient client, User user, DateTime stamp)
        {
            ClientID = client.Id;
            UserID = user.Id;
            //48h expiration
            ExpirationStamp = stamp.AddDays(2);
        }
    }
}