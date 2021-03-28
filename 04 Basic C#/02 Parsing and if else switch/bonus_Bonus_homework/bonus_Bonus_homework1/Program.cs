using System;

namespace bonus_Bonus_homework1
{
	class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("INPUT A SPECIAL NUMBER TO BE BLESSED BY THE EYE OF THE TIGER");

			int fullNumber = 0;
			bool conditionIsTrue = true;


			while (conditionIsTrue)
			{

				Console.WriteLine("Enter a 7 digit number");
				string numberInputed = Console.ReadLine();

				bool inputIsParsedToNumber = int.TryParse(numberInputed, out fullNumber);

				if (inputIsParsedToNumber && numberInputed.Length == 7)
				{
					string firstNumberString = numberInputed.Substring(0, 1);
					string secondDigitString = numberInputed.Substring(1, 1);
					string sixthDigitString = numberInputed.Substring(5, 1);
					string seventhDigitString = numberInputed.Substring(6, 1);


					int firstDigit = int.Parse(firstNumberString);
					int secondDigit = int.Parse(secondDigitString);

					int sixthDigit = int.Parse(sixthDigitString);
					int seventhDigit = int.Parse(seventhDigitString);

					if (firstDigit != 0 && secondDigit != 0 && sixthDigit != 0 && seventhDigit != 0)
					{
						if (
						   fullNumber % firstDigit == 0 && fullNumber % (sixthDigit + seventhDigit) != 0
						   || fullNumber % secondDigit != 0 && fullNumber % (sixthDigit + seventhDigit) != 0
						   )
						{
							Console.WriteLine("YES, YOU ARE BLEESED BY THE EYE OF THE TIGER");
							conditionIsTrue = false;
						}
						else
						{
							Console.WriteLine("NO, YOU ARE NOT BLEESED BY THE EYE OF THE TIGER, THOU SHALL BE ASKED AGAIN FOR THE NUMBER OF THE TIGER");
						}
					}
					else
					{
						Console.WriteLine("INVALID DIVISION WITH NUMBER 0, YOU WILL NEVER BE BLESSED BY THE EYE OF THE TIGER, AND , THOU SHALL BE ASKED AGAIN FOR THE NUMBER OF THE TIGER");
					}
				}
				else
				{
					Console.WriteLine("PLEASE INPUT A 7 DIGIT NUMBER IN THE FIELD,THOU SHALL BE ASKED AGAIN FOR THE NUMBER OF THE TIGER");
				}
			}

			Console.ReadLine();
		}
	}
}
