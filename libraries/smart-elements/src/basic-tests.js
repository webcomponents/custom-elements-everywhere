var describe,
    it,
    expect,
    document,
    beforeAll,
    afterAll;

import "./components/testelement.js";
	
describe('Testing simple custom element built with smart-elements: ', function () {
    it(' if it is correctly registered on the page', function () {
        const testElement = document.createElement('smart-greeting');
        document.body.appendChild(testElement);

        expect(testElement).toBeInDOM();
        expect(testElement instanceof JQX.SmartGreeting).toBe(true);

        document.body.removeChild(testElement);
        expect(testElement).not.toBeInDOM();
    });

    it(' if "name" property is correctly applied', function () {
        const testElement = document.createElement('smart-greeting');
        document.body.appendChild(testElement);

        expect(testElement).toBeInDOM();
        expect(testElement.innerText).toBe('Hello, World!');
        expect(testElement.name).toBe('World!');

        testElement.name = 'Earth!';
        expect(testElement.innerText).toBe('Hello, Earth!');
        expect(testElement.name).toBe('Earth!');
        expect(testElement).toHaveAttr('name', 'Earth!');

        document.body.removeChild(testElement);
        expect(testElement).not.toBeInDOM();
    });
});
