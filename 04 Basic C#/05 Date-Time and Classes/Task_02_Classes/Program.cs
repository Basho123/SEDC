using System;

namespace Task_02_Classes
{
    class Program
    {
        static void Main(string[] args)
        {
            Car[] cars = new Car[4];
            Driver[] drivers = new Driver[4];

            Car mazda = new Car()
            {
                Model = "RX-8",
                Speed = 250,
            };

            Car porsche = new Car()
            {
                Model = "911 Turbo",
                Speed = 270,
            };

            Car ferrari = new Car()
            {
                Model = "F-50",
                Speed = 310,
            };


            Car toyota = new Car()
            {
                Model = "Supra",
                Speed = 290,
            };


            Driver firstDriver = new Driver()
            {
                Name = "Bob",
                Skill = 160,
            };
            Driver secondDriver = new Driver()
            {
                Name = "Greg",
                Skill = 220,
            };
            Driver thirdDriver = new Driver()
            {
                Name = "Jill",
                Skill = 180,
            };
            Driver fourthDriver = new Driver()
            {
                Name = "Anne",
                Skill = 200,
            };

            cars[0] = mazda;
            cars[1] = porsche;
            cars[2] = ferrari;
            cars[3] = toyota;

            drivers[0] = firstDriver;
            drivers[1] = secondDriver;
            drivers[2] = thirdDriver;
            drivers[3] = fourthDriver;

            Console.WriteLine("Select driver from the list: ");
            for (byte i = 0; i < drivers.Length; i++)
            {
                Console.WriteLine($"{i + 1}. {drivers[i].Name}");
            }
            Console.Write("INPUT THE NUMBER OF THE FRIST CAR DRIVER: ");
            byte numberOfDriver = 0;
            bool isValidDriverNumber = byte.TryParse(Console.ReadLine(), out numberOfDriver);

            Console.WriteLine("------------------------------");


            Console.WriteLine("Select car from the list: ");
            for (byte i = 0; i < cars.Length; i++)
            {
                Console.WriteLine($"{i + 1}. {cars[i].Model}");
            }
            Console.Write("INPUT THE NUMBER OF THE FIRST CAR: ");
            byte numberOfCar = 0;
            bool isValidCarNumber = byte.TryParse(Console.ReadLine(), out numberOfCar);


            Console.WriteLine("------------------------------");

            Console.Write("INPUT THE NUMBER OF THE SECOND CAR DRIVER: ");
            Console.WriteLine("Select driver from the list: ");
            for (byte i = 0; i < drivers.Length; i++)
            {
                Console.WriteLine($"{i + 1}. {drivers[i].Name}");
            }
            byte numberOfDriver2 = 0;
            bool isValidDriverNumber2 = byte.TryParse(Console.ReadLine(), out numberOfDriver2);
            
            while (true)
            {
                if (numberOfDriver == numberOfDriver2)
                {
                    Console.WriteLine("That driver is already racing, pleace choose another driver ");
                    isValidDriverNumber2 = byte.TryParse(Console.ReadLine(), out numberOfDriver2);
                }
                else break;
            }
            Console.WriteLine("------------------------------");


            Console.WriteLine("Select car from the list: ");
            for (byte i = 0; i < cars.Length; i++)
            {
                Console.WriteLine($"{i + 1}. {cars[i].Model}");
            }
            Console.Write("INPUT THE NUMBER OF THE SECOND CAR: ");
            byte numberOfCar2 = 0;
            bool isValidCarNumber2 = byte.TryParse(Console.ReadLine(), out numberOfCar2);
            while (true)
            {
                if (numberOfCar == numberOfCar2)
                {
                    Console.WriteLine("That car is already racing, pleace choose another car ");
                    isValidCarNumber2 = byte.TryParse(Console.ReadLine(), out numberOfCar2);
                }
                else break;
            }
            
            
            numberOfDriver -= 1;
            numberOfCar -= 1;
            numberOfDriver2 -= 1;
            numberOfCar2 -= 1;


            if (isValidCarNumber
                && isValidDriverNumber
                && isValidCarNumber2
                && isValidDriverNumber2
                && (numberOfCar >= 0 || numberOfCar <= 3)
                 && (numberOfDriver >= 0 || numberOfDriver <= 3)
                  && (numberOfCar2 >= 0 || numberOfCar2 <= 3)
                   && (numberOfDriver2 >= 0 || numberOfDriver2 <= 3)
                )
            {
                Car firstCar = cars[numberOfCar];
                Car secondCar = cars[numberOfCar2];

                firstCar.Driver = drivers[numberOfDriver];
                secondCar.Driver = drivers[numberOfDriver2];

                Car.RaceCars(firstCar, secondCar);

            }
            else
            {
                Console.WriteLine("Please enter valid numbers");
            }
            Console.ReadLine();
        }
    }
}
