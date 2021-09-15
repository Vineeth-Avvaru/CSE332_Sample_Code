import os

from flask import Flask, render_template, request, redirect, Response, jsonify

import pandas as pd
app = Flask(__name__)

@app.route('/')
def index():
    df = pd.read_csv('eyet.csv')
    print(df)
    json_data = dict()
    json_data["Timestamp"] = df['Timestamp'].tolist()
    json_data["FixationIndex"] = df['FixationIndex'].tolist()
    json_data={'data': json_data} 

    return render_template('index.html', data=json_data)


if __name__ == '__main__':
    app.run(debug=True)




