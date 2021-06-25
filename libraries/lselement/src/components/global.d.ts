import { HTMLAttributesWithMandatoryId } from "@lsegurado/ls-element/dist";

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
            'component-with-children': HTMLAttributesWithMandatoryId;
            'component-with-children-rerender': {
                count?: number;
            } & HTMLAttributesWithMandatoryId;
            'ce-with-children': HTMLAttributesWithMandatoryId;
            'component-with-declarative-event': {
                'lowercase-handled'?: boolean;
                'kebab-handled'?: boolean;
                'camel-handled'?: boolean;
                'caps-handled'?: boolean;
                'pascal-handled'?: boolean;
            } & HTMLAttributesWithMandatoryId;
            'ce-with-event': {
                onlowercaseevent?: (event: CustomEvent<any>) => void;
                'onkebab-event'?: (event: CustomEvent<any>) => void;
                'oncamelEvent'?: (event: CustomEvent<any>) => void;
                'onCAPSevent'?: (event: CustomEvent<any>) => void;
                'onPascalEvent'?: (event: CustomEvent<any>) => void;
            } & HTMLAttributesWithMandatoryId;
            'component-with-imperative-event': {
                'event-handled': boolean;
            } & HTMLAttributesWithMandatoryId;
            'component-with-different-views': {
                'show-w-c': boolean;
            } & HTMLAttributesWithMandatoryId;
            'component-with-properties': properties & HTMLAttributesWithMandatoryId;
            'ce-with-properties': properties & HTMLAttributesWithMandatoryId;
            'component-without-children': HTMLAttributesWithMandatoryId;
            'ce-without-children': HTMLAttributesWithMandatoryId;
        }
    }
}