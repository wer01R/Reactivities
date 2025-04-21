using System;
using Domain;

namespace Interfaces;
public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
}
