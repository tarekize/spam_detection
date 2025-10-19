from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import joblib
from sklearn.feature_extraction.text import CountVectorizer




app = FastAPI()

# Allow all origins (you can specify a list of allowed origins if needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows requests from all origins
    allow_credentials=True,
    allow_methods=["*"],  # This allows all HTTP methods
    allow_headers=["*"],  # This allows all HTTP headers
)

class PredictionInput(BaseModel):
     email: str
     

# Load your pre-trained regression model
cv = joblib.load("count_vectorizer.pkl")
model = joblib.load("dtcspam_model.pkl")  # Replace "your_model.pkl" with the path to your saved model

@app.get("/")
def working():
     return {"working": True}
@app.post("/predict")
def predicte(input_data: PredictionInput):
    # Extract input features
    email = input_data.email
    print(email)

    # Utilisez le CountVectorizer pour transformer l'e-mail en représentation numérique
    email_count = cv.transform([email])
    print(email_count)

    # Make predictions using the loaded model
    prediction = model.predict(email_count)
    print(prediction)

    
    # Convert the prediction to an integer (if needed)
    prediction = int(prediction)

    if prediction == 0:
        print("it's not a spam")
    else:
        print("it's a spam")

    # Return the prediction
    return {"prediction": prediction}

if __name__== "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=8000)
