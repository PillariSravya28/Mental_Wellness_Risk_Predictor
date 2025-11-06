// Questionnaire form handling
let currentStep = 1;
const totalSteps = 4;

function updateProgressBar() {
    const progress = (currentStep / totalSteps) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
    document.getElementById('currentStep').textContent = currentStep;
}

function showStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => {
        s.classList.remove('active');
    });

    // Show current step
    const currentStepElement = document.querySelector(`[data-step="${step}"]`);
    if (currentStepElement) {
        currentStepElement.classList.add('active');
    }

    // Update button visibility
    document.getElementById('prevBtn').style.display = step === 1 ? 'none' : 'inline-block';
    document.getElementById('nextBtn').style.display = step === totalSteps ? 'none' : 'inline-block';
    document.getElementById('submitBtn').style.display = step === totalSteps ? 'inline-block' : 'none';

    updateProgressBar();
}

function changeStep(direction) {
    // Validate current step before moving forward
    if (direction === 1) {
        const currentStepElement = document.querySelector(`[data-step="${currentStep}"]`);
        const inputs = currentStepElement.querySelectorAll('input[required], select[required]');
        let valid = true;

        inputs.forEach(input => {
            if (!input.value) {
                input.style.borderColor = 'var(--danger-color)';
                valid = false;
            } else {
                input.style.borderColor = 'var(--border-color)';
            }
        });

        if (!valid) {
            alert('Please fill in all required fields');
            return;
        }
    }

    currentStep += direction;

    if (currentStep < 1) currentStep = 1;
    if (currentStep > totalSteps) currentStep = totalSteps;

    showStep(currentStep);
}

// Form submission
document.getElementById('assessmentForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    // Collect form data
    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Show loading state
    document.getElementById('submitBtn').textContent = 'Analyzing...';
    document.getElementById('submitBtn').disabled = true;

    try {
        // Send data to backend
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            // Hide form
            document.getElementById('assessmentForm').style.display = 'none';
            document.querySelector('.form-navigation').style.display = 'none';

            // Show results
            displayResults(result);
        } else {
            alert('Error: ' + result.error);
            document.getElementById('submitBtn').textContent = 'Submit Assessment';
            document.getElementById('submitBtn').disabled = false;
        }
    } catch (error) {
        alert('Error submitting form: ' + error.message);
        document.getElementById('submitBtn').textContent = 'Submit Assessment';
        document.getElementById('submitBtn').disabled = false;
    }
});

function displayResults(result) {
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';

    // Display risk level
    const riskLevel = result.riskLevel;
    const riskLevelDisplay = document.getElementById('riskLevelDisplay');
    const riskDescription = document.getElementById('riskDescription');

    let riskText, riskClass, riskDesc;

    if (riskLevel === 0) {
        riskText = 'LOW RISK';
        riskClass = 'risk-low';
        riskDesc = 'You appear to have good mental wellness with minimal risk factors.';
    } else if (riskLevel === 1) {
        riskText = 'MEDIUM RISK';
        riskClass = 'risk-medium';
        riskDesc = 'You may be experiencing some mental health challenges that warrant attention.';
    } else {
        riskText = 'HIGH RISK';
        riskClass = 'risk-high';
        riskDesc = 'You appear to be experiencing significant mental health challenges. Please consider seeking professional help.';
    }

    riskLevelDisplay.textContent = riskText;
    riskLevelDisplay.className = 'risk-level ' + riskClass;
    riskDescription.textContent = riskDesc;

    // Display model predictions
    const predictionsGrid = document.getElementById('predictionsGrid');
    predictionsGrid.innerHTML = '';

    const riskLabels = ['Low Risk', 'Medium Risk', 'High Risk'];

    for (const [modelName, prediction] of Object.entries(result.predictions)) {
        const predictionCard = document.createElement('div');
        predictionCard.className = 'prediction-card';
        predictionCard.innerHTML = `
            <h4>${modelName}</h4>
            <p style="font-size: 1.125rem; font-weight: 600; color: var(--primary-color); margin-top: 0.5rem;">
                ${riskLabels[prediction]}
            </p>
        `;
        predictionsGrid.appendChild(predictionCard);
    }

    // Display suggestions
    const suggestionsList = document.getElementById('suggestionsList');
    suggestionsList.innerHTML = '';

    result.suggestions.forEach(suggestion => {
        const li = document.createElement('li');
        li.textContent = suggestion;
        suggestionsList.appendChild(li);
    });

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showStep(1);
});