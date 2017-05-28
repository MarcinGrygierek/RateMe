using Rate.ME.Models;
using System.Collections.Generic;
using System;

namespace Rate.ME.Repositories
{
    public interface IPointsRepository
    {
        void AddPoints(Points points);
        void RemovePoints(Points points);
        IEnumerable<Points> GetAllPoints();
        IEnumerable<Points> GetAllPoints(Func<Points, bool> predicate);
        Points GetPoints(Func<Points, bool> predicate);
        void UpdatePoints(Points points);

    }
}