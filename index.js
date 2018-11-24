var usb = require('usb');
var async = require('async');
var Promise = require('promise');

var devList = usb.getDeviceList();

async.eachOfSeries(devList, function (element, key, callback) {
        openConn(element)
        .then(res => getDeviceData(res), err => myerror(err))
        .then(res => finalfunc(res), err => myerror(err));
        callback();
    }, function (err) {
        if (err) { console.log(err) ; }
    }
);

function finalfunc(res){
    return new Promise(function (fulfill, reject){
        try{
            fulfill(res);
        }catch(err){
            console.log(err);
            reject(err);
        }
    })
}

function openConn(element){
    return new Promise(function (fulfill, reject){
        try{
            var res = {};
            element.open();
            res.open = true;
            res.element = element;
            fulfill(res);
        }catch(err){
            console.log(err);
            reject(err);
        }
    }); 
}

function getDeviceData(res){
    return new Promise(function (fulfill, reject){
        try{
            if (res.open) {
                logDetails(res);
            }
            fulfill(res);
        }catch (err){
            console.log(err);
            reject(err);
        }
    })
}

function logDetails(res){
    return new Promise(function (fulfill, reject){
        try{
            var myElement = res.element;
            var myElDeviceAdd = myElement.deviceAddress;
            var myElProduct = myElement.deviceDescriptor.iProduct;
            if(myElProduct>0){
                myElement.getStringDescriptor(myElProduct, function(e,s){
                    if(e){
                        console.log('error...');
                        console.log(e);
                    }else{
                        console.log('id: ' + myElDeviceAdd + '; Product: ' + s + ';');
                    }
                    myElement.close();
                })
            }else{
                myElement.close();
            }
            
            fulfill(res);
        }catch(err){
            console.log(err);
            reject(err);
        } 
    })
};

function myerror(err){
    console.log(err);
}