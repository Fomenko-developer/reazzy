import { registerComponent } from "./registry.js";

export function Component(options: {
    selector: string;
    template?: string;
    style?: string;
    templateUrl?: string;
    styleUrl?: string;
}) {
    return function (target: any) {
        registerComponent({
            selector: options.selector,
            template: options.template ?? "",
            style: options.style ?? "",
            class: target,
        });
    };
}
