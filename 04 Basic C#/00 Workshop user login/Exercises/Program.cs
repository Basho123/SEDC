using Exercises.Entities;
using System;

namespace Exercises
{
    class Program
    {
        private const string V = "message";

        static void Main(string[] args)
        {
            Console.WriteLine("Hello users");

            User[] users = new User[2]
            {
                new User(2435435, "Ivan", "gegege", new string[] {"hehe","haha" }),
                new User(23421, "Admin", "Admin",new string [] {"huhu", "gigi" }),
            };

            while (true)
            {
                Console.Clear();
                Console.WriteLine("-------------");
                Console.WriteLine("Current users in database:");
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.BackgroundColor = ConsoleColor.Yellow;
                foreach (User user in users)
                {
                    Console.WriteLine(user.UserName);
                }
                Console.ForegroundColor = ConsoleColor.White;
                Console.BackgroundColor = ConsoleColor.Black;
                Console.WriteLine("-------------");
                Console.WriteLine("Press 1 to login, press 2 to register new account, press 3 to quit");
                byte userChoice = 0;

                bool isValidNumberOfUserChoice = byte.TryParse(Console.ReadLine(), out userChoice);

                if (isValidNumberOfUserChoice)
                {
                    if (userChoice == 1)
                    {
                        while (true)
                        {
                            {
                                Console.WriteLine("Enter 'Q' to return to previous menu");
                                Console.WriteLine("Enter your user name:");
                                string userName = Console.ReadLine();
                                if (userName == "q" || userName == "Q") break;
                                bool userExistence = false;
                                foreach (User user in users)
                                {
                                    if (user.UserName == userName)
                                    {
                                        userExistence = true;
                                        while (true)
                                        {
                                            Console.WriteLine("Enter 'Q' to return to previous menu");
                                            Console.WriteLine("Please enter password");
                                            string password = Console.ReadLine();
                                            if (password == "q" || password == "Q") break;
                                            else if (user.Password == password)
                                            {
                                                Console.ForegroundColor = ConsoleColor.Black;
                                                Console.BackgroundColor = ConsoleColor.White;
                                                Console.Clear();
                                                Console.WriteLine($"Welcome {user.UserName}, do you want to leave any messages?");
                                                Console.WriteLine("Press 1 to leave new message, \npress 2 to print all messages, \npress Q to end leaving messages ");
                                                while (true)
                                                {
                                                    Console.WriteLine("Enter your choice:");
                                                    string messageChoice = Console.ReadLine();
                                                    if (messageChoice == "q" || messageChoice == "Q")
                                                    {
                                                        Console.ForegroundColor = ConsoleColor.White;
                                                        Console.BackgroundColor = ConsoleColor.Black;
                                                        Console.Clear();
                                                        break;
                                                    }
                                                    else if (messageChoice == "1")
                                                    {
                                                        Console.WriteLine("----------------------");
                                                        Console.WriteLine("Enter message to be added");
                                                        string messageToBeAdded = Console.ReadLine();
                                                        user.AddMessage(user.UserMessages, messageToBeAdded);
                                                        Console.ForegroundColor = ConsoleColor.White;
                                                        Console.BackgroundColor = ConsoleColor.Red;
                                                        Console.WriteLine($"Message {messageToBeAdded} has been successfully added");
                                                        Console.ForegroundColor = ConsoleColor.Black;
                                                        Console.BackgroundColor = ConsoleColor.White;
                                                        Console.WriteLine("----------------------------------------------------------");


                                                    }
                                                    else if (messageChoice == "2")
                                                    {
                                                        Console.ForegroundColor = ConsoleColor.White;
                                                        Console.BackgroundColor = ConsoleColor.Red;
                                                        for (int i = 1; i < user.UserMessages.Length; i++)
                                                        {
                                                            Console.WriteLine($"Message number {i + 1}: {user.UserMessages[i]}");
                                                        }
                                                        Console.ForegroundColor = ConsoleColor.Black;
                                                        Console.BackgroundColor = ConsoleColor.White;
                                                    }
                                                }
                                            }
                                            else
                                            {
                                                Console.Clear();
                                                Console.WriteLine("Wrong password, please retry");
                                            }
                                        }
                                    }
                                    else continue;
                                }
                                Console.Clear();
                                if (userExistence == false)
                                {
                                    Console.ForegroundColor = ConsoleColor.White;
                                    Console.BackgroundColor = ConsoleColor.Red;
                                    Console.WriteLine("NO SUCH USER IN DATABASE!!!");
                                    Console.ForegroundColor = ConsoleColor.White;
                                    Console.BackgroundColor = ConsoleColor.Black;
                                }
                            }
                        }
                    }
                    else if (userChoice == 2)
                    {
                        while (true)
                        {
                            Console.Clear();
                            Console.WriteLine("Enter q to return to previous menu");
                            Console.WriteLine("Enter new user name");
                            string newUserString = Console.ReadLine();
                            bool userCanCreate = true;
                            if (newUserString == "q" || newUserString == "Q") break;

                            foreach (User user in users)
                            {
                                if (user.UserName == newUserString)
                                {
                                    userCanCreate = false;
                                }
                                else continue;
                            }
                            if (userCanCreate)
                            {
                                if (newUserString.Length > 2)
                                {
                                    while (true)
                                    {
                                        Console.Clear();
                                        Console.WriteLine("press Q to return to previous menu");
                                        Console.WriteLine("Enter password");
                                        string newPassword = Console.ReadLine();
                                        if (newPassword == "q" || newPassword == "Q") break;
                                        else if (newPassword.Length > 3)
                                        {
                                            Console.ForegroundColor = ConsoleColor.Black;
                                            Console.BackgroundColor = ConsoleColor.White;
                                            Console.Clear();
                                            Console.WriteLine($"Welcome {newUserString}, your password is {newPassword}, write is somewhere");
                                            Console.WriteLine("Do you want to leave a message? Type your messages, when you finish press Q to stop leaving messages");
                                            string[] arrayOfUserMessages = new string[1];
                                            while (true)
                                            {
                                                Console.WriteLine("Enter message");
                                                string message = Console.ReadLine();
                                                if (message == "q" || message == "Q")
                                                {
                                                    Console.ForegroundColor = ConsoleColor.White;
                                                    Console.BackgroundColor = ConsoleColor.Black;
                                                    break;
                                                }
                                                else
                                                {
                                                    Array.Resize(ref arrayOfUserMessages, arrayOfUserMessages.Length + 1);
                                                    arrayOfUserMessages[arrayOfUserMessages.Length - 1] = message;
                                                };
                                            }
                                            Array.Resize(ref users, users.Length + 1);
                                            users[users.Length - 1] = new User(121321, newUserString, newPassword, arrayOfUserMessages);
                                            Console.ForegroundColor = ConsoleColor.White;
                                            Console.BackgroundColor = ConsoleColor.Black;
                                        }
                                        else Console.WriteLine("New password too short, please enter password longer than 3 characters");
                                    }
                                }
                                else Console.WriteLine("User name too short, please enter username longer than 2 characters");
                            }
                            else Console.WriteLine("Username already exists, please enter another username");
                        }
                    }
                    else if (userChoice == 3) break;
                    else Console.WriteLine("Please enter number 1 or number 2");
                }
                else Console.WriteLine("Please enter valid number");
            }
        }
    }
}
