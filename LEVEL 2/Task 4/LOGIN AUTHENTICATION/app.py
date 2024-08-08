from flask import Flask, render_template, request, redirect, url_for, session, flash
from bcrypt import hashpw, gensalt, checkpw

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# Mock database (for simplicity)
users_db = {}

@app.route('/')
def index():
    if 'username' in session:
        return f"Welcome, {session['username']}! <a href='/logout'>Logout</a>"
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users_db:
            flash('User already exists!')
        else:
            hashed_password = hashpw(password.encode('utf-8'), gensalt())
            users_db[username] = hashed_password
            flash('User registered successfully!')
            return redirect(url_for('login'))
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username in users_db and checkpw(password.encode('utf-8'), users_db[username]):
            session['username'] = username
            return redirect(url_for('index'))
        flash('Invalid credentials!')
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
