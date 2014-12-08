import org.jsoup.nodes.Document;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import com.rosaloves.bitlyj.*;
import static com.rosaloves.bitlyj.Bitly.*;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Scanner;

class link {
	public static void main(String[] args) throws IOException {
		
		System.out.println("Select mode to use"); 
		System.out.println("For single series batch download enter 1"); 
		System.out.println("Otherwise enter any other number");
		
		Scanner selectMode = new Scanner(System.in); 
		int modeID = selectMode.nextInt(); 
		
		if(modeID == 1) {
			batchDownload(); 
		}
		
		System.out.println("Remember to put the episode page links in a file called 'links.txt' where each link is on a separate line, and keep it in the same directory as the exe file"); 
		System.out.println("The direct links will be available in a file called 'download.txt'"); 
		System.out.println("NOTE- Please make sure that your links.txt file does not contain any empty lines"); 
		
		int count = countLines();
		String[] names = null; 
		names = getChar(count);
		Provider bitly = as("vergo777", "R_6a13f014b38f4f80a31cf7d80a7c18c7");
		String[] shortLinks = new String[count]; 
		String videoQuality = getVideoQuality(); 

		System.out.println("Getting download links, please be patient"); 
		
		for(int i=0;i<count;i++) {
			Document doc = Jsoup.connect(names[i]).userAgent("Mozilla").get();	// apparently adding a useragent makes aaaaall the difference wtf
			Element content = doc.getElementById("divDownload");
			Elements links = content.getElementsByTag("a");
			
			for (Element link : links) {
				String linkHref = link.attr("href");
				String linkText = link.text();
				if(linkText.equals(videoQuality)) {
					Url url = bitly.call(shorten(linkHref));
					shortLinks[i] = url.getShortUrl(); 
				}
			}
		}
		
		System.out.println("Outputting download links to txt file"); 
		
		PrintWriter writer = new PrintWriter("download.txt", "UTF-8");
		
		for(int i=0;i<count;i++) {
			writer.println(shortLinks[i]);
		}
		writer.close();
		
		System.out.println("Your download links are now available in download.txt in the same directory"); 
	}
	
	public static void batchDownload() throws IOException {
		System.out.println("Enter the URL of the main page of the anime you'd like to download"); 
		System.out.println("Example, for Wake up Girls it would be 'http://kissanime.com/Anime/Wake-Up-Girls'"); 
		Scanner in = new Scanner(System.in);
		String animePage = in.next(); 

		Document doc = Jsoup.connect(animePage).userAgent("Mozilla").get();	// adding user agent again to avoid 403
		
		Elements isAnimePage = doc.select("table.listing > tbody > tr > th"); 
		
		for (Element link : isAnimePage) {
			if(link.html().equals("Episode name") || link.html().equals("Day Added")) {
				System.out.println("Page is valid");
				break; 
			} else {
				System.out.println("Incorrect page entered, please try again"); 
				System.exit(0); 
			}
		}
		
		Elements animeLinks = doc.select("table.listing > tbody > tr > td > a"); 
		String[] episodeLinks = new String[animeLinks.size()]; 
		int arrayIndex = 0; 
		for (Element link : animeLinks) {
			episodeLinks[arrayIndex] = link.attr("abs:href"); 
			arrayIndex++; 
		}
		
		String videoQuality = getVideoQuality();  

		System.out.println("Getting download links, please be patient"); 
		
		Provider bitly = as("vergo777", "R_6a13f014b38f4f80a31cf7d80a7c18c7");
		String[] shortLinks = new String[episodeLinks.length];
		
		for(int i=0;i<episodeLinks.length;i++) {
			doc = Jsoup.connect(episodeLinks[i]).userAgent("Mozilla").get();
			Element content = doc.getElementById("divDownload");
			Elements links = content.getElementsByTag("a");
			
			for (Element link : links) {
				String linkHref = link.attr("href");
				String linkText = link.text();
				if(linkText.equals(videoQuality)) {
					Url url = bitly.call(shorten(linkHref));
					shortLinks[i] = url.getShortUrl(); 
				}
			}
		}
		
		System.out.println("Outputting download links to txt file"); 
		
		PrintWriter writer = new PrintWriter("download.txt", "UTF-8");
		
		for(int i=0;i<episodeLinks.length;i++) {
			writer.println(shortLinks[i]);
		}
		writer.close();
		
		System.out.println("Your download links are now available in download.txt in the same directory");
		
		System.exit(0);
	}
	
	public static int countLines() throws IOException {
		try{
			int lines = 0; 
			BufferedReader reader = null; 
			reader = new BufferedReader(new FileReader("links.txt")); 
			while(reader.readLine() != null)
				lines++; 
			reader.close(); 
			return lines; 
		} catch (IOException e) {
			return -1;  
		}
	}
	
	public static String[] getChar(int count) throws IOException {
		try{
			BufferedReader br = new BufferedReader(new FileReader("links.txt")); 
			String line; 
			String[] names = new String[count];
			int index = 0; 
			while((line = br.readLine()) != null) {
				names[index] = line; 
				index++; 
			}
			br.close(); 
			return names; 
		}
		catch(IOException e) {
			return null; 
		}
	}
	
	public static String getVideoQuality() {
		
		Scanner input = new Scanner(System.in); 
		
		int videoID = 0; 
		String videoQuality = ""; 
	 
		System.out.println("Choose what quality you want by entering the corresponding number and pressing enter"); 
		
		System.out.println("For 1080p MP4 enter 1");
		System.out.println("For 720p MP4 enter 2");
		System.out.println("For 480p FLV enter 3");
		System.out.println("For 360p FLV enter 4");
		System.out.println("For 360p MP4 enter 5");
		System.out.println("For 3gp enter 6");
		System.out.println("To enter custom video quality press 7");
		System.out.println("Custom option is useful if file formats for a series are not standard (example Cromartie High School)"); 
		
		videoID = input.nextInt();
		
		do {
			switch(videoID) {
			case 1 : videoQuality = "1920x1080.mp4";
					 System.out.println("1080p MP4 selected"); 
			break; 
			case 2 : videoQuality = "1280x720.mp4";
					 System.out.println("720p MP4 selected"); 
			break; 
			case 3 : videoQuality = "854x480.flv";
					 System.out.println("480p FLV selected"); 
			break; 
			case 4 : videoQuality = "640x360.flv";
					 System.out.println("360p FLV selected"); 
			break; 
			case 5 : videoQuality = "640x360.mp4";
					 System.out.println("360p MP4 selected"); 
			break; 
			case 6 : videoQuality = "320x180.3gp";
					 System.out.println("3gp selected"); 
			break; 
			case 7 : System.out.println("Enter the video quality you want as it is present on the episode page"); 
					 System.out.println("Example - For 360p MP4 Cromartie enter '480x360.mp4'"); 
					 videoQuality = input.next(); 
					 System.out.println(videoQuality + " " + "selected"); 
			break; 
			default : System.out.println("Enter a number from 1-7 you imbecile");
					  videoID = input.nextInt(); 
			}
		} while((videoID > 7 || videoID < 1));
		
		return videoQuality; 
	}
}