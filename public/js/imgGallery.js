

function setImg(docObjects, link) {
    // console.log(docObjects.dataObj);
    var docElement = document.querySelector('.grid.gallery-index');
    docElement.innerHTML = "";
    if (docObjects.dataObj.length == 0) {
        docElement.innerHTML = `
        <div class="col-lg-12 col-sm-12">
            <div class="center-text">
            <br><br>
                <h4>No Image found!</h4>
            </div>
        </div>
        `;
    }

    for (var i = 0; i < docObjects.dataObj.length; i++) {
        var dc = docObjects.dataObj[i];

        docElement.innerHTML += `
        <div class="item">
        <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            
                                            <div class="modal-body">
                                                <img width=auto src="${link + dc.path}" class="img-fluid img-modal width-auto">
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>

                                <div class="course">
                                    <a id="imgTag${i}" href="#" class="course-img img-thumbnailx hidden-gallery-toggle" data-toggle="modal"
                                        data-target="#myModal${i}">
                                        <img src="${link + dc.thumbnail}" class=" img-fluid-gallery" alt="Gallery Image">
                                        <i class="course-link-icon fa fa-camera"></i>
                                    </a>
                                </div>
                                </div>
                            
        `;
    }
}

function initTemplate(link, type, tag) {
    $.get(`${link}/getFileByTag/img/${tag}`, function (request, status, headers) {
        // alert(JSON.stringify({ request, status, headers }));
        // console.log({ request, status, headers });

        setImg(request, link);
        checkImgLoad();
    });

}

// window.onload = function () {
//     var msnry = new Masonry('.grid', {

//         itemSelector: '.item',
//     });
//     // $('.item > a').removeAttr('href')
// };
function checkImgLoad() {
    $('.grid').imagesLoaded(function () {
        var msnry = new Masonry('.grid', {

            itemSelector: '.item',
        });
    });
}




