from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Flask Backend is Running!"

@app.route('/api', methods=['GET', 'POST'])
def signup():

    if request.method == 'GET':
        return jsonify({
            "message": "API is running successfully"
        })

    data = request.get_json()

    name = data.get('name')
    age = data.get('age')
    email = data.get('email')

    if not name or not age or not email:
        return jsonify({
            "success": False,
            "message": "All fields are required."
        }), 400

    return jsonify({
        "success": True,
        "message": "Registration Successful!",
        "student": {
            "name": name,
            "age": age,
            "email": email
        }
    }), 200


if __name__ == '__main__':
    app.run(
        host='0.0.0.0',
        port=8000,
        debug=True
    )