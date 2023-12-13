function generateBBcode() {

    if (!validateForm()) {
        return;
    }

    // A — Employee Information
    var fullName = document.getElementById("fullName").value;
    var employeeBadge = document.getElementById("employeeBadge").value;
    var departmentServing = document.getElementById("departmentServing").value;
    var position = document.getElementById("position").value;

    // B — Absence Details
    var typeOfAbsence = document.getElementById("typeOfAbsence").value;
    var reasonOfAbsence = document.getElementById("reasonOfAbsence").value;
    var dateOfLeave = new Date(document.getElementById("dateOfLeave").value);
    var dateOfReturn = new Date(document.getElementById("dateOfReturn").value);
    var numberOfDaysAway = calculateDaysAway(dateOfLeave, dateOfReturn);
    
    // Out of Character Information
    var oocReasonOfAbsence = document.getElementById("oocReasonOfAbsence").value;

    // Employee Signature
    var employeeSignature = document.getElementById("employeeSignature").value;

    var today = new Date().toLocaleDateString('en-GB');

    // Generated BBcode
    var generatedBBcode = `[divbox=white][center][img]https://i.postimg.cc/RFd9JsR5/safdjg-2020-resized-2.png[/img]
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

    // Set the generated BBcode to the textarea
    document.getElementById("generatedBBcode").value = generatedBBcode;

    var generatedSubject = `[${typeOfAbsence}] ${fullName} [${dateOfLeave.toLocaleDateString('en-GB')} - ${dateOfReturn.toLocaleDateString('en-GB')}]`; 
    document.getElementById("subject").value = generatedSubject;


    Swal.fire({
        icon: 'success',
        title: 'Generated!',
        text: 'BBcode has been generated successfully',
    });
}

function getValueById(elementId) {
    var element = document.getElementById(elementId);
    return element ? element.value : "<Answer here>";
}

function copyToClipboard() {
    if (document.getElementById("generatedBBcode").value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please generate BBcode first!',
        });
        return false;
    }

    var textarea = document.getElementById("generatedBBcode");
    textarea.select();
    document.execCommand("copy");

    // Use SweetAlert2 for a nicer notification
    Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: 'Generated BBCode has been copied to the clipboard',
        showConfirmButton: false,
        timer: 1500  // Auto close after 1.5 seconds
    });
}

function validateForm() {
    var fields = [
        "fullName", "position", "employeeBadge", "departmentServing",
        "typeOfAbsence", "reasonOfAbsence", "dateOfLeave", "dateOfReturn",
        "oocReasonOfAbsence", "employeeSignature"
    ];

    for (var i = 0; i < fields.length; i++) {
        var fieldValue = document.getElementById(fields[i]).value.trim();

        if (!fieldValue) {
            // Tampilkan pesan kesalahan
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all fields!',
            });

            return false;
        }
    }

   // Periksa "Department Serving"
   var departmentServingValue = document.getElementById("departmentServing").value;
   if (!departmentServingValue || departmentServingValue === "Select Department Serving") {
       Swal.fire({
           icon: 'error',
           title: 'Error',
           text: 'Please select a valid Department Serving!',
       });
       return false;
   }

    // Periksa "Position"
    var positionValue = document.getElementById("position").value;
    if (!positionValue || positionValue === "Select Rank") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please select a valid Position!',
        });
        return false;
    }

    // Periksa "Type of Absence"
    var typeOfAbsence = document.getElementById("typeOfAbsence").value;
    if (!typeOfAbsence || typeOfAbsence === "Select Type of Absence") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please select a valid Type of Absence!',
        });
        return false;
    }

    return true;
}

function tryGenerateBBcode() {
    generateBBcode();
}

// Memanggil fungsi ini setiap kali pilihan "Department Serving" berubah
function updatePositionOptions() {
    var departmentServing = document.getElementById("departmentServing").value;
    var positionSelect = document.getElementById("position");

    // Mengosongkan dan menonaktifkan opsi "Position"
    positionSelect.innerHTML = '';
    positionSelect.disabled = true;

    // Menambahkan opsi "Select Rank"
    var selectRankOption = document.createElement("option");
    selectRankOption.disabled = true;
    selectRankOption.selected = true;
    selectRankOption.appendChild(document.createTextNode("Select Rank"));
    positionSelect.appendChild(selectRankOption);

    // Menambahkan opsi berdasarkan "Department Serving"
    if (departmentServing === "Field") {
        addPositionOption("Battalion Chief");
        addPositionOption("Captain");
        addPositionOption("Lieutenant");
        addPositionOption("Engineer");
        addPositionOption("Senior Firefighter");
        addPositionOption("Junior Firefighter");
        addPositionOption("Cadet");
    } else if (departmentServing === "Hospital") {
        addPositionOption("Hospital Executive");
        addPositionOption("Executive Assistant");
        addPositionOption("Medical Director");
        addPositionOption("Attending Physician");
        addPositionOption("Fellow");
        addPositionOption("Senior Resident");
        addPositionOption("Resident");
    }

    // Mengaktifkan opsi "Position" jika "Department Serving" telah dipilih
    if (departmentServing !== "") {
        positionSelect.disabled = false;
    }
}

// Fungsi bantu untuk menambahkan opsi "Position"
function addPositionOption(position) {
    var positionOption = document.createElement("option");
    positionOption.value = position;
    positionOption.appendChild(document.createTextNode(position));
    document.getElementById("position").appendChild(positionOption);
}

// Panggil fungsi updatePositionOptions() setiap kali "Department Serving" berubah
document.getElementById("departmentServing").addEventListener("change", updatePositionOptions);

function calculateDaysAway(dateOfLeave, dateOfReturn) {
    // Hitung selisih waktu dalam milidetik
    var timeDifference = dateOfReturn - dateOfLeave;

    // Konversi selisih waktu menjadi jumlah hari
    var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
}

function copySubjectToClipboard() {
    var subjectTextarea = document.getElementById("subject");
    
    if (subjectTextarea.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Please generate BBcode first!',
        });
        return false;
    }

    subjectTextarea.select();
    document.execCommand("copy");

    Swal.fire({
        icon: 'success',
        title: 'Copied!',
        text: 'Subject has been copied to the clipboard',
        showConfirmButton: false,
        timer: 1500  // Auto close after 1.5 seconds
    });
}