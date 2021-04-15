using CinemaniaLibrary.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace CinemaniaLibrary.Models
{
    public class Movie
    {
        public string Owner { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public short Year { get; set; }
        public MovieType Genre { get; set; }
        public int Price { get; set; }
        public bool IsRented { get; set; }
        public Movie()
        {
            IsRented = false;
        }
        public Movie(string title, string description, short year, MovieType genre, bool isrented)
        {
            Title = title;
            Description = description;
            Year = year;
            Genre = genre;
            Price = SetPrice();
            IsRented = false;
            Owner = "";
            IsRented = isrented;
        }

        public int SetPrice()         
        {
            int price = 0;
            Random random = new Random();
            price = Year < 2000 ? random.Next(100, 200) : Year >= 2000 || Year < 2010 ? random.Next(200, 300) : random.Next(300, 500);
            return price;
        }
        public void DisplayInfo()
        {
            Console.WriteLine("----------------------------");
            Console.WriteLine($"Title: {Title}");
            Console.WriteLine($"Description: {Description}");
            Console.WriteLine($"Year: {Year}");
            Console.WriteLine($"Genre: {Genre}");
            Console.WriteLine($"Price: {Price}$");
            Console.WriteLine($"Is rented to: {Owner}");
            Console.WriteLine("----------------------------");
        }
    }
}
