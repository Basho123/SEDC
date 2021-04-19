using System;
using System.Collections.Generic;
using System.Text;
using AcademyAppLibrary.Enums;


namespace AcademyAppLibrary.Models
{
    public class Admin : Person
    {
        public Admin()
        {
            Role = Role.Admin;
            //Gender = Gender.Male;
        }
        public Admin(string firstName, string lastName, string userName, string password)
        {
            Role = Role.Admin;    
            Gender = Gender.Male;

            FirstName = firstName;
            LastName = lastName;
            UserName = userName;
            Password = password;
        }
    }
}
