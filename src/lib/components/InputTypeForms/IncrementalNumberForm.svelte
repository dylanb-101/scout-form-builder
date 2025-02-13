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

<NumberInput bind:val={input.defaultValue} title="Default Value:"></NumberInput>
<NumberInput bind:val={input.min} title="Min:"></NumberInput>
<NumberInput bind:val={input.max} title="Max:"></NumberInput>





