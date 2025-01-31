from flask import Flask, render_template, request, jsonify
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)

# Load models and preprocessors
def load_models():
    with open("flask/food/new_xg_food_waste_model_5000.pkl", "rb") as f:
        model = pickle.load(f)
    with open("flask/food/new_xg_label_encoders_5000.pkl", "rb") as f:
        label_encoders = pickle.load(f)
    with open("flask/food/new_xg_scaler_5000.pkl", "rb") as f:
        scaler = pickle.load(f)
    return model, label_encoders, scaler

model, label_encoders, scaler = load_models()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    # Add this at the start of your predict function to see what labels are known:
    print("Known weather labels:", list(label_encoders["weather"].classes_))
    print("Known weather labels:", list(label_encoders["festival"].classes_))
    print("Known weather labels:", list(label_encoders["food_type"].classes_))
    try:
        data = request.form
        is_weekend = int(data.get("is_weekend", 0))  # Default to 0 if unchecked

        # Handle missing categorical values
        festival = data.get("festival", "Diwali")
        weather = data.get("weather", "Clear")
        food_type = data.get("food_type", "Curry")

        for col in ["festival", "weather", "food_type"]:
            if col in label_encoders and festival not in label_encoders[col].classes_:
                label_encoders[col].classes_ = np.append(label_encoders[col].classes_, festival)

        input_data = {
            "is_weekend": is_weekend,
            "festival": festival,
            "weather": weather,
            "food_type": food_type,
            "quantity_prepared(kg)": float(data["quantity_prepared"]),
            "quantity_wasted(kg)": float(data["quantity_wasted"]),
        }
        df = pd.DataFrame([input_data])

        # Encode categorical variables
        for col in ["festival", "weather", "food_type"]:
            df[col] = label_encoders[col].transform([df[col][0]])

        # Calculate waste ratio
        df["waste_ratio"] = df["quantity_wasted(kg)"] / (df["quantity_prepared(kg)"] + 1e-5)

        # Feature selection
        features = ["is_weekend", "festival", "weather", "food_type", 
                    "quantity_prepared(kg)", "quantity_wasted(kg)", "waste_ratio"]
        X_scaled = scaler.transform(df[features])

        # Make prediction
        prediction = model.predict(X_scaled)[0]
        adjustments = ['Reduce 15%', 'Normal', 'Reduce 20%', 'Reduce 25%', 'Reduce 30%', 'Increase 10%']
        predicted_adjustment = adjustments[prediction]
        print("Predicted adjustment:", predicted_adjustment)
        return render_template('index.html', prediction=predicted_adjustment)

    except Exception as e:
        return render_template('index.html', error=str(e))
    


if __name__ == '__main__':
    app.run(debug=True,port=6969)