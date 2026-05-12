import org.springframework.web.client.RestTemplate;
import org.springframework.stereotype.Service;

@Service
public class MatchDataService {
    private final String API_KEY = "YOUR_SECRET_KEY_HERE";
    private final String API_URL = "https://api.cricapi.com/v1/currentMatches?apikey=" + API_KEY;

    public String getLiveScore() {
        RestTemplate restTemplate = new RestTemplate();
        // This makes a "GET" request to the live match server
        String result = restTemplate.getForObject(API_URL, String.class);
        return result; 
    }
}