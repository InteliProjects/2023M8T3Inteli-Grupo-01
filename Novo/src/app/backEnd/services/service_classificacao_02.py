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

nltk.download('punkt')
nltk.download('stopwords')

_model = None
_vectorizer = None

def get_model02():
    global _model
    if _model is None:
        with open('knn_model_level2.pkl', 'rb') as model_file:
            _model = pickle.load(model_file)
    return _model

def get_vectorizer02():
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

def classify_new_input02(new_descriptions):
    model = get_model02()
    vectorizer = get_vectorizer02()

    processed_descriptions = [preprocess_text(desc) for desc in new_descriptions]

    new_descriptions_tfidf = vectorizer.transform(processed_descriptions)

    predicted_categories = model.predict(new_descriptions_tfidf)

    return predicted_categories[0]