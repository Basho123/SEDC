using AbstractClassesAndInterfacesLibrary.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace AbstractClassesAndInterfacesLibrary.Entities
{
    public abstract class User : IUser
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }

        public virtual void PrintUser()
        {
            Console.WriteLine($"ID: {Id} Name: {Name} Username: {UserName}");
        }

        public User()
        {

        }

        public User(int id, string name, string username ,string password)
        {
            Id = id;
            Name = name;
            UserName = username;
            Password = password;
        }
    }
}
