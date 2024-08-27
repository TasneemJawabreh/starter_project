// Replace checkForName with a function that checks the URL


// If working on Udacity workspace, update this with the Server API URL e.g. `https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api`
// const serverURL = 'https://wfkdhyvtzx.prod.udacity-student-workspaces.com/api'
const serverURL = 'http://localhost:8000/api'

const form = document.getElementById('urlForm');
//form.addEventListener('submit', handleSubmit);
// Function to send data to the server
function isValidURL(url) {
    const regex = /^(https?:\/\/)?([a-z\d-]+\.)+[a-z]{2,6}(:\d{1,5})?(\/.*)?$/i;
    return regex.test(url);
}
function handleSubmit(event) {
    event.preventDefault();

    // Get the URL from the input field
    const formText = document.getElementById('name').value;

    // Check if the URL is valid
    if (isValidURL(formText)) {
        console.log("Valid URL:", formText);

        // If the URL is valid, send it to the server using the serverURL constant above
        fetch(serverURL, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ formText })
        })
        .then(response => {return response.json()})
        .then(data => {
            console.log("Server response:", data);
            // Handle the response data
            document.getElementById('results').innerHTML = data.text;
            
        })
        .catch(error => console.error("Error:", error));
    } else {
        console.log("Invalid URL. Please enter a valid URL.");
        alert("Invalid URL. Please enter a valid URL.");
    }
}




// Export the handleSubmit function
export { handleSubmit };

