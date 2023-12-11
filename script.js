function generateBBcode() {

    if (!validateForm()) {
        return;
    }

    // A — Employee Information
    var fullName = document.getElementById("fullName").value;
    var position = document.getElementById("position").value;
    var employeeBadge = document.getElementById("employeeBadge").value;
    var departmentServing = document.getElementById("departmentServing").value;

    // B — Absence Details
    var typeOfAbsence = document.getElementById("typeOfAbsence").value;
    var reasonOfAbsence = document.getElementById("reasonOfAbsence").value;
    var dateOfLeave = new Date(document.getElementById("dateOfLeave").value).toLocaleDateString('en-GB');
    var dateOfReturn = new Date(document.getElementById("dateOfReturn").value).toLocaleDateString('en-GB');
    var numberOfDaysAway = document.getElementById("numberOfDaysAway").value;
    
    // Out of Character Information
    var oocReasonOfAbsence = document.getElementById("oocReasonOfAbsence").value;

    // Employee Signature
    var employeeSignature = document.getElementById("employeeSignature").value;

    // Generated BBcode
    var generatedBBcode = `
[divbox=white][center][img]https://i.postimg.cc/RFd9JsR5/safdjg-2020-resized-2.png[/img]
[size=150][b][font=times new roman]SAN ANDREAS FIRE DEPARTMENT[/font][/b][/size]
[font=times new roman]HEADQUARTERS[/font]
[font=times new roman]CITY OF LOS SANTOS * 225 DOWNTOWN STREET COR. DOWNTOWN AVENUE * LOS SANTOS SA 55164[/font][/center]

[hr][/hr]
[center][font=times new roman]LEAVE OF ABSENCE REQUEST[/font][/center]
[hr][/hr]

[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]A — Employee Information[/font][/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]A1.[/color] Full Name:[/b] ${fullName}
[b][color=#bf4000]A2.[/color] Position:[/b] ${position}
[b][color=#bf4000]A3.[/color] Employee #:[/b] ${employeeBadge}
[b][color=#bf4000]A4.[/color] Department Serving:[/b] ${departmentServing}
[/list]

[hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white][font=times new roman]B — Absence Details[/font][/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]B1.[/color] Type of Absence:[/b] ${typeOfAbsence}
[b][color=#bf4000]B2.[/color] Reason of Absence:[/b] ${reasonOfAbsence}

[b][color=#bf4000]B3.[/color] Date of Leave:[/b] ${dateOfLeave}
[b][color=#bf4000]B4.[/color] Date of Return:[/b] ${dateOfReturn}
[b][color=#bf4000]B5.[/color] Number of Day(s) Away:[/b] ${numberOfDaysAway}
[/list]

[hr][/hr]
[aligntable=right,0,0,0,0,0,transparent]Approval Signature: 
[i]<Answer here>[/i]
[b]DATE:[/b] DD/MM/YY[/aligntable]
Employee Signature: 
[i]${employeeSignature}[/i]
[b]DATE:[/b] DD/MM/YY

[hr]
[divbox=black][aligntable=right,0,0,0,0,0,transparent][img]https://i.postimg.cc/V6qpRTsK/SAFD-LOGO-MINI2.png[/img][/aligntable][size=140][b][color=white](( [font=times new roman]C — Out of Character Information[/font] ))[/color][/b][/size][/divbox][list=none]

[b][color=#bf4000]C1.[/color] Reason of Absence:[/b] ${oocReasonOfAbsence}

[/divbox]`;

    // Set the generated BBcode to the textarea
    document.getElementById("generatedBBcode").value = generatedBBcode;

    Swal.fire({
        icon: 'success',
        title: 'Generated!',
        text: 'BBcode has been generated successfully.',
    });
}

function getValueById(elementId) {
    var element = document.getElementById(elementId);
    return element ? element.value : "<Answer here>";
}

function copyToClipboard() {
    var textarea = document.getElementById("generatedBBcode");
    textarea.select();
    document.execCommand("copy");

    // Use SweetAlert2 for a nicer notification
    Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: 'Generated BBcode has been copied to the clipboard.',
        showConfirmButton: false,
        timer: 1500  // Auto close after 1.5 seconds
    });
}

function validateForm() {
    var fields = [
        "fullName", "position", "employeeBadge", "departmentServing",
        "typeOfAbsence", "reasonOfAbsence", "dateOfLeave", "dateOfReturn", "numberOfDaysAway",
        "oocReasonOfAbsence", "employeeSignature"
    ];

    for (var i = 0; i < fields.length; i++) {
        var fieldValue = document.getElementById(fields[i]).value.trim();

        if (!fieldValue) {
            // Tampilkan pesan kesalahan
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all fields.',
            });

            return false;
        }
    }

    return true;
}

function tryGenerateBBcode() {
    generateBBcode();
}