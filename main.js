const fs = require('fs');
const readline = require('readline');

const operation = ['create','park','leave','status'];
let empty= [];
let lot = [];

let methods = {};

methods.create = function(size){
    for(let i = 0;i<size;i++){
        lot.push(0);
        empty.push(i);
    }
    console.log(`Created parking lot with ${size} slots`);
}

 methods.park = function(carNumber){
    if(empty.length==0){
        console.log('Sorry, parking lot is full');
    }
    else if(!lot.includes(carNumber)){
        lot[empty[0]]=carNumber;
        console.log(`Allocated slot number: ${empty[0]+1}`);
        empty.shift();
    }
    else{
        console.log('duplicate entry');
    }

}

 methods.leave = function(carNumber, hours){
    if(lot.includes(carNumber)){
        let charge = calculate(hours);
        let index = lot.indexOf(carNumber);
        lot[index]=0;
        empty.push(index);
        empty.sort();
        console.log(`Registration Number ${carNumber} from Slot ${index+1} has left with Charge ${charge}`)
    }
    else{
        console.log(`Registration Number ${carNumber} not found`);
    }
}

methods.status = function(){
    console.log('Slot No.   Registration No.');
    for(let i =0;i<lot.length;i++){
        if(lot[i]!=0){
            console.log(`${i+1}          ${lot[i]}`)
        }
    }
}

function calculate(hours){
    if(hours>2){
        return 10+(hours-2)*10;
    }
    else{
        return 10;
    }
}



if (require.main === module) {
    
const read_stream = fs.createReadStream(process.argv[2]);
const rl = readline.createInterface({
    input: read_stream
});
rl.on('line', function(line){        
        let commands = line.split();
        for(let command of commands){
            let str = command.split(' ');
            switch(str[0]){
                case operation[0]:
                    methods.create(str[1]);
                    break;
                case operation[1]:
                    methods.park(str[1]);
                    break;
                case operation[2]:
                    methods.leave(str[1],str[2]);
                    break;
                case operation[3]:
                    methods.status();
                    break;
                default:
                    console.log('Invalid operation');
            }
        }
    }
).on('end', function(){
    rl.close();
    console.log(edges);
})

} 
module.exports=methods