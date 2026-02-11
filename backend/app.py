from flask import Flask
from flask_cors import CORS
from routes.predict import predict_bp
from routes.auth import auth_bp
from routes.history import history_bp
from routes.bulk_predict import bulk_predict_bp

def create_app():
    app = Flask(__name__)
    CORS(app)

    
    app.register_blueprint(predict_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(history_bp)
    app.register_blueprint(bulk_predict_bp)

    @app.route("/health",methods=["GET"])
    def health():
        return {"status":"Backedne is runnig" },200
    
    return app

if __name__ == "__main__":
    app=create_app()
    app.run()