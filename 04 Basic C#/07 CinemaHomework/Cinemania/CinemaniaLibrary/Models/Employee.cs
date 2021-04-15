using CinemaniaLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace CinemaniaLibrary.Models
{
    public class Employee : Member
    {
        private double Salary { get; set; }
        public short HoursPerMonth { get; set; }
        public double Bonus { get; set; }
        public Employee(): base()
        {
            FirstName = "not specified";
            LastName = "not specified";
            Age = 0;
            UserName = $"{new Random().Next(999999999)}";
            Password = $"{new Random().Next(999999999)}";
            PhoneNumber = "/";
            DateOfRegistration = DateTime.Now;
        }

        public Employee(string firstName, string lastName, byte age, string userName, string password, string phoneNumber, short hoursPerMonth, double bonus) : base()
        {
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            UserName = userName;
            Password = password;
            PhoneNumber = phoneNumber;
            DateOfRegistration = DateTime.Now;

            HoursPerMonth = hoursPerMonth;
            Bonus = bonus;
            MemberRole = Role.Employee;            
        }    

        public void SetBonus()
        {
            Bonus = HoursPerMonth >= 160 ? Bonus = 1.3 : 0;
        }

        //FOR CONVENIENCE IF SET BONUS IS NOT CALLED SO THE WORKER ALWAYS GET WHAT HE DESERVES
        public double GetBonus()
        {
          return HoursPerMonth >= 160 ? Bonus = 1.3 : 0;
        }
        public void SetSalary()
        {
            Salary = HoursPerMonth * GetBonus();
        }

        public override void DisplayInfo()
        {
            Console.BackgroundColor = ConsoleColor.Red;
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("--------------------------");
            Console.WriteLine($"First Name: {FirstName}");
            Console.WriteLine($"Last Name: {LastName}");
            Console.WriteLine($"Age: {Age}");
            Console.WriteLine($"User Name: {UserName}");
            Console.WriteLine($"Phone Number: {PhoneNumber}");
            Console.WriteLine($"Date Of Registration: {DateOfRegistration}");            
            Console.WriteLine("--------------------------");
            Console.BackgroundColor = ConsoleColor.DarkGreen;
            Console.ForegroundColor = ConsoleColor.White;
        }
    }
}
