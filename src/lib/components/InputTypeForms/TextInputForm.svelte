<script lang="ts">
    import type TextInput from "$lib/TextInput.svelte";
    import NumberInput from "../NumberInput.svelte";
    import TextInputComponent from "$lib/components/TextInput.svelte";


    let { input }: { input: TextInput } = $props();


    // inputs to do 
    // private _limit: number = $state(524288);
    // private _defaultValue: string = $state("");

</script>

<TextInputComponent val={input.defaultValue} title="Default Value:"></TextInputComponent>
<NumberInput val={input.limit} title="Max Length:"></NumberInput>





