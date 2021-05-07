using ConsoleE_Shop.Library.Core.Entities;
using ConsoleE_Shop.Library.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;

namespace ConsoleE_Shop.Services.Navigation
{
    public static class Navigation
    {
        public static void MainMenu()
        {
            while (true)
            {
                Console.Clear();
                PrintTemplate.Headline();
                ShoppingCart.DisplayAll();

                Console.WriteLine("1. Add product to cart");
                Console.WriteLine("2. Remove product from cart");
                Console.WriteLine("3. Search");
                Console.WriteLine("4. List all products available in store");
                Console.WriteLine("5. Print recepit");



                char userChoice = Console.ReadKey(true).KeyChar;

                if (userChoice == '1') AddProductToCart();
                if (userChoice == '2') RemoveProductFromCart();
                if (userChoice == '3') Search();
                if (userChoice == '4')
                {
                    Console.Clear();
                    PrintTemplate.Headline();
                    ShoppingCart.DisplayAll();
                    Database.DisplayAvailableProducts();
                    Assets.PressAnyKey();
                }
                if (userChoice == '5')
                {
                    Console.Clear();
                    ShoppingCart.ShoppingCartProducts.ForEach(x => x.PrintShortInfo());
                    Console.WriteLine($"TOTAL PRICE: {ShoppingCart.ShoppingCartProducts.Sum(x => x.Price)}.00 MKD ");
                    Assets.PressAnyKey("Have a nice day");
                    break;
                }
            }
        }
        public static void AddProductToCart()
        {
            Console.Clear();

            PrintTemplate.Headline();
            ShoppingCart.DisplayAll();

            Console.WriteLine("Enter product barcode");
            string barcodeString = Console.ReadLine();

            Console.WriteLine("Enter quantity");
            string quantityString = Console.ReadLine();

            Regex validNumbers = new Regex("[0-9]");

            if (!validNumbers.IsMatch(quantityString) || !validNumbers.IsMatch(barcodeString))
            {
                Assets.PressAnyKey("Invalid input, please enter valid numbers in the fields");
                return;
            }

            ShoppingCart.AddItem(int.Parse(barcodeString), int.Parse(quantityString));
        }

        public static void RemoveProductFromCart()
        {
            Console.Clear();
            PrintTemplate.Headline();
            ShoppingCart.DisplayAll();

            Console.WriteLine("Enter product barcode");
            string barcodeString = Console.ReadLine();

            Regex validNumbers = new Regex("[0-9]");

            if (!validNumbers.IsMatch(barcodeString))
            {
                Assets.PressAnyKey("Invalid input, please enter valid numbers in the fields");
                return;
            }

            ShoppingCart.RemoveItem(int.Parse(barcodeString));
        }               

        public static List<Product> SearchProductsInDatabase(string userInput)
        {
            List<Product> listOfFoundProducts = new List<Product>();

            for (int i = 0; i <= Database.StoreKeyCount; i++)
            {
                listOfFoundProducts.Add(Database.ListOfProducts
                                        .Where(x => x.Barcode == i && x.ProductName.ToLower().Contains(userInput.ToLower()))
                                        .FirstOrDefault());
                listOfFoundProducts.Add(Database.ListOfProducts
                                       .Where(x => x.Barcode == i && x.Vendor.ToLower().Contains(userInput.ToLower()))
                                       .FirstOrDefault());
            }   
            
            foreach (Product item in listOfFoundProducts)
            {
                if (item == null) listOfFoundProducts.Remove(item);
            }
            return listOfFoundProducts;
        }
        public static void Search()
        {
            Console.Clear();
            PrintTemplate.Headline();
            ShoppingCart.DisplayAll();
            Console.WriteLine("Enter product name");
            string productString = Console.ReadLine();

            List<Product> listOfFoundProducts = new List<Product>();
            listOfFoundProducts = SearchProductsInDatabase(productString);

           

            if (listOfFoundProducts.Count == 0)
            {
                Console.WriteLine("No such product found");
                Assets.PressAnyKey();
            }
            else
            {
                foreach (Product item in listOfFoundProducts)
                {
                    if (item != null) item.PrintShortInfo();
                }               
            }

            Console.WriteLine();
            Console.WriteLine("Do you want to add product to cart? Y/N");
            char userChoice = Console.ReadKey(true).KeyChar.ToString().ToLower().ToCharArray()[0];

            if (userChoice == 'y')
            {
                while (true)
                {
                    Console.WriteLine("Enter product barcode:");
                    try
                    {
                        int barcodeInput = int.Parse(Console.ReadLine());
                        Console.WriteLine("Enter ammount:");
                        int ammountInput = int.Parse(Console.ReadLine());
                        ShoppingCart.AddItem(barcodeInput, ammountInput);
                        break;
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine("Please enter valid number: {0}", ex);
                        Assets.PressAnyKey();
                    }
                }              
               
            }
            if (userChoice == 'n') return;
        }
    }
}
