from flask import Flask, request, jsonify
from keras.preprocessing.image import load_img, img_to_array
from keras.applications.vgg19 import preprocess_input, decode_predictions
from keras.models import load_model
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your trained model
model = load_model('bestmodel.h5')

# Define your class mapping dictionary
ref = {
    0: 'Grape_h',
    1: 'class_name_2',
    # Add more as needed based on your model's output classes
}

# Function to preprocess the image
def preprocess_image(image_path):
    try:
        img = Image.open(image_path)  # Use PIL.Image to open the image
        img = img.resize((256, 256))  # Resize the image to match model's input shape
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = preprocess_input(img_array)
        return img_array
    except Exception as e:
        raise RuntimeError(f"Error preprocessing image: {str(e)}")

def predict_image(image_path):
    try:
        processed_img = preprocess_image(image_path)
        prediction = model.predict(processed_img)
        predicted_label = np.argmax(prediction)

        if predicted_label in ref:
            class_name = ref[predicted_label]
            return class_name
        else:
            return "Unknown class index"

    except Exception as e:
        raise RuntimeError(f"Error predicting image: {str(e)}")

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'plantImage' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['plantImage']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file:
        filename = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(filename)
        class_name = predict_image(filename)
        return jsonify({'class_name': class_name}), 200

if __name__ == '__main__':
    app.run(debug=True)
