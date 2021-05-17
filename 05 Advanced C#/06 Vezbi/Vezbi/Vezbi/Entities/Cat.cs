using System;
using System.Collections.Generic;
using System.Text;

namespace Vezbi.Entities
{
    public class Cat : Animal
    {
        public bool IsLazy { get; set; }

        public Cat()
        {

        }
        public Cat(string name, int age, string color, bool isLazy) : base(name, age, color)
        {
            IsLazy = isLazy;
        }
        public void Meow()
        {
            Console.WriteLine("MEOW!");
        }

        public override void Print()
        {
            Console.WriteLine($"NAME: {Name} AGE: {Age} COLOR: {Color} Is Lazy: {IsLazy}");
        }
    }
}
