from flask import Flask, render_template, jsonify

app = Flask(__name__)


def get_titles():
    # Fonte única de títulos; fácil de adaptar para banco/API
    return [
        {'title': 'Title 1', 'img': 'title1.jpg'},
        {'title': 'Title 2', 'img': 'title2.jpg'},
        {'title': 'Title 3', 'img': 'title3.jpg'},
        {'title': 'Title 4', 'img': 'title4.jpg'},
        {'title': 'Title 5', 'img': 'title5.jpg'},
        {'title': 'Title 6', 'img': 'title6.jpg'},
        {'title': 'Title 7', 'img': 'title7.jpg'},
        {'title': 'Title 8', 'img': 'title8.jpg'},
        {'title': 'Title 9', 'img': 'title9.jpg'},
        {'title': 'Title 10', 'img': 'title10.jpg'},
    ]


@app.route('/')
def home():
    titles = get_titles()
    return render_template('index.html', titles=titles)  # Carrega a página inicial com dados


@app.route('/api/titles')
def api_titles():
    return jsonify(get_titles())


if __name__ == '__main__':
    app.run(debug=True)
