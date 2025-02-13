<script lang="ts">
    import type NumberInput from "$lib/NumberInput.svelte";
    import NumberInputComponent from "../NumberInput.svelte";
    import TextInputComponent from "$lib/components/TextInput.svelte";
    import SwitchInput from "../SwitchInput.svelte";



    let { input }: { input: NumberInput } = $props();


    // inputs to do 
    // private _min: number = $state(0);
    // private _max: number = $state(100000);
    // private _autoIncrement: boolean = $state(false);
    // private _defaultValue: number = $state(0);

</script>

<NumberInputComponent bind:val={input.defaultValue} title="Default Value:"></NumberInputComponent>
<NumberInputComponent bind:val={input.min} title="Min:"></NumberInputComponent>
<NumberInputComponent bind:val={input.max} title="Max:"></NumberInputComponent>
<SwitchInput bind:val={input.autoIncrement} title="Auto Increment:"></SwitchInput>

