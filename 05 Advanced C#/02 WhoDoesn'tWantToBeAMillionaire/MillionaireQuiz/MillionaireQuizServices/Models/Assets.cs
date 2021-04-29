using MillionaireQuizLibrary;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MillionaireQuizServices
{
    public static class Assets
    {
        public static char PressAnyKeyToContinue() => Console.ReadKey(true).KeyChar;
       
    }
}
