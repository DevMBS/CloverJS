const clover = require("./clover");
clover.navigate(0, 0, 1.5, 0, 0, 0.5, 'body', true);
clover.sleep(10);
clover.led('rainbow');
clover.get_qr();
console.log(`QR data: ${clover.qr()}`)
clover.get_color();
console.log(`Color data: ${clover.color()}`)
clover.get_telemetry();
console.log(`Telemetry data: ${clover.telemetry()}`)
clover.get_range();
console.log(`Range data: ${clover.range()}`)
clover.land();