using AbstractClassesAndInterfacesLibrary.Entities;
using AbstractClassesAndInterfacesLibrary.Entities.Interfaces;
using System;
using System.Collections.Generic;

namespace AbstractClassesAndInterfaces
{
    class Program
    {
        static void Main(string[] args)
        {
            Student student01 = new Student(0,"pero","per","кириличенПасвордХехе",new List<string>() {"edinica","dva","edinica","shestica"});
            Student student02 = new Student(1,"apu","apuIndia", "अमेरिकी", new List<string>() { "अधिक ", "अधिक ", "मिल संरक्षित भू भूमि ", "अधिरूप " });
            Teacher teacher01 = new Teacher(2, "lorem", "ipsum", "dolor", "sit");
            Teacher teacher02 = new Teacher(2, "amet", "es", "lucem", "vitae");

            student01.PrintUser();
            student02.PrintUser();
            teacher01.PrintUser();
            teacher02.PrintUser();




            Console.ReadLine();

        }
    }
}
