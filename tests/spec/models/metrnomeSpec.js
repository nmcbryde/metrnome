describe('A Metrnome Model', function() {
    var model
    
    it('should be able to create its application test objects', function() {
        
        model = new window.app.Metronome()
        expect(model).toBeTruthy()
    })
})