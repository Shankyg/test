const methods = require('./main');


describe(" test suite 1", ()=>{
    
test("create function",()=>{
    const spy = jest.spyOn(console,'log');
    methods.create(6);
    expect(spy).toHaveBeenCalledWith("Created parking lot with 6 slots");
});
test("park function",()=>{
    const spy = jest.spyOn(console,'log');
    methods.park("KA-01-HH-1234");
    expect(spy).toHaveBeenCalledWith("Allocated slot number: 1");
});
test("leave function",()=>{
    const spy = jest.spyOn(console,'log');
    methods.leave("KA-01-HH-1234",4);
    expect(spy).toHaveBeenCalledWith("Registration Number KA-01-HH-1234 from Slot 1 has left with Charge 30");
});
test("status function",()=>{
    const spy = jest.spyOn(console,'log');
    methods.status();
    expect(spy).toHaveBeenLastCalledWith("Slot No.   Registration No.");
});
});
