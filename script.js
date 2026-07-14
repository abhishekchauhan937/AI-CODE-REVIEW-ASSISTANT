function reviewCode() {

    // Get user input
    let code = document.querySelector("textarea").value;
    let language = document.querySelector("select").value;
    let result = document.getElementById("result");
    let button = document.getElementById("reviewBtn");

    // Check if textarea is empty
    if (code.trim() === "") {
        alert("Please paste your code first!");
        return;
    }

    // Change button
    button.innerHTML = "Reviewing...";
    button.disabled = true;

    // Show loading message
    result.innerHTML = `
        <div class="result-card">
            <h2>🤖 AI is reviewing your code...</h2>
            <p>Please wait...</p>
        </div>
    `;

    // Wait for 2 seconds
    setTimeout(() => {

        let bugs = 0;
        let suggestions = [];

        // Check console.log
        if (code.includes("console.log")) {
            suggestions.push("Remove console.log() before production.");
        }

        // Check var
        if (code.includes("var ")) {
            bugs++;
            suggestions.push("Use let or const instead of var.");
        }

        // Check ==
        if (code.includes("==")) {
            bugs++;
            suggestions.push("Use === instead of ==.");
        }

        // Check comments
        if (!code.includes("//") && !code.includes("/*")) {
            suggestions.push("Add comments to improve readability.");
        }

        // Check function length
        if (code.length > 300) {
            suggestions.push("Split your code into smaller functions.");
        }

        // Rating
        let rating = "⭐⭐⭐⭐⭐ Excellent";

        if (bugs == 1) {
            rating = "⭐⭐⭐⭐ Good";
        }

        if (bugs == 2) {
            rating = "⭐⭐⭐ Average";
        }

        if (bugs >= 3) {
            rating = "⭐⭐ Needs Improvement";
        }

        // Perfect code
        if (suggestions.length === 0) {
            suggestions.push("Excellent! No suggestions. 🎉");
        }

        // Display result
        result.innerHTML = `
            <div class="result-card">

                <h2>✅ AI Review Completed</h2>

                <p><strong>Language:</strong> ${language}</p>

                <p><strong>Code Quality:</strong> ${rating}</p>

                <p><strong>Bugs Found:</strong> ${bugs}</p>

                <p><strong>Suggestions:</strong></p>

                <ul>
                    ${suggestions.map(item => `<li>${item}</li>`).join("")}
                </ul>

            </div>
        `;

        // Change button after review
        button.innerHTML = "Review Complete ✅";

        // Reset button after 2 seconds
        setTimeout(() => {
            button.innerHTML = "Review Code";
            button.disabled = false;
        }, 2000);

    }, 2000);

}