using Rate.ME.Models;
using System.Collections.Generic;
using System;

namespace Rate.ME.Repositories
{
    public interface ITokenRepository
    {
        void AddToken(Token client);
        //void RemoveToken(Token client);
        IEnumerable<Token> GetTokens();
        IEnumerable<Token> GetTokens(Func<Token, bool> predicate);
        Token GetToken(Func<Token, bool> predicate);
        //void UpdateToken(Token client);

    }
}