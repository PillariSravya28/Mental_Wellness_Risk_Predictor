// Analysis page JavaScript with Chart.js visualizations

document.addEventListener('DOMContentLoaded', function() {
    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    font: {
                        family: 'Poppins',
                        size: 12
                    }
                }
            }
        }
    };

    // 1. Accuracy Comparison Chart
    const accuracyCtx = document.getElementById('accuracyChart').getContext('2d');
    new Chart(accuracyCtx, {
        type: 'bar',
        data: {
            labels: chartData.models,
            datasets: [{
                label: 'Accuracy (%)',
                data: chartData.accuracy,
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(239, 68, 68, 0.8)',
                    'rgba(16, 185, 129, 0.8)'
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(139, 92, 246)',
                    'rgb(239, 68, 68)',
                    'rgb(16, 185, 129)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                ...commonOptions.plugins,
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y + '%';
                        }
                    }
                }
            }
        }
    });

    // 2. Precision Comparison Chart
    const precisionCtx = document.getElementById('precisionChart').getContext('2d');
    new Chart(precisionCtx, {
        type: 'bar',
        data: {
            labels: precisionData.models,
            datasets: [
                {
                    label: 'Low Risk Precision',
                    data: precisionData.low_risk,
                    backgroundColor: 'rgba(16, 185, 129, 0.8)',
                    borderColor: 'rgb(16, 185, 129)',
                    borderWidth: 2
                },
                {
                    label: 'Medium Risk Precision',
                    data: precisionData.medium_risk,
                    backgroundColor: 'rgba(245, 158, 11, 0.8)',
                    borderColor: 'rgb(245, 158, 11)',
                    borderWidth: 2
                },
                {
                    label: 'High Risk Precision',
                    data: precisionData.high_risk,
                    backgroundColor: 'rgba(239, 68, 68, 0.8)',
                    borderColor: 'rgb(239, 68, 68)',
                    borderWidth: 2
                }
            ]
        },
        options: {
            ...commonOptions,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(2) + '%';
                        }
                    }
                }
            }
        }
    });

    // 3. Confusion Matrices
    const confusionMatrices = {
        'cmRF': 'Random Forest',
        'cmLR': 'Logistic Regression',
        'cmSVM': 'SVM',
        'cmGB': 'Gradient Boosting'
    };

    Object.keys(confusionMatrices).forEach(canvasId => {
        const modelName = confusionMatrices[canvasId];
        const cm = chartData.confusion_matrices[modelName];

        createConfusionMatrix(canvasId, cm);
    });
});

function createConfusionMatrix(canvasId, confusionMatrix) {
    const ctx = document.getElementById(canvasId).getContext('2d');

    // Flatten the confusion matrix for display
    const labels = ['Low Risk', 'Medium Risk', 'High Risk'];
    const data = [];
    const colors = [];

    // Create data points for heatmap effect
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            data.push({
                x: labels[j],
                y: labels[i],
                v: confusionMatrix[i][j]
            });

            // Color based on diagonal (correct predictions) vs off-diagonal (errors)
            const isCorrect = i === j;
            const value = confusionMatrix[i][j];
            const maxValue = Math.max(...confusionMatrix.flat());
            const intensity = value / maxValue;

            if (isCorrect) {
                colors.push(`rgba(16, 185, 129, ${0.3 + intensity * 0.7})`);
            } else {
                colors.push(`rgba(239, 68, 68, ${intensity * 0.7})`);
            }
        }
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Predicted Low',
                data: [confusionMatrix[0][0], confusionMatrix[1][0], confusionMatrix[2][0]],
                backgroundColor: 'rgba(16, 185, 129, 0.7)',
                borderColor: 'rgb(16, 185, 129)',
                borderWidth: 1
            }, {
                label: 'Predicted Medium',
                data: [confusionMatrix[0][1], confusionMatrix[1][1], confusionMatrix[2][1]],
                backgroundColor: 'rgba(245, 158, 11, 0.7)',
                borderColor: 'rgb(245, 158, 11)',
                borderWidth: 1
            }, {
                label: 'Predicted High',
                data: [confusionMatrix[0][2], confusionMatrix[1][2], confusionMatrix[2][2]],
                backgroundColor: 'rgba(239, 68, 68, 0.7)',
                borderColor: 'rgb(239, 68, 68)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        font: {
                            family: 'Poppins',
                            size: 10
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y;
                        }
                    }
                }
            },
            scales: {
                x: {
                    stacked: false,
                    title: {
                        display: true,
                        text: 'Actual Risk Level',
                        font: {
                            family: 'Poppins',
                            size: 11
                        }
                    }
                },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Count',
                        font: {
                            family: 'Poppins',
                            size: 11
                        }
                    }
                }
            }
        }
    });
}