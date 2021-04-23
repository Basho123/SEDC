using QuizzAppLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace QuizzAppLibrary.Models
{
    public class Student : User
    {
        public int Points { get; set; } = 0;
        public bool HasPlayed { get; set; }
        public Student()
        {

        }
        public Student(string firstName, string lastName, string userName, string password, Role role)
            :base(firstName, lastName, userName, password, role)
        {
            Role = Role.Student;
        }
    }
}
