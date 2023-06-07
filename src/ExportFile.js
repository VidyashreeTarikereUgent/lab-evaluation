import React from 'react'
import { useEffect } from 'react'
import { flushSync } from 'react-dom';

const ExportFile = (data, files, groupNumber, setGroupNumber) => {
    // console.log(groupNumber, setGroupNumber)
    function exportToCsv(data, groupNumber, setGroupNumber) {
        console.log(groupNumber, setGroupNumber)
        const csvRows = [];
        let headers = []
        let values = []

        for (var i = 0; i < data.data.length; i++) {
            // console.log(data.data[i].name)
            headers = [data.data[i].name]
            // console.log(headers)
            values = [data.data[i].value]
            csvRows.push([headers, values]);

        }
        csvRows.push(...csvRows, groupNumber)
        console.log(csvRows)

        const csvString = csvRows.join('\n');
        console.log(csvString)

        // const csvFile = new Blob([csvString], { type: 'text/csv' });
        // const csvUrl = URL.createObjectURL(csvFile);
        // const hiddenLink = document.createElement('a');
        // hiddenLink.href = csvUrl;
        // hiddenLink.download = 'data.csv';
        // hiddenLink.click();

        //     const csvRows = [];

        //     // Get the headers from the keys of the first object in the data array
        //     const headers = data[1][0]
        //     console.log(headers)

        //     // Add the headers to the CSV rows
        //     csvRows.push(headers.join(','));

        //     // Iterate over the data and convert each item to a CSV row
        //     data.forEach(item => {
        //         const values = headers.map(header => {
        //             const escapedValue = String(item[header]).replace(/"/g, '\\"');
        //             return `"${escapedValue}"`;
        //         });
        //         csvRows.push(values.join(','));
        //     });

        //     // Join all the CSV rows into a single string
        //     const csvString = csvRows.join('\n');

        //     // Create a Blob object and generate a download link
        //     const csvFile = new Blob([csvString], { type: 'text/csv' });
        //     const csvUrl = URL.createObjectURL(csvFile);
        //     const hiddenLink = document.createElement('a');
        //     hiddenLink.href = csvUrl;
        //     hiddenLink.download = 'data.csv';
        //     hiddenLink.click();
    }


    const handleExport = () => {
        console.log(groupNumber)
        exportToCsv(data, groupNumber, setGroupNumber);
    };
    return (
        <div>

            {/* <CSVLink filename="O4F.csv" data={handleExport}>Press Here</CSVLink> */}
            <button onClick={handleExport}>Export to CSV</button>
        </div>
    );

}

export default ExportFile