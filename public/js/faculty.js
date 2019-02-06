function setDepartments(arr) {
    var dept = [];
    for (var i = 0; i < arr.length; i++) {
        if (dept.indexOf(arr[i].doctorDepartment) == -1) {
            dept.push(arr[i].doctorDepartment);
        }
    }

    // alert(JSON.stringify(dept));
    console.log(dept);
    setData(dept,arr);
}


function setData(list, data) {
    var listUi = document.getElementById('deptList');
    var modalUi = document.getElementById('deptModal');
    var id = "";
    var idList = [];
    listUi.innerHTML = "";
    modalUi.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        id=list[i].trim().replace(/\s|[//]|[\\]/g, '');
        idList.push(id);
        listUi.innerHTML+=`
        <div class="pill-single">
        <span class="tb">>> </span>
        <a href="#" data-toggle="modal" data-target="#modal-${id}">${list[i]}</a>
        </div>
        `;

        modalUi.innerHTML+=`
        <div class="modal fade" id="modal-${id}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
        <h2 class="modal-title" id="modalId-${id}">${list[i]}</h2>
        <!--<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>-->
        </div>
        <div class="modal-body">
        <div id="content-${id}"></div>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
        </div>
        </div>
        </div>
        `;

    }

    setDataIntoModal(list,data,idList);
}

function setDataIntoModal(list,arr,idList){
    for (var i = 0;i<arr.length;i++){
        if(list.indexOf(arr[i].doctorDepartment) != -1){
            var id = arr[i].doctorDepartment.trim().replace(/\s|[//]|[\\]/g, '');
            var imgLink = "http://dev.esicmchyd.ac.in:2000/"+arr[i].image;
            var hr = '<hr>';
            document.getElementById(`content-${id}`).innerHTML+=
            `
            <div class="doc-pill">
            <div class="row">
            <div class="col-md-3 center-text-sm">
            <img src="${imgLink}" alt="${arr[i].doctorName}'s image" class="doc-dp">
            </div>
            <div class="col-md-9 center-text-sm">
            <h5 class="doc-name">${arr[i].doctorName}</h5>
            <p class="doc-dept">${arr[i].doctorDescription}</p>
            </div>
            </div>
            </div>
            ${hr}
            `
        }
    }
}
function initFaculty(link = "http://dev.esicmchyd.ac.in:2000") {
    $.get(`${link}/doctor583`, function (request, status, headers) {
        // alert(JSON.stringify({ request, status, headers }));
        // alert('hey');
        // console.log({ request, status, headers });
        // setNotif(request);
        setDepartments(request);
    })
}


initFaculty();