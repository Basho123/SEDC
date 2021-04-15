using CinemaniaLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace CinemaniaLibrary.Models
{
    public class User : Member
    {
        public int MemberNumber { get; set; }
        public DateTime MembershipPaymentDate { get; set; }
        public TypeOfSubscription MemberSubscriptionType { get; set; }
        public List<MovieType> MemberMoviePreference { get; set; }
        public List<Movie> RentedMovies { get; set; }

        public User()
        {
        }

        public User(string username, string password, TypeOfSubscription memberSubscriptionType, List<MovieType> memberMoviePreference)
        {
            FirstName = username;
            LastName = "";
            Age = 0;
            UserName = username;
            Password = password;
            PhoneNumber = "not set";
            MembershipPaymentDate = DateTime.Now;
            DateOfRegistration = DateTime.Now;
            MemberRole = Role.User;
            MemberSubscriptionType = memberSubscriptionType;
            MemberMoviePreference = memberMoviePreference;
            RentedMovies = new List<Movie>(0);
        }
        public User(string firstName, string lastName, byte age, string userName, string password, string phoneNumber, TypeOfSubscription memberSubscriptionType, List<MovieType> memberMoviePreference)
        {
            FirstName = firstName;
            LastName = lastName;
            Age = age;
            UserName = userName;
            Password = password;
            PhoneNumber = phoneNumber;
            MembershipPaymentDate = DateTime.Now;
            DateOfRegistration = DateTime.Now;
            MemberRole = Role.User;
            MemberSubscriptionType = memberSubscriptionType;
            MemberMoviePreference = memberMoviePreference;
            RentedMovies = new List<Movie>(0);
        }

        public override void DisplayInfo()
        {           
            Console.WriteLine("--------------------------");
            Console.WriteLine($"First Name: {FirstName}");
            Console.WriteLine($"Last Name: {LastName}");
            Console.WriteLine($"Age: {Age}");
            Console.WriteLine($"User Name: {UserName}");
            Console.WriteLine($"Phone Number: {PhoneNumber}");
            Console.WriteLine($"Date Of Registration: {DateOfRegistration}");
            Console.WriteLine($"Subscription Type: {MemberSubscriptionType}");

            Console.Write($"Movie preference: ");
            MemberMoviePreference.ForEach(genre => Console.WriteLine($"{genre} "));
            Console.WriteLine();
            Console.WriteLine("--------------------------");        
        }

        public void DisplayRemainingMembership()
        {
            Console.BackgroundColor = ConsoleColor.DarkRed;
            Console.ForegroundColor = ConsoleColor.White;
            switch (MemberSubscriptionType)
            {
                case TypeOfSubscription.Monthly:
                    Console.WriteLine($"Your account is due {MembershipPaymentDate.AddMonths(1)}");
                    break;
                case TypeOfSubscription.Annualy:
                    Console.WriteLine($"Your account is due {MembershipPaymentDate.AddYears(1)}");
                    break;
                default:
                    break;
            }
            Console.BackgroundColor = ConsoleColor.Blue;
            Console.ForegroundColor = ConsoleColor.Gray;
        }
        public void RenewMembership()
        {
            MembershipPaymentDate = DateTime.Now;
        }
        public void ShowRentedMovies()
        {
            Console.WriteLine("**********************");
            if (RentedMovies.Count == 0) Console.WriteLine("You have not rented movies so far");
            else RentedMovies.ForEach(movie => movie.DisplayInfo());
            Console.WriteLine("**********************");
        }
    }
}
