if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "login.html";
}

function reviewCode() {

    // Get user input
    let code = document.querySelector("textarea").value;
    let characters = code.length;
    let lines = code.split("\n").length;
    let language = document.querySelector("select").value;
    let result = document.getElementById("result");
    let button = document.getElementById("reviewBtn");

    // Check empty code
    if (code.trim() === "") {
        alert("Please paste your code first!");
        return;
    }

    // Button loading
    button.innerHTML = "Reviewing...";
    button.disabled = true;

    // Loading card
    result.innerHTML = `
    <div class="result-card">
        <h2>🤖 AI is reviewing your code...</h2>
        <p>Please wait...</p>
    </div>
    `;

    // Delay
    setTimeout(() => {
        
        let reviewTime = new Date().toLocaleString();
        let bugs = 0;
        let suggestions = [];
        let rating = "⭐⭐⭐⭐⭐ Excellent";

        // console.log
        if (code.includes("console.log")) {
            suggestions.push("Remove console.log() before production.");
        }

        // var
        if (code.includes("var ")) {
            bugs++;
            suggestions.push("Use let or const instead of var.");
        }

        // ==
        if (code.includes("==")) {
            bugs++;
            suggestions.push("Use === instead of ==.");
        }

        // eval
        if (code.includes("eval(")) {
            bugs++;
            suggestions.push("Avoid using eval().");
        }

        // Long code
        if (code.length > 400) {
            suggestions.push("Split your code into smaller functions.");
        }

        // Missing comments
        if (!code.includes("//")) {
            suggestions.push("Add comments to improve readability.");
        }

        // Rating
        if (bugs == 0) {
            rating = "⭐⭐⭐⭐⭐ Excellent";
        } else if (bugs == 1) {
            rating = "⭐⭐⭐⭐ Good";
        } else if (bugs == 2) {
            rating = "⭐⭐⭐ Average";
        } else {
            rating = "⭐⭐ Needs Improvement";
        }

        // Default suggestion
        if (suggestions.length == 0) {
            suggestions.push("Excellent! No suggestions.");
        }

        // Score
        let score = 100 - (bugs * 20);

        if (score < 0) {
            score = 0;
        }

        // Result
        result.innerHTML = `
        <div class="result-card">

            <h3>🤖 AI Review Completed</h3>

            <div class="score-box">

                <div class="progress">
                    <div class="progress-bar" id="progressBar"></div>
                </div>

                <div class="score-text">
                    ${score}% Code Quality
                </div>

            </div>

            <p><strong>Language:</strong> ${language}</p>

            <p><strong>Reviewed on:</strong> ${reviewTime}</p>

            <p><strong>Characters:</strong> ${characters}</p>

            <p><strong>Lines of Code:</strong> ${lines}</p>

            <p class="rating"><strong>Rating:</strong>${rating}</p>

            <p><strong>Bugs Found:</strong> ${bugs}</p>

            <p><strong>Status:</strong> ${bugs === 0
? "<span class='good'>Excellent ✅</span>"
: "<span class='bad'>Needs Improvement ❌</span>"}
</p>

            <p><strong>Suggestions:</strong></p>

            <ul>
                ${suggestions.map(item => `<li>${item}</li>`).join("")}
            </ul>

        </div>
        `;

        updateChart(score, bugs);

        // Progress animation
        setTimeout(() => {
            document.getElementById("progressBar").style.width = score + "%";
        }, 100);

        // Button animation
        button.innerHTML = "Review Complete ✅";

        setTimeout(() => {J
            button.innerHTML = "Review Code";
            button.disabled = false;
        }, 2000);
        saveHistory(language, rating, bugs, score);
    }, 2000);
}


// Dark Mode
function toggleTheme() {

    document.body.classList.toggle("dark");

    let btn = document.getElementById("themeBtn");

    if (document.body.classList.contains("dark")) {
        btn.innerHTML = "☀️ Light Mode";
    } else {
        btn.innerHTML = "🌙 Dark Mode";
    }

}

function copyReview(){

    let review = document.getElementById("result").innerText;

    navigator.clipboard.writeText(review);

    alert("✅ Review copied successfully!");

}

function downloadReview(){

    let review = document.getElementById("result").innerText;

    let blob = new Blob([review], { type: "text/plain" });

    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);

    link.download = "AI_Review_Report.txt";

    link.click();

}

function updateStatistics(){

    let textarea = document.querySelector("textarea");

    let text = textarea.value;

    document.getElementById("charCount").innerText = text.length;

    document.getElementById("lineCount").innerText = text.split("\n").length;

}

function clearEditor() {
    document.querySelector("textarea").value = "";
    document.getElementById("result").innerHTML = "";

    document.getElementById("charCount").innerText = 0;
    document.getElementById("lineCount").innerText = 0;
}

// Keyboard Shortcuts
document.addEventListener("keydown", function (event) {

    // Command + Enter = Review Code
    if (event.metaKey && event.key === "Enter") {
        event.preventDefault();
        reviewCode();
    }

    // Command + Delete = Clear Editor
    if (event.metaKey && event.key === "Delete") {
        event.preventDefault();
        clearEditor();
    }
});

function saveHistory(language, rating, bugs, quality) {

    let history = JSON.parse(localStorage.getItem("reviewHistory")) || [];

    history.unshift({
        language: language,
        rating: rating,
        bugs: bugs,
        quality: quality,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("reviewHistory", JSON.stringify(history));

    loadHistory();
    updateStatistics();
}
function loadHistory() {

    let history = JSON.parse(localStorage.getItem("reviewHistory")) || [];

    let historyDiv = document.getElementById("history");

    historyDiv.innerHTML = "";

    history.forEach((item,index) => {

    historyDiv.innerHTML += `
        <div class="history-card">

            <button
                class="delete-btn"
                onclick="deleteHistory(${index})">
                🗑 Delete
            </button>

            <strong>${item.language}</strong><br>

            ⭐ ${item.rating}<br>

            🐞 Bugs: ${item.bugs}<br>

            <small>${item.date}</small>

        </div>
    `;
});
}

loadHistory();
updateStatistics();

function deleteHistory(index){

    let history = JSON.parse(localStorage.getItem("reviewHistory")) || [];

    history.splice(index,1);

    localStorage.setItem(
        "reviewHistory",
        JSON.stringify(history)
    );

    loadHistory();
    updateStatistics();

}

function searchHistory() {

    let input = document
        .getElementById("searchHistory")
        .value
        .toLowerCase();

    let cards = document.querySelectorAll(".history-card");

    cards.forEach(card => {

        if(card.innerText.toLowerCase().includes(input)){
            card.style.display = "block";
        }else{
            card.style.display = "none";
        }

    });

}

function clearHistory(){

    if(confirm("Are you sure you want to delete all review history?")){

        localStorage.removeItem("reviewHistory");

        loadHistory();

        updateStatistics();

    }

}

let qualityChart;

function updateChart(quality, bugs) {

    const readability = Math.max(40, quality - 10);
    const performance = Math.max(50, quality - 5);

    const ctx = document.getElementById("qualityChart").getContext("2d");

    if (qualityChart) {
        qualityChart.destroy();
    }

    qualityChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Quality", "Bugs", "Readability", "Performance"],
            datasets: [{
                label: "Code Analysis",
                data: [quality, bugs, readability, performance]
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            }
        }
    });
}

function updateStatistics(){

    let history = JSON.parse(localStorage.getItem("reviewHistory")) || [];

    document.getElementById("totalReviews").innerText = history.length;

    let bugs = 0;
    let quality = 0;
    let languageCount = {};

    history.forEach(item=>{

        bugs += item.bugs;

        quality += item.quality || 100;

        languageCount[item.language] =
        (languageCount[item.language] || 0)+1;

    });

    document.getElementById("totalBugs").innerText = bugs;

    document.getElementById("avgQuality").innerText =
        history.length ?
        Math.round(quality/history.length)+"%"
        : "0%";

    let fav="-";
    let max=0;

    for(let lang in languageCount){

        if(languageCount[lang]>max){

            max=languageCount[lang];

            fav=lang;

        }

    }

    document.getElementById("favLanguage").innerText=fav;

}