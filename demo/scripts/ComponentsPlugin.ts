import type { IEditor, EditorPlugin, PluginEvent, DOMSelection } from "roosterjs";
import { moveCurrentComponent, setCurrentComponent } from "./setCurrentComponent";

export class ComponentPlugin implements EditorPlugin {
    private editor: IEditor;

    constructor() {
    }

    initialize(editor: IEditor) {
        this.editor = editor;
    }

    dispose() {
        this.editor = null;
    }

    onPluginEvent(event: PluginEvent) {
        if (event.eventType == 'mouseDown') {
            const target = event.rawEvent.target as HTMLElement;
            const componentContainer = this.editor.getDOMHelper().findClosestElementAncestor(target, 'div[id^="Component_"]') as HTMLDivElement;

            if (componentContainer ) {
                if (setCurrentComponent(this.editor, componentContainer)) {
                    event.rawEvent.preventDefault();
                }
            } else {
                setCurrentComponent(this.editor, null);
            }
        } else if (event.eventType == 'keyDown') {
            const key = event.rawEvent.key;

            if (key == 'ArrowLeft' || key == 'ArrowUp' || key == 'ArrowRight' || key == 'ArrowDown') {
                const selection = this.editor.getDOMSelection();

                this.editor.getDocument().defaultView.requestAnimationFrame(() => {
                    if (this.editor && !this.editor.isDisposed()) {
                        const newSelection = this.editor.getDOMSelection();

                        if (areSameSelections(selection, newSelection)) {
                            moveCurrentComponent(this.editor, key == 'ArrowLeft' || key == 'ArrowUp' ? -1 : 1);
                        }
                    }
                })
                
            }
        }
    }

    getName() {
        return 'ComponentPlugin';
    }

}

function areSameSelections(s1: DOMSelection, s2: DOMSelection) {
    if (!s1 || !s2) {
        return false;
    }

    switch (s1.type) {
        case 'image':
            return s2.type == 'image' && s1.image == s2.image;

        case 'range':
            return s2.type == 'range' && s1.range.startContainer == s2.range.startContainer && s1.range.startOffset == s2.range.startOffset && s1.range.endContainer == s2.range.endContainer && s1.range.endOffset == s2.range.endOffset;

        case 'table':
            return s2.type == 'table' && s1.table == s2.table;
    }
}