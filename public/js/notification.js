function setNotif(notifs) {
    document.querySelector('#table-notif-content tbody').innerHTML = "";

    for (var i = 0; i < notifs.length; i++) {
        notif = notifs[i];
        document.querySelector('#table-notif-content tbody').innerHTML += `
    <tr class="row100 body">
    <td class="cell100 column1">${timeConverter(notif.createdOn)}</td>
    <td class="cell100 column2">${notif.content}</td>
    <td class="cell100 column3"><a href="${notif.link}" target="_blank"><i class="fas fa-external-link-alt">click here</i></a></td>
    </tr>
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
    var smallTime = date+' '+month+' \''+ year;
    return smallTime;
}

$.get('https://esiadm.herokuapp.com/readNotif', function (request, status, headers) {
    // alert(JSON.stringify({ request, status, headers }));
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

