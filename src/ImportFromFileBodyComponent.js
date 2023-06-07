import React from 'react'
import { QueryEngine } from '@comunica/query-sparql';
import { useEffect } from 'react';
import ExportFile from './ExportFile';
import { useState } from 'react';



const ImportFromFileBodyComponent = () => {
    let fileReader;
    let reader;
    let name;
    let ex1Eval;
    let ex2Eval;
    let ex3Eval;
    let ex4Eval;
    let ex5Eval;
    let chosenFiles
    const data = []
    let ansEX2Array = []
    let ansEX4Array = []
    const [groupNumber, setGroupNumber] = useState('');

    const handleInputChange = (event) => {

        console.log(groupNumber)
        // setGroupNumber('')
    };



    //EX2 Array
    const requiredEX2Array = [
        { node: 'https://www.geonames.org/ontology#A', degree: '451404' },
        { node: 'http://www.geonames.org/ontology#Feature', degree: '451379' },
        { node: 'https://www.geonames.org/ontology#A.ADM4', degree: '161865' },
        { node: 'https://www.geonames.org/ontology#A.ADM3', degree: '145527' },
        { node: 'https://sws.geonames.org/1282988/', degree: '82980' }
    ]

    //EX4 Array
    const requiredEX4Array = [
        { country: 'https://sws.geonames.org/3474415/', name: 'South Georgia and South Sandwich Islands', population: '30' },
        { country: 'https://sws.geonames.org/4030699/', name: 'Pitcairn Islands', population: '46' },
        { country: 'https://sws.geonames.org/1546748/', name: 'French Southern Territories', population: '140' },
        { country: 'https://sws.geonames.org/1547376/', name: 'Cocos [Keeling] Islands', population: '628' },
        { country: 'https://sws.geonames.org/3164670/', name: 'Vatican City', population: '921' },
        { country: 'https://sws.geonames.org/4031074/', name: 'Tokelau', population: '1466' },
        { country: 'https://sws.geonames.org/2078138/', name: 'Christmas Island', population: '1500' },
        { country: 'https://sws.geonames.org/2155115/', name: 'Norfolk Island', population: '1828' },
        { country: 'https://sws.geonames.org/4036232/', name: 'Niue', population: '2166' },
        { country: 'https://sws.geonames.org/607072/', name: 'Svalbard and Jan Mayen', population: '2550' },
        { country: 'https://sws.geonames.org/3474414/', name: 'Falkland Islands', population: '2638' },
        { country: 'https://sws.geonames.org/1282588/', name: 'British Indian Ocean Territory', population: '4000' }
    ]

    // console.log(requiredArray)
    // const QueryEngine = require('@comunica/query-sparql').QueryEngine;
    const myEngine = new QueryEngine();



    const handleFileRead = async (content) => {
        // const content = fileReader.result;
        console.log(`${content}`)

        const bindingsStream = await myEngine.queryBindings(`
        ${content}`, {
            sources: [{
                type: 'sparql', media: 'application/sparql-results+json', value: 'http://localhost:7200/repositories/Lab05'
            }],
            // httpProxyHandler: new ProxyHandlerStatic('http://myproxy.org/?uri='),
        });



        //EX1
        if (name === 'EX1.sparql') {
            const bindings = await bindingsStream.toArray();
            const countries = bindings[0]?.entries._root.entries[0][0]
            const ex1Result = bindings[0]?.get(countries).value

            if (ex1Result === '233') {
                console.log('Example 1 is right')
                ex1Eval = 'Right'
            } else {
                console.log('Exercise 1 is wrong')
                ex1Eval = 'Wrong'
            }

            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Exercise 1:";
            cell2.innerHTML = ex1Eval;

            data.push({ name: "Exercise 1", value: ex1Eval })
        }

        //EX2
        else if (name === 'EX2.sparql') {
            const bindings = await bindingsStream.toArray();
            // console.log(bindings)
            bindings.forEach((element) => {
                const node = element?.get(bindings[0]?.entries._root.entries[0][0]).value
                const degree = element?.get(bindings[0]?.entries._root.entries[1][0]).value
                ansEX2Array.push({ node, degree })
            })
            // let ex2Eval;

            if (JSON.stringify(requiredEX2Array) === JSON.stringify(ansEX2Array)) {
                console.log('matches in Exercise 2')
                ex2Eval = 'Right'
            } else {
                console.log('no match in Exercise 2')
                ex2Eval = 'Wrong'
            }

            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Exercise 2:";
            cell2.innerHTML = ex2Eval;

            data.push({ name: "Exercise 2", value: ex2Eval })
        }

        //EX3
        else if (name === 'EX3.sparql') {
            const bindings = await bindingsStream.toArray();
            const population = bindings[0]?.entries._root.entries[0][0]
            const ex3Result = bindings[0]?.get(population).value
            // let ex3Eval

            if (ex3Result === '557527') {
                console.log('Example 3 is right')
                ex3Eval = 'Right'
            } else {
                console.log('Exercise 3 is wrong')
                ex3Eval = 'Wrong'
            }

            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Exercise 3:";
            cell2.innerHTML = ex3Eval;

            data.push({ name: "Exercise 3", value: ex3Eval })

        }

        //EX4
        else if (name === 'EX4.sparql') {
            const bindings = await bindingsStream.toArray();
            bindings.forEach((element) => {
                const country = element?.get(bindings[0]?.entries._root.entries[0][0]).value
                const name = element?.get(bindings[0]?.entries._root.entries[1][0]).value
                const population = element?.get(bindings[0]?.entries._root.entries[2][0]).value

                ansEX4Array.push({ country, name, population })
            })
            // let ex4Eval;

            if (JSON.stringify(requiredEX4Array) === JSON.stringify(ansEX4Array)) {
                console.log('matches in Exercise 4')
                ex4Eval = 'Right'
            } else {
                console.log('no match in Exercise 4')
                ex4Eval = 'Wrong'
            }

            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Exercise 4:";
            cell2.innerHTML = ex4Eval;

            data.push({ name: "Exercise 4", value: ex4Eval })
        }

        //EX5
        else if (name === 'EX5.sparql') {
            console.log(name)
            const bindings = await bindingsStream.toArray();
            const mulcipality = bindings[0]?.entries._root.entries[0][0]
            const ex5Result = bindings[0]?.get(mulcipality).value
            // console.log(ex5Result)
            // let ex5Eval;

            if (ex5Result === '581') {
                // console.log('Example 5 is right')
                ex5Eval = 'Right'
            } else {
                // console.log('Exercise 5 is wrong')
                ex5Eval = 'Wrong'
            }

            console.log(ex5Eval)

            var table = document.getElementById("myTable");
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.innerHTML = "Exercise 5:";
            cell2.innerHTML = ex5Eval;

            data.push({ name: "Exercise 5", value: ex5Eval })
        }

        else {
            console.log("Check Exercise 6 yourself")
        }





    };

    const handleFileChosen = (files) => {
        function setup_reader(file) {
            reader = new FileReader();
            // reader.onload = handleFileReadDummy();
            reader.onloadend = function (e) {
                var bin = e.target.result; //get file content
                // console.log(bin)
                // do sth with text`
                handleFileRead(bin);
                name = file.name;
            }
            reader.readAsText(file);
        }

        for (var i = 0; i < files.length; i++) { setup_reader(files[i]); }
        console.log(groupNumber, setGroupNumber)

    }




    // const handleFileChosen1 = (files) => {
    //     files.some((file) => {
    //         fileReader = new FileReader();
    //         console.log(fileReader)
    //         fileReader.onloadend = handleFileReadDummy();
    //         fileReader.onloadend = handleFileRead();
    //         fileReader.readAsText(file);
    //         name = file.name
    //         // console.log(name)
    //     })

    // };

    const handleFileEvent = (e) => {
        chosenFiles = Array.prototype.slice.call(e.target.files)
        console.log(chosenFiles)
        handleFileChosen(chosenFiles)
    }

    return <div className='upload-expense'>

        {/* <label>
            Group Number:
            <input type="text" value={groupNumber} onChange={(e) => setGroupNumber(e.target.value)} />
        </label>
        <button type="submit">Submit</button> */}

        <br />
        <input
            type='file'
            id='file'
            className='input-file'
            onChange={handleFileEvent}
            multiple />

        <table id="myTable">
            <tbody>
                <tr>

                </tr>
            </tbody>
        </table>
        {/* <ExportFile data={data} files={chosenFiles} groupNumber={groupNumber} setGroupNumber={setGroupNumber} /> */}
    </div>;
}

export default ImportFromFileBodyComponent