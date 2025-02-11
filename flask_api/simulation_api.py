from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def simulate_battle(enemy_lineup, boosts):
    total_power = 0

    # Define weighting factors for hero types
    type_weights = {
        'str': 1.2,
        'int': 1.0,
        'agi': 1.1
    }
    
    attr_keys = [
        'HP', 'Attack', 'ATK', 'DEF', 'MDEF', 'Physical Critical',
        'Magic Critical', 'Recovery (Round)', 'Recharge (Round)',
        'Pierce', 'Life Leech', 'Force', 'Reflex', 'Healing Focus',
        'Accuracy', 'Recovery/Second', 'Endurance'
    ]
    
    for hero in enemy_lineup:
        # Sum the numeric attributes
        hero_power = sum([hero.get(key, 0) for key in attr_keys])
        
        # Incorporate hero type by applying a weight
        hero_type = hero.get('heroType', 'int').lower()  # Default to 'int' if not provided
        weight = type_weights.get(hero_type, 1.0)
        hero_power *= weight
        
        # Apply boost options (each boost is assumed to be a dict with keys 'attribute' and 'value')
        for boost in boosts:
            boost_attr = boost.get('attribute')
            boost_val = boost.get('value', 0)
            if boost_attr in hero:
                # If boost_val is less than 1, treat as a percentage; otherwise flat addition
                if 0 < boost_val < 1:
                    hero_power += hero.get(boost_attr, 0) * boost_val
                else:
                    hero_power += boost_val
        
        total_power += hero_power

    if total_power > 5000:
        result = f"Enemy wins with total power of {total_power:.2f}"
    else:
        result = f"Your formation wins with total power of {total_power:.2f}"
    
    return result

@app.route('/simulate', methods=['POST'])
def simulate():
    data = request.get_json()
    enemy_lineup = data.get('enemy_lineup', [])
    boosts = data.get('boosts', [])
    result = simulate_battle(enemy_lineup, boosts)
    return jsonify({'simulationResult': result})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
