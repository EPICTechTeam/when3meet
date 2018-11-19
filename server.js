const express = require('express')

const app = express()

let count = 0
let schedule = {
	b: [0, 0, 0, 0, 0, 0, 0],
	l: [0, 0, 0, 0, 0, 0, 0],
	d: [0, 0, 0, 0, 0, 0, 0]
}

app.set('view engine', 'pug')

app.get('/', (request, response) => {
	response.render('input-schedule')
})

app.get('/add-schedule', (request, response) => {
	count++
	for (let key of Object.keys(request.query)) {
		if (request.query[key] === 'on' && key.length === 3) {
			const day = parseInt(key.charAt(2))
			if (isNaN(day) || day < 1 || day > 7) {
				break
			}

			switch (key.charAt(0)) {
				case 'b':
					schedule.b[day - 1]++
					break
				case 'l':
					schedule.l[day - 1]++
					break
				case 'd':
					schedule.d[day - 1]++
					break
			}
		}
	}

	response.redirect('/schedule')
})

app.get('/schedule', (request, response) => {
	response.render('schedule', {
		count: count,
		schedule: schedule
	})
})

app.get('/reset', (request, response) => {
	count = 0
	schedule = {
		b: [0, 0, 0, 0, 0, 0, 0],
		l: [0, 0, 0, 0, 0, 0, 0],
		d: [0, 0, 0, 0, 0, 0, 0]
	}

	response.redirect('/schedule')
})

app.listen(8080, () => {
	console.log('Server listening on port 8080')
})
