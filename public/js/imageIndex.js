function makeRandomRange(x) {
    var range = new Array(x),
        pointer = x;
    return function getRandom() {
        if (range) {
            pointer--;
            var random = Math.floor(Math.random() * pointer);
            var num = (random in range) ? range[random] : random;
            range[random] = (pointer in range) ? range[pointer] : pointer;
            range[pointer] = num;
            if (pointer <= 0) { // first x numbers had been unique
                range = null; // free memory;
            }
            return num;
        } else {
            return Math.floor(Math.random() * x);
        }
    };
}



function setImg(docObjects, link, nums = null) {
    // console.log(docObjects.dataObj);
    var docElement = document.querySelector('.grid.gallery-index .col-lg-12');
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

    if (nums != null) {
        for (var i = 0; i < nums.length; i++) {
            var dc = docObjects.dataObj[nums[i]];

            docElement.innerHTML += `
            <div class="item">
            <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <!-- <div class="modal-header">
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                            aria-hidden="true">&times;</span></button>
                                                    <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                                                </div> -->
                                                <div class="modal-body">
                                                    <img width=auto src="${link + dc.path}" class="img-fluid img-modal width-auto">
                                                </div>
                                                <!-- <div class="modal-footer">
                                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                    <button type="button" class="btn btn-primary">Save changes</button>
                                                </div> -->
                                            </div>
                                        </div>
                                    </div>
    
                                    <div class="course">
                                        <a id="imgTag${i}" href="#" class="course-img img-thumbnailx hidden-gallery-toggle" data-toggle="modal"
                                            data-target="#myModal${i}">
                                            <img src="${link + dc.path}" class=" img-fluid-gallery" alt="Gallery Image">
                                            <i class="course-link-icon fa fa-camera"></i>
                                        </a>
                                    </div>
                                    </div>
                                
            `;
        }
    } else {
        for (var i = 0; i < docObjects.dataObj.length; i++) {
            var dc = docObjects.dataObj[i];

            docElement.innerHTML += `
        <div class="item">
        <div class="modal fade" id="myModal${i}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                                    <div class="modal-dialog" role="document">
                                        <div class="modal-content">
                                            <!-- <div class="modal-header">
                                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                        aria-hidden="true">&times;</span></button>
                                                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                                            </div> -->
                                            <div class="modal-body">
                                                <img width=auto src="${link + dc.path}" class="img-fluid img-modal width-auto">
                                            </div>
                                            <!-- <div class="modal-footer">
                                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                <button type="button" class="btn btn-primary">Save changes</button>
                                            </div> -->
                                        </div>
                                    </div>
                                </div>

                                <div class="course">
                                    <a id="imgTag${i}" href="#" class="course-img img-thumbnailx hidden-gallery-toggle" data-toggle="modal"
                                        data-target="#myModal${i}">
                                        <img src="${link + dc.path}" class=" img-fluid-gallery" alt="Gallery Image">
                                        <i class="course-link-icon fa fa-camera"></i>
                                    </a>
                                </div>
                                </div>
                            
        `;
        }
    }
}

function initTemplate(link = 'http://esiadm.herokuapp.com') {
    $.get(`${link}/getFileByTag/img/all`, function (request, status, headers) {
        // alert(JSON.stringify({ request, status, headers }));
        // console.log({ request, status, headers });
        if (request.dataObj.length <= 8) {
            setImg(request, link, null);
        } else {
            var generate = makeRandomRange(request.dataObj.length);
            var obj = {};
            var nums = [];
            for (var i = 0; i < 8; i++) {
                var x = generate();
                nums.push(x);
                obj[x] = (obj[x] || 0) + 1;
            }
            setImg(request, link, nums);
            // alert(nums);
        }
    })
}

window.onload = function () {
    var msnry = new Masonry('.grid', {
        // options
        itemSelector: '.item'
    });
    // $('.item > a').removeAttr('href')
};


initTemplate();