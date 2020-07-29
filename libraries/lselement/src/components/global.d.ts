import { HTMLElementAttributesWithMandatoryId } from "@lsegurado/ls-element/dist";

type properties = {
    bool: boolean,
    num: number,
    str: string,
    arr: string[],
    obj: object
}

declare global {
    export namespace JSX {
        interface IntrinsicElements {
            'component-with-children': HTMLElementAttributesWithMandatoryId;
            'component-with-children-rerender': {
                count?: number;
            } & HTMLElementAttributesWithMandatoryId;
            'ce-with-children': HTMLElementAttributesWithMandatoryId;
            'component-with-declarative-event': {
                'lowercase-handled'?: boolean;
                'kebab-handled'?: boolean;
                'camel-handled'?: boolean;
                'caps-handled'?: boolean;
                'pascal-handled'?: boolean;
            } & HTMLElementAttributesWithMandatoryId;
            'ce-with-event': {
                onlowercaseevent?: (event: CustomEvent<any>) => void;
                'onkebab-event'?: (event: CustomEvent<any>) => void;
                'oncamelEvent'?: (event: CustomEvent<any>) => void;
                'onCAPSevent'?: (event: CustomEvent<any>) => void;
                'onPascalEvent'?: (event: CustomEvent<any>) => void;
            } & HTMLElementAttributesWithMandatoryId;
            'component-with-imperative-event': {
                'event-handled': boolean;
            } & HTMLElementAttributesWithMandatoryId;
            'component-with-different-views': {
                'show-w-c': boolean;
            } & HTMLElementAttributesWithMandatoryId;
            'component-with-properties': properties & HTMLElementAttributesWithMandatoryId;
            'ce-with-properties': properties & HTMLElementAttributesWithMandatoryId;
            'component-without-children': HTMLElementAttributesWithMandatoryId;
            'ce-without-children': HTMLElementAttributesWithMandatoryId;
        }
    }
}