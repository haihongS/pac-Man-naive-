/**
 * Created by haihongs on 16-12-9.
 */


$(document).ready(function () {


    // start scene

    startScene();

    document.onkeydown=function (evt) {
        if(process==0) {
            var e = evt || window.event;
            //enter
            if (e && e.keyCode == 13) {
                window.clearInterval(start_loop);
                process++;
                // start play
               drawTable();
               move_loop=setInterval(perMove,250);

            }
        }else if(process==1) {
            var e = evt || window.event;
            if(e && e.keyCode==38){
                // upArrow
                tryChangeDir(0);
            }else if(e && e.keyCode==40){
                // downArrow
                tryChangeDir(2);
            }else if(e && e.keyCode==37){
                // leftArrow
                tryChangeDir(1);
            }else if(e && e.keyCode==39){
                // rightArrow
                tryChangeDir(3);
            }
        }
    }

});
