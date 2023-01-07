# Importing Libraries
import random
import json
import pickle
import numpy as np
from keras.models import load_model
from nltk.stem import WordNetLemmatizer
import nltk
import string
import yake

# Loading/initializing lemmatizier/different pickle files
lemmatizer = WordNetLemmatizer()
intents = json.loads(open("intents.json").read())
words = pickle.load(open('words.pkl', 'rb'))
classes = pickle.load(open('classes.pkl', 'rb'))
model = load_model('chatbotmodel.h5')
  
def sentences_cleaned(sentence):
    '''Cleaning sentences using tokenizer and lemmatizer'''
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words if word not in string.punctuation]
    return sentence_words
  
def bag_of_words_model(sentence):
    '''Applying bag of words algorithm for model data'''
    sentence_words = sentences_cleaned(sentence)
    bag = [0]*len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def bag_of_words_sentences(sentence):
    '''Applying bag of words algorithm for user data'''
    filtered_answer = sentences_cleaned(sentence)
    bag = {}
    for word in filtered_answer:
        if word not in bag:
            bag[word] = 1
        else:
            bag[word] += 1
    return bag
  
def predict_class(sentence):
    '''Predicting sentiment of a user based sentence'''
    bow = bag_of_words_model(sentence)
    res = model.predict(np.array([bow]))[0]
    error = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > error]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]], 'probability': str(r[1])})
        return return_list
  
def get_response(intents_list, intents_json):
    '''Getting response from intents file using model'''
    tag = intents_list[0]['intent']
    list_of_intents = intents_json['intents']
    result = ""
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result

def cosine_similarity(vec1, vec2):
    '''Applying cosine similarity between 2 vectors'''
    dot_product = sum(vec1[word] * vec2.get(word, 0) for word in vec1)
    magnitude1 = np.sqrt(sum(vec1[word]**2 for word in vec1))
    magnitude2 = np.sqrt(sum(vec2[word]**2 for word in vec2))
    if magnitude1 == 0 or magnitude2 == 0:
        return 0
    return dot_product / (magnitude1 * magnitude2)

def extract_keywords(text):
    '''Extracting keywords from the model-based/user-based sentences'''
    keywords_phrases = []
    kw_extractor = yake.KeywordExtractor(top=10, stopwords=None)
    keywords = kw_extractor.extract_keywords(text)
    for kw, v in keywords:
        keywords_phrases.append(kw)
    return keywords_phrases
    

