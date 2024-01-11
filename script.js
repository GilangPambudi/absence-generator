function generateBBcode() {
    if (!validateForm()) {
        return;
    }

    const getFieldValue = (id) => document.getElementById(id).value.trim();
    const formatDate = (date) => new Date(date).toLocaleDateString('en-GB');

    const fullName = getFieldValue("fullName");
    const district = getFieldValue("district");
    const employeeBadge = getFieldValue("employeeBadge");
    const departmentServing = getFieldValue("departmentServing");
    const position = getFieldValue("position");

    const typeOfAbsence = getFieldValue("typeOfAbsence");
    const reasonOfAbsence = getFieldValue("reasonOfAbsence");
    const dateOfLeave = new Date(getFieldValue("dateOfLeave"));
    const dateOfReturn = new Date(getFieldValue("dateOfReturn"));
    const numberOfDaysAway = calculateDaysAway(dateOfLeave, dateOfReturn);

    const oocReasonOfAbsence = getFieldValue("oocReasonOfAbsence");
    const employeeSignature = getFieldValue("employeeSignature");
    const today = new Date().toLocaleDateString('en-GB');

    const generatedBBcode = `[divbox=white][center][img]https://i.postimg.cc/RFd9JsR5/safdjg-2020-resized-2.png[/img]
[size=150][b][font=times new roman]SAN ANDREAS FIRE DEPARTMENT[/font][/b][/size]
[font=times new roman]HEADQUARTERS[/font]
[font=times new roman]CITY OF LOS SANTOS * 225 DOWNTOWN STREET COR. DOWNTOWN AVENUE * LOS SANTOS SA 55164[/font][/center]
    
[hr][/hr]
[center][font=times new roman]LEAVE OF ABSENCE REQUEST[/font][/center]
[hr][/hr]
    
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]A — Employee Information[/font][/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]A1.[/color] Full Name:[/b] ${fullName}
[b][color=#bf4000]A2.[/color] District:[/b] ${district}
[b][color=#bf4000]A3.[/color] Position:[/b] ${position}
[b][color=#bf4000]A4.[/color] Employee #:[/b] ${employeeBadge}
[b][color=#bf4000]A5.[/color] Department Serving:[/b] ${departmentServing}
[/list]

[hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]B — Absence Details[/font][/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]B1.[/color] Type of Absence:[/b] ${typeOfAbsence}
[b][color=#bf4000]B2.[/color] Reason of Absence:[/b] ${reasonOfAbsence}

[b][color=#bf4000]B3.[/color] Date of Leave:[/b] ${dateOfLeave.toLocaleDateString('en-GB')}
[b][color=#bf4000]B4.[/color] Date of Return:[/b] ${dateOfReturn.toLocaleDateString('en-GB')}
[b][color=#bf4000]B5.[/color] Number of Day(s) Away:[/b] ${numberOfDaysAway} days
[/list]

[hr][/hr]
[aligntable=right,0,0,0,0,0,transparent]Approval Signature: 
[i]<Answer here>[/i]
[b]DATE:[/b] DD/MM/YY[/aligntable]
Employee Signature: 
[i]${employeeSignature}[/i]
[b]DATE:[/b] ${today}

[hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white](( [font=times new roman]C — Out of Character Information[/font] ))[/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]C1.[/color] Reason of Absence:[/b] ${oocReasonOfAbsence}

[/divbox]`;
    document.getElementById("generatedBBcode").value = generatedBBcode;

    const generatedSubject = `[${typeOfAbsence}] ${fullName} [${formatDate(dateOfLeave)} - ${formatDate(dateOfReturn)}]`;
    document.getElementById("subject").value = generatedSubject;

    showSuccessNotification();
}

function getFieldValueById(elementId) {
    const element = document.getElementById(elementId);
    return element ? element.value : "<Answer here>";
}

function copyToClipboard() {
    const textarea = document.getElementById("generatedBBcode");

    if (textarea.value === "") {
        showErrorNotification("Please generate BBcode first!");
        return;
    }

    textarea.select();
    document.execCommand("copy");

    showSuccessNotification("Generated BBCode has been copied to the clipboard");
}

function validateForm() {
    const fields = ["fullName", "district", "position", "employeeBadge", "departmentServing", "typeOfAbsence", "reasonOfAbsence", "dateOfLeave", "dateOfReturn", "oocReasonOfAbsence", "employeeSignature"];

    for (const field of fields) {
        const fieldValue = getFieldValueById(field);

        if (!fieldValue) {
            showErrorNotification("Please fill in all fields!");
            return false;
        }
    }

    if (!validateSelect("departmentServing", "Select Department Serving") || !validateSelect("position", "Select Rank") || !validateSelect("typeOfAbsence", "Select Type of Absence")) {
        return false;
    }

    return true;
}

function validateSelect(elementId, invalidValue) {
    const value = getFieldValueById(elementId);

    if (!value || value === invalidValue) {
        showErrorNotification(`Please select a valid ${elementId.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()}!`);
        return false;
    }

    return true;
}

function updatePositionOptions() {
    const departmentServing = getFieldValueById("departmentServing");
    const positionSelect = document.getElementById("position");

    positionSelect.innerHTML = '';
    positionSelect.disabled = true;

    const addPositionOption = (position) => {
        const positionOption = document.createElement("option");
        positionOption.value = position;
        positionOption.appendChild(document.createTextNode(position));
        positionSelect.appendChild(positionOption);
    };

    const addDefaultOption = () => {
        const defaultOption = document.createElement("option");
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.appendChild(document.createTextNode("Select Rank"));
        positionSelect.appendChild(defaultOption);
    };

    if (departmentServing === "Field") {
        ["Battalion Chief", "Captain", "Lieutenant", "Engineer", "Senior Firefighter", "Junior Firefighter", "Cadet"].forEach(addPositionOption);
    } else if (departmentServing === "Hospital") {
        ["Hospital Executive", "Executive Assistant", "Medical Director", "Attending Physician", "Fellow", "Senior Resident", "Resident"].forEach(addPositionOption);
    }

    addDefaultOption();

    if (departmentServing !== "") {
        positionSelect.disabled = false;
    }
}

document.getElementById("departmentServing").addEventListener("change", updatePositionOptions);

function calculateDaysAway(dateOfLeave, dateOfReturn) {
    const timeDifference = dateOfReturn - dateOfLeave;
    return Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
}

function copySubjectToClipboard() {
    const subjectTextarea = document.getElementById("subject");

    if (subjectTextarea.value === "") {
        showErrorNotification("Please generate BBcode first!");
        return;
    }

    subjectTextarea.select();
    document.execCommand("copy");

    showSuccessNotification("Subject has been copied to the clipboard");
}

function showErrorNotification(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
    });
}

function showSuccessNotification(message = 'BBCode has been generated!') {
    Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: message,
    });
}