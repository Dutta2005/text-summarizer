document.getElementById('summarizeBtn').addEventListener('click', async function() {
    const inputText = document.getElementById('inputText').value;
    const loadingIndicator = document.getElementById('loadingIndicator');
    const summaryResult = document.getElementById('summaryResult');

    // Clear any previous summary result
    summaryResult.innerText = '';

    if (inputText.trim() === '') {
        alert('Please enter some text');
        return;
    }

    // Show loading indicator
    loadingIndicator.style.display = 'flex';

    // Send text to the backend for summarization
    try {
        const response = await fetch('/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: inputText })
        });

        const data = await response.json();

        // Hide loading indicator
        loadingIndicator.style.display = 'none';

        // Display the summary result
        summaryResult.innerText = data.summary;
    } catch (error) {
        console.error('Error summarizing text:', error);

        // Hide loading indicator
        loadingIndicator.style.display = 'none';

        alert('Something went wrong while summarizing the text.');
    }
});
