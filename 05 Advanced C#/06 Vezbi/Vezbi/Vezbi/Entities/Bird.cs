using System;
using System.Collections.Generic;
using System.Text;

namespace Vezbi.Entities
{
    public class Bird : Animal
    {
        public bool IsWild { get; set; }

        public Bird()
        {

        }
        public Bird(string name, int age, string color, bool isLazy) : base(name, age, color)
        {
            IsWild = isLazy;
        }
        public void FlySouth()
        {
            Console.WriteLine(IsWild ? "Flying South" : "It is a domesticated bird");
        }

        public override void Print()
        {
            Console.WriteLine($"NAME: {Name} AGE: {Age} COLOR: {Color} Is Wild: {IsWild}");
        }
    }
}
