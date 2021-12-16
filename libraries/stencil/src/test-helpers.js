// Substitute for updateComplete
export async function waitForRender(element) {
    return new Promise((resolve) => {
        let didRender = element.componentDidRender;
        element.componentDidRender = function (...args) {
            element.componentDidRender = didRender;
            element.componentDidRender?.(...args);
            resolve();
        };
    });
}