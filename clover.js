const { exec } = require("child_process");
const fs = require("fs");
const sleep = function(s){
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < s*1000);
}
function run(data){
    exec(data, (error, stdout, stderr) => {
        if (error) {
            return;
        }
        if (stderr) {
            return;
        }
    });
}
const navigate = function(x=0, y=0, z=0, yaw = 0, yaw_rate = 0, speed=0.5, frame_id="body", auto_arm = false){
    run(`rosservice call /navigate "{x: ${(x).toFixed(1)}, y: ${(y).toFixed(1)}, z: ${(z).toFixed(1)}, yaw: ${(yaw).toFixed(1)}, yaw_rate: ${(yaw_rate).toFixed(1)}, speed: ${(speed).toFixed(1)}, frame_id: '${frame_id}', auto_arm: ${auto_arm}}"`)
}
const land = function(){
    run(`rosservice call /land "{}"`)
}
const get_range = function(){
    exec("python ./range.py", (error, stdout, stderr) => {
        if (error) {
            return;
        }
        if (stderr) {
            return;
        }
    });
}
const range = function(){
    return fs.readFileSync('rdata.txt')
}
const led = function(effect = '', r = 0, g = 0, b = 0){
    if (effect == 'rainbow'){
        run(`rosservice call /led/set_effect "{effect: 'rainbow'}"`);
    }
    else{
        run(`rosservice call /led/set_effect "{effect: '${effect}', r: ${r}, g: ${g}, b: ${b}}"`);
    }
}
const get_color = function(){
    exec("python ./color.py", (error, stdout, stderr) => {
        if (error) {
            return;
        }
        if (stderr) {
            return;
        }
    });
}
const color = function(){
    let color =  fs.readFileSync('cdata.txt');
    if(color == 'r'){
        color = 'red';
    }
    else if(color == 'g'){
        color = 'green';
    }
    else if(color == 'b'){
        color = 'blue';
    }
    else if(color == 'y'){
        color = 'yellow';
    }
    else if(color == 'o'){
        color = 'orange';
    }
    else if(color == 'c'){
        color = 'cyan';
    }
    else if(color == 'v'){
        color = 'violet';
    }
    return color
}
const get_qr = function(){
    exec("python ./qr.py", (error, stdout, stderr) => {
        if (error) {
            return;
        }
        if (stderr) {
            return;
        }
    });
}
const qr = function(){
    return fs.readFileSync('qdata.txt')
}
const get_telemetry = function(){
    exec(`rosservice call /get_telemetry "{frame_id: ''}"`, (error, stdout, stderr) => {
        if (error) {
            return;
        }
        if (stderr) {
            return;
        }
        fs.writeFile('tdata.txt', stdout, function(error){if(error) throw error;});
    });
}
const telemetry = function(){
    return fs.readFileSync('tdata.txt')
}


module.exports = {
    navigate: navigate,
    land: land,
    get_range: get_range,
    range: range,
    led: led,
    get_color: get_color,
    color: color,
    get_qr: get_qr,
    qr: qr,
    get_telemetry: get_telemetry,
    telemetry: telemetry,
    sleep: sleep
}