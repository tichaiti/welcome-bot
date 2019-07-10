const { greeting } = require('../src/messenger');

describe('mesenger', () => {
  describe('greeting()', () => {
    describe('should add a greeting', () => {
      test('to empty message', () => {
        const msg = greeting(1234);
        expect(msg.length).toBe(1);
      });
    
      test('at the beginning of an existing message', () => {
        const msg = greeting(1234, [{type: 'test', message: 'test message'}])
        const name = msg[0].text.text.match(/(<@)\w+>/g).pop();
        const testmsg = msg[1].message.includes('test');

        console.log
        expect(name).toBeTruthy();
        expect(testmsg).toBe(true);
      });
    })
  
    describe('should ommit greeting', () => {
      test('when a user id is missing or falsy', () => {
        const msg = greeting(0, []);
        const msg1 = greeting('', []);
        const msg2 = greeting(null, []);
        const msg3 = greeting(undefined, []);
  
        expect(msg.length).toBe(0);
        expect(msg1.length).toBe(0);
        expect(msg2.length).toBe(0);
        expect(msg3.length).toBe(0);
      });
    });

    describe('should format', () => {
      test('should properly format @user mention', () => {
        const id = `1234EF`; 
        const msg = greeting(id, []);
        const name = msg[0].text.text.match(/(<@)\w+>/g).pop();
  
        expect(name).toBe('<@1234EF>');
      });
  
      test('should correct user ID and format @user mention', () => {
        const id = `1234ef`; 
        const msg = greeting(id, []);
        const name = msg[0].text.text.match(/(<@)\w+>/g).pop();
  
        expect(name).toBe('<@1234EF>');
      });
    })
  })
});