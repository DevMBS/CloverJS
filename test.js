//library import
const clover = require("./clover");
//arm and navigate to 1.5m up
clover.navigate(0, 0, 1.5, 0, 0, 0.5, 'body', true);
clover.sleep(10);
//set effect for led strip
clover.led('rainbow');
//get qr data
clover.get_qr();
//display it
console.log(`QR data: ${clover.qr()}`);
//get color data
clover.get_color();
//display it
console.log(`Color data: ${clover.color()}`);
//get telemetry from the drone
clover.get_telemetry();
//display it
console.log(`Telemetry data: ${clover.telemetry()}`);
//get data from the rangefinder
clover.get_range();
//display it
console.log(`Range data: ${clover.range()}`);
//land
clover.land();
