using System;
using System.Collections.Generic;
using System.Text;
using VehicleInheritance.Entities.Enums;



namespace VehicleInheritance.Entities.Models
{
    public class ElectricCar : Car
    {
        public short BatteryCapacity { get; set; }
        public short BatteryPercentage { get; set; }

        public ElectricCar()
        {

        }

        public ElectricCar(short batteryCapacity, short batteryPercentage, short maxSpeed, string manufacturer, string model)
        {
            MaxSpeed = maxSpeed;
            BatteryCapacity = batteryCapacity;
            BatteryPercentage = batteryPercentage;
            Model = model;
            Manufacturer = manufacturer;
            NumberOfWheels = 4;
            Type = "Electric Car";
            TypeOfEngine = EngineType.Electric;

            if (BatteryPercentage < 20)
            {
                MaxSpeed = 50;
            }
          
        }

        public void CheckBattery()
        {
            Console.WriteLine($"This {Type} {Manufacturer} {Model} has {BatteryPercentage}KW/h battery charge");
        }
        public void Recharge(short number)
        {
            if (BatteryCapacity > BatteryPercentage + number)
            {
                Console.BackgroundColor = ConsoleColor.Green;
                Console.ForegroundColor = ConsoleColor.Black;

                Console.WriteLine($"This {Type} {Manufacturer} {Model} is now recharging");
                BatteryPercentage += number;
                CheckBattery();
                Console.BackgroundColor = ConsoleColor.Black;
                Console.ForegroundColor = ConsoleColor.White;
            }

            else
            {
                Console.BackgroundColor = ConsoleColor.Red;
                Console.ForegroundColor = ConsoleColor.White;
                Console.WriteLine("The battery cannot be recharged with that amount");
                Console.BackgroundColor = ConsoleColor.Black;
            }
            
        }
        public override void Drive()
        {
            Console.WriteLine($"This {Type} {Manufacturer} {Model} max speed is {MaxSpeed}");
        }

    }
}
