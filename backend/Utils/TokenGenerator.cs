using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using Rate.ME.Models;

namespace Rate.ME.Utils
{
    class TokenGenerator
    {
        private byte[] EncryptTokenHash(TokenData token)
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

        public Token GenerateTokenForDB(TokenData tokenData)
        {
            Token token = new Token();
            token.ExpirationDate = tokenData.ExpirationStamp.ToString("yyyy-MM-dd HH:mm:ss");
            token.TokenData = EncryptTokenHash(tokenData);
            token.Client = tokenData.Client;

            return token;
        }
    }
}