using System;
using Rate.ME.Models;

namespace Rate.ME.Utils
{
    class TokenData
    {
        public long ClientID {get; private set;}
        public BusinessClient Client {get; private set;}
        public long UserID {get; private set;}
        public DateTime ExpirationStamp {get; private set;}

        public TokenData(BusinessClient client, User user, DateTime stamp)
        {
            ClientID = client.Id;
            UserID = user.Id;
            //48h expiration
            ExpirationStamp = stamp.AddDays(2);
        }
    }
}