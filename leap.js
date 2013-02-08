var socket = new WebSocket("ws://localhost:6437/");
var oldPositions = {};
socket.onmessage = function(event) {
    var leapData = JSON.parse(event.data);
    if(!leapData.pointables) return;
    
    document.getElementById("keys").innerHTML = "";
    leapData.pointables.sort(function(a, b) {
        if(parseFloat(a.tipPosition[0]) < parseFloat(b.tipPosition[0])) return -1;
        else return 1;
    });
    for(var i=0, len=leapData.pointables.length; i < len; i++) {
        document.getElementById("keys").innerHTML += "<li>" 
            + leapData.pointables[i].id + " at " + Math.round(leapData.pointables[i].tipPosition[0]) 
            + " (" + Math.round(parseFloat(leapData.pointables[i].tipPosition[1]) - (oldPositions[leapData.pointables[i].id] || 0)) + ")"
            + "</li>";
        if(oldPositions[leapData.pointables[i].id] &&
           parseFloat(leapData.pointables[i].tipPosition[1]) - oldPositions[leapData.pointables[i].id] < -3) {
            //"Y U NO USE tipVelocity??" "Because it's hyper inaccurate and sometimes triggers for no reason."
            document.getElementById("key" + i).style.background = "red";
            playKey(keys[i]);
        } else {
            document.getElementById("key" + i).style.background = "#ccc";        
        }
        oldPositions[leapData.pointables[i].id] = parseFloat(leapData.pointables[i].tipPosition[1]);
    }
    if(leapData.pointables.length < 8) {
        for(var i=leapData.pointables.length; i < 8; i++) {
            document.getElementById("key" + i).style.background = "#ccc";
        }
    }
};
