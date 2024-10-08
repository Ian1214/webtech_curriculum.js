$(document).ready(function() { 
    // Fetch the Details data from a JSON file
    fetch("Details.json")  // Request the JSON file
    .then((rawData) => rawData.json())  // Convert the raw data to JSON
    .then((Details) => {  // Process the JSON data
        // Array of semester names to be displayed as table titles
        let sem = ["First Year, First Semester",
                    "First Year, Second Semester",
                    "Second Year, First Semester",
                    "Second Year, Second Semester",
                    "Third Year, First Semester",
                    "Third Year, Second Semester",
                    "Fourth Year, First Semester",
                    "Fourth Year, Second Semester"];
        // Keeps track of the current semester index
        let semcount = 0;  

        // Column names and their corresponding widths in percentages
        const columnName = {
            "Course": 15, 
            "Description": 25, 
            "Unit": 8, 
            "Grade": 10, 
            "Remarks" : 12, 
            "Course2": 16,
            "Term": 25
        };

        // Iterate through each semester in the Details (Details is an array of subjects for each semester)
        Details.forEach(subjects => {
            // Add the semester title to the table
            $(".tablebody").append(
                `<tr class="table-title">
                    <th colspan="7">${sem[semcount++]}</th>
                </tr>`  // `colspan="7"` merges cells to span across 7 columns
            );

            //table header row
            let tableHeadHTML = '';
            for (let x in columnName) {
                tableHeadHTML += `<td width=${columnName[x]}%>${x === 'Course2' ? 'Course' : x}</td>`;
                // If the column name is 'Course2', it's renamed to 'Course' in the table
            }
            $(".tablebody").append(
                `<tr class="table-head">${tableHeadHTML}</tr>`  // Append the header row to the table
            );

            // Iterate through subjects for the current semester
            subjects.forEach(subject => {
                let colorClass = '';  // Class name for styling rows based on the subject's status

                // taken, not taken and inporgress subjects
                if (subject.Grade === "" && subject.Remarks === "") {
                    colorClass = 'not-taken';  
                } else if (subject.Remarks === "In progress") {
                    colorClass = 'currently-taken';  
                } else {
                    colorClass = 'already-taken';  
                }

                // Add a row for the subject
                $(".tablebody").append(
                    `<tr class="${colorClass}">
                        <td>${subject.Course}</td>
                        <td>${subject.Description}</td>
                        <td>${subject.Unit}</td>
                        <td>${subject.Grade}</td>
                        <td>${subject.Remarks}</td>
                        <td>${subject.Course}</td> 
                        <td>${subject.Term}</td>
                    </tr>`
                );
            });
        });
    });
});
