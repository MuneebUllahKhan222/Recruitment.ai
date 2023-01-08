# Import Statements
from experta import Fact, Rule, AND, KnowledgeEngine
from experta import operator
from interface import *
import random

# Defining the recruitment expert system with rules/facts
class RecruitmentExpertSystem(KnowledgeEngine):
    def __init__(self, similarity, keywords_similarity):
        super().__init__()
        self.similarity = similarity
        self.keywords_similarity = keywords_similarity
        self.questions_result = []
    @Rule(AND(Fact(similarity = 0.1), Fact(keywords_similarity = operator.LE(10))))
    def one_result(self):
        self.questions_result.append(0.1*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.2), Fact(keywords_similarity = operator.LE(10))))
    def two_result(self):
        self.questions_result.append(0.2*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.3), Fact(keywords_similarity = operator.LE(10))))
    def three_result(self):
        self.questions_result.append(0.3*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.4), Fact(keywords_similarity = operator.LE(10))))
    def four_result(self):
        self.questions_result.append(0.4*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.5), Fact(keywords_similarity = operator.LE(10))))
    def five_result(self):
        self.questions_result.append(0.5*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.6), Fact(keywords_similarity = operator.LE(10))))
    def six_result(self):
        self.questions_result.append(0.6*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.7), Fact(keywords_similarity = operator.LE(10))))
    def seven_result(self):
        self.questions_result.append(0.7*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.8), Fact(keywords_similarity = operator.LE(10))))
    def eight_result(self):
        self.questions_result.append(0.8*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 0.9), Fact(keywords_similarity = operator.LE(10))))
    def nine_result(self):
        self.questions_result.append(0.9*self.keywords_similarity)
    @Rule(AND(Fact(similarity = 1.0), Fact(keywords_similarity = operator.LE(10))))
    def ten_result(self):
        self.questions_result.append(1.0*self.keywords_similarity)
        

def interview_questions():
    """It will fetch the 5 interview questions numbered as 1-5"""
    questions = []
    for intent in intents['intents']:
        for pattern in intent['patterns']:
            questions.append({"question":pattern})
    get_question = random.sample(questions, 5)
    count=1
    for q in get_question:
        q["question"+str(count)]=q.pop("question")
        count+=1
    return get_question

def bot_response(question):
    """Get the bot response"""
    intents_list = predict_class(question)
    res = get_response(intents_list, intents)
    return res

def result(bot_answer, user_answer):
    """Will give the score of each user answer"""
    # Calculating similarity between two sentences
    result = bag_of_words_sentences(bot_answer)
    filtered_answer = bag_of_words_sentences(user_answer)
    difference = round(cosine_similarity(result, filtered_answer),1)
    # Calculating number of keywords same between two sentences
    result_keywords = extract_keywords(bot_answer)
    filtered_answer_keywords = extract_keywords(user_answer)
    keywords_similarity = len(set(result_keywords).intersection(filtered_answer_keywords))
    # Initializing the expert system object and running the expert system 
    engine = RecruitmentExpertSystem(difference, keywords_similarity)
    engine.reset()
    engine.declare(Fact(similarity = difference), Fact(keywords_similarity = keywords_similarity))
    engine.run()
    return engine.questions_result

# a = interview_questions()
# for i in a:
#     print(list(i.values())[0])
#     user_answer = input("Enter answer: ")
#     res = bot_response(list(i.values())[0])
#     result(res, user_answer)





    


