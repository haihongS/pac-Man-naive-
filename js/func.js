/**
 * Created by haihongs on 16-12-10.
 */


function clearTable(){
    var table=document.getElementById("mycanvas");
    var cxt=table.getContext("2d");
    cxt.clearRect(0,0,table.width,table.height);
    return false;
}

function startScene() {

    var mm = document.getElementById("mycanvas");
    var cxt = mm.getContext("2d");

    start_loop=setInterval(draw,250);

    var cnt = 0;
    var now_x = x_max / 2, now_y = y_max / 2,now_r=80;
    var eye_x=5,eye_y=35,eye_r=now_r/10;


    function draw() {
        cnt++;

        cxt.clearRect(0,0,mm.width,mm.height);

        cxt.fillStyle = "#FFE600";

        // draw middle point
        cxt.beginPath();
        cxt.arc(now_x,now_y,now_r/4,0,2*Math.PI,false);
        cxt.closePath();
        cxt.fill();

        // draw left and right
        cxt.beginPath();
        if (cnt % 2 == 0) {
            cxt.arc(now_x-2*now_r, now_y, now_r, 0.01 * Math.PI, 1.99 * Math.PI, false);
        } else {
            cxt.arc(now_x-2*now_r, now_y, now_r, 0.2 * Math.PI, 1.8 * Math.PI, false);
        }
        cxt.lineTo(now_x-2*now_r, now_y);
        cxt.closePath();
        cxt.fill();

        cxt.beginPath();
        if(cnt%2==0){
            cxt.arc(now_x+2*now_r, now_y, now_r, 1.01 * Math.PI, 0.99 * Math.PI, false);
        }else{
            cxt.arc(now_x+2*now_r, now_y, now_r, 1.2 * Math.PI, 0.8 * Math.PI, false);
        }
        cxt.lineTo(now_x+2*now_r, now_y);
        cxt.closePath();
        cxt.fill();

        // draw eyes
        cxt.fillStyle="#000";
        cxt.beginPath();
        cxt.arc(now_x-2*now_r+eye_x,now_y-eye_y,eye_r,2*Math.PI,false);
        cxt.arc(now_x+2*now_r-eye_x,now_y-eye_y,eye_r,0,2*Math.PI,false);
        cxt.closePath();
        cxt.fill();

        // copyright info
        cxt.font = '18px Helvetica';
        cxt.textAlign = 'right';
        cxt.textBaseline = 'bottom';
        cxt.fillStyle = '#000';
        cxt.fillText("© haihongS",x_max-20,y_max-20);

        cnt %= 2;
    }
}

function getX(x){
	return x*mapBigger+mapXmove;
}

function getY(y){
	return y*1.1*mapBigger+mapYmove;
}

function drawTable() {

    clearTable();

    var row=mapp.length,col=mapp[0].length;

    var table=document.getElementById("mycanvas");
    var cxt=table.getContext("2d");

    // draw map points
    for(var i=0;i<row;i++){
        for(var j=0;j<col;j++){
            if(mapp[i][j]==1) {
                cxt.fillStyle="#555";
                cxt.beginPath();
				cxt.arc(getY(j),getX(i),mapWall,0*Math.PI,2*Math.PI,false);
                cxt.closePath();
                cxt.fill();
            }else if(mapp[i][j]==0){
                cxt.fillStyle="#FFF";
                cxt.beginPath();
				cxt.arc(getY(j),getX(i),0.2*mapWall,0*Math.PI,2*Math.PI,false);
                cxt.closePath();
                cxt.fill();
            }
        }
    }

    cxt.lineWidth=8;
    cxt.beginPath();
    cxt.moveTo(getY(12),getX(12));
    cxt.lineTo(getY(15),getX(12));
    cxt.strokeStyle="#555"
    cxt.stroke();

	// draw player point
    cxt.fillStyle="#FFE600";

	cxt.beginPath();
	cxt.arc(getY(posY),getX(posX),0.8*mapWall,0*Math.PI,2*Math.PI,false);
	cxt.closePath();
	cxt.fill();

	//draw monster point
	for(var i=0;i<4;i++){
		cxt.fillStyle=monColor[i];
		cxt.beginPath();
		cxt.arc(getY(monPosY[i]),getX(monPosX[i]),0.8*mapWall,0*Math.PI,2*Math.PI,false);
		cxt.closePath();
		cxt.fill();
	}

	// draw score
    (function () {
        var x=690,y=200;
        cxt.font = 'bold 35px Helvetica';
        cxt.textAlign = 'left';
        cxt.textBaseline = 'bottom';
        cxt.fillStyle = '#FFE600';
        cxt.fillText('SCORE',x,y);
        cxt.font = '35px Helvetica';
        cxt.textAlign = 'left';
        cxt.textBaseline = 'top';
        cxt.fillStyle = '#FFF';
        cxt.fillText(score,x+50,y);
    })();


    //draw time
    (function () {
        var myDate=new Date();

        var x=870,y=530;
        cxt.font = 'bold 18px 微软雅黑';
        cxt.textAlign = 'right';
        cxt.textBaseline = 'bottom';
        cxt.fillStyle = '#333';
        cxt.fillText('现在是:'+myDate.getFullYear()+'年'+myDate.getMonth()+'月'+ myDate.getDate()+'日',x,y);
        cxt.textBaseline='top';
        cxt.fillText(myDate.getHours()+'点'+myDate.getMinutes()+'分',x,y);

        cxt.fillText('祝你玩得开心',x,y+30);

    })();

}

function drawWin() {

    clearTable();

    var x=250,y=340;

    var table=document.getElementById("mycanvas");
    var cxt=table.getContext("2d");
    cxt.font = 'bold 100px Helvetica';
    cxt.textAlign='left';
    cxt.textBaseline='bottom';
    cxt.fillStyle='#444';
    cxt.fillText('You Win!',x-10,y);

}

function drawLose() {

    clearTable();

    var x=280,y=260;

    var table=document.getElementById("mycanvas");
    var cxt=table.getContext("2d");
    cxt.font = '50px 微软雅黑';
    cxt.textAlign='left';
    cxt.textBaseline='bottom';
    cxt.fillStyle='#444';
    cxt.fillText('Sorry, 你失败了.',x-10,y);
    cxt.textBaseline='top';
    cxt.fillText('按F5重新开始游戏',x-35,y+20);

}

function judgeEnd() {
    for(var i=0;i<4;i++){
        if(monPosX[i]==posX && monPosY[i]==posY){
            process++;
        }else {
            if(monDir[i]==0){
                if(posDir==2 && posY==monPosY[i] && monPosX[i]+1==posX){
                    process++;
                }
            }else if(monDir[i]==2){
                if(posDir==0 && posY==monPosY[i] && monPosX[i]-1==posX){
                    process++;
                }
            }else if(monDir[i]==1){
                if(posDir==3 && posX==monPosX[i] && monPosY[i]+1==posY){
                    process++;
                }
            }else if(monDir[i]==3){
                if(posDir==1 && posX==monPosX && monPosY[i]-1==posY){
                    process++;
                }
            }
        }
    }
}

function perMove(){

    // move player point
    lastPosX=posX,lastPosY=posY;
    (function () {
        var nx=posX+dx[posDir],ny=posY+dy[posDir];
        if(ny<0 && posDir==1){
            posY=mapp[0].length-1;
        }else if(ny==28 && posDir==3) {
            posY = 0;
        }else{
            if(mapp[nx][ny]!=1 && mapp[nx][ny]!=2){
                posX=nx,posY=ny;
            }
        }
    })();

    if(mapp[posX][posY]==0){
        score++;
    }
    mapp[posX][posY]=-1;
    //console.log(point);

    // move monster point
    for(var i=0;i<4;i++){
        var nx=monPosX[i]+dx[monDir[i]];
        var ny=monPosY[i]+dy[monDir[i]];
        var nd=Math.random();
        if(0<=nx && nx<mapp[0].length && 0<=ny && ny<mapp[0].length && mapp[nx][ny]!=1 && nd<=0.8) {
            monPosX[i] = nx;
            monPosY[i] = ny;
        }else{
            nd=Math.ceil(nd*100)%4;
            var flag=0;
            while(flag==0){
                nx=monPosX[i]+dx[nd];
                ny=monPosY[i]+dy[nd];

                if(ny<0 && nd==1){
                    ny=mapp[0].length-1;
                }else if(ny==28 && nd==3) {
                    ny = 0;
                }else if(mapp[nx][ny]!=1) {

                }else{
                    nd=(nd+1)%4;
                    continue;
                }
                flag=1;
                monPosX[i]=nx;
                monPosY[i]=ny;
                monDir[i]=nd;
            }
        }
    }

    judgeEnd();

    if(process==2){
        window.clearInterval(move_loop);
        drawLose();
        return ;
    }

    if(score==300){
        process++;
        window.clearInterval(move_loop);
        drawWin();
        return ;
    }

    drawTable();

}

function tryChangeDir(x) {
    var last = posDir;
    posDir = x;
    var nx = posX + dx[posDir], ny = posY + dy[posDir];
    if( (ny < 0 && posDir == 1) || (ny == 28 && posDir == 3) || (mapp[nx][ny] != 1 && mapp[nx][ny] != 2)){

    }else{
        posDir=last;
    }
}





