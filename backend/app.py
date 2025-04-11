from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import random

app = Flask(__name__)
CORS(app)

# State-wise base risk levels
STATE_RISK_LEVELS = {
    'maharashtra': (50, 70),  # (min, max) risk levels
    'delhi': (60, 80),
    'up': (55, 75),
    'karnataka': (45, 65),
    'tn': (45, 65),
    'wb': (50, 70),
    'telangana': (45, 65)
}

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        location = data.get('location', '')
        state = data.get('state', '')
        crime_type = data.get('crimeType', '')
        timeframe = data.get('timeframe', '')
        
        if not all([location, state, crime_type, timeframe]):
            missing = []
            if not location: missing.append('location')
            if not state: missing.append('state')
            if not crime_type: missing.append('crimeType')
            if not timeframe: missing.append('timeframe')
            return jsonify({'error': f"Missing required parameters: {', '.join(missing)}"}), 400
        
        # Generate a base risk level based on state
        min_risk, max_risk = STATE_RISK_LEVELS.get(state.lower(), (50, 70))
        risk_level = random.uniform(min_risk, max_risk)
        
        # Adjust based on crime type
        if crime_type == 'violent':
            risk_level *= random.uniform(1.2, 1.4)
        elif crime_type == 'theft':
            risk_level *= random.uniform(1.1, 1.3)
        elif crime_type == 'cyber':
            risk_level *= random.uniform(0.8, 1.0)
        
        # Cap at 100
        risk_level = min(100, risk_level)
        
        # Generate random but proportional breakdowns
        total_crime = 100
        theft_pct = random.uniform(30, 45)
        violence_pct = random.uniform(20, 35)
        cyber_pct = random.uniform(15, 25)
        other_pct = total_crime - (theft_pct + violence_pct + cyber_pct)
        
        # Generate random time patterns that sum to 100
        total_time = 100
        night = random.uniform(25, 35)
        evening = random.uniform(25, 35)
        afternoon = random.uniform(20, 30)
        morning = total_time - (night + evening + afternoon)
        
        prediction = {
            'riskLevel': round(risk_level, 2),
            'crimeBreakdown': [
                {'type': 'Theft', 'percentage': round(theft_pct, 2)},
                {'type': 'Violence', 'percentage': round(violence_pct, 2)},
                {'type': 'Cyber', 'percentage': round(cyber_pct, 2)},
                {'type': 'Other', 'percentage': round(other_pct, 2)}
            ],
            'timePattern': {
                'morning': round(morning, 2),
                'afternoon': round(afternoon, 2),
                'evening': round(evening, 2),
                'night': round(night, 2)
            },
            'socioeconomicFactors': [
                {'factor': 'Population Density', 'impact': round(random.uniform(60, 90), 2)},
                {'factor': 'Unemployment Rate', 'impact': round(random.uniform(50, 80), 2)},
                {'factor': 'Police Presence', 'impact': round(random.uniform(40, 70), 2)}
            ]
        }
        
        return jsonify(prediction)
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000) 