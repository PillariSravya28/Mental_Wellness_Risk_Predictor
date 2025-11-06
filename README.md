# Enhanced Mental Wellness Risk Predictor

An AI-powered web application for assessing mental wellness risk using multiple machine learning models.

## Features

- 🧠 **Multi-Model Prediction**: Uses 4 different ML algorithms (Random Forest, Gradient Boosting, SVM, Logistic Regression)
- 📊 **Comprehensive Analysis**: Visual comparison of model performance with interactive charts
- 💡 **Personalized Recommendations**: Get tailored suggestions based on your risk assessment
- 🎨 **Modern UI/UX**: Beautiful, responsive design with smooth animations
- 📈 **Model Comparison**: Detailed accuracy, precision, and confusion matrix visualizations

## Technology Stack

### Backend
- Python Flask
- scikit-learn for machine learning
- NumPy & Pandas for data processing

### Frontend
- HTML5 & CSS3
- JavaScript (Vanilla)
- Chart.js for data visualization

### Machine Learning Models
- Random Forest Classifier (Accuracy: 100%)
- Gradient Boosting Classifier (Accuracy: 99.5%)
- Support Vector Machine - SVM (Accuracy: 100%)
- Logistic Regression (Accuracy: 99.5%)

## Installation

### Prerequisites
- Python 3.8 or higher
- pip package manager

### Setup Steps

1. **Extract the project folder**
   ```bash
   cd Enhanced_Mental_Wellness_Predictor
   ```

2. **Create a virtual environment (recommended)**
   ```bash
   # Windows
   python -m venv venv
   venv\Scripts\activate

   # macOS/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```

3. **Install required packages**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the application**
   ```bash
   python app.py
   ```

5. **Open your browser**
   Navigate to: `http://localhost:5000`

## Project Structure

```
Enhanced_Mental_Wellness_Predictor/
│
├── app.py                          # Flask application backend
├── requirements.txt                # Python dependencies
├── README.md                       # This file
│
├── models/                         # Trained ML models
│   ├── random_forest_model.pkl
│   ├── logistic_regression_model.pkl
│   ├── svm_model.pkl
│   └── gradient_boosting_model.pkl
│
├── templates/                      # HTML templates
│   ├── index.html                  # Home page
│   ├── questionnaire.html          # Assessment form
│   ├── analysis.html               # Model analysis page
│   └── about.html                  # About page
│
├── static/                         # Static assets
│   ├── css/
│   │   └── style.css              # Main stylesheet
│   └── js/
│       ├── main.js                # Homepage JavaScript
│       ├── questionnaire.js       # Form handling
│       └── analysis.js            # Chart visualizations
│
├── mental_wellness_dataset.csv    # Training dataset
├── chart_data.json                # Model performance data
├── precision_data.json            # Precision metrics
└── model_comparison_results.csv   # Comparison results
```

## Usage Guide

### 1. Home Page
- View an overview of the application and its features
- Navigate to different sections
- Learn about the ML models used

### 2. Assessment
- Complete a comprehensive questionnaire with 4 sections:
  - Demographics (Age, Gender, Occupation)
  - Lifestyle & Habits (Sleep, Activity, Work hours, etc.)
  - Mental Health Indicators (Stress, Mood swings, History, etc.)
  - Substance Use (Alcohol, Smoking)
- Submit to receive instant predictions from all 4 models
- Get personalized recommendations based on your risk level

### 3. Model Analysis
- View detailed performance comparisons between all models
- Interactive charts showing:
  - Accuracy comparison
  - Precision by risk level
  - Confusion matrices for each model
- Learn about each machine learning algorithm

### 4. About
- Understand the project's mission and technology
- View technical details and methodology
- Read important disclaimers

## Dataset Information

The models were trained on a synthetic dataset of 1,000 samples with:
- **16 Features**: Age, Gender, Occupation, Sleep Hours, Physical Activity, Work Hours, Social Media Usage, Diet Quality, Stress Level, Mental Illness History, Mood Swings, Coping Struggles, Traumatic Experience, Alcohol Use, Smoking, Family History
- **3 Risk Categories**: Low (35%), Medium (40%), High (25%)
- **Balanced Distribution**: Ensures fair representation across all risk levels

## Model Performance

| Model | Accuracy | Precision (Macro) |
|-------|----------|-------------------|
| Random Forest | 100% | 100% |
| SVM | 100% | 100% |
| Gradient Boosting | 99.5% | 99.53% |
| Logistic Regression | 99.5% | 99.53% |

## Important Disclaimer

⚠️ **This tool is for educational and informational purposes only.**

The Mental Wellness Risk Predictor is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of qualified healthcare providers with questions regarding mental health conditions.

### Crisis Resources
If you are experiencing a mental health crisis:
- **National Suicide Prevention Lifeline**: 988
- **Crisis Text Line**: Text HOME to 741741
- **Emergency Services**: 911

## Customization

### Adding More Features
1. Update the dataset generation in `app.py`
2. Retrain all models with new features
3. Update the questionnaire form in `questionnaire.html`
4. Modify the feature extraction in the `/predict` endpoint

### Changing Themes
- Edit `static/css/style.css`
- Modify CSS variables in the `:root` selector
- Customize colors, fonts, and layouts

### Adding New Models
1. Train your model using scikit-learn
2. Save it using `pickle`
3. Update `app.py` to load and use the new model
4. Add visualization in `analysis.html`

## Troubleshooting

### Common Issues

**1. Port already in use**
```bash
# Change the port in app.py
app.run(debug=True, port=5001)  # Use a different port
```

**2. Module not found errors**
```bash
# Ensure virtual environment is activated
# Reinstall requirements
pip install -r requirements.txt
```

**3. Model file not found**
```bash
# Ensure all .pkl files are in the models/ directory
# Check file permissions
```

## Future Enhancements

- [ ] User authentication and session management
- [ ] Save assessment history
- [ ] Export results as PDF
- [ ] Multi-language support
- [ ] Mobile app version
- [ ] Integration with real-time mental health resources
- [ ] Advanced data visualization dashboards

## Contributing

This is an educational project. Feel free to:
- Fork and improve the code
- Add new features
- Enhance the UI/UX
- Improve model accuracy

## License

This project is for educational purposes. Use responsibly and ethically.

## Contact & Support

For questions or issues:
- Review the code documentation
- Check the troubleshooting section
- Consult Flask and scikit-learn documentation

---

**Built with ❤️ for mental health awareness**
