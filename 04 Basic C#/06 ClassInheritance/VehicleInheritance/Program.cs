using System;
using VehicleInheritance.Entities.Enums;
using VehicleInheritance.Entities.Models;

namespace VehicleInheritance
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Vehicles all kinds of them");
            Console.WriteLine("---------------");

            ElectricCar car01 = new ElectricCar(250, 58, 280, "Tesla", "Model S");           
            Car car02 = new Car(EngineType.V8,15,2,300, "Dodge", "Viper");
            Bicycle bike01 = new Bicycle(5, false, "TREK", "3900");

            car01.PrintInfo();
            car01.CheckBattery();
            car01.Recharge(25);

            Console.WriteLine("---------------");

            car02.PrintInfo();
            car02.Repair();


            Console.WriteLine("---------------");

            bike01.PrintInfo();
            bike01.Repair();
            bike01.Ride();

            Console.ReadLine();
        }
    }
}
