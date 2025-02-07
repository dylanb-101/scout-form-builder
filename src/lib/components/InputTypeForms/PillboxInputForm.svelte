<script lang="ts">

    import NumberInputComponent from "../NumberInput.svelte";
    import TextInputComponent from "$lib/components/TextInput.svelte";
    import SwitchInput from "../SwitchInput.svelte";
    import type PillboxInput from "$lib/PillboxInput.svelte";
    import RadioInput from "../RadioInput.svelte";
    import LinkedValuesInput from "../LinkedValuesInput.svelte";



    let { input }: { input: PillboxInput } = $props();

    let inputs: {text: string, value: any}[] = $state([]);

    $effect(() => {
        input.updateOptions(inputs);
    })


    // inputs to do 
    // private _options: string[] = $state(["Pillbox Option"]); - DONE
    // private _values: any[] = $state([0]); - DONE
    // private _orientation: PillBoxOrientation = $state(0) - DONE

</script>

<RadioInput val={input.orientation} title="PillBox Orientation:" options={["Horizontal", "Vertical"]}></RadioInput>
<LinkedValuesInput val={inputs} title="PillBox Options:"></LinkedValuesInput>


