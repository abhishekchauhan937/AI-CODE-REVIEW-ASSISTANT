function reviewCode() {

    let code = document.querySelector("textarea").value;

    let result = document.getElementById("result");

    if (code.trim() === "") {
        alert("Please paste your code first!");
        return;
    }

    let rating = "⭐⭐⭐⭐⭐ Excellent";
    let bugs = 0;
    let suggestions = [];

    // Check console.log
    if (code.includes("console.log")) {
        suggestions.push("Remove console.log() before production.");
    }

    // Check var
    if (code.includes("var ")) {
        bugs++;
        rating = "⭐⭐⭐ Average";
        suggestions.push("Use let or const instead of var.");
    }

    // Check comments
    if (!code.includes("//")) {
        suggestions.push("Add comments to improve readability.");
    }

    // Long code
    if (code.length > 300) {
        suggestions.push("Split your code into smaller functions.");
    }

    // Perfect code
    if (suggestions.length === 0) {
        suggestions.push("Excellent! No suggestions.");
    }

    result.innerHTML = `
<div class="result-card">

<h3>✅ AI Review Completed</h3>

<p><strong>Code Quality:</strong> ${rating}</p>

<p><strong>Bugs Found:</strong> ${bugs}</p>

<p><strong>Suggestions:</strong></p>

<ul>
${suggestions.map(item => `<li>${item}</li>`).join("")}
</ul>

</div>
`;
}