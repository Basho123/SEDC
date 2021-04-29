using System;
using System.Collections.Generic;
using System.Text;
using System.Media;

namespace MillionaireQuizLibrary.Media
{
    
    static public class Sound       
    {

        public static SoundPlayer EasyQuestion() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\EasyQuestion.Wav");
        public static SoundPlayer SuspenseSound() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\Suspense.Wav");   
        public static SoundPlayer AreYouSure() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\AreYouSure.Wav");
        public static SoundPlayer CorrectAnswer1() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\CorrectAnswer.Wav");
        public static SoundPlayer CorrectAnswer2() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\CorrectAnswer2.Wav");
        public static SoundPlayer Intro() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\MillionaireIntro.Wav");
        public static SoundPlayer WrongAnswer2() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\WrongAnswer2.Wav");
        public static SoundPlayer NextQuestion() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\NextQuestion.Wav");
        public static SoundPlayer FiftyFiftyHelp() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\5050Help.Wav");
        public static SoundPlayer AudienceHelp() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\AudienceHelp.Wav");
        public static SoundPlayer TelephoneHelp() => new SoundPlayer(@"..\..\..\..\MillionaireQuizLibrary\MediaFiles\TelephoneHelp.Wav");

   










    }


}
