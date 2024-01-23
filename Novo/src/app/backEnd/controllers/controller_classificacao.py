from flask import Blueprint, request, jsonify
from services.service_classificacao_01 import classify_new_input, send_webhook as send_webhook_service
from services.service_classificacao_02 import classify_new_input02

classification_blueprint = Blueprint('classification', __name__)

@classification_blueprint.route("/healthcheck", methods=["GET"])
def healthcheck():
    return jsonify({"status": "OK"}), 200

WEBHOOK_URL = "http://localhost:3030/api/receiveClassification"

@classification_blueprint.route("/ReceiveDescription", methods=["POST"])
def ReceiveDescription():
    data = request.get_json()
    new_description = data.get('new_description', None)

    if not new_description or not isinstance(new_description, list):
        return jsonify({"message": "Invalid or missing 'new_description' in the request"}), 400

    try:
        predicted_category = classify_new_input(new_description)
        print(predicted_category)
        predicted_category02 = classify_new_input02(new_description)
        print(predicted_category02)

        request_id = data.get('requestId')
        if request_id:
            send_webhook(WEBHOOK_URL, {"classification": predicted_category,  "classification02": predicted_category02, "key": request_id})

        return jsonify({"predicted_categories": predicted_category, "predicted_categories 2": predicted_category02}), 200
    
    except Exception as e:
        error_message = f"Error during prediction: {str(e)}"
        request_id = data.get('requestId')
        if request_id:
            send_webhook(WEBHOOK_URL, {"message": error_message, "requestId": request_id})

        return jsonify({"message": "Error during prediction", "error": str(e)}), 500
    
def send_webhook(url, data):
    send_webhook_service(url, data)