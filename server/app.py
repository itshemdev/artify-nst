from flask import Flask, request, jsonify
import tensorflow as tf
import tensorflow_hub as hub
import numpy as np
from PIL import Image, ImageOps
import io
import base64
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load TensorFlow Hub model
hub_model = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')

def load_img_from_base64(base64_string):
    """Load an image from a base64 string."""
    max_dim = 512
    img_data = base64.b64decode(base64_string)
    img = Image.open(io.BytesIO(img_data)).convert('RGB')
    img = np.array(img)
    img = tf.image.convert_image_dtype(img, tf.float32)

    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim

    new_shape = tf.cast(shape * scale, tf.int32)
    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

def tensor_to_base64(tensor):
    """Convert a TensorFlow tensor to a base64-encoded string."""
    tensor = tensor * 255
    tensor = np.array(tensor, dtype=np.uint8)
    if np.ndim(tensor) > 3:
        tensor = tensor[0]
    img = Image.fromarray(tensor)

    # Convert image to base64
    buffer = io.BytesIO()
    img.save(buffer, format="JPEG")
    base64_img = base64.b64encode(buffer.getvalue()).decode('utf-8')
    return base64_img

def load_img_from_file(file):
    """Load an image from an uploaded file."""
    max_dim = 512
    img = Image.open(file).convert('RGB')
    img = ImageOps.exif_transpose(img)


    img = np.array(img)
    img = tf.image.convert_image_dtype(img, tf.float32)

    shape = tf.cast(tf.shape(img)[:-1], tf.float32)
    long_dim = max(shape)
    scale = max_dim / long_dim

    new_shape = tf.cast(shape * scale, tf.int32)
    img = tf.image.resize(img, new_shape)
    img = img[tf.newaxis, :]
    return img

@app.route('/stylize', methods=['POST'])
def stylize():
    """Stylize an image using uploaded images."""
    try:
        # Check if both images are provided
        if 'contentImage' not in request.files or 'styleImage' not in request.files:
            return jsonify({"error": "Both 'contentImage' and 'styleImage' are required."}), 400

        # Retrieve the uploaded images
        content_file = request.files['contentImage']
        style_file = request.files['styleImage']

        # Validate filenames
        if content_file.filename == '' or style_file.filename == '':
            return jsonify({"error": "Files must have valid filenames."}), 400

        # Open and preprocess the images
        content_image = load_img_from_file(content_file)
        style_image = load_img_from_file(style_file)

        # Apply style transfer
        stylized_image = hub_model(tf.constant(content_image), tf.constant(style_image))[0]

        # Convert tensor to base64
        stylized_base64 = tensor_to_base64(stylized_image)

        # Return the result as JSON
        return jsonify({"stylized_image_base64": stylized_base64})

    except Exception as e:
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(debug=False)