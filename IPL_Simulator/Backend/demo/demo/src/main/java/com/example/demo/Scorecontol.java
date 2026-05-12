@RestController
@CrossOrigin(origins = "*") // THIS LINE IS CRITICAL
public class ScoreController {
    @GetMapping("/api/live-score")
    public String getScore() { 
        return "{\"data\": [...]}"; 
    }
}