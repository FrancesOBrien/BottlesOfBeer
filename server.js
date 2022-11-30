const express = require('express')
const app = express()

const fs = require('fs') 
const { allowedNodeEnvironmentFlags } = require('process')
app.engine('madeline', (filePath, options, callback) => {
  fs.readFile(filePath, (err, content) => {
    if (err) return callback(err)
    const rendered = content.toString()
      .replace('#title#', '<title>' + options.title + '</title>')
      .replace('#message#', '<h1>' + options.message + '</h1>').replace('#content#','<div>'+ options.content + '</div>' )
    return callback(null, rendered)
  })
})
app.set('views', './views') 
app.set('view engine', 'madeline') 

app.get('/', (req, res) => {
    res.send("99 Bottles of beer on the wall," + "<a href = '/98' >take one down, pass it around</a>")
})

app.get('/:number_of_bottles', (req, res) => {
    if (req.params.number_of_bottles > 1){
        res.send(req.params.number_of_bottles + " Bottles of beer on the wall, <a href = '" + (req.params.number_of_bottles-1)+ "'>take one down, pass it around</a>")
        } else if (req.params.number_of_bottles == 1){
            res.send(req.params.number_of_bottles + " Bottle of beer on the wall, <a href = " + (req.params.number_of_bottles-1)+ ">take one down, pass it around</a>")
            } else {
                res.send("No More Bottles of Beer on the Wall! " + "<a href = '/99' >Begin Again!</a>")
              } 
})

app.listen(3000, () => {
    console.log('listening now')
})  