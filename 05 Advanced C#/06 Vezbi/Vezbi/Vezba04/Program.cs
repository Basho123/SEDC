using System;

namespace Vezba04
{
    class Program
    {
        public delegate bool DelegateForTwoStrings(string word, string word2);

        static void Main(string[] args)
        {
            //Create a delegate that accepts two strings and returns bool
            //DelegateForTwoStrings baseDelegate = new DelegateForTwoStrings(NativeMacedonian);

            Func<string, string, bool> compareStringLength = (word1, word2) => word1.Length > word2.Length;
            Func<string, string, bool> startOnSameCharacter = (word1, word2) => word1[0] == word2[0];
            Func<string, string, bool> endOnSameCharacter = (word1, word2) => word1[^1] == word2[^1];

            DelegateForTwoStrings delegateCompareStringLength = new DelegateForTwoStrings(compareStringLength);
            DelegateForTwoStrings delegateStartOnSameCharacter = new DelegateForTwoStrings(startOnSameCharacter);
            DelegateForTwoStrings delegateEndOnSameCharacter = new DelegateForTwoStrings(endOnSameCharacter);

            StringMagic("hehe", "haha", delegateCompareStringLength);
            StringMagic("heha", "haha", delegateStartOnSameCharacter);
            StringMagic("hehe", "haha", delegateEndOnSameCharacter);



            Console.ReadLine();
        }


        public static bool StringMagic(string word1, string word2, DelegateForTwoStrings callback)
        {
            Console.WriteLine($"{word1} {word2}");
            Console.WriteLine(callback(word1, word2));
            return callback(word1, word2);
        }

    }
}
