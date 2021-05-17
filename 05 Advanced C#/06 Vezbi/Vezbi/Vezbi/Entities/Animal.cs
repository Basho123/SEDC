using System;
using System.Collections.Generic;
using System.Text;

namespace Vezbi.Entities
{
    public abstract class Animal
    {
        public string Name { get; set; }

        private int _Age;
        public int Age
        {
            get { return _Age; }
            set
            {
                if (value <= 0) _Age = 0;
                else if (value >= 150) _Age = 150;
                else _Age = value;
            }
        }

        public string Color { get; set; }
        public Animal()
        {
           _Age = Age;   
        }
        public Animal(string name, int age, string color)
        {
            _Age = age;
            Name = name;
            Color = color;
        }
       

        public abstract void Print();
    }
}
