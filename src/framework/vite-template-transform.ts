import fs from "fs/promises";
import path from "path";
import { Plugin } from "vite";

export default function TemplateTransform(): Plugin {
    return {
        name: "vite-angular-template-transform",
        enforce: "pre",

        async transform(code, id) {
            if (!id.endsWith(".ts")) return null;

            console.log("==== VITE PLUGIN TRANSFORM ====");
            console.log("Processing ID:", id);

            const templateUrlRegex = /templateUrl\s*:\s*["'`](.*?)["'`]/g;
            const styleUrlRegex = /styleUrl\s*:\s*["'`](.*?)["'`]/g;

            let newCode = code;

            // обработка templateUrl
            for (const match of code.matchAll(templateUrlRegex)) {
                const url = match[1];
                const absPath = path.resolve(path.dirname(id), url);
                console.log("Found templateUrl:", url);
                console.log("Resolved absolute path:", absPath);

                try {
                    const file = await fs.readFile(absPath, "utf-8");
                    console.log("Template file content read:", file);
                    const escaped = file.replace(/`/g, "\\`");
                    newCode = newCode.replace(
                        match[0],
                        `template: \`${escaped}\``
                    );
                } catch (e) {
                    console.error("Failed to read template file:", absPath, e);
                }
            }

            // обработка styleUrl
            for (const match of code.matchAll(styleUrlRegex)) {
                const url = match[1];
                const absPath = path.resolve(path.dirname(id), url);
                console.log("Found styleUrl:", url);
                console.log("Resolved absolute path:", absPath);

                try {
                    const file = await fs.readFile(absPath, "utf-8");
                    console.log("Style file content read:", file);
                    const escaped = file.replace(/`/g, "\\`");
                    newCode = newCode.replace(
                        match[0],
                        `style: \`${escaped}\``
                    );
                } catch (e) {
                    console.error("Failed to read style file:", absPath, e);
                }
            }

            return {
                code: newCode,
                map: null,
            };
        },
    };
}
