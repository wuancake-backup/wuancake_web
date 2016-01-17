import java.util.Scanner;
public class task1 
{
public static void main(String[] args)
{
	int wordAmount = 10;
	String[] word = new String[wordAmount];
	word[0] = "hello";
	word[1] = "world";
	word[2] = "java";
	word[3] = "microsoft";
	word[4] = "google";
	word[5] = "oracle";
	word[6] = "tencent";
	word[7] = "baidu";
	word[8] = "facebook";
	word[9] = "ubuntu";
	int randomWordNum = (int)(Math.random()*wordAmount);
	guessWord(word[randomWordNum]);
}

public static void guessWord(String choosedWord)
{ 
   int wordLength = choosedWord.length();
   System.out.println("The length of guessword is "+wordLength);
   char[] guessword = new char[wordLength];
   for(int i = 0; i != wordLength; ++i)
   {
	   guessword[i] = '_';
   }
   for(int i = 0; i != wordLength; ++i)
   {
	   System.out.print(guessword[i]);
   }
   System.out.println(" ");
   char guessLetter;
   Scanner input = new Scanner(System.in);
   String testinput;
   int guessedLength = 0;
   while(guessedLength != wordLength)
   {
	   
	   System.out.println("please input a letter or input 0 for help");
	   testinput = input.nextLine();
	   guessLetter = testinput.charAt(0);
	   if(guessLetter == '0') //if ask for help
	   {
		   int randomhelp = (int)(Math.random()*wordLength);
		   while(guessword[randomhelp] != '_')   
		   {
			   randomhelp = (int)(Math.random()*wordLength);
		   }
		   guessword[randomhelp] = choosedWord.charAt(randomhelp);
		   ++guessedLength;
		   for(int i = 0; i != wordLength; ++i)
		   {
			   System.out.print(guessword[i]);
		   }
		   System.out.println(" "); 
	   }
	   else //try to guess a letter
	   {
		   for(int j = 0; j < wordLength; ++j)
		   {
			   if(guessword[j] != '_') //this letter has been guessed
			   {
				   continue;
			   }
			   else if((int)guessLetter == choosedWord.charAt(j))//this letter is charAt(i)
			   {
				   guessword[j] = guessLetter;
				   ++guessedLength;
				   j = wordLength; //break out from circle
				   for(int i = 0; i != wordLength; ++i)
				   {
					   System.out.print(guessword[i]);
				   }
				   System.out.println(" ");
			   }
			   else //guess wrong!
			   {
				   continue;
			   }
		   }
	   }
   }
   System.out.println("you have guess right!");
}
}