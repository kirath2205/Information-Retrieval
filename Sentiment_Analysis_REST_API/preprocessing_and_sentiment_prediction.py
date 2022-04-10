import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import string
import pickle
import numpy as np

from keras.models import load_model
from keras.preprocessing.sequence import pad_sequences

from nltk.sentiment.vader import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()

#Constants
max_length = 100
padding_type='post'
truncation_type='post'


# Run only once
# nltk.download('all')

#Loading the tokenizer
with open('final_final_tokenizer.pickle', 'rb') as handle:
    tokenizer = pickle.load(handle)

#Loading the model
model = load_model('final_final_weights.h5')


def preprocessSingleTweet(tweet):

    tweet = str(tweet)
    
    #Removing urls and stripping whitespaces
    tweet = re.sub(r'http\S+', '', str(tweet))
    tweet = tweet.strip()

    #Removing hashtags and mentions
    tweet = ' '.join([word for word in tweet.split() if word[0]!='@' and word[0]!='#'])


    #Removing Punctuations
    tweet = tweet.translate(str.maketrans('', '', string.punctuation))

    #Lowercasing all texts, removing stopwords, and lemmatizing the texts
    stopwordsList = stopwords.words('english') 
    lemmatizer = WordNetLemmatizer()
    
    tweet = tweet.lower()
    tweet = ' '.join([word for word in tweet.split() if word not in stopwordsList])
    tweet = ' '.join([lemmatizer.lemmatize(word) for word in tweet.split()])

    return tweet


def tokenize_and_predict_lstm_probs(pre_processed_tweet):
    encoded_tweet = tokenizer.texts_to_sequences([pre_processed_tweet])[0]
    numpy_array_encoded_tweet = np.array([encoded_tweet])
    numpy_array_encoded_tweet_padded = pad_sequences(numpy_array_encoded_tweet,maxlen=max_length, padding=padding_type, truncating=truncation_type)
    pred = model.predict(numpy_array_encoded_tweet_padded, verbose=0)
    probs = pred[0]
    return [probs[1],probs[0],probs[2]]
    # sentiment = 0
    # if max_idx==1:
    #     sentiment = 1
    # elif max_idx==2:
    #     sentiment = -1
    # else:
    #     sentiment = 0
    # return sentiment

def predict_vader_probs(pre_processed_tweet):
    scores = sid.polarity_scores(pre_processed_tweet)
    return [scores['pos'],scores['neu'],scores['neg']]






