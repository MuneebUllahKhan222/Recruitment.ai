# Importing Libraries
from keras.models import Sequential
from nltk.stem import WordNetLemmatizer
from keras.layers import Dense
from keras.optimizers import SGD
import tensorflow as tf
import random
import json
import pickle
import numpy as np
import nltk
import string
#nltk.download('wordnet')

# Class to stop the training of neural network when the desired accuracy is reached.
class myCallback(tf.keras.callbacks.Callback):
    def on_epoch_end(self, epoch, logs={}):
        if(logs.get('accuracy')>=0.98) and (logs.get('loss')<=0.1):
            print("\nAccuracy is very high so cancelling training!")
            self.model.stop_training = True

def reading_json(filename):
    '''Reading JSON File'''
    intents = json.loads(open(filename).read())
    return intents

def data_preprocessing(intents): 
    '''Preprocessing the data for the model'''
    # Initializing main variables
    lemmatizer = WordNetLemmatizer()
    words = []
    classes = []
    sentences = [] 
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            word_list = nltk.word_tokenize(pattern)
            words.extend(word_list)
            sentences.append(((word_list), intent['tag']))
            if intent['tag'] not in classes:
                classes.append(intent['tag'])
    words = [lemmatizer.lemmatize(word) for word in words if word not in string.punctuation]
    words = sorted(set(words))
    pickle.dump(words, open('words.pkl', 'wb'))
    pickle.dump(classes, open('classes.pkl', 'wb'))
    training = []
    output_empty = [0]*len(classes)
    for document in sentences:
        bag = []
        word_patterns = document[0]
        word_patterns = [lemmatizer.lemmatize(word.lower()) for word in word_patterns]
        for word in words:
            bag.append(1) if word in word_patterns else bag.append(0) 
        output_row = list(output_empty)
        output_row[classes.index(document[1])] = 1
        training.append([bag, output_row])
    random.shuffle(training)
    training = np.array(training)
    train_x = list(training[:, 0])
    train_y = list(training[:, 1])
    return train_x,train_y

def model_building(train_x, train_y):
    '''Defining a neural network'''
    callbacks = myCallback()
    model = Sequential()
    model.add(Dense(128, input_shape=(len(train_x[0]), ),activation='relu'))
    model.add(Dense(256, activation='relu'))
    model.add(Dense(len(train_y[0]), activation='softmax'))
    sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
    hist = model.fit(np.array(train_x), np.array(train_y), epochs=200, batch_size=5, verbose=1, callbacks=[callbacks])
    model.save("chatbotmodel.h5", hist)

def main():
    '''main program'''
    intents = reading_json('intents.json')
    train_x, train_y= data_preprocessing(intents)
    model = model_building(train_x, train_y)
main()