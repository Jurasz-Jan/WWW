const pytania = `{
    "pytania": [
        {
            "tekst": "Jakie jest znaczenie HTML?",
            "odpowiedzi": [
                "Hyper Text Makeup Language",
                "Hyper Text Markup Language",
                "Hyper Transfer Markup Language",
                "Hyperlink Text Markup Language"
            ]
            "poprawna": [ 2 ]
        },
        {
            "tekst": "Jakie jest znaczenie CSS?",
            "odpowiedzi": [
                "Cascading Style Sheets",
                "Coding Style Sheets",
                "Cascading Stylisation Sheets",
                "Cascading Style Script"
            ]
            "poprawna": [ 1 ]
        }
        {
            "tekst": "Co robi 'display: none' w CSS?",
            "odpowiedzi": [
                "Ukrywa element, ale zajmuje miejsce na stronie",
                "Usuwa element i jego miejsce na stronie",
                "Zmienia kolor elementu na przezroczysty",
                "Zwiększa wielkość elementu do pełnego ekranu"
            ],
            "poprawna": [1]
        }


    ],
}`
const nrPytania = 0

function nextQuestion() {
    const obj = JSON.parse(pytania)
    if (nrPytania >= obj.pytania.length) {
        checkAnswers()
        return
    }

    let pyt = document.getElementsByClassName("question").getElementsByTagName('p')
    pyt.innerHTML = obj.pytania[nrPytania].tekst
}

function checkAnswers() {
    const answers = {
        q1: 'b', // Poprawna odpowiedź dla pytania 1
        q2: 'a',
        q3: 'a'
    };

    let correctCount = 0
    for (let i = 1; i <= 20; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedAnswer) {
            if (selectedAnswer.value === answers[`q${i}`]) {
                correctCount++
            }
        }
    }

    const results = document.getElementById("results")
    results.innerHTML = `Liczba poprawnych odpowiedzi: ${correctCount}/20`
}
