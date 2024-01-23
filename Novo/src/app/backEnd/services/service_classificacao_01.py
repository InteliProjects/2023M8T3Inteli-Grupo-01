import pickle
import nltk
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
import requests
import json
from kafka import KafkaConsumer
import json
import numpy as np


TOPIC_NAME = "descricao-topico"
BOOTSTRAP_SERVERS = ["localhost:9092"]

nltk.download('punkt')
nltk.download('stopwords')

_model = None
_vectorizer = None

def get_model():
    global _model
    if _model is None:
        with open('svm_model.pkl', 'rb') as model_file:
            _model = pickle.load(model_file)
    return _model

def get_vectorizer():
    global _vectorizer
    if _vectorizer is None:
        with open('tfidf_vectorizer.pkl', 'rb') as vectorizer_file:
            _vectorizer = pickle.load(vectorizer_file)
    return _vectorizer

def preprocess_text(text):
    stemmer = PorterStemmer()
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word.isalnum()] 
    tokens = [word.lower() for word in tokens]

    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]
    stemmed_tokens = [stemmer.stem(word) for word in tokens] 

    return ' '.join(stemmed_tokens)


def send_webhook(url, data):
    requests.post(url, json=data)


def classify_new_input(new_descriptions):
    model = get_model()
    vectorizer = get_vectorizer()

    processed_descriptions = [preprocess_text(desc) for desc in new_descriptions]

    new_descriptions_tfidf = vectorizer.transform(processed_descriptions)

    predicted_categories = model.predict(new_descriptions_tfidf)

    return predicted_categories[0]

def consume_from_kafka():
    consumer = KafkaConsumer(
        TOPIC_NAME,
        bootstrap_servers=BOOTSTRAP_SERVERS,
        auto_offset_reset="earliest",
        group_id="first_consumer",
    )

    print("Consumindo mensagens do tópico: " + TOPIC_NAME)

    for message in consumer:
        text = json.loads(message.value.decode('utf-8'))
        new_descriptions = text["new_description"]
        classification = classify_new_input(new_descriptions)

        print(f'Mensagem consumida: {new_descriptions}')
        print(f'Classificação: {classification}')

        data = {"text": text, "processed_text": "processed_descriptions", "classification": classification, "key": message.key.decode('utf-8')}
        send_webhook("http://localhost:3030/api/receiveClassification", data)