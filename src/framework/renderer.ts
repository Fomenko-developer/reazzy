import { getRegisteredComponents } from "./registry";

export function bootstrap() {
    const components = getRegisteredComponents();

    for (const comp of components) {
        const elements = document.querySelectorAll(comp.selector);
        if (elements.length === 0) continue;

        const instance = new comp.class();

        // Read properties from object and place to html
        const rendered = comp.template.replace(/\{\{(.*?)\}\}/g, (_, key) => {
            const prop = key.trim();
            return instance[prop] ?? "";
        });

        // Add styles
        if (comp.style) {
            const style = document.createElement("style");
            style.textContent = comp.style;
            document.head.appendChild(style);
        }

        // Add to DOM
        elements.forEach((el) => {
            el.innerHTML = rendered;

            // Append all events
            el.querySelectorAll("*").forEach((child) => {
                Array.from(child.attributes).forEach((attr) => {
                    if (attr.name.startsWith("(") && attr.name.endsWith(")")) {
                        const eventName = attr.name.slice(1, -1);
                        const handlerName = attr.value;
                        if (typeof instance[handlerName] === "function") {
                            child.addEventListener(eventName, () =>
                                instance[handlerName]()
                            );
                        }
                    }
                });
            });
        });
    }
}
