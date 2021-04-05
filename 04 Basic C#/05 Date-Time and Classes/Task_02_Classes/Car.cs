using System;
using System.Collections.Generic;
using System.Text;

namespace Task_02_Classes
{
    public class Car
    {
        public Car() { }
        public string Model { set; get; }
        public Driver Driver { set; get; }
        public short Speed { set; get; }

        public int CalculateSpeed()
        {
            return this.Driver.Skill + this.Speed;
        }

        static public void RaceCars(Car firstCar, Car secondCar)
        {
            if (firstCar.CalculateSpeed() > secondCar.CalculateSpeed()) Console.WriteLine($"{firstCar.Driver.Name} wins driving the {firstCar.Model}");
            else if (firstCar.CalculateSpeed() < secondCar.CalculateSpeed()) Console.WriteLine($"{secondCar.Driver.Name} wins driving the {secondCar.Model}");
            else Console.WriteLine($"It's a tie, both drivers have skill of {firstCar.CalculateSpeed()}");
        }



    }
}
