import { backendFormOptions } from ".";
import Group from "./Group.svelte";
import IncrementalNumberInput from "./IncrementalNumberInput.svelte";
import type Input from "./Input";
import NumberInput from "./NumberInput.svelte";
import PillboxInput from "./PillboxInput.svelte";
import TextInput from "./TextInput.svelte";
import ToggleInput from "./ToggleInput.svelte";

export default class PageSection {

    private _elements: Array<Group | Input> = $state([]);
    private _header: string = $state("New Page Section!");
    private _helpText: string = $state("");

    addElement(type: string, group: boolean): void {

        console.log("adding element")

        if(group) {
            let group = new Group();
            this.addInput(type, group);
            this.elements.push(group);
        } else {
            this.addInput(type);
        }
     }

    addInput(type: string, group?: Group): void {

        let input: Input;

        switch(type) {
            case(backendFormOptions.TEXT): {
                input = new TextInput();
            }
            case(backendFormOptions.NUM): {
                input = new NumberInput();
            }
            case(backendFormOptions.INC_NUM): {
                input = new IncrementalNumberInput();
            }
            case(backendFormOptions.PILL): {
                input = new PillboxInput();
            }
            case(backendFormOptions.TOGGLE): {
                input = new ToggleInput();
            }
            default: {
                input = new TextInput();
            }
        }

        if(group) {
            group.addInput(input);
        } else {
            this.elements.push(input);
        }
    }


    get elements(): Array<Group | Input> {
        return this._elements;
    }

    set elements(value: Array<Group | Input>) {
        this._elements = value;
    }

    get header(): string {
        return this._header;
    }

    set header(value: string) {
        this._header = value;
    }

    get helpText(): string {
        return this._helpText;
    }

    set helpText(value: string) {
        this._helpText = value;
    }


}