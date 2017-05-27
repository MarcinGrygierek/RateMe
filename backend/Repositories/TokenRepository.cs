using Rate.ME.Models;
using System.Collections.Generic;
using System;
using System.Linq;

namespace Rate.ME.Repositories
{
    public class TokenRepository : ITokenRepository
    {
        private readonly RateMeDbContext _context;

        public TokenRepository(RateMeDbContext context)
        {
            _context = context;
        }

        public void AddToken(Token client)
        {
            _context.Token.Add(client);
            _context.SaveChanges();
        }

        public Token GetToken(Func<Token, bool> predicate)
        {
            try
            {
                return _context.Token.Where(predicate).First();
            }
            catch
            {
                return null;
            }
        }

        public IEnumerable<Token> GetTokens()
        {
            return _context.Token;
        }

        public IEnumerable<Token> GetTokens(Func<Token, bool> predicate)
        {
            try
            {
                return _context.Token.Where(predicate).ToArray();
            }
            catch
            {
                return null;
            }
        }
    }
}