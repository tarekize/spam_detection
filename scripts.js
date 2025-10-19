document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('prediction-form');
    const predictButton = document.getElementById('predict-button');
    const predictionResult = document.getElementById('prediction-result');

    predictButton.addEventListener('click', () => {
        const email = document.getElementById('email').value;

        // Check if the email (message) is empty
        if (email.trim() === '') {
            predictionResult.innerText = 'You have to write a message.';
            predictionResult.classList.remove('text-green', 'text-red');
            predictionResult.classList.add('text-white');
             // color classes
            return; // Exit the function early
        }

        // Create the JSON payload
        const payload = JSON.stringify({
            email: email,
        });

        fetch('http://localhost:8000/predict/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: payload,
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.prediction);
                if (data.prediction == 0) {
                    predictionResult.innerText = `It's not a spam`;
                    predictionResult.classList.remove('text-red');
                    predictionResult.classList.remove('text-white');
                    predictionResult.classList.add('text-green');
                } else {
                    predictionResult.innerText = `It's a spam`;
                    predictionResult.classList.remove('text-green');
                    predictionResult.classList.remove('text-white');
                    predictionResult.classList.add('text-red');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                predictionResult.innerText = 'Prediction failed.';
                predictionResult.classList.remove('text-green', 'text-red'); // Remove color classes
            });
    });
});
