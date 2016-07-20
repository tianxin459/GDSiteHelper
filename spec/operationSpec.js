
describe('add-on testing', () => {

    beforeEach(() => {
        foo = {
            f1: fun1
        }
        spyOn(foo, 'f1').and.returnValue({ abc: 66 });
        /*foo.f1('ab');*/
        fun1 = jasmine.createSpy('fun1 should be call').and.callFake(()=>{console.log('fun1 has been call');});
        fun1('ddd2');
    });

    it('test fun1', () => {
        init = jasmine.createSpy('init should be call');
        expect(foo.f1()).toEqual({ abc: 66 });
        expect(foo.f1).toHaveBeenCalled();

        expect(fun1).toHaveBeenCalled();

    });
});
