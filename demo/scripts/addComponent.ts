import type { ContentModelBlock, IEditor } from "roosterjs";
import { createComponent } from "./componentsStore";
import { ComponentBodyFormat, ComponentFormat } from "./componentTypes";

export function addComponent(editor: IEditor) {
    editor.formatContentModel((model) => {
        model.blocks.push(createComponentModel());

        return true;
    })
}

function createComponentModel(): ContentModelBlock {
    const newComponent = createComponent()

    const containerFormat: ComponentFormat = {
        borderLeft: '1px solid black',
        borderBottom: '1px solid black',
        borderTop: '1px solid black',   
        borderRight: '1px solid black',
        marginBottom: '10px',
        marginTop: '10px',
        marginLeft: '10px',
        marginRight: '10px',
        backgroundColor: '#eeeeee',
        id: newComponent.id,
    };

    const bodyFormat: ComponentBodyFormat = {   
        isComponentBody: true,
        backgroundColor: 'white',
        marginLeft: '10px',
        marginRight: '10px',    
        paddingBottom: '10px',
        paddingLeft: '10px',    
        paddingRight: '10px',   
        paddingTop: '10px',
    };

    return {
        blockType: 'BlockGroup',
        blockGroupType: 'FormatContainer',
        format: containerFormat,
        tagName: 'div',
        blocks: [
            {
                blockType: 'Paragraph',
                format: {},
                segments: [{
                    segmentType: 'Text',
                    text: 'Header',
                    format: {}
                }]
            },
            {
                blockType: 'BlockGroup',
                blockGroupType: 'FormatContainer',
                format: bodyFormat,
                tagName: 'div',
                blocks: [{
                    blockType: 'Paragraph',
                    format: {},
                    segments: [{
                        segmentType: 'Br',
                        format: {}
                    }]
                }],
            },
            {
                blockType: 'Paragraph',
                format: {},
                segments: [{
                    segmentType: 'Text',
                    text: 'Footer',
                    format: {}
                }]
            }


        ]
    }
}