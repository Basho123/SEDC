using QuizzAppLibrary.Enums;
using QuizzAppLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Media;

namespace QuizzAppServices.Models
{
    static public class Assets
    {

        static public void QuestionsAndAnswer(Database database, User loggedInUser)

        {
            Console.Clear();
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("--------------------------------------------------");
            Console.WriteLine("The quiz is consisted of 5 questions, with four possible answers. Each question has one correct answer.");
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Time is measured and calculated in the final result, so you will lose points if it takes too much time for you.");     
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("When you answer the question, before you begin answering the another question, there is a trivia popup.");  
            Console.ForegroundColor = ConsoleColor.White;
            Console.WriteLine("Time is not measured during the trivia popup, so you can rest and read the trivia.");  
            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("Press any key to start the quiz!");
            Console.WriteLine("");
            Console.ResetColor();
            PressAnyKeyToContinue();
            Student loggedInStudent = (Student)loggedInUser;
            TimeSpan totalDifference = DateTime.Now - DateTime.Now; // JUST TO INITIALIZE
            int points = 0;
            int questionsAnswered = 0;
            int totalQuestions = 0;

            loggedInStudent.HasPlayed = true;

            for (int i = 1; i <= database.Questions.Count; i++)
            {
                DateTime startTime = DateTime.Now;
                Console.Clear();               
                int answerForThisQuestion = 0;
                //QUESTION i
                Console.WriteLine("------------------------------------");
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"{i}. {database.Questions[i][0]}");
                Console.ResetColor();
                Console.WriteLine();

                // ANSWERS g
                for (int g = 1; g < database.Questions[i].Count - 1; g++)
                {
                    if (database.Questions[i][g].Contains('*')) answerForThisQuestion = g;
                    string filteredFromAnswer = database.Questions[i][g].Replace("*", " ");
                    Console.WriteLine($"{g}. {filteredFromAnswer}");
                }

                char answer = Console.ReadKey(true).KeyChar;

                Regex regex = new Regex("[0-4]");

                if (regex.IsMatch($"{answer}"))
                {
                    int answerInt = int.Parse($"{answer}");
                    if (database.Questions[i][answerForThisQuestion] == database.Questions[i][answerInt])
                    {
                        Console.Clear();
                        Console.WriteLine("------------------------------------");
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine($"{i}. {database.Questions[i][0]}");
                        Console.WriteLine();
                        Console.ResetColor();

                        for (int g = 1; g < database.Questions[i].Count - 1; g++)
                        {
                            if (answerInt == g) Console.ForegroundColor = ConsoleColor.Green;
                            if (database.Questions[i][g].Contains('*')) answerForThisQuestion = g;
                            string filteredFromAnswer = database.Questions[i][g].Replace("*", " ");
                            Console.WriteLine($"{g}. {filteredFromAnswer}");
                            Console.ResetColor();
                        }

                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine();
                        Console.WriteLine("Correct answer!!!");
                        Console.ResetColor();
                        Console.WriteLine();
                        Console.WriteLine($"{database.Questions[i][5]}");
                        Console.WriteLine();
                        Console.WriteLine("------------------------------------");
                        Console.WriteLine($"Time elapsed: {totalDifference.Seconds} seconds");
                        Console.WriteLine("------------------------------------");

                        DateTime endTime = DateTime.Now;
                        TimeSpan currentDifference = endTime - startTime;
                        totalDifference += currentDifference;

                        questionsAnswered++;
                        PressAnyKeyToContinue();
                    }
                    else
                    {
                        Console.Clear();
                        Console.WriteLine("------------------------------------");
                        Console.ForegroundColor = ConsoleColor.Yellow;
                        Console.WriteLine($"{i}. {database.Questions[i][0]}");
                        Console.ResetColor();
                        Console.WriteLine();

                        for (int g = 1; g < database.Questions[i].Count - 1; g++)
                        {
                            if (answerInt == g) Console.ForegroundColor = ConsoleColor.Red;
                            if (database.Questions[i][g].Contains('*')) answerForThisQuestion = g;
                            string filteredFromAnswer = database.Questions[i][g].Replace("*", " ");
                            Console.WriteLine($"{g}. {filteredFromAnswer}");
                            Console.ResetColor();
                        }

                        Console.ForegroundColor = ConsoleColor.Red;
                        Console.WriteLine();
                        Console.WriteLine("Wrong answer");
                        Console.ResetColor();
                        Console.WriteLine();
                        Console.WriteLine($"{database.Questions[i][5]}");
                        Console.WriteLine("------------------------------------");
                        Console.WriteLine($"Time elapsed: {totalDifference.Seconds} seconds");
                        Console.WriteLine("------------------------------------");

                        DateTime endTime = DateTime.Now;
                        TimeSpan currentDifference = endTime - startTime;
                        totalDifference += currentDifference;

                        PressAnyKeyToContinue();
                    }
                    totalQuestions++;
                }
                else i--;
                Console.Clear();
                try
                {
                    points = questionsAnswered == 0 ? 0 : questionsAnswered * questionsAnswered * 5000 / (totalDifference.Seconds+50);
                }
                catch (DivideByZeroException ex)
                {
                    Console.WriteLine($"Invalid division by zero in points result: {ex}");
                }

                Console.WriteLine("-----------------------------------------------------");
                Console.ForegroundColor = totalDifference.Seconds < 45 ? ConsoleColor.Green : ConsoleColor.Yellow;
                Console.WriteLine(totalDifference.Seconds < 45 ? "You were very fast, you were not googling!!!" : "Quiz was solved not so fast, you may have googled some of your answers");
                Console.ForegroundColor = questionsAnswered < 4 ? ConsoleColor.Yellow : ConsoleColor.Green;
                Console.Write(questionsAnswered < 4 ? "You should polish your knowledge. " : "You have a good knowledge! ");
                Console.WriteLine();
                Console.ForegroundColor = questionsAnswered == 0 ? ConsoleColor.DarkRed
                                        : questionsAnswered == 1 ? ConsoleColor.Red
                                        : questionsAnswered == 2 ? ConsoleColor.DarkYellow
                                        : questionsAnswered == 3 ? ConsoleColor.Yellow
                                        : questionsAnswered == 4 ? ConsoleColor.DarkGreen
                                        : ConsoleColor.Green;
                Console.WriteLine($"You have solved {questionsAnswered}/{totalQuestions} questions");
                Console.ResetColor();
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"You needed {totalDifference.Seconds} seconds to solve the quiz, and gained {points} points.");
                Console.WriteLine("-----------------------------------------------------");
                Console.ForegroundColor = ConsoleColor.Blue;
                Console.WriteLine("Thank you for your time!!!");
                Console.ResetColor();
                Console.WriteLine();
            }


            loggedInStudent.Points = points;
        }
        static public void PressAnyKeyToContinue()
        {
            Console.WriteLine("Press any key to continue . . . ");
            char dummychar = Console.ReadKey(true).KeyChar;
        }
        static public void Login(Database database)
        {
            Console.WriteLine("Type 0 in the input field to return to previous menu");
            User user = null;
            string userNameInput = "";
            int passwordAttempts = 3;

            while (true)
            {
                Console.Clear();
                Console.ForegroundColor = ConsoleColor.Green;
                Console.WriteLine("---------------------------------------------------------");
                Console.WriteLine("Input your username");
                Console.WriteLine("---------------------------------------------------------");
                Console.ResetColor();
                Console.WriteLine();

                if (user == null) userNameInput = Console.ReadLine();
                if (userNameInput == "0") break;
                if (passwordAttempts == 0) break;

                user = SelectUser(userNameInput, database);

                if (user == null)
                {
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("User does not exist!");
                    Console.ResetColor();
                    Console.WriteLine();
                    PressAnyKeyToContinue();
                    continue;
                }
                Console.ForegroundColor = ConsoleColor.DarkCyan;
                Console.WriteLine("---------------------------------------------------------");
                Console.WriteLine("Input your password");
                Console.WriteLine("---------------------------------------------------------");
                Console.ResetColor();
                string passwordInput = Console.ReadLine();
                Console.WriteLine();
                if (user.Password != passwordInput)
                {
                    Console.WriteLine();
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Wrong password, retype your password again!");
                    Console.ResetColor();
                    passwordAttempts--;
                    Console.WriteLine(passwordAttempts != 0 ? $"{passwordAttempts} attempts left!!!" : "You have no attempts left, please log in again!");
                    PressAnyKeyToContinue();
                    continue;
                }

                if (user.Role == Role.Student)
                {
                    Student student = (Student)user;
                    if (student.HasPlayed)
                    {
                        Console.WriteLine($"You have already played the quiz, and you won {student.Points} points.");
                        PressAnyKeyToContinue();
                    }
                    else
                    {
                        QuestionsAndAnswer(database, student);
                        Console.ForegroundColor = ConsoleColor.Green;
                        Console.WriteLine($"{student.FirstName} {student.LastName} now has {student.Points} points");
                        Console.ResetColor();
                        Console.WriteLine();
                        PressAnyKeyToContinue();
                    }
                    break;
                }
                if (user.Role == Role.Teacher)
                {
                    Teacher teacher = (Teacher)user;
                    TeacherMenu(teacher, database);
                    break;
                }
            }

        }
        static public User SelectUser(string usernameString, Database database) => database.Users.FirstOrDefault(x => x.UserName == usernameString);
        static public void TeacherMenu(User user, Database database)
        {
            while (true)
            {
                Console.Clear();
                Teacher teacher = (Teacher)user;

                Console.WriteLine("---------------------------------------------------------");
                Console.ForegroundColor = ConsoleColor.Yellow;
                Console.WriteLine($"Hello {teacher.FirstName}");
                Console.ResetColor();
                Console.WriteLine();
                Console.WriteLine("This is the list of students with points about the quiz");
                Console.WriteLine("---------------------------------------------------------");

                List<Student> listOfStudents = database.Users
                                                        .Where(x => x.Role == Role.Student)
                                                        .Cast<Student>()
                                                        .OrderByDescending(x => x.Points)
                                                        .ToList();
                int colorCounter = 4;
                listOfStudents.ForEach(x =>
                {
                    Console.ForegroundColor = (ConsoleColor)colorCounter;
                    Console.BackgroundColor = (ConsoleColor)(colorCounter + 3);
                    Console.Write($"Username: {x.UserName} : Points: {x.Points} ");
                    Console.WriteLine(x.HasPlayed ? "|| Took the quiz" : "|| Still havent took the quiz");
                    colorCounter++;

                });
                Console.ResetColor();
                Console.WriteLine();
                Console.WriteLine("Press enter to return to previous menu...");
                char teacherChoice = Console.ReadKey(true).KeyChar;
                if (teacherChoice == 13) break;
            }
        }

    }

}
