from keras.preprocessing.image import load_img, img_to_array
from keras.applications.vgg19 import preprocess_input, decode_predictions
from keras.models import load_model
import numpy as np
from PIL import Image

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
            print(f"Predicted class: {class_name}")
        else:
            print(f"Unknown class index: {predicted_label}")

    except Exception as e:
        raise RuntimeError(f"Error predicting image: {str(e)}")

if __name__ == '__main__':
    # Replace with the actual path to your test image
    test_image_path = 'input.jpg'
    predict_image(test_image_path)
