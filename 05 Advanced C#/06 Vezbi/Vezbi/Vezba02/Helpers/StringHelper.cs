using System;
using System.Collections.Generic;
using System.Text;

namespace Vezba02.Helpers
{
    public static class StringHelper
    {
        public static string GetFirstLetter(this string inputString)=> $"{inputString[0]}";
        public static string GetLastLetter(this string inputString) => $"{inputString[^1]}";
    }
}
