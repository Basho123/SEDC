using System;
using System.Linq;
using System.Collections.Generic;
using System.Runtime.InteropServices.ComTypes;
using System.Runtime.Serialization;
using AuthorStarter;

namespace AuthorStarter
{
    class Program
    {
        static void Main(string[] args)
        {
            var repo = new AuthorRepo();
            var authors = repo.GetAuthors();

            Console.Write("Advanced LINQ");
            Console.WriteLine();

            Dictionary<int, List<Book>> bookDictionary = new Dictionary<int, List<Book>>();

            IEnumerable<Book> allBooksPublished = authors
                                                    .SelectMany(x => x.Books)
                                                    .ToList();


            IEnumerable<IGrouping<int, Book>> groupOfBooks = allBooksPublished
                                                               .OrderBy(x => x.ID)
                                                               .GroupBy(x => x.ID);


            foreach (IGrouping<int, Book> item in groupOfBooks)
            {
                bookDictionary.Add(item.Key, item.ToList());
            }


            Console.WriteLine("=================================");

            #region How many books are collaborations(have more than one author)?

            IEnumerable<Book> colaborationBooks = bookDictionary.Where(x => x.Value.Count > 1)
                                                             .Select(x => x.Value
                                                             .FirstOrDefault());

          
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("How many books are collaborations?");
            Console.ResetColor();
            Console.WriteLine($"{colaborationBooks.Count()}");
            Console.WriteLine("=================================");


            #endregion

            #region Which book has the most authors(and how many) ?            

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("Which book has the most authors(and how many)");
            Console.ResetColor();

            KeyValuePair<int, List<Book>> bookWithMostAuthors = bookDictionary
                            .OrderBy(x => x.Value.Count)
                            .LastOrDefault();
            Console.WriteLine($"Book with most authors is {bookWithMostAuthors.Value[0].Title} ID: {bookWithMostAuthors.Key} with {bookWithMostAuthors.Value.Count} authors  \n============================\n");
            #endregion


            #region What author wrote most collaborations ?"
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("What author wrote most collaborations?");
            Console.ResetColor();

            Author authorWithMostColaborations = authors
                                    .OrderBy(x => colaborationBooks.Distinct().Except(x.Books).Count())
                                    //.OrderByDescending(x => x.Books.Where(x => colaborationBooks.Any(y => y == x)).Count())
                                    .SingleOrDefault();

            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine($"Author with most colaborations is {authorWithMostColaborations.Name} with {authorWithMostColaborations.Books.Where(x => colaborationBooks.Any(y => y == x)).Count()} colaborations");
            Console.ResetColor();

            Console.WriteLine("============================");
            #endregion


            #region In what year were published most books in a specific genre? Which genre ?      

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("In what year were published most books in a specific genre? Which genre ?");
            Console.ResetColor();
            IGrouping<int, Book> booksInSpecificGenre = allBooksPublished.GroupBy(x => x.Year)
                                                    .OrderBy(x => x.Count())
                                                    .LastOrDefault();

            Console.WriteLine("Year of most books in specific genre: {0}, genre: {1}, count: {2}", booksInSpecificGenre.Key, booksInSpecificGenre.GroupBy(x => x.Genres)
                                                                                                                                    .OrderBy(x => x.Count())
                                                                                                                                    .LastOrDefault().Key[0],booksInSpecificGenre.Count());
            Console.WriteLine("============================");
            #endregion

            #region Which author has most books nominated for an award?
            Author authorWithMostBooksNominated = authors
                                                    .OrderBy(x => x.Nominations)
                                                    .LastOrDefault();

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Author with most books nominated is");
            Console.ResetColor();
            Console.WriteLine($" {authorWithMostBooksNominated.Name} " +
                              $"with {authorWithMostBooksNominated.Books.Where(x => x.Nominations > 0).Count()} books");
            Console.WriteLine("============================");
            #endregion

            #region Which author has most books that won an award,?
            Author authorWithMostBooksWins = authors
                                                  .OrderByDescending(x => x.Books.Where(y => y.Wins > 0).Count())
                                                  .FirstOrDefault();

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Which author has most books that won an award, when ordered by books, in descending order (ascending order returns Stephen King)?");
            Console.ResetColor();
            Console.WriteLine($"{authorWithMostBooksWins.Name} with {authorWithMostBooksWins.Books.Where(x => x.Wins > 0).Count()} books");

            Console.WriteLine("============================");
            Author authorWithMostBooksWins2 = authors
                                                .OrderBy(x => x.Wins)
                                                .LastOrDefault();

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Which author has most books that won an award, when ordered by author info?");
            Console.ResetColor();

            Console.WriteLine($"{authorWithMostBooksWins2.Name} with {authorWithMostBooksWins2.Books.Where(x => x.Wins > 0).Count()} books");
            Console.WriteLine("============================");
            #endregion

            #region Which author has most books nominated for an award, without winning a single award ?
            Author noAwardAuthor = authors
                                        .Where(x => x.Wins == 0)
                                        .OrderBy(x => x.Nominations)
                                        .LastOrDefault();

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine($"Which author has most books nominated for an award, without winning a single award ?");
            Console.ResetColor();

            Console.WriteLine($"{noAwardAuthor.Name} has most nominations but zero wins");
            Console.WriteLine("============================");
            #endregion

            #region Make a histogram of books published per decade per genre.

            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("Make a histogram of books published per decade per genre.");
            Console.ResetColor();

            Console.WriteLine("           Sci-Fi ║ Fantasy ║  Horror ");
            for (int i = -500; i < DateTime.Now.Year; i += 10)
            {
                IEnumerable<Book> jare = allBooksPublished.Where(x => x.Year >= i && x.Year < i + 10);
                int sciFiCount = jare.Where(x => x.Genres.Any(y => y == Genre.ScienceFiction)).Count();
                int fantasyCount = jare.Where(x => x.Genres.Any(y => y == Genre.Fantasy)).Count();
                int horrorCount = jare.Where(x => x.Genres.Any(y => y == Genre.Horror)).Count();

                if (sciFiCount == 0 && fantasyCount == 0 && horrorCount == 0) continue;                

                string sciFi = $"{sciFiCount}";
                string fantasy = $"{fantasyCount}";
                string horror = $"{horrorCount}";

                string space0 = $"{i}".Length == 1 ? "   " : $"{i}".Length == 2 ? "  " : $"{i}".Length == 3 ? " " : "";
                string space1 = sciFi.Length == 1 ? "     ║   " : sciFi.Length == 2 ? "    ║   " : sciFi.Length == 3 ? "   ║   " : "  ║   ";
                string space2 = fantasy.Length == 1 ? "     ║   " : fantasy.Length == 2 ? "    ║   " : fantasy.Length == 3 ? "   ║   " : "  ║   ";

                Console.WriteLine($"{i}{space0}        {sciFi}{space1}{fantasy}{space2}{horror}");
            }
            #endregion

            #region Which author has a highest percentage of nominated books?
            Author authorWithHighestPercentage = authors.Where(x => x.Books.Count == x.Books
                                                                                    .Where(y => y.Nominations > 0).Count())
                                                     .OrderByDescending(x => x.Books.Where(y => y.Nominations > 0).Count())
                                                     .FirstOrDefault();

            int totalBooks = authorWithHighestPercentage.Books.Count;
            int totalBooksNominated = authorWithHighestPercentage.Books.Where(y => y.Nominations > 0).Count();

            double percentage = totalBooks * totalBooksNominated / totalBooks / totalBooks * 100;

            Console.WriteLine("Author name with highest percentage {0}% of nominated books and most books total: {1}", percentage, authorWithHighestPercentage.Name);
            Console.WriteLine("Author total books: {0}", totalBooks);
            Console.WriteLine("Author total books nominated: {0}", totalBooksNominated);
            #endregion

            Console.ReadLine();
        }
    }
}
