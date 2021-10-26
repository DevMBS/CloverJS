# CloverJS
## This library allows you to program autonomous flight for the COEX Clover quadcopter in JavaScript language and you can perform almost all the tasks described in the <a href = 'https://clover.coex.tech'>Clover's documentation</a> with alternative commands in the JS.
### Pros:
#### The library has built-in color and QR code recognition with one command. 
#### You can easily create user interfaces for your programs and use unique JS libraries. 
#### The amount of code written in JS with my library for the most common tasks is significantly less compared to the amount of code in Python written for the same task
<hr/>


## How to use:
### 1. Installation:<br/>
  #### 1.1 Download this repository to Clover's RaspberryPI, unzip and open folder CloverJS, then open console<br/>
  #### 1.2 Check if NodeJS is installed (type <code>npm -v</code> in your console, output should be like <code>6.4.1</code>)<br/>
  #### 1.3 Type <code>npm install child_process fs</code><br/>
  #### 1.4 Type <code>pip install pyzbar</code><br/>
### 2. Syntax:<br/>
  #### 2.1 Library import:<br/>
    const clover = require('./clover');
  #### 2.2 Navigate:<br/>
    //Ascending to the altitude of 1.5 m with the climb rate of 0.5 m/s:
    clover.navigate(x=0.0, y=0.0, z=1.5, yaw=0.0, yaw_rate=0.0, speed=0.5, frame_id='body', auto_arm=true);
    
    //Also you can write like this:
    clover.navigate(0, 0, 1.5, 0, 0, 0.5, 'body', true);
  #### 2.3 Setting the time to perform an action:<br/>
    clover.sleep(2); //2 seconds
  #### 2.4 LED Strip control:<br/>
    clover.led(effect = 'fill', r = 255, g = 0, b = 0) //or clover.led('fill', 255); - fill strip with red color
    //Rainbow effect:
    clover.led(effect = 'rainbow'); //or clover.led('rainbow');
  #### 2.5 Get telemetry and display it in console:<br/>
    clover.get_telemetry();
    console.log(clover.telemetry());
  #### 2.6 Get data from the rangefinder:
    clover.get_range();
    console.log(clover.range());
  #### 2.7 Get data from the QR code:
    clover.get_qr();
    console.log(clover.qr());
  #### 2.8 Determine the color:
    clover.get_color();
    console.log(clover.color());
  #### 2.9 Landing:
    clover.land();
### Code example - test.js
