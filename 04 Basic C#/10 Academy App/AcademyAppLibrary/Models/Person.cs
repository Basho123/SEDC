using System;
using AcademyAppLibrary.Enums;
using System.Collections.Generic;
using System.Text;

namespace AcademyAppLibrary.Models
{
    public class Person
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public Gender Gender { get; set; }

        public Role Role { get; set; }

        public Person()
        {

        }

        public virtual void DisplayInfo()
        {
            Console.WriteLine("===========================");
            Console.WriteLine("First Name    : {0}",FirstName);
            Console.WriteLine("Last  Name    : {0}", LastName);
            Console.WriteLine("User  Name    : {0}", UserName);
            Console.WriteLine("Role          : {0}", Role);           
            Console.WriteLine("===========================");
        }
    }
}
