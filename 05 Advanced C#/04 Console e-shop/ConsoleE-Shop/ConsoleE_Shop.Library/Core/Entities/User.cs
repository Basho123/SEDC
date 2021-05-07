using ConsoleE_Shop.Library.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleE_Shop.Library.Core.Entities
{
    public class User : IUser
    {
        public string Name { get; set; }
        //public ShoppingCart<Product> ShoppingCart { get; set; }

        public User()
        {

        }

        public User(string name)
        {
            Name = name;
            //ShoppingCart = new ShoppingCart<Product>();
        }      
    }
}
