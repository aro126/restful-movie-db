function listMovies() {
    const app = document.getElementById('root')

    app.innerHTML = "";

    const container = document.createElement('div')
    container.setAttribute('class', 'container')

    app.appendChild(container)
    var request = new XMLHttpRequest()
    request.open('GET', 'http://localhost:3000/movies', true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            data.forEach((movie) => {
                const card = document.createElement('div')
                card.setAttribute('class', 'card')

                const h1 = document.createElement('h1')
                h1.id = movie._id
                h1.setAttribute('onclick', 'showMovie(this.id)')
                h1.innerText = movie.title

                const p = document.createElement('p')
                movie.plot = movie.plot.substring(0, 300)
                p.textContent = `${movie.plot}...`

                container.appendChild(card)
                card.appendChild(h1)
                card.appendChild(p)
            })
        } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Gah, it's not working!`
            app.appendChild(errorMessage)
        }
    }

    request.send()
}

function searchMovies(searchTerm) {
    if (searchTerm == "") {
        listMovies()
    } else {
        const app = document.getElementById('root')

        app.innerHTML = "";

        const container = document.createElement('div')
        container.setAttribute('class', 'container')

        app.appendChild(container)
        var request = new XMLHttpRequest()
        request.open('GET', 'http://localhost:3000/search?term=' + searchTerm, true)
        request.onload = function () {
            // Begin accessing JSON data here
            var data = JSON.parse(this.response)
            if (request.status >= 200 && request.status < 400) {
                data.forEach((movie) => {
                    const card = document.createElement('div')
                    card.setAttribute('class', 'card')

                    const h1 = document.createElement('h1')
                    h1.id = movie._id
                    h1.setAttribute('onclick', 'showMovie(this.id)')
                    h1.innerText = movie.title

                    const p = document.createElement('p')
                    movie.plot = movie.plot.substring(0, 300)
                    p.textContent = `${movie.plot}...`

                    container.appendChild(card)
                    card.appendChild(h1)
                    card.appendChild(p)
                })
            } else {
                const errorMessage = document.createElement('marquee')
                errorMessage.textContent = `Oh no, it's not working!`
                app.appendChild(errorMessage)
            }
        }

        request.send()
    }
}

function showMovie(id) {
    const app = document.getElementById('root')

    app.innerHTML = "";

    const container = document.createElement('div')
    container.setAttribute('class', 'container')

    app.appendChild(container)
    var request = new XMLHttpRequest()
    console.log('http://localhost:3000/movies/' + id)
    request.open('GET', 'http://localhost:3000/movies/' + id, true)
    request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response)
        if (request.status >= 200 && request.status < 400) {
            const card = document.createElement('div')
            card.setAttribute('class', 'card')

            const h1 = document.createElement('h1')
            h1.textContent = data.title + " (" + data.year + ")"

            const plot = document.createElement('h3')
            plot.textContent = "Summary"

            const p = document.createElement('p')
            if (data.fullplot == null) {
                p.textContent = data.plot
            } else {
                p.textContent = data.fullplot
            }

            const cast = document.createElement('h3')
            cast.textContent = "Cast"

            const castList = document.createElement('p')
            castList.textContent = data.cast.toString().replaceAll(",", ", ")

            card.appendChild(h1)
            card.appendChild(plot)
            card.appendChild(p)
            card.appendChild(cast)
            card.appendChild(castList)
            container.appendChild(card)
        } else {
            const errorMessage = document.createElement('marquee')
            errorMessage.textContent = `Oh no, it's not working!`
            app.appendChild(errorMessage)
        }
    }

    request.send()
}

listMovies();