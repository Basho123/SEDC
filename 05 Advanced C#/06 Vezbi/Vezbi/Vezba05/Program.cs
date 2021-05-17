using System;
using Vezba05.Entities;

namespace Vezba05
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Hello World!");

            Publisher pub = new Publisher();
            SubscriberOne sub1= new SubscriberOne();
            SubscriberTwo sub2 = new SubscriberTwo();
            SubscriberThree sub3 = new SubscriberThree();

            pub.EventHandler += sub1.gotMessageThroughSMS;
            pub.EventHandler += sub2.gotMessageThroughEmail;
            pub.EventHandler += sub3.gotMessageThroughFacebook;

            pub.ComposeMessage("Kiki",4,"Choko zeka za site!");



            Console.ReadLine();
        }
    }
}
