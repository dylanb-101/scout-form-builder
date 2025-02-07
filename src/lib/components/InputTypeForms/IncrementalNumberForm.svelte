<script lang="ts">
    import type IncrementalNumberInput from "$lib/IncrementalNumberInput.svelte";
    import NumberInput from "../NumberInput.svelte";
    import TextInputComponent from "$lib/components/TextInput.svelte";


    let { input }: { input: IncrementalNumberInput } = $props();


    // inputs to do 
    // // private _defaultValue: number = $state(0);
    // private _min: number = $state(0);
    // private _max: number = $state(100);

</script>

<NumberInput val={input.defaultValue} title="Default Value:"></NumberInput>
<NumberInput val={input.min} title="Min:"></NumberInput>
<NumberInput val={input.max} title="Max:"></NumberInput>





