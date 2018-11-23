var usb = require('usb');
var async = require('async');
var devList = usb.getDeviceList();

async.eachOfSeries(devList, function (element, key, callback) {
        element.open();
        element.getStringDescriptor(element.deviceDescriptor.iProduct, function(e,s){
            if(e){
                console.log('Error...');
                console.log(e);
            }else{
                console.log('id: ' + element.deviceAddress + '; Product: ' + s + ';');
            }
        });
        callback();
    }, function (err) {
        if (err) { console.log(err) ; }
        console.log('Well done :-)!');
    }
);


