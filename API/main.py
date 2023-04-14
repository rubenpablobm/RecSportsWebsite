from flask import Flask
from edificio import bp as edificio_bp

app = Flask(__name__)
app.register_blueprint(edificio_bp)

if __name__ == '__main__':
    app.run()
