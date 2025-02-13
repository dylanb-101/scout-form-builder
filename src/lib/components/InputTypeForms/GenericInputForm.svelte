<script lang="ts">
    import { backendFormOptions } from "$lib";
    import type Input from "$lib/Input";
    import TextInput from "$lib/TextInput.svelte";
    import TextInputForm from "./TextInputForm.svelte";
    import TextInputComponent from "$lib/components/TextInput.svelte";
    import SwitchInput from "../SwitchInput.svelte";
    import IncrementalNumberInput from "$lib/IncrementalNumberInput.svelte";
    import IncrementalNumberForm from "./IncrementalNumberForm.svelte";
    import NumberInput from "$lib/NumberInput.svelte";
    import NumberInputForm from "./NumberInputForm.svelte";
    import ToggleInput from "$lib/ToggleInput.svelte";
    import ToggleInputForm from "./ToggleInputForm.svelte";
    import PillboxInput from "$lib/PillboxInput.svelte";
    import PillboxInputForm from "./PillboxInputForm.svelte";


    let { input }: { input: Input } = $props();

    // required: boolean;
    // questionText: string;
    // helpText: string;


</script>

<div class="flex flex-col">

    <TextInputComponent bind:val={input.questionText} title="Question Text:"></TextInputComponent>
    <TextInputComponent bind:val={input.helpText} title="Help Text:"></TextInputComponent>
    <TextInputComponent bind:val={input.id} title="Input ID:"></TextInputComponent>
    <SwitchInput bind:val={input.required} title="Required:"></SwitchInput>
    

    
    {#if input instanceof TextInput}
        <TextInputForm input={input}></TextInputForm>

    {:else if input instanceof IncrementalNumberInput}

        <IncrementalNumberForm input={input}></IncrementalNumberForm>

    {:else if input instanceof NumberInput}

        <NumberInputForm input={input}></NumberInputForm>

    {:else if input instanceof ToggleInput}

        <ToggleInputForm input={input}></ToggleInputForm>

    {:else if input instanceof PillboxInput}

        <PillboxInputForm input={input}></PillboxInputForm>

    {/if}

</div>