// place files you want to import through the `$lib` alias in this folder.

import type Input from "./Input";

export const displayFormOptions = ["Text Input", "Pills Input", "Number Input", "Incremental Number Input" ,"Toggle Input"];
export enum backendFormOptions {
    TEXT = "text",
    PILL = "pill",
    NUM = "num",
    INC_NUM = "incNum",
    TOGGLE = "toggle"
}

import IncrementalNumberInput from "./IncrementalNumberInput.svelte";
import NumberInput from "./NumberInput.svelte";
import PillboxInput from "./PillboxInput.svelte";
import TextInput from "./TextInput.svelte";
import ToggleInput from "./ToggleInput.svelte";

export function createInput(type: string): Input {

    let input: Input;

    if(type == backendFormOptions.TEXT) {
                input = new TextInput();
            } else if(type == backendFormOptions.NUM) {
                input = new NumberInput();
             } else if(type == backendFormOptions.INC_NUM) {
                input = new IncrementalNumberInput();
            } else if(type == backendFormOptions.PILL) {
                input = new PillboxInput();
            } else if(type == backendFormOptions.TOGGLE) {
                input = new ToggleInput();
            } else {
                input = new TextInput();
            }
            return input;
}

export type Row =  {
    index: number
    id: string;
    type: string;
}
