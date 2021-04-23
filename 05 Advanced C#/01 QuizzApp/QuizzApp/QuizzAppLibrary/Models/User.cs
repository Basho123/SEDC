using QuizzAppLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuizzAppLibrary.Models
{
    public abstract class User
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }

        public User()
        {

        }
        public User(string firstName, string lastName, string userName, string password, Role role)
        {
            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
            Role = role;
        }
    }
}
