import { IEditor } from "roosterjs";
import { ComponentsStore } from "./componentsStore";

let currentComponentId = '';

export function setCurrentComponent(editor: IEditor, component: HTMLDivElement | string): boolean { 
    const id = typeof component == 'string' ? component : component.id;

    if (id == currentComponentId) {
        return false;
    }


    if (typeof component == 'string') {
        editor.setLogicalRoot(null);
      
        component = editor.getDOMHelper().queryElements('#' + component)[0] as HTMLDivElement;
    }

    if (component) {
        const body = component.querySelector('div.ComponentBody') as HTMLDivElement;

        if (body) {
            currentComponentId = id;
            editor.setLogicalRoot(body);
            editor.focus();

            return true;
        }
    }

    return false;
}

export function moveCurrentComponent(editor: IEditor, offset: number) {
    const currentIndex = ComponentsStore.findIndex(component => component.id == currentComponentId);
    const newIndex = currentIndex + offset;

    if (newIndex >= 0 && newIndex < ComponentsStore.length) {
        setCurrentComponent(editor, ComponentsStore[newIndex].id);
    }
}