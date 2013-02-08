function addKey(i) {
    var dataURI = Notes.getDataURI(i);

    // trick to deal with note getting hit multiple times before finishing...
    var sounds = [
        new Audio(dataURI),
        new Audio(dataURI),
        new Audio(dataURI)
    ];
    
    return {sounds: sounds, currentIndex: 0};
}


function playKey(key) {
    var pressedTimeout;    
    // sound
    key.sounds[key.currentIndex].pause();
    try {
        key.sounds[key.currentIndex].currentTime = 0.001; //HACK - was for mobile safari, but sort of doesn't matter...
    } catch (x) {
        console.log(x);
    }
    key.sounds[key.currentIndex].play();
    key.currentIndex = ++key.currentIndex % key.sounds.length;
}
    
var keys = [];
for(var i=0, len=8; i<len;i++) keys.push(addKey(i));