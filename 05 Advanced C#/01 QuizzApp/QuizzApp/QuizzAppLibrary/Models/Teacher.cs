using QuizzAppLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuizzAppLibrary.Models
{
    public class Teacher : User
    {
        public Teacher()
        {
        }
        public Teacher(string firstName, string lastName, string userName, string password, Role role)
           : base(firstName, lastName, userName, password, role)
        {
            Role = Role.Teacher;
        }

    }
}
