export function mount(component: () => HTMLElement, container: HTMLElement) {
    container.innerHTML = "";
    container.appendChild(component());
}

export function reactive<T>(initial: T) {
    let value = initial;
    const subscribers = new Set<() => void>();

    return {
        get value() {
            return value;
        },
        set value(newVal: T) {
            value = newVal;
            subscribers.forEach((fn) => fn());
        },
        subscribe(fn: () => void) {
            subscribers.add(fn);
        },
    };
}
