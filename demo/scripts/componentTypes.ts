import { ContentModelFormatContainerFormat, IdFormat } from "roosterjs";

export type ComponentFormat = ContentModelFormatContainerFormat & IdFormat;
export type ComponentBodyFormat = ContentModelFormatContainerFormat & {
    isComponentBody: boolean;
};
