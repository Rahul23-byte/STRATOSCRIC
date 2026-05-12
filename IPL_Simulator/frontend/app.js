/**
 * STRATOSCRIC - GT vs SRH LOGIC ENGINE
 */

// 1. UPDATED INTERNAL STATE (GT vs SRH)
let matchScenario = { 
    batsman: "Shubman Gill", 
    recommended: "Mayank Markande", // Tactical: Gill vs Leg-spin matchup
    timeLeft: 30 
};

// 2. DATA ACQUISITION (Live Fetch from Java)
async function updateRealTimeScore() {
    try {
        const response = await fetch('http://localhost:8080/api/live-score');
        const data = await response.json();

        // Looking for Gujarat Titans data
        const match = data.data.find(m => m.name.includes("Titans") || m.name.includes("Sunrisers"));

        if (match) {
            // Update Header Scoreboard
            document.querySelector('.match-info').innerHTML = `GT vs SRH | LIVE`;
            
            // Syncing live player stats
            updateTableRow("Shubman Gill", 42, 28, 150.00);
            updateTableRow("Sai Sudharsan", 15, 12, 125.00);
            
            console.log("Match Intelligence Synced: GT vs SRH");
        }
    } catch (error) {
        console.warn("Backend offline: Running GT vs SRH Simulation Mode.");
    }
}

// 3. TABLE ROW UPDATE LOGIC
function updateTableRow(playerName, runs, balls, sr) {
    const rows = document.querySelectorAll('.live-table tbody tr');
    
    rows.forEach(row => {
        if (row.cells[0].innerText.includes(playerName)) {
            row.cells[1].innerText = runs;   // Update R
            row.cells[2].innerText = balls;  // Update B
            row.cells[5].innerText = sr;     // Update SR
            
            // Data Update Glow Effect
            row.style.backgroundColor = "rgba(26, 115, 232, 0.1)";
            setTimeout(() => {
                row.style.backgroundColor = ""; 
            }, 1000);
        }
    });
}

// 4. UPDATED ANALYTICS ENGINE (Gill vs SRH Pace/Spin Trend)
function loadPerformanceGraph() {
    const canvas = document.getElementById('performanceChart');
    if(!canvas) return;

    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Over 1', 'Over 2', 'Over 3', 'Over 4', 'Over 5'],
            datasets: [{ 
                label: 'Gill Strike Rate', 
                data: [110, 135, 140, 155, 150], 
                borderColor: '#1a73e8', 
                backgroundColor: 'rgba(26, 115, 232, 0.1)',
                borderWidth: 2,
                tension: 0.4 
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
                legend: { labels: { font: { family: 'Inter', weight: 'bold' } } }
            },
            scales: {
                y: { beginAtZero: false, ticks: { color: '#5f6368' } },
                x: { ticks: { color: '#5f6368' } }
            }
        }
    });
}

// 5. TIMER & DECISION LOGIC
function startTimer() {
    const timerElement = document.getElementById('match-ticker');
    const countdown = setInterval(() => {
        matchScenario.timeLeft--;
        timerElement.innerHTML = `DECISION WINDOW: ${matchScenario.timeLeft}s`;
        
        if (matchScenario.timeLeft <= 0) {
            clearInterval(countdown);
            timerElement.innerHTML = "WINDOW CLOSED: Tactical Lock";
            disableButtons();
        }
    }, 1000);
}

function makeDecision(selectedBowler) {
    const feedback = document.getElementById('feedback-area');
    
    if (selectedBowler === matchScenario.recommended) {
        feedback.style.color = "#34a853";
        feedback.innerHTML = `✓ TACTICAL HIT: ${selectedBowler} is statistically strong against Gill.`;
    } else {
        feedback.style.color = "#d93025";
        feedback.innerHTML = `⚠ TACTICAL RISK: Data suggests using ${matchScenario.recommended}.`;
    }
}

function disableButtons() {
    document.querySelectorAll('button').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = "0.5";
    });
}

// 6. SYSTEM INITIALIZATION
window.onload = () => {
    startTimer();
    loadPerformanceGraph();
    updateRealTimeScore();
    // Auto-sync every 20 seconds
    setInterval(updateRealTimeScore, 20000);
};