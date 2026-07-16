function reviewCode() {

    // Get user input
    let code = document.querySelector("textarea").value;
    let characters = code.length;
    let lines = code.split("/n").length;
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

        // Progress animation
        setTimeout(() => {
            document.getElementById("progressBar").style.width = score + "%";
        }, 100);

        // Button animation
        button.innerHTML = "Review Complete ✅";

        setTimeout(() => {
            button.innerHTML = "Review Code";
            button.disabled = false;
        }, 2000);
        saveHistory(language,rating,bugs);
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

function updateStats(){

    let textarea = document.querySelector("textarea");

    let text = textarea.value;

    document.getElementById("charCount").innerText = text.length;

    document.getElementById("lineCount").innerText = text.split("\n").length;

}

function clearEditor() {
    document.querySelector("textarea").value = "";
    document.getElementById("result").innerHTML = "";

    document.getElementById("charCount").innerText = "Characters: 0 | Lines: 0";
}

// Keyboard Shortcuts
document.addEventListener("keydown", function (event) {

    // Ctrl + Enter = Review Code
    if (event.ctrlKey && event.key === "Enter") {
        event.preventDefault();
        reviewCode();
    }

    // Ctrl + Delete = Clear Editor
    if (event.ctrlKey && event.key === "Delete") {
        event.preventDefault();
        clearEditor();
    }
});

function saveHistory(language, rating, bugs) {

    let history = JSON.parse(localStorage.getItem("reviewHistory")) || [];

    history.unshift({
        language,
        rating,
        bugs,
        date: new Date().toLocaleString()
    });

    if (history.length > 5) {
        history.pop();
    }

    localStorage.setItem("reviewHistory", JSON.stringify(history));

    loadHistory();
}

function loadHistory() {

    let history = JSON.parse(localStorage.getItem("reviewHistory")) || [];

    let historyDiv = document.getElementById("history");

    historyDiv.innerHTML = "";

    history.forEach(item => {

        historyDiv.innerHTML += `
        <div class="history-card">
            <strong>${item.language}</strong><br>
            ⭐ ${item.rating}<br>
            🐞 Bugs: ${item.bugs}<br>
            <small>${item.date}</small>
        </div>
        `;
    });

}

loadHistory();