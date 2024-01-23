from flask import Flask
from controllers.controller_classificacao import classification_blueprint
from threading import Thread
from services.service_classificacao_01 import consume_from_kafka, get_vectorizer, get_model
from services.service_classificacao_02 import get_model02, get_vectorizer02

app = Flask(__name__)
app.register_blueprint(classification_blueprint)

def run_kafka_consumer():
    get_model()
    # get_vectorizer()
    consume_from_kafka()

if __name__ == "__main__":
    # Run Kafka consumer in a separate thread
    # kafka_thread = Thread(target=run_kafka_consumer)
    # kafka_thread.start()

    app.run(debug=True)  