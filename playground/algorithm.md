var master = []; 
var slave = []; 

for (let i = 0, len = 50; i < len; i++) {
    slave.push(0); 
}
for (let i = 0, len = 50; i < len; i++) {
    master.push(slave); 
}
 


console.log(master); 

    // var utils = {
    //     master: [],
    //     slave: [],

    //     getInitialArray: function () {
    //         for (let i = 0, len = 50; i < len; i++) {
    //         slave.push(0); 
    //         }
    //         for (let i = 0, len = 50; i < len; i++) {
    //             master.push(slave); 
    //         }   
    //         console.log(master); 
    //     }
    // };
