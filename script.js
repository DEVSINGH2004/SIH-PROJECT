document.getElementById('send-button').addEventListener('click', async () => {
    const input = document.getElementById('user-input').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/ask_question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ question: input })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Debugging: Check what the backend returns
        console.log(data);

        const output = document.getElementById('output');
        output.innerHTML += `<div class="user">${input}</div>`;
        output.innerHTML += `<div class="system">${data.response || 'No response received'}</div>`;
        document.getElementById('user-input').value = '';
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const fileInput = document.getElementById('file-input');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('http://127.0.0.1:8000/upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        document.getElementById('upload-status').textContent = data.message || 'Upload successful!';
    } catch (error) {
        console.error('Error:', error);
    }
});
