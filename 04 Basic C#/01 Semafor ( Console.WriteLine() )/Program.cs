using System;

namespace Semafor
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine();
            Console.WriteLine();
            Console.WriteLine("                                      SEMAFOR");
            Console.WriteLine();
            Console.WriteLine();

            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine("       ╔══════════╤═╤═╤═╤══════════╤═╤═╤═╤══════════╤═╤═╤═╤══════════╗");
           
            //TOP LEFT BAR     
            Console.Write("       ║");
            Console.Write("          │");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write("█");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");

            //TOP CENTER BAR 
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("          │");
            Console.ForegroundColor = ConsoleColor.DarkRed;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("█");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");

            //TOP RIGHT BAR 
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("          │");
            Console.ForegroundColor = ConsoleColor.DarkRed;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("█");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│");
            Console.WriteLine("          ║");

            //POLE CONTINUES
            Console.WriteLine("       ║          └─┴─┴─┘          └─┴─┴─┘          └─┴─┴─┘          ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("      ┌╨┐                                                           ┌╨┐");

            //LEFT BAR RED
            Console.Write("      │");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write("█");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│                                                           │");
            //RIGHT BAR RED
            Console.ForegroundColor = ConsoleColor.Red;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine("│");
            Console.WriteLine("      ├─┤                                                           ├─┤");

            //LEFT BAR YELLOW
            Console.Write("      │");
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│                                                           │");
            //RIGHT BAR YELLOW
            Console.ForegroundColor = ConsoleColor.DarkYellow;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine("│");
            Console.WriteLine("      ├─┤                                                           ├─┤┌─┐");


            //LEFT BAR GREEN
            Console.Write("      │");
            Console.ForegroundColor = ConsoleColor.DarkGreen;
            Console.Write("░");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.Write("│                                                           │");
            //RIGHT BAR GREEN
            Console.ForegroundColor = ConsoleColor.Green;
            Console.Write("█");
            Console.ForegroundColor = ConsoleColor.Gray;
           
            //RIGHT BAR GREEN SECOND
            Console.Write("╞╡");
            Console.ForegroundColor = ConsoleColor.Black;
            Console.BackgroundColor = ConsoleColor.Green;
            Console.Write(">");
            Console.BackgroundColor = ConsoleColor.Black;
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine("│");
            Console.ForegroundColor = ConsoleColor.Gray;

            //POLE CONTINUES
            Console.WriteLine("      └╥┘                                                           └╥┘└─┘");




            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");
            Console.WriteLine("       ║                                                             ║");


















            Console.ReadLine();
        }
    }
}
