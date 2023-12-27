const fs = require('fs')
const fsPromisies = require('fs').promises
const path = require('path')

const fileOps = async() =>{
    try {
        const data = await fsPromisies.readFile(path.join(__dirname, 'files', 'starter.txt'), 'utf8');
        console.log(data)
        await fsPromisies.unlink(path.join(__dirname, 'files', 'starter.txt')); //Deletes file
        await fsPromisies.writeFile(path.join(__dirname, 'files', 'promiseWrite.txt'), data); //Writing new file
        await fsPromisies.appendFile(path.join(__dirname, 'files', 'promiseWrite.txt'), '\n\nNice to meet ya Jack Bergin'); //Adding to new file
        await fsPromisies.rename(path.join(__dirname, 'files', 'promiseWrite.txt'), path.join(__dirname, 'files', 'promiseComplete.txt')); //Renaming new file
        const newData = await fsPromisies.readFile(path.join(__dirname, 'files', 'promiseComplete.txt'), 'utf8');
        console.log(newData);

    } catch (err){
    console.log(err)
}}

fileOps();

fs.readFile(path.join(__dirname, 'files','starter.txt'), 'utf8', (err, data)=>{
    if (err) throw err;
    console.log(data);
})

console.log('Hello...');

//Utf 8 assumed by default when writing a file
//Structuring this in such a way allows us to avoid async issues however this does appear to be callback hell.

/*
fs.writeFile(path.join(__dirname, 'files','finisher.txt'), 'Hello world', (err)=>{
    if (err) throw err;
    console.log('Write complete');

    fs.appendFile(path.join(__dirname, 'files','finisher.txt'), '\n\nHello world2', (err)=>{
        if (err) throw err;
        console.log('Append complete');

        fs.rename(path.join(__dirname, 'files','finisher.txt'), path.join(__dirname, 'files','new_finisher.txt'), (err)=>{
            if (err) throw err;
            console.log('Rename complete');
        })

    })
})
*/
process.on('uncaughtException', err => {
    console.error(`There was an uncaught error: ${err}`);
    process.exit(1);
})