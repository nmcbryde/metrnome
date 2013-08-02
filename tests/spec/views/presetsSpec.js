describe('A Preset View', function() {
    var model, view
    it('should be initialised', function() {
        
        model = new window.app.Preset({
            title: 'Preset Name',
            bpm: 15
        })
      
        view = new window.app.PresetView({
            model: model
        })
      
        expect(view).toBeTruthy()
    })
    
    it('should be able to be rendered', function() {
        var renderOutput = view.render().el
        
        expect( $('div.view', renderOutput).length ).toBe(1)
        expect( $('button', renderOutput).attr('class')).toBe('destroy icon-trash')

        $('button', renderOutput).remove()
        expect( $('div.view', renderOutput).html() ).toEqual('Preset Name : 15 bpm')
    })
})