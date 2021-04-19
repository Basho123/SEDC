using System;
using System.Collections.Generic;
using System.Text;

namespace AcademyAppServices.Models
{
    public class Names
    {
        public List<string> MaleFirst { get; set; }
        public List<string> FemaleFirst { get; set; }
        public List<string> MaleLast { get; set; }
        public List<string> FemaleLast { get; set; }
        public Names()
        {
            #region Male First Names
            MaleFirst = new List<string>()
            {
            "Trajko",
            "Petko",
            "Mitko",
            "Mirko",
            "Nikola",
            "Ivan",
            "Aleksandar",
            "Valentino",
            "Riste",
            "Slobodan",
            "Bratislav",
            "Jan",
            "Ognen",
            "Dragan",
            "Antonio",
            "Boban",
            "Bojan",
            "Mile",
            "Petar",
            "Pero",
            "Kristijan",
            "Marjan",
            "Marko",
            };
            #endregion

            #region Female First Names
            FemaleFirst = new List<string>()
        {
            "Trajanka",
            "Petra",
            "Mitra",
            "Mirka",
            "Nikolina",
            "Ivana",
            "Aleksandra",
            "Valentina",
            "Slobodanka",
            "Elena",
            "Branka",
            "Jana",
            "Ognena",
            "Dragana",
            "Antonija",
            "Bojana",
            "Mila",
            "Kristina",
            "Marija",
            "Marijana",
            "Dina",
            "Sanja",
            "Dijana",
        };
            #endregion

            #region Male Last Names
            MaleLast = new List<string>()
        {
            "Trajkovski",
            "Petkovski",
            "Mitkov",
            "Mirkov",
            "Nikolovsk",
            "Spasevski",
            "Ivanovski",
            "Aleksandrov",
            "Valentinovski",
            "Ristevski",
            "Slobodanovski",
            "Braislavski",
            "Janev",
            "Ognenov",
            "Dragev",
            "Bojanovski",
            "Ugrinovski",
            "Milevski",
            "Petrovski",
            "Perov",
            "Kristijaneski",
            "Marjanoski",
            "Markoski"
        };
            #endregion

            #region Female Last Names
            FemaleLast = new List<string>()
        {
            "Trajkovska",
            "Petkovska",
            "Mitkovska",
            "Ugrinovska",
            "Ristevska",
            "Nikolovska",
            "Ivanovska",
            "Aleksovska",
            "Slobodanova",
            "Janeva",
            "Ognenova",
            "Draganovska",
            "Bojanovska",
            "Milanovska",
            "Petrova",
            "Perova",
            "Marjanovska",
            "Markovska"
        };
            #endregion
        }

    }
}
