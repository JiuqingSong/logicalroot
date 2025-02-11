export interface Component {
    id: string;
}

let lastId = 0;
const prefix = 'Component_';

export function createComponent(): Component {
    const newComponent: Component = {
        id: prefix + (lastId++),
    };

    ComponentsStore.push(newComponent);

    return newComponent;
}

export const ComponentsStore: Component[] = []