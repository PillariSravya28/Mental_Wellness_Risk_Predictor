from flask import Flask, render_template, request, jsonify
import pickle
import numpy as np
import json
import os

app = Flask(__name__)

# Load all models
models = {}
model_files = {
    'Random Forest': 'models/random_forest_model.pkl',
    'Logistic Regression': 'models/logistic_regression_model.pkl',
    'SVM': 'models/svm_model.pkl',
    'Gradient Boosting': 'models/gradient_boosting_model.pkl'
}

for model_name, file_path in model_files.items():
    try:
        with open(file_path, 'rb') as f:
            models[model_name] = pickle.load(f)
        print(f"Loaded {model_name} successfully")
    except Exception as e:
        print(f"Error loading {model_name}: {e}")

# Load chart data
with open('chart_data.json', 'r') as f:
    chart_data = json.load(f)

with open('precision_data.json', 'r') as f:
    precision_data = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/questionnaire')
def questionnaire():
    return render_template('questionnaire.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json

        # Extract features in correct order
        features = [
            float(data['age']),
            int(data['gender']),
            int(data['occupation']),
            float(data['sleepHours']),
            int(data['physicalActivity']),
            float(data['workHours']),
            float(data['socialMediaUsage']),
            int(data['dietQuality']),
            int(data['stressLevel']),
            int(data['mentalIllnessHistory']),
            int(data['moodSwings']),
            int(data['copingStruggles']),
            int(data['traumaticExperience']),
            int(data['alcoholUse']),
            int(data['smoking']),
            int(data['familyHistory'])
        ]

        # Make predictions with all models
        predictions = {}
        probabilities = {}

        for model_name, model in models.items():
            pred = model.predict([features])[0]
            predictions[model_name] = int(pred)

            # Get prediction probabilities if available
            if hasattr(model, 'predict_proba'):
                prob = model.predict_proba([features])[0]
                probabilities[model_name] = {
                    'low': float(prob[0]),
                    'medium': float(prob[1]),
                    'high': float(prob[2])
                }

        # Generate suggestions based on risk level
        risk_level = predictions['Random Forest']  # Use Random Forest as primary

        suggestions = get_suggestions(risk_level, data)

        return jsonify({
            'success': True,
            'predictions': predictions,
            'probabilities': probabilities,
            'suggestions': suggestions,
            'riskLevel': risk_level
        })

    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        })

def get_suggestions(risk_level, data):
    """Generate personalized suggestions based on risk level and user data"""
    suggestions = []

    if risk_level == 0:  # Low Risk
        suggestions.append("Great job! You're maintaining good mental wellness.")
        suggestions.append("Continue your current healthy habits and lifestyle.")
        suggestions.append("Keep up with regular physical activity and good sleep schedule.")
        suggestions.append("Maintain social connections and hobbies you enjoy.")

    elif risk_level == 1:  # Medium Risk
        suggestions.append("You may be experiencing moderate stress. It's important to take proactive steps.")

        if float(data.get('sleepHours', 7)) < 6:
            suggestions.append("Try to improve your sleep schedule - aim for 7-8 hours per night.")

        if int(data.get('physicalActivity', 3)) < 2:
            suggestions.append("Increase physical activity - even 30 minutes of walking daily can help.")

        if int(data.get('stressLevel', 1)) >= 3:
            suggestions.append("Practice stress management techniques like meditation or deep breathing.")

        if float(data.get('socialMediaUsage', 0)) > 6:
            suggestions.append("Consider reducing social media usage to improve mental well-being.")

        suggestions.append("Consider talking to a counselor or therapist for additional support.")
        suggestions.append("Engage in activities you enjoy and spend time with supportive friends/family.")

    else:  # High Risk
        suggestions.append("Your responses indicate you may be experiencing significant mental health challenges.")
        suggestions.append("We strongly recommend seeking professional help from a mental health professional.")
        suggestions.append("Contact a therapist, counselor, or psychiatrist as soon as possible.")

        if int(data.get('mentalIllnessHistory', 0)) == 1:
            suggestions.append("Continue or resume any previous mental health treatment you've received.")

        suggestions.append("Reach out to trusted friends or family members for support.")
        

    return suggestions

@app.route('/analysis')
def analysis():
    return render_template('analysis.html', 
                         chart_data=json.dumps(chart_data),
                         precision_data=json.dumps(precision_data))

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True, port=5000)
