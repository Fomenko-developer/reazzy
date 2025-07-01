import fs from "node:fs/promises";
import path from "node:path";

export default function TemplateTransform() {
    return {
        name: "vite-angular-template-transform",
        enforce: "pre" as const,
        async transform(code: string, id: string) {
            if (!id.endsWith(".ts")) return null;

            const templateUrlRegex = /templateUrl\s*:\s*["'`](.*?)["'`]/g;
            const styleUrlRegex = /styleUrl\s*:\s*["'`](.*?)["'`]/g;

            let newCode = code;

            for (const match of code.matchAll(templateUrlRegex)) {
                const url = match[1];
                const absPath = path.resolve(path.dirname(id), url);
                const file = await fs.readFile(absPath, "utf-8");
                const escaped = file.replace(/`/g, "\\`");
                newCode = newCode.replace(match[0], `template: \`${escaped}\``);
            }

            for (const match of code.matchAll(styleUrlRegex)) {
                const url = match[1];
                const absPath = path.resolve(path.dirname(id), url);
                const file = await fs.readFile(absPath, "utf-8");
                const escaped = file.replace(/`/g, "\\`");
                newCode = newCode.replace(match[0], `style: \`${escaped}\``);
            }

            return {
                code: newCode,
                map: null,
            };
        },
    };
}
