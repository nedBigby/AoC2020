var fs = require("fs");
var input = [];


//defining the read input file function
function read(file, cb) {
    var readInput = []; 
    fs.readFile(file, 'utf8', function(err, data) {
        if (!err) {
            readInput = cb(data.toString().split('\n'))
        } else {
            console.log(err)
        }
    });

}

//obtain input array from text file and run solution
read(__dirname+'/input.txt', function(data) {
    var input = [];
    var row = [];
    var i = 0;
    for(var item in data){
        if(data[item] !== '\r'){
            row.push(data[item])
            if(item == 958)
                input.push(row);
        }else{
            input.push(row);
            row = [];
        }
    }

    input = parse(input)
    var s = solve(input)
    var s2 = solve2(input)
    console.log('p1 sol:',s)
    console.log('p2 sol:',s2)

    return input;
});

//Day 4: Passports
//Solution O(n^2) could improve vastly if I knew the tools better
function parse(input){
    for(var i = 0; i < input.length ; i++){
        input[i] = input[i].join(' ') 
        input[i] = input[i].replace(/\r/g,'') 
        input[i] = input[i].split(' ')
        for(var j = 0; j < input[i].length; j++){
            input[i][j] = input[i][j].split(':')
        }
    }
    return input 
}

function solve(a){
    var c = 0
    for(var i = 0; i < a.length - 1; i++){
        var valid = checkPass(a[i])    
        if(valid)
            c++
    }
    return c
}

function solve2(a){
    var c = 0
    for(var i = 0; i < a.length; i++){
        var valid = checkPass2(a[i])
        if(valid)
            c++
    }
    return c
}
function checkPass(p){
    var vcount = 0
    for(var i=0; i<p.length; i++){
        if(p[i][0]==='byr' 
            || p[i][0]==='iyr' 
            || p[i][0]==='eyr' 
            || p[i][0]==='hgt' 
            || p[i][0]==='hcl' 
            || p[i][0]==='ecl' 
            || p[i][0]==='pid')
            vcount++
    }
    if(vcount >= 7)
        return true
}

//Part 2 Solution
function checkPass2(p){
    var vcount = 0
    for(var i=0; i<p.length; i++){
        if((p[i][0]==='byr' && p[i][1]>=1920 && p[i][1]<=2002) 
            || (p[i][0]==='iyr' && p[i][1]>=2010 && p[i][1]<=2020) 
            || (p[i][0]==='eyr' && p[i][1]>=2020 && p[i][1]<=2030) 
            || p[i][0]==='hgt' && p[i][1].includes('cm') && parseInt(p[i][1],10)>=150 && parseInt(p[i][1],10)<=193 
            || p[i][0]==='hgt' && p[i][1].includes('in') && parseInt(p[i][1],10)>=59 && parseInt(p[i][1],10)<=76
            || (p[i][0]==='hcl' && p[i][1].match(/^#([a-fA-F0-9]{6})$/g)) 
            || p[i][0]==='ecl' && 
                (p[i][1]==='amb' || p[i][1]==='blu' || p[i][1]==='brn' || p[i][1]==='gry' || p[i][1]==='grn'
                   || p[i][1]==='hzl' || p[i][1]==='oth') 
            || p[i][0]==='pid' && (p[i][1].match(/([0-9]{9})$/g)))
            vcount++
    }
    if(vcount >= 7)
        return true
}












