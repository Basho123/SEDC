using MillionaireQuizServices;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Text.RegularExpressions;

namespace MillionaireQuizLibrary
{
    public static class Database
    {
        static public List<User> Users { get; set; }

        static Database()
        {
            Users = new List<User>();

            //string text = File.ReadAllText(@"..\..\..\..\ProgramData\Users.txt");
            string text = File.ReadAllText(@"..\..\..\..\MillionaireQuizLibrary\TextDatabase\Users.txt");
            string[] users = text.Split(';');

            for (int i = 0; i < users.Length - 1; i++)
            {
                string[] userProperties = users[i].Split(',');
                Users.Add(new User(userProperties[0].Trim(), userProperties[1].Trim(), userProperties[2].Trim(), userProperties[3].Trim(), int.Parse(userProperties[4].Trim()), int.Parse(userProperties[5].Trim())));
            }
        }

        public static void Reset()
        {
            //StreamWriter file = new StreamWriter(@"..\..\..\..\ProgramData\Users.txt");
            StreamWriter file = new StreamWriter(@"..\..\..\..\MillionaireQuizLibrary\TextDatabase\Users.txt");
            file.Close();
        }

        public static void Update()
        {
            List<string> temp = new List<string>();

            foreach (User user in Users)
            {
                     temp.Add($"{user.FirstName}," +
                     $"{user.LastName}," +
                     $"{user.UserName}," +
                     $"{user.Password}," +
                     $"{user.Points}," +
                     $"{user.TimesUsedHelp}," +
                     $";");
            }

            Reset();
            //using StreamWriter file = File.AppendText(@"..\..\..\..\ProgramData\Users.txt");
            using StreamWriter file = File.AppendText(@"..\..\..\..\MillionaireQuizLibrary\TextDatabase\Users.txt");

            foreach (string item in temp)
            {
                file.WriteLine(item);
            }
            file.Close();            
        }

        public static void AddNewUser(User user)
        {
            Users.Add(user);

            //using StreamWriter file = File.AppendText(@"..\..\..\..\ProgramData\Users.txt");
            using StreamWriter file = File.AppendText(@"..\..\..\..\MillionaireQuizLibrary\TextDatabase\Users.txt");

            file.WriteLine($"{user.FirstName}," +
            $"{user.LastName}," +
            $"{user.UserName}," +
            $"{user.Password}," +
            $"{user.Points}," +
            $"{user.TimesUsedHelp}," +
            $";");
            file.Close();

        }

        public static User CreateUser()
        {
            while (true)
            {
                User user = new User();

                Console.Clear();

                while (user.FirstName.Length < 2)
                {
                    Console.WriteLine("Enter First Name");
                    user.FirstName = Console.ReadLine();
                    if (user.FirstName.Length == 0)
                    {
                        Console.WriteLine("Please input a First Name in the field");
                        continue;
                    }
                    break;
                }

                while (user.LastName.Length == 0)
                {
                    Console.WriteLine("Enter Last Name");
                    user.LastName = Console.ReadLine();

                    if (user.LastName.Length == 0)
                    {
                        Console.WriteLine("Please input a Last Name in the field");
                        continue;
                    }
                    break;
                }

                while (user.UserName.Length == 0)
                {
                    Console.WriteLine("Enter User Name");
                    user.UserName = Console.ReadLine();

                    if (Validate.UsernameExistance(user.UserName))
                    {
                        Console.WriteLine("Username is already taken");
                        user.UserName = "";
                        continue;
                    }
                    if (!Validate.UsernameLength(user.UserName))
                    {
                        Console.WriteLine("Username is too short, please enter 6 or more characters");
                        user.UserName = "";
                        continue;
                    }

                    break;
                }

                while (true)
                {
                    Console.WriteLine("Enter Password");
                    user.Password = Console.ReadLine();

                    if (!Validate.PasswordIsValid(user.Password))
                    {
                        Console.WriteLine("Password is not valid, please enter password with 6 or more characters, not containing ',' and ';'");
                        continue;
                    }
                    break;
                }

                Console.WriteLine($"User {user.UserName} succsessfuly created");
                Assets.PressAnyKeyToContinue();
                return user;
            }
        }

        public static void ListUsers()
        {
            foreach (User item in Users)
            {
                Console.WriteLine("============================");
                Console.WriteLine("First name: {0}", item.FirstName);
                Console.WriteLine("Last name: {0}", item.LastName);
                Console.WriteLine("User name: {0}", item.UserName);
                Console.WriteLine("Password: {0}", item.Password);
                Console.WriteLine("Money Won: {0} $", item.Points);
                Console.WriteLine("How many times used help: {0}", item.TimesUsedHelp);
                Console.WriteLine("============================");

            }
        }
    }
}
