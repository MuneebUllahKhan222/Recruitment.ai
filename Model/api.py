# Import Statements
from fastapi import FastAPI
from fastapi.responses import JSONResponse
import uvicorn
from expertsystem import *
from pydantic import BaseModel

# Class for post request
class Answers(BaseModel):
    quest_ID: str
    ans:str

# Initializing FastAPI instance
app = FastAPI()

# API 1st End-point
@app.get("/question")
def question():
    all_questions = interview_questions()
    global Result
    Result = {k: v for d in all_questions for k, v in d.items()}
    return JSONResponse(content=Result)

# API 2nd End-point
@app.post("/answer")
def answer(answers: Answers):
    global dictionary
    dictionary = {answers.quest_ID: answers.ans}
    return dictionary

# API 3rd End-point    
@app.get("/scores")
def question():
    question_result = processing()
    return JSONResponse(content=question_result)

# Calculating metrics using expert system
def processing():
    Question = Result[list(dictionary.keys())[0]]
    bot_answer = bot_response(str(Question))
    question_result = result(bot_answer, str(list(dictionary.values())[0]))
    return question_result

# Main program
if __name__=="__main__":
    uvicorn.run(app, port = 8000)
