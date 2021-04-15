using CinemaniaLibrary.Enums;
using CinemaniaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Linq;

namespace CinemaniaServices.Models
{
    static public class Assets
    {
        static public bool UsernameExists(string stringToCheck, List<Member> listOfUsers)
        {
            List<Member> userToCheck = listOfUsers
                .Where(user => stringToCheck == user.UserName)
                .ToList();
            return userToCheck.Count > 0 && userToCheck.FirstOrDefault().UserName == stringToCheck;
        }

        static public Member getUserFromUsername(string stringToCheck, List<Member> listOfUsers)
        {
            List<Member> getUser = listOfUsers
                .Where(user => user.UserName == stringToCheck)
                .ToList();
            return getUser.FirstOrDefault();
        }

        static public void RemoveUser(string stringToCheck, List<Member> listOfUsers)
        {
            List<Member> user = listOfUsers
                .Where(user => stringToCheck == user.UserName)
                .ToList();
            listOfUsers.Remove(user.FirstOrDefault());
        }

        static public bool IsValidPassword(string userToCheck, string passwordToCheck, List<Member> listOfUsers)
        {
            List<Member> correctUser = listOfUsers
                                    .Where(user => passwordToCheck == user.Password && userToCheck == user.UserName)
                                    .ToList();
            return correctUser.Count > 0;
        }
        static public Role GetUserRole(string user, List<Member> listOfUsers)
        {
            Role foundRole = Role.User;
            foreach (var item in listOfUsers)
            {
                if (user == item.UserName) foundRole = item.MemberRole;
            }
            return foundRole;
        }

        static public void RentMovie(User user, List<Movie> listOfMovies)
        {
            Console.WriteLine("Enter the number of the movie you want to rent");
            int indexOfMovie = 0;
            bool isValidNumber = int.TryParse(Console.ReadLine(), out indexOfMovie);
            indexOfMovie -= 1;

            if (isValidNumber && indexOfMovie < listOfMovies.Count && listOfMovies[indexOfMovie].IsRented == false)
            {
                listOfMovies[indexOfMovie].Owner = user.UserName;
                listOfMovies[indexOfMovie].IsRented = true;
                user.RentedMovies.Add(listOfMovies[indexOfMovie]);
                Console.WriteLine($"The movie {listOfMovies[indexOfMovie].Title} has been rented and it costed {listOfMovies[indexOfMovie].Price}$");
            }
            else if (indexOfMovie > listOfMovies.Count) Console.WriteLine("Please enter valid number of movie");
            else if (listOfMovies[indexOfMovie].IsRented) Console.WriteLine("Moive is already rented");
            else Console.WriteLine("Please enter a valid number");

        }
        static public void Login(List<Member> listOfMembers, List<Movie> listOfMovies)
        {
            bool userNameLoop = true;
            bool passwordLoop = true;

            Console.Clear();
            Console.WriteLine("╔════════════════════╗");
            Console.WriteLine("║Enter your username ║");
            Console.WriteLine("╚════════════════════╝");

            while (userNameLoop)
            {
                Console.WriteLine("Type 3 to return back");
                string userName = Console.ReadLine();
                if (userName == "3") break;
                else if (UsernameExists(userName, listOfMembers))
                {
                    userNameLoop = false;

                    Console.Clear();
                    Console.WriteLine("╔════════════════════╗");
                    Console.WriteLine("║Enter your password ║");
                    Console.WriteLine("╚════════════════════╝");

                    while (passwordLoop)
                    {
                        Console.WriteLine("Type 3 to return back");
                        string password = Console.ReadLine();
                        if (password == "3") break;
                        if (IsValidPassword(userName, password, listOfMembers))
                        {
                            passwordLoop = false;

                            switch (GetUserRole(userName, listOfMembers))
                            {
                                case Role.Employee:
                                    Color.Green();
                                    Console.Clear();
                                    Console.WriteLine("╔══════════════════╗");
                                    Console.WriteLine($"║Welcome {userName} ");
                                    Console.WriteLine("╚══════════════════╝");
                                    Console.WriteLine("");

                                    Console.WriteLine("╔════════════════════════════════════════╗");
                                    Console.WriteLine("║Press 1 to display all movies           ║");
                                    Console.WriteLine("║Press 2 to see all registered members   ║");
                                    Console.WriteLine("║Press 3 to delete a member from database║");
                                    Console.WriteLine("║Press 4 to Quit                         ║");
                                    Console.WriteLine("╚════════════════════════════════════════╝");
                                    Console.WriteLine("");

                                    while (true)
                                    {
                                        char employeeChoice = Console.ReadKey(true).KeyChar;

                                        Console.Clear();                                       
                                        Console.WriteLine("╔════════════════════════════════════════╗");

                                        if (employeeChoice == '1') Color.InvertedGreen();
                                        Console.WriteLine("║Press 1 to display all movies           ║");
                                        Color.Green();

                                        if (employeeChoice == '2') Color.InvertedGreen();
                                        Console.WriteLine("║Press 2 to see all registered members   ║");
                                        Color.Green();

                                        if (employeeChoice == '3') Color.InvertedGreen();
                                        Console.WriteLine("║Press 3 to delete a member from database║");
                                        Color.Green();
                                       
                                        Console.WriteLine("║Press 4 to Quit                         ║");  
                                        Console.WriteLine("╚════════════════════════════════════════╝");
                                        Console.WriteLine("");

                                        if (employeeChoice == '4') break;
                                        else if (employeeChoice == '1') Print.All(listOfMovies);
                                        else if (employeeChoice == '2') Print.All(listOfMembers);
                                        else if (employeeChoice == '3')
                                        {
                                            Print.All(listOfMembers);
                                            Console.WriteLine("Enter member username to be deleted!!!");
                                            string memberToDelete = Console.ReadLine();
                                            if (UsernameExists(memberToDelete, listOfMembers))
                                            {
                                                RemoveUser(memberToDelete, listOfMembers);
                                                Console.WriteLine($"{memberToDelete} has been successfully deleted from the database!!!");
                                                Console.WriteLine("");
                                            }
                                            else Console.WriteLine("No such user exists");
                                        }
                                    }
                                    break;
                                case Role.User:

                                    Color.DarkRed();
                                    Console.Clear();

                                    Member member = getUserFromUsername(userName, listOfMembers);
                                    User user = (User)member;

                                    Console.WriteLine("╔══════════════════╗");
                                    Console.WriteLine($"║Welcome {user.UserName} ");
                                    Console.WriteLine("╚══════════════════╝");
                                    Console.WriteLine("");

                                    Console.WriteLine("╔════════════════════════════════════════╗");
                                    Console.WriteLine("║Press 1 to rent a movie                 ║");
                                    Console.WriteLine("║Press 2 to check account information    ║");
                                    Console.WriteLine("║Press 3 to see rented movies            ║");
                                    Console.WriteLine("║Press 4 to Quit                         ║");
                                    Console.WriteLine("╚════════════════════════════════════════╝");
                                    Console.WriteLine("");
                                    while (true)
                                    {
                                        char employeeChoice = Console.ReadKey(true).KeyChar;
                                        Console.Clear();
                                        Console.WriteLine("╔════════════════════════════════════════╗");
                                        if (employeeChoice == '1') Color.InvertedDarkRed();
                                        Console.WriteLine("║Press 1 to rent a movie                 ║");
                                        Color.DarkRed();

                                        if (employeeChoice == '2') Color.InvertedDarkRed();
                                        Console.WriteLine("║Press 2 to check account information    ║");
                                        Color.DarkRed();

                                        if (employeeChoice == '3') Color.InvertedDarkRed();
                                        Console.WriteLine("║Press 3 to see rented movies            ║");
                                        Color.DarkRed();

                                        Console.WriteLine("║Press 4 to Quit                         ║");
                                        Console.WriteLine("╚════════════════════════════════════════╝");
                                        Console.WriteLine("");

                                        if (employeeChoice == '4') break;
                                        else if (employeeChoice == '1')
                                        {
                                            Print.All(listOfMovies);
                                            RentMovie(user, listOfMovies);
                                            Print.All(listOfMovies);
                                        }
                                        else if (employeeChoice == '2')
                                        {
                                            user.DisplayInfo();
                                            user.DisplayRemainingMembership();
                                            Console.WriteLine("");
                                        }
                                        else if (employeeChoice == '3')
                                        {
                                            user.ShowRentedMovies();
                                        }
                                    }
                                    break;
                                default:
                                    break;
                            }
                        }
                        else Console.WriteLine("Wrong password, please reenter your password");
                    }
                }
                else Console.WriteLine("No such user found in database");
            }

        }
        static public User Register(List<Member> listOfMembers, List<Movie> listOfMovies)
        {
            bool userNameLoop = true;
            bool passwordLoop = true;
            bool firstNameLoop = true;
            bool lastNameLoop = true;
            bool mobilePhoneLoop = true;

            User newUser = new User();
            Regex regexForNumbers = new Regex(@"^[0-9]+$");


            Console.Clear();
            Console.WriteLine("╔════════════════════════╗");
            Console.WriteLine("║Enter your new username ║");
            Console.WriteLine("╚════════════════════════╝");

            while (userNameLoop)
            {
                Console.WriteLine("Type 3 to return back");
                string userName = Console.ReadLine();
                if (userName == "3") break;
                else if (UsernameExists(userName, listOfMembers)) Console.WriteLine("Username already exists, please enter another username");
                else if (userName.Length > 3)
                {
                    Console.Clear();
                    Console.WriteLine("╔══════════════════════════════════════════════════╗");
                    Console.WriteLine("║Enter your new password, must be 6 characters long║");
                    Console.WriteLine("╚══════════════════════════════════════════════════╝");

                    while (passwordLoop)
                    {
                        Console.WriteLine("Type 3 to return back");
                        string password = Console.ReadLine();
                        if (password == "3") break;
                        else if (password.Length > 6)
                        {

                            Console.WriteLine("╔══════════════════════╗");
                            Console.WriteLine("║Enter your First Name ║");
                            Console.WriteLine("╚══════════════════════╝");
                            while (firstNameLoop)
                            {
                                Console.WriteLine("Type 3 to return back");
                                string firstName = Console.ReadLine();
                                if (firstName == "3") break;
                                else if (regexForNumbers.IsMatch(userName)) Console.WriteLine("Please enter valid name with letters");
                                else if (firstName.Length > 1)
                                {
                                    firstNameLoop = false;
                                    Console.WriteLine("╔══════════════════════╗");
                                    Console.WriteLine("║Enter your Last Name  ║");
                                    Console.WriteLine("╚══════════════════════╝");
                                    while (lastNameLoop)
                                    {
                                        Console.WriteLine("Type 3 to return back");
                                        string lastName = Console.ReadLine();
                                        if (lastName == "3") break;
                                        if (lastName.Length > 1)
                                        {
                                            lastNameLoop = false;
                                            Console.WriteLine("╔══════════════════════════════╗");
                                            Console.WriteLine("║Enter your Mobile Phone Number║");
                                            Console.WriteLine("╚══════════════════════════════╝");
                                            while (mobilePhoneLoop)
                                            {
                                                Console.WriteLine("Type 3 to return back");
                                                string mobilePhoneNumber = Console.ReadLine();
                                                if (mobilePhoneNumber == "3") break;
                                                if (mobilePhoneNumber.Length == 9 && regexForNumbers.IsMatch(mobilePhoneNumber))
                                                {
                                                    mobilePhoneLoop = false;

                                                    newUser.MemberRole = Role.User;
                                                    newUser.DateOfRegistration = DateTime.Now;
                                                    newUser.MembershipPaymentDate = DateTime.Now;
                                                    newUser.MemberSubscriptionType = TypeOfSubscription.Monthly;
                                                    newUser.RentedMovies = new List<Movie>();
                                                    newUser.MemberMoviePreference = new List<MovieType>();
                                                    newUser.UserName = userName;
                                                    newUser.Password = password;
                                                    newUser.FirstName = firstName;
                                                    newUser.LastName = lastName;
                                                    newUser.PhoneNumber = mobilePhoneNumber;

                                                    Color.Red();
                                                    Console.WriteLine($"User {newUser.UserName} successfuly created");
                                                    Color.Blue();
                                                    Console.ReadLine();
                                                    return newUser;
                                                }
                                                else Console.WriteLine("Invalid format");
                                            }
                                        }
                                        else Console.WriteLine("Last name too short");
                                    }
                                }
                                else Console.WriteLine("Name too short");
                            }
                        }
                        else Console.WriteLine("Please enter more than 6 characters long");
                    }
                }
                else Console.WriteLine("Please enter username longer than 3 characters");
            }
            return newUser;
        }
    }
}

