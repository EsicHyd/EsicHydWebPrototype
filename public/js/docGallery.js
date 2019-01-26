// var lnk = `https://esiadm.herokuapp.com`;
// lnk = 'http://localhost:3000';
// var link = "";

function setDoc(docObjects,link) {
    // console.log(docObjects.dataObj);
    var docElement = document.querySelector('.file-manager.file-manager-cards .row');
    docElement.innerHTML = "";
    if(docObjects.dataObj.length == 0){
        docElement.innerHTML = `
        <div class="col-lg-8 col-sm-12">
            <div class="center-text">
            <br><br>
                <h4>No file found!</h4>
            </div>
        </div>
        `;
    }
   
    for (var i = 0; i < docObjects.dataObj.length; i++) {
        var dc = docObjects.dataObj[i];
        var type = 'doc';
        var pdf = /.pdf/;
        (pdf.test(dc.name))?type = 'pdf':null;

        docElement.innerHTML += `
        <div class="col-sm-4 col-xs-12">
        <a href="${link+dc.path}" target="_blank">
        <div class="file-manager__item card card-small mb-40">
            <div class="file-manager__item-preview card-body px-0 pb-0 pt-33">
                <img src="./img/${type}.png" alt="File Manager - Item Preview">
            </div>
            <div class="card-footer border-top">
                <span class="file-manager__item-icon">
                    <i class="fas fa-file-alt"></i>
                </span>
                <h6 class="file-manager__item-title">${dc.name}</h6>
                <span class="file-manager__item-size ml-auto">${formatBytes(dc.size)}</span>
            </div>
        </div>
        </a>
        </div>
        `;
    }
}

function setImg(req){
    console.log('hey')
}

function initTemplate(link,type,tag){
    $.get(`${link}/getFileByTag/${type}/${tag}`, function (request, status, headers) {
        // alert(JSON.stringify({ request, status, headers }));
        // console.log({ request, status, headers });
        if(type == 'doc'){
            setDoc(request,link);
        }else if(type == 'img'){
            setImg(request,link);
        }
    })
}

// initTemplate('http://localhost:3000','doc','Faculty');


function formatBytes(bytes, decimals) {
    if (bytes == 0) return '0 Bytes';
    var k = 1024,
        dm = decimals <= 0 ? 0 : decimals || 2,
        sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}