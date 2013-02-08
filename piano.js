function addKey(i) {
    var dataURI = Notes.getDataURI(i);
    var sound = new Audio(dataURI);
    
    return {sound: sound, currentIndex: 0};
}


function playKey(key) {
    if(!key.sound.paused) {
        return;
    }
    
    key.sound.pause();
    try {
        key.sound.currentTime = 0.001; //HACK - was for mobile safari, but sort of doesn't matter...
    } catch (x) {
        console.log(x);
    }
    key.sound.play();
}
    
var keys = [];
for(var i=0, len=8; i<len;i++) keys.push(addKey(i));