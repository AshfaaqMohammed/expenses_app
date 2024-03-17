import os

PORT = int(os.environ.get('PORT', 8000))

web: waitress-serve --listen=0.0.0.0:5000 expenses_app.wsgi:application
