using System;
using System.Collections.Generic;
using System.Text;

namespace Vezbi.Entities
{
    public class Dog : Animal
    {
        public string Race { get; set; }

        public Dog()
        {

        }
        public Dog(string name, int age, string color, string race) : base(name, age, color)
        {
            Race = race;
        }
        public void Bark()
        {
            Console.WriteLine("BARK BARK!");
        }

        public override void Print()
        {
            Console.WriteLine($"NAME: {Name} AGE: {Age} COLOR: {Color} RACE: {Race}");
        }
    }
}
