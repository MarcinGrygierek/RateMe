using System;
using System.Collections.Generic;
using System.Security.Cryptography;
namespace Rate.ME.Utils
{
    class TokenGenerator
    {
        public byte[] EncryptTokenHash(Token token)
        {
            List<byte> data = new List<byte>();
            data.AddRange(BitConverter.GetBytes(token.ClientID));
            data.AddRange(BitConverter.GetBytes(token.UserID));
            data.AddRange(BitConverter.GetBytes(token.ExpirationStamp.Ticks));

            byte[] hash;

            using(var algorithm = SHA256.Create())
            {
                hash = algorithm.ComputeHash(data.ToArray());
            }
            return hash;
        }
    }
}