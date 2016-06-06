from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")

def main():
    return render_template("index.html")
    # handle tic-tac-toe
    

if __name__ == "__main__":
    app.run()
