virtual environment
to create run within the backend

python -m venv venv

you may have to run if no workie:
py -3.10 -m venv venv
this will create a venv folder if not already existing

then to activate virtual environment run:

.\venv\Scripts\activate

If you just pulled from the github run this before you run the server
python ./manage.py makemigrations
python ./manage.py migrate


then to run server run:

python ./manage.py runserver





