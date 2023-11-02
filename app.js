const express = require('express')
const books = require('./data/books.json');
const app = express()
const port = 3000




app.get('/', (req, res) => {
    res.send('Bienvenido a esta mágica librería')
})

//1 Create a route /all to fetch all books

app.get("/all", (req, res) => {
    res.status(200).json(books);
});

//2 Create a route /first to fetch the first book

app.get("/first", (req, res) => {
    res.status(200).json(books[0]);
});

//3 Create a route /last to fetch the last book

app.get("/last", (req, res) => {
    res.status(200).json(books[books.length -1]);
});

//4 Crate a route /middle to fetch the book in the middle (number 50 in the array)

app.get("/middle", (req, res) => {
    res.status(200).json(books[50]);
});

//5 Create a route /author/dante-alighieri to fetch ONLY THE TITLE of Dante Alighieri's book
app.get("/author/dante-alighieri", (req, res) => {

    const book = books.find(book => book.author === "Dante Alighieri");
    console.log(book.title);

    res.status(200).json(book.title);
});

// 6 Create a route /country/charles-dickens to fetch ONLY THE COUNTRY of Charles Dickens book
app.get("/country/charles-dickens", (req, res) => {

    const book = books.find(book => book.author === "Charles Dickens");
    console.log(book.country);

    res.status(200).json(book.country);
});

//7 Create a route /year&pages/cervantes to fetch PAGES AND YEAR of Miguel de Cervantes book, Response example: { pages: ..., year: ... }

app.get("/year&pages/cervantes", (req, res) => {

    const book = books.find(book => book.author === "Miguel de Cervantes");
    console.log(book.year, book.pages );

    res.status(200).json({pages:book.pages, year:book.year});
});


//8 Create a route /country/count/spain to fetch THE NUMBER OF BOOK from Spain

app.get("/country/count/spain", (req, res) => {
    let contador = 0;
    function getSpain (){
        for (let i =0; i<books.length; i++){
            if (books[i].country === "Spain"){
                contador ++;
            }
        } 
    }
    getSpain ();

    res.status(200).json(contador);
});


//9 Create a route /country/at-least/germany to fetch TRUE OR FALSE depending on if there is or not a book from Germany

app.get("/country/at-least/germany", (req, res) => {
    let contador = 0;
    let respuesta; 
    function getGermany (){
        for (let i =0; i<books.length; i++){
            if (books[i].country === "Germany"){
                contador ++;
            }
        } 
        if (contador !== 0){
            respuesta =  true;
        } else {
            respuesta = false;
        }
    }
    getGermany ()
    
    res.status(200).json(respuesta);
});


//10 Create a route /pages/all-greater/200 to fetch TRUE OR FALSE depending on if every books contain more then 200 pages


app.get("/pages/all-greater/200", (req, res) => {

    let contador = 0;
    let respuesta; 
    function getPages (){
        for (let i =0; i<books.length; i++){
            if (books[i].pages > 200){
                contador ++;
            }
        } 
        if (contador === books.length-1){
            respuesta =  true;
        } else {
            respuesta = false;
        }
    }
    getPages ()

    res.status(200).json(respuesta);
});



// Última ruta por defecto. En caso de no encotrarse ninguna anterior, devolvemos un 404
app.get("*",(req,res)=>{
    res.status(404).send("No encontramos tu libro - 404 not found");
})

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`)
})



