describe('A Metronome View', function() {
    var model, view
    it("can be defined", function() {
        view = new window.app.MetronomeView()
        
        expect(view).toBeTruthy()
    })
    
    describe('has', function() {
        it('an on button', function() {
            expect( $('button.start', view.el).length ).toBe(1)
        })
        
        it('an off button', function() {
            expect( $('button.stop', view.el).length ).toBe(1)
        })
        
        it('a slider', function() {
            expect( $('#slider', view.el).length ).toBe(1)
        })
        
        describe('a new preset form', function() {
            var form
            it('thats can be referenced', function() {
                form = $('.preset-form', view.el)
                expect( form.length ).toBe(1)
            })
            
            it('that has a button', function() {
                expect( $('button', form).length ).toBe(1)
                expect( $('button', form).attr('id') ).toBe('new-preset')
            })
        })
    })
    
    it('is off by default', function() {
        expect(view.model.get('timer')).toBe(null)
    })
    
    it('can be turned on', function() {
        view.model.start()
        expect(view.model.get('timer')).not.toBe(null)
    })
    
    it('can be turned off', function() {
        view.model.stop()
        expect(view.model.get('timer')).toBe(null)
    })
})