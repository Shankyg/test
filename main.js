const fs = require('fs');
const readline = require('readline');

const operation = ['create','park','leave','status'];
let empty= [];
let lot = [];
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
                    create(str[1]);
                    break;
                case operation[1]:
                    park(str[1]);
                    break;
                case operation[2]:
                    leave(str[1],str[2]);
                    break;
                case operation[3]:
                    status();
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


function create(size){
    for(let i = 0;i<size;i++){
        lot.push(0);
        empty.push(i);
    }
    console.log(`Created parking lot with ${size} slots`);
}

function park(carNumber){
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

function leave(carNumber, hours){
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

function status(){
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