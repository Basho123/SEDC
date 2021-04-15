using CinemaniaLibrary.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace CinemaniaServices.Models
{
    static public class Print
    {
        static public void All(List<Member> inputedList)
        {
            Console.WriteLine("═══════════════════════════════════════");
            Console.WriteLine($"List of all members: ");

            for (int i = 0; i < inputedList.Count; i++)
            {
                Console.Write($"{i + 1} ");
                inputedList[i].DisplayInfo();
            }
            Console.WriteLine("═══════════════════════════════════════");
        }     

        static public void All(List<Movie> inputedMovieList)
        {
            Console.WriteLine("═══════════════════════════════════════");
            Console.WriteLine($"List of all Movies");

            for (int i = 0; i < inputedMovieList.Count; i++)
            {
                Console.Write($"{i + 1}. {inputedMovieList[i].Title} ({inputedMovieList[i].Year}) ");
                Console.WriteLine(inputedMovieList[i].IsRented == true ? "*" : "");                 
            }
            Console.WriteLine("═══════════════════════════════════════");
        }
    }
}
