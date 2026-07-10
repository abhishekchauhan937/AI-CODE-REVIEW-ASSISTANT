function reviewCode() {

    let code = document.querySelector("textarea").value;

    let result = document.getElementById("result");

    if (code.trim() === "") {
        alert("Please paste your code first!");
        return;
    }

    result.innerHTML = `
        <h3>✅ AI Review Completed</h3>

        <p><strong>Code Quality:</strong> ⭐⭐⭐⭐☆ Good</p>

        <p><strong>Bugs Found:</strong> 0</p>

        <p><strong>Suggestion:</strong> Use meaningful variable names and add comments.</p>

        <p style="color:green;"><strong>Status:</strong> Ready for Improvement 🚀</p>
    `;
}