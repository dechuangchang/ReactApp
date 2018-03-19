var url = require('../../img/u.jpg')
console.log(111)
function getCurrentUser() {
    $.ajax({
        url: '/api/user/current',
        method: 'GET',
        data: {
            client_type: 0
        },
        success: function (rep) {
            console.log(rep)
        }
    });
}
getCurrentUser()
window.document.getElementById('app').innerHTML='<img src='+url+'></img>';
window.document.getElementById('app').innerHTML+='<div class="icon iconfont icon-shoucanggaojing"></div>';