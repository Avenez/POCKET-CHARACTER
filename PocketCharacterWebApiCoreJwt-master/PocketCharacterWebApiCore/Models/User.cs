using System;
using System.Collections.Generic;

namespace PocketCharacterWebApiCore.Models;

public partial class User
{
    public int IdUser { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Role { get; set; } = null!;

    //public virtual ICollection<Character> Characters { get; set; } = new List<Character>();
}
