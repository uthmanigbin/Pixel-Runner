from flask import Flask, request, jsonify

app = Flask(__name__)

players_scores = {}

@app.route('/submit_score', methods=['POST'])
def submit_score():
    data = request.json
    name = data['name']
    score = data['score']
    
    if name in players_scores:
        players_scores[name].append(score)
    else:
        players_scores[name] = [score]  
    
    return jsonify({"status": "success", "message": "Score saved successfully"}), 200

@app.route('/scores', methods=['GET'])

def display_scores():
    return jsonify(players_scores)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
