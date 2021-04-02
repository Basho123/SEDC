using System;

namespace _04_Strings_and_Methods
{
    class Program
    {
        //  ## Task 1
        //  *Create a new method called FunWithStrings that will have one input parameter(string) and it will have no return
        //  *In that method you should display in console the following tasks for the string:
        //           *print the reverse string
        //           * print total number of vowels
        //           * check if string is palindrome
        //           * print the largest word
        //           * print the smallest word
        //           * print the count of words
        //  *print the most used character(not space obviously)
        //  *Ask the user to enter a string and call the method with that string.

        static void FunWithStrings(string inputString)
        {
            #region Revesing String

            for (int i = inputString.Length - 1; i >= 0; i--)
            {
                Console.Write(inputString[i]);
            }
            Console.WriteLine();
            Console.WriteLine("-------------------------------");
            #endregion
            #region Print total number of Vowels
            string inputStringtoLowerCase = inputString.ToLower();
            int vowelCounter = 0;
            for (int i = 0; i < inputStringtoLowerCase.Length; i++)
            {
                switch (inputStringtoLowerCase[i])
                {
                    case 'a':
                    case 'e':
                    case 'i':
                    case 'o':
                    case 'u':
                        vowelCounter++;
                        break;
                    default:
                        continue;

                }
            }
            Console.WriteLine($"There are {vowelCounter} vowels in your string.");
            Console.WriteLine("-------------------------------");

            #endregion
            #region check if palindrome    
            
            string stringReversed = "";
            for (int i = inputString.Length - 1; i >= 0; i--)
            {
                stringReversed += inputString[i];
            }            
            string statement = stringReversed == inputString ? "sentence is palindrome" : "sentence is not palindrome";
            Console.WriteLine(statement);
            Console.WriteLine("--------------------------");
            #endregion
            #region Print the largest word
            string[] ArrayOfSplitedInputStringWords = inputString.Split(' ');
            int wordLength = 0;
            string longestWord = "";
            foreach (string word in ArrayOfSplitedInputStringWords)
            {
                if (word.Length > wordLength)
                {
                    wordLength = word.Length;
                    longestWord = word;
                }
                else continue;
            }
            Console.WriteLine(@$"The longest word is ""{longestWord}"" and is {wordLength} character long");
            Console.WriteLine("-------------------------------");

            #endregion
            #region Print the smallest word
            string[] ArrayOfSplitedInputStringWords2 = inputString.Split(' ');
            int wordLength2 = 999999999;
            string shortestWord = "";
            foreach (string word in ArrayOfSplitedInputStringWords2)
            {
                if (word.Length < wordLength2)
                {
                    wordLength2 = word.Length;
                    shortestWord = word;
                }
                else continue;
            }
            Console.WriteLine(@$"The shortest word is ""{shortestWord}"" and is {wordLength2} character short");
            Console.WriteLine("-------------------------------");

            #endregion
            #region Print the count of words
            string[] ArrayOfSplitedInputStringWords3 = inputString.Split(' ');
            Console.WriteLine($"The sentence has {ArrayOfSplitedInputStringWords3.Length} words");
            Console.WriteLine("-------------------------------");

            #endregion
            #region Print the most used character
            char mostUsedChar = ' ';
            int characterUsedCount = 0;
            for (int i = 0; i < inputString.Length; i++)
            {
                int characterUsedCountInThisCycle = 0;
                for (int g = 0; g < inputString.Length; g++)
                {
                    if (inputString[i] == inputString[g]) characterUsedCountInThisCycle++;
                    if (characterUsedCountInThisCycle > characterUsedCount && inputString[i] != ' ')
                    {
                        characterUsedCount = characterUsedCountInThisCycle;
                        mostUsedChar = inputString[i];
                    }
                    else continue;
                }
            }
            Console.WriteLine($"Most used char is '{mostUsedChar}' and is {characterUsedCount} times used.");
            Console.WriteLine("-------------------------------");
            #endregion
        }

        //## Task 2
        //* Create a new method that will remove extra space characters
        //* Call the method with the following text: The&nbsp;&nbsp;&nbsp; best &nbsp;Lorem&nbsp; Ipsum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //      Generator in all the&nbsp; sea!&nbsp;&nbsp; Heave this &nbsp; scurvy copyfiller fer yar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
        //      next&nbsp;&nbsp; adventure&nbsp; and cajol yar clients&nbsp;&nbsp; into walking  the plank with ev'ry layout!&nbsp;&nbsp;&nbsp; 
        //      nfigure&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  above, then get yer pirate ipsum...own the high seas,&nbsp;&nbsp;&nbsp; argh!

        static void removeExtraSpaces(string inputString)
        {
            #region Remove extra spaces
            //string trimmedString = inputString.Trim();
            //string withRemovedExtraSpaces = "";
            //char toCompare = '_';
            //for (int i = 0; i < trimmedString.Length; i++)
            //{
            //    if (toCompare == ' ' && trimmedString[i] == ' ') continue;
            //    else
            //    {
            //        withRemovedExtraSpaces += trimmedString[i];
            //        toCompare = trimmedString[i];
            //    }               
            //}
            //Console.WriteLine(withRemovedExtraSpaces);
            #endregion

            #region remove &nbsp; string from a given sentence   

            // ONE WAY TO TO THIS IS TO SKIP 5 ITERATIONS AFTER & CHAR IS FOUND, BUT WHAT DO WE DO IF WE NEED TO USE & CHAR SOMEWHERE ELSE            
            //for (int i = 0; i < inputString.Length; i++)
            //{
            //    if (inputString[i] == '&') i += 5;
            //    else Console.Write(inputString[i]);
            //}

            // SO I DEVISED THIS SOLUTION, SO IT CHECKS THE CHARS IF IT CONTAINS ALL STRING CHAR BY CHAR
            char[] chars = inputString.ToCharArray();
            for (int i = 0; i < chars.Length; i++){
               
                if (chars[i] == '&' 
                    && i < chars.Length - 4 //MUST HAVE CHECK TO GUARD AGAINST INDEX OUT OF BOUNDS
                    && chars[i + 1] == 'n'
                    && chars[i + 2] == 'b'
                    && chars[i + 3] == 's'
                    && chars[i + 4] == 'p'
                    && chars[i + 5] == ';') i += 5;   
                else Console.Write(chars[i]);
            }
            #endregion
        }



        static void Main(string[] args)
        {
            Console.WriteLine("FUN WITH STRINGS");
            FunWithStrings("aaeeaa");
            Console.WriteLine("----------------------");

            //removeExtraSpaces("     aa bb cc    dd    eee   ");

            Console.WriteLine("----------------------");

            removeExtraSpaces("The&nbsp;&nbsp;&nbsp; & best &nbsp;Lorem&nbsp; Ipsum&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Generator in all the&nbsp; sea!&nbsp;&nbsp; Heave this &nbsp; scurvy copyfiller fer yar&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; next&nbsp;&nbsp; adventure&nbsp; and cajol yar clients&nbsp;&nbsp; into walking  the plank with  ev'ry layout!&nbsp;&nbsp;&nbsp; Configure&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  above, then get yer pirate ipsum...own the high seas,&nbsp;&nbsp;&nbsp; argh!&");


            Console.ReadLine();
        }
    }
}
