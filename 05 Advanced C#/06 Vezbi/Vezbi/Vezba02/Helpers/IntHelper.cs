﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Vezba02.Helpers
{
    public static class IntHelper
    {
        public static bool IsEven(this int inputInt) => inputInt % 2 == 0;
        public static List<int> GetNFromList(this List<int> inputList, int numberOfItemsToGet) => inputList.GetRange(0, numberOfItemsToGet > inputList.Count ? inputList.Count : numberOfItemsToGet < 0 ? 0 : numberOfItemsToGet);
        public static List<int> GetNFromListLinq(this List<int> inputList, int numberOfItemsToGet) => inputList.Take(numberOfItemsToGet > inputList.Count ? inputList.Count : numberOfItemsToGet < 0 ? 0 : numberOfItemsToGet).ToList();

    }
}
