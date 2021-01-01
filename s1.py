# -*- coding: utf-8 -*-
"""
Created on Fri Jan  1 18:27:54 2021

@author: haarthie
"""

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def form():
    return render_template('form.html')

@app.route('/hello', methods=['GET', 'POST'])
def hello():
    return render_template('formsnew.html', say=request.form['say'], to=request.form['to'])

if __name__ == "__main__":
    app.run()