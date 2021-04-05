using System;
using System.Collections.Generic;
using System.Text;

namespace Exercises.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string[] UserMessages { get; set; }

        public User() { }
        public User(int id, string userName, string password, string[] stringArray)
        {
            Id = id;
            UserName = userName;
            Password = password;
            UserMessages = stringArray;
        }

        public void AddMessage(string[] array, string message)
        {
            Array.Resize(ref array, array.Length + 1);
            array[array.Length - 1] = message;
            UserMessages = array;
        }

        public void Messages()
        {
            Console.WriteLine("The user left these messages: ");
            foreach (string message in UserMessages)
            {
                Console.WriteLine(message);
            }
        }
    }
}
