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
    run(`rosservice call /navigate "{x: ${(x).toFixed(1)}, y: ${(y).toFixed(1)}, z: ${(z).toFixed(1)}, yaw: ${(yaw).toFixed(1)}, yaw_rate: ${(yaw_rate).toFixed(1)}, speed: ${(speed).toFixed(1)}, frame_id: '${frame_id}', auto_arm: ${auto_arm}}"`);
}
const land = function(){
    run(`rosservice call /land "{}"`);
}
const get_range = function(){
   run('python ./helpers/range.py');
}
const range = function(){
    return fs.readFileSync('./helpers/rdata.txt');
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
   run('python ./helpers/color.py');
}
const color = function(){
    return fs.readFileSync('./helpers/cdata.txt');
}
const get_qr = function(){
    run('python ./helpers/qr.py');
}
const qr = function(){
    return fs.readFileSync('./helpers/qdata.txt');
}
const get_telemetry = function(){
    exec(`rosservice call /get_telemetry "{frame_id: ''}"`, (error, stdout, stderr) => {
        if (error) {
            return;
        }
        if (stderr) {
            return;
        }
        fs.writeFile('./helpers/tdata.txt', stdout, function(error){if(error) throw error;});
    });
}
const telemetry = function(){
    return fs.readFileSync('./helpers/tdata.txt');
}
const navigate_global = function(lat, lon, z, yaw, yaw_rate, speed, frame_id, auto_arm){
    run(`rosservice call /navigate_global "{lat: ${lat}, lon: ${lon}, z: ${(z).toFixed(1)}, yaw: ${(yaw).toFixed(1)}, yaw_rate: ${(yaw_rate).toFixed(1)}, speed: ${(speed).toFixed(1)}, frame_id: '${frame_id}', auto_arm: ${auto_arm}}"`);
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
    sleep: sleep,
    navigate_global: navigate_global
}
