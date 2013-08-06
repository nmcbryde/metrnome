describe('A Preset Model', function() {
    var model
    
    it('can be defined', function() {
        model = new window.app.Preset()
        expect(model).toBeTruthy()
    })
    
    it('has default values', function() {
        expect(model.get('title')).toBe('')
        expect(model.get('bpm')).toBe(62)
    })
    
    it('can be created with new values', function() {
        model = new window.app.Preset({
            title: 'New Title',
            bpm: 61
        })
        expect(model.get('title')).toBe('New Title')
        expect(model.get('bpm')).toBe(61)
    })
    
    it('will allow you to change the bpm', function() {
        model.set('bpm', 66)
        expect(model.get('bpm')).toBe(66)
    })
    
    it('will not allow a negative bpm', function() {
        expect(model.set('bpm', -1)).toBeFalsy()
        expect(model.get('bpm')).toBe(66)
    })
    
    it('requires a valid title', function() {
        expect(model.set('title', null)).toBeFalsy()
    })
})