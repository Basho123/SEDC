using System;
using System.Collections.Generic;
using System.Text;

namespace ConsoleE_Shop.Services
{
    public static class PrintTemplate
    {
        public static void Headline()
        {
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine();
            Console.WriteLine(" ╔═══════════════════════════════════════════╗         ");
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(" ║ ▀▀█▀▀  █▀▀▀▄  █    █  █▀▀▀▀  █▀▀▀▀  █▀▀▀▄ ║         ");
            Console.WriteLine(" ║   █    █   █  █    █  █      █      █   █ ║         ");
            Console.WriteLine(" ║   █    █▄▄▄▀  █  ▄▀█  █      █▄▄▄   █▄▄▄▀ ║         ");
            Console.WriteLine(" ║   █    █      █▄▀  █  █      █      █     ║         ");
            Console.WriteLine(" ║   █    █      █    █  █      █▄▄▄▄  █     ║         ");
            Console.ForegroundColor = ConsoleColor.Gray;
            Console.WriteLine(" ╚═══════════════════════════════════════════╝         ");
            Console.ForegroundColor = ConsoleColor.White;
        }
    }
}
