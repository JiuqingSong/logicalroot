import { ContentModelFormatContainerFormat, Editor, EditorOptions, FormatApplier, FormatParser } from "roosterjs";
import { ComponentBodyFormat, ComponentFormat } from "./componentTypes";

export class ComponentsEditor extends Editor {
    constructor(div: HTMLDivElement, options: EditorOptions) {
        options.defaultDomToModelOptions = {
            additionalFormatParsers: {
                'container': [componentIdParser, componentBodyParser],
            },
        };

        options.defaultModelToDomOptions = {
            additionalFormatAppliers: {
                'container': [componentIdApplier, componentBodyApplier],
            }
        }

        super(div, options);
    }
}


const componentIdParser: FormatParser<ContentModelFormatContainerFormat> = (format, element) => {
    const componentFormat = format as ComponentFormat;

    if (element.id) {
        componentFormat.id = element.id;
    }
}

const componentIdApplier: FormatApplier<ContentModelFormatContainerFormat> = (format, element) => {
    const componentFormat = format as ComponentFormat;

    if (componentFormat.id) {
        element.id = componentFormat.id;
    }
}


const ComponentBodyClass = 'ComponentBody';

const componentBodyParser: FormatParser<ContentModelFormatContainerFormat> = (format, element) => {
    const componentFormat = format as ComponentBodyFormat;

    if (element.className == ComponentBodyClass) {
        componentFormat.isComponentBody = true;
    }
}

const componentBodyApplier: FormatApplier<ContentModelFormatContainerFormat> = (format, element) => {
    const componentFormat = format as ComponentBodyFormat;

    if (componentFormat.isComponentBody) {
        element.className = ComponentBodyClass;
        element.style.outline = 'none';
    }
}