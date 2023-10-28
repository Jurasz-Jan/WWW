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


        {
            "tekst": "Co jest to element HTML?",
            "odpowiedzi": [
              "Jednostka składowa dokumentu HTML",
              "Zbiór elementów HTML",
              "Obrazek na stronie HTML",
              "Tekst na stronie HTML"
            ],
            "poprawna": [1]
          },
          {
            "tekst": "Co jest to atrybut HTML?",
            "odpowiedzi": [
              "Opis właściwości elementu HTML",
              "Jednostka składowa dokumentu HTML",
              "Zbiór elementów HTML",
              "Obrazek na stronie HTML"
            ],
            "poprawna": [1]
          },
          {
            "tekst": "Co jest to tag HTML?",
            "odpowiedzi":
            [
              "Jednostka składowa dokumentu HTML",
              "Opis właściwości elementu HTML",
              "Zbiór elementów HTML",
              "Obrazek na stronie HTML"
            ],
            "poprawna": [1]
          },
          {
            "tekst": "Co jest to selektor CSS?",
            "odpowiedzi":
            [
              "Wyrażenie określające, które elementy CSS mają zostać stylizowane",
              "Jednostka składowa dokumentu HTML",
              "Opis właściwości elementu HTML",
              "Zbiór elementów HTML"
            ],
            "poprawna": [1]
          },
          {
            "tekst": "Co jest to właściwość CSS?",
            "odpowiedzi":
            [
              "Wartość przypisana do selektora CSS",
              "Jednostka składowa dokumentu HTML",
              "Opis właściwości elementu HTML",
              "Zbiór elementów HTML"
            ],
            "poprawna": [1]
          },
          {
            "tekst": "Co jest to wartość CSS?",
            "odpowiedzi":
            [
              "Wartość przypisana do właściwości CSS",
              "Jednostka składowa dokumentu HTML",
              "Opis właściwości elementu HTML",
              "Zbiór elementów HTML"
            ],
            "poprawna": [1]
          },
          {
            "tekst": "Co jest to protokół HTTP?",
            "odpowiedzi":
            [
              "Protokół przesyłania plików",
              "Protokół przesyłania danych",
              "Protokół przesyłania dokumentów",
              "Protokół przesyłania stron internetowych"
            ],
            "poprawna": [4]
          },
          {
            "tekst": "Co jest to domena internetowa?",
            "odpowiedzi":
            [
              "Identyfikator komputera w sieci",
              "Identyfikator strony internetowej",
              "Nazwa serwera WWW",
              "Adres strony internetowej"
            ],
            "poprawna": [3]
          },


    ],
}`
const nrPytania = 0

function nextQuestion() {  // co to robi? po co? ~Janekm
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
        q3: 'a',
        q4: 'a',
        q5: 'a',
        q6: 'a',
        q7: 'a',
        q8: 'a',
        q9: 'a',
        q10: 'd',
        q11: 'c'
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


function getCorrectCount()
{
    return correctCount;
}
