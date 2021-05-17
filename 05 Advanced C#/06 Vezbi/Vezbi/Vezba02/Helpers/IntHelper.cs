using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Vezba02.Helpers
{
    public static class IntHelper
    {
        public static bool IsEven(this int inputInt) => inputInt % 2 == 0;
        public static int GetNFromList(this List<int> inputList) => inputList.FirstOrDefault();
    }
}
