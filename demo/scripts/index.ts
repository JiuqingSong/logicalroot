import { ComponentsEditor } from "./ComponentsEditor";
import { ComponentPlugin } from "./ComponentsPlugin";
import { addComponent } from "./addComponent";

function start() {
    const editor = new ComponentsEditor(document.getElementById("mainPane") as HTMLDivElement, {
        plugins: [
            new ComponentPlugin()
        ]   
    });

    document.getElementById("addComponent").addEventListener("click", () => {
        editor.setLogicalRoot(null);
        addComponent(editor);
    });
}

start();