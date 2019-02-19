function setNotif(notifs) {
    document.querySelector('.notif-scroll-container').innerHTML = "";
    
    // `
    // <div class="notif-element" style="background:#000;">
    // <div class="row p-t-10 p-b-6 p-l-10 p-r-10 m-t-12" >
    //     <div class="col-xs-2 text-center p-t-10 text-symbol-notif">
            
    //     </div>
    //     <div class="col-xs-8">
    //         <h4>Departments</h4>
    //     </div>
    //     <div class="col-xs-2 text-center">
    //     <h4>Link</h4>
    //     </div>
    // </div>
    // <hr class="dark-hr">
    // </div>
    // `;

    if(notifs.length == 0){
        document.querySelector('.notif-scroll-container').innerHTML = `
        <div class="row">
        <div class="col-xs-12 text-center">
            <br>
            <br>
            <br>
            Notifications and alerts are currently not available! Please try again in a little bit.
        </div>
        </div>
        `;
    }
    for (var i = 0; i < notifs.length; i++) {
        notif = notifs[i];
        var type = 'fa-bell';
        // type = 'fa-list-alt';
        (typeof notif.contentType != null && typeof notif.contentType != undefined) ? ((notif.contentType == 'event') ? (type = 'fa-calendar-day') : (null)) : (null);
        if (notif.contentType != 'recrute') { continue; }
        document.querySelector('.notif-scroll-container').innerHTML += `

        <div class="notif-element">
			<div class="row p-t-10 p-b-10 p-l-10 p-r-10 m-t-12">
		        <div class="col-xs-2 text-center p-t-10 text-symbol-notif">
				    <i class="fas ${type} fs-25 "></i>
			    </div>
		        <div class="col-xs-8">
				    <div class="date-event"><em>${timeConverter(notif.createdOn)}</em></div>
					<div class="notif-content">
                    ${notif.content}
                    </div>
                </div>
                <div class="col-xs-2 text-center">
                <br>
                <span class="link p-r-10"><a href="${notif.link}" target="_blank">List <i class="fas fa-external-link-alt"></i></a></span>
                </div>
		    </div>
			<hr class="dark-hr">
        </div>
                                
    `;
    }

}

function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear() % 2000;
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
    var smallTime = date + ' ' + month + ' \'' + year;
    return smallTime;
}
function initNotif(link = "http://dev.esicmchyd.ac.in:5001"){
    $.get(`${link}/readNotif`, function (request, status, headers) {
        // alert(JSON.stringify({ request, status, headers }));
        // alert('hey');
        // console.log({ request, status, headers });
        setNotif(request);
    })
}

initNotif();

// $.ajax({
//     type: 'POST',
//     url: 'url.do',
//     data: JSON.stringify(data),
//     contentType: "application/json",
//     success: function (request, status, headers) {
//         alert(JSON.stringify({ request, status, headers }));
//     },
//     error: function (request, textStatus, errorThrown) {
//         alert(request.getResponseHeader('some_header'));
//     },
// });

