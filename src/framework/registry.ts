type ComponentMeta = {
    selector: string;
    template: string;
    style: string;
    class: new (...args: any[]) => any;
};

const registry: ComponentMeta[] = [];

export function registerComponent(meta: ComponentMeta) {
    registry.push(meta);
}

export function getRegisteredComponents() {
    return registry;
}
