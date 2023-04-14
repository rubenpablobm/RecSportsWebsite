import pymysql
import secrets

def get_db():
    host = secrets.hostname
    user = secrets.username
    password = secrets.password
    db = "your_database_name"
    ssl = {'ssl': {'ssl-mode': 'require'}}

    connection = pymysql.connect(
        host=host,
        user=user,
        password=password,
        db=db,
        cursorclass=pymysql.cursors.DictCursor,
        **ssl
    )

    return connection