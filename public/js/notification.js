function setNotif(notifs) {
    document.querySelector('.notif-scroll-container').innerHTML = "";

    if(notifs.length == 0){
        document.querySelector('.notif-scroll-container').innerHTML = `
        <div class="row">
        <div class="col-xs-12 text-center">
            <br>
            <br>
            <br>
            Notifications and alerts are currently not avaible! Please try again in a little bit.
        </div>
        </div>
        `;
    }
    for (var i = 0; i < notifs.length; i++) {
        notif = notifs[i];
        var type = 'fa-bell';
        (typeof notif.contentType != null && typeof notif.contentType != undefined) ? ((notif.contentType == 'event') ? (type = 'fa-calendar-day') : (null)) : (null);
        document.querySelector('.notif-scroll-container').innerHTML += `

        <div class="notif-element">
			<div class="row p-t-10 p-b-10 p-l-10 p-r-10 m-t-12">
		        <div class="col-xs-2 text-center p-t-10 text-symbol-notif">
				    <i class="fas ${type} fs-25 "></i>
			    </div>
		        <div class="col-xs-10">
				    <div class="date-event"><em>${timeConverter(notif.createdOn)}</em></div>
					<div class="notif-content">
                    ${notif.content}
                    </div>
                    <span class="link"><a href="${notif.link}" target="_blank">Click here</a></span>
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

$.get('https://esiadm.herokuapp.com/readNotif', function (request, status, headers) {
    // alert(JSON.stringify({ request, status, headers }));
    // alert('hey');
    // console.log({ request, status, headers });
    setNotif(request);
})
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

