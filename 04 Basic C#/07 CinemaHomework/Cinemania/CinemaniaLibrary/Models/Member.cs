using CinemaniaLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace CinemaniaLibrary.Models
{
    public class Member
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime DateOfRegistration { get; set; }
        public Role MemberRole { get; set; }

        protected Member()
        {
         
        }

        protected Member(string firstName, string lastName, int age, string userName, string password, string phoneNumber, Role memberRole)
        {
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            UserName = userName;
            Password = password;
            PhoneNumber = phoneNumber;
            DateOfRegistration = DateTime.Now;
            MemberRole = memberRole;
        }

        //experimenting with defaultvalues   

        public virtual void DisplayInfo()
        {
            Console.WriteLine($"{FirstName}, {LastName} | Registered on: {DateOfRegistration}");
        }





    }
}
