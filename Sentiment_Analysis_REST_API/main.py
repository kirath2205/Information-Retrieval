from flask import Flask, request
import numpy as np
from preprocessing_and_sentiment_prediction import preprocessSingleTweet, tokenize_and_predict_lstm_probs, predict_vader_probs
app = Flask(__name__)

@app.route('/tweet/', methods=['GET'])
def classify_sentiment():
    data = request.json
    unclean_tweets = []
    total_ntweets = 0
    total_nlikes = 0
    total_nreplies = 0
    total_nretweets = 0
    tweet_weights_arr = []
    f1_score_vader = 0.59
    f1_score_lstm = 0.71
    lstm_weight = f1_score_lstm/(f1_score_vader+f1_score_lstm)
    vader_weight = f1_score_vader/(f1_score_vader+f1_score_lstm)

    for obj in data["response"]["docs"]:
        unclean_tweets.append(obj["tweet"][0])
        total_nlikes+=obj['nlikes'][0]
        total_nreplies+=obj['nreplies'][0]
        total_nretweets+=obj['nretweets'][0]
        total_ntweets+=1



    for obj in data["response"]["docs"]:
        weight = (obj['nlikes'][0]/total_nlikes)*(obj['nreplies'][0]/total_nreplies)*(obj['nretweets'][0]/total_nretweets)
        tweet_weights_arr.append(weight)
    
    clean_tweets = []
    for unclean_tweet in unclean_tweets:
        clean_tweet = preprocessSingleTweet(unclean_tweet)
        clean_tweets.append(clean_tweet)

    lstm_probs = []
    for clean_tweet in clean_tweets:
        prob = tokenize_and_predict_lstm_probs(clean_tweet)
        lstm_probs.append(prob)

    vader_probs = []
    for clean_tweet in clean_tweets:
        prob = predict_vader_probs(clean_tweet)
        vader_probs.append(prob)
    
    
    final_vader_probs = [0,0,0]
    final_lstm_probs = [0,0,0]

    for i in range(total_ntweets):
        final_vader_probs[0]+=tweet_weights_arr[i]*vader_probs[i][0]
        final_vader_probs[1]+=tweet_weights_arr[i]*vader_probs[i][1]
        final_vader_probs[2]+=tweet_weights_arr[i]*vader_probs[i][2]

    for i in range(total_ntweets):
        final_lstm_probs[0]+=tweet_weights_arr[i]*lstm_probs[i][0]
        final_lstm_probs[1]+=tweet_weights_arr[i]*lstm_probs[i][1]
        final_lstm_probs[2]+=tweet_weights_arr[i]*lstm_probs[i][2]
    
    final_vader_probs = np.array(final_vader_probs)
    final_lstm_probs = np.array(final_lstm_probs)

    final_sentiment_score_probs = lstm_weight*final_lstm_probs + vader_weight*final_vader_probs

    sentiment_idx = np.argmax(final_sentiment_score_probs)

    if sentiment_idx==0:
        return str(1)
    elif sentiment_idx==1:
        return str(0)
    else:
        return str(-1)

    

    
    
    


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=105)