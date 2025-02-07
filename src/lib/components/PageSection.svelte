<script lang="ts">
    import type PageSection from "$lib/PageSection.svelte";
    import GenericInputForm from "./InputTypeForms/GenericInputForm.svelte";
    import NewFormOption from "./NewFormOption.svelte";
    import TextInput from "./TextInput.svelte";
    import Input from "$lib/Input";
    import Group from "$lib/Group.svelte";


    let { section }: { section: PageSection } = $props();

    let checked = $state(false);
    let type = $state("text");

    // forms to add
    // input/group 
    // header text - DONE
    // help text - DONE

</script>


<div class="flex flex-col">

    <div>
        <TextInput val={section.header} title="Header Text:"></TextInput>
        <TextInput val={section.helpText} title="Help Text:"></TextInput>
    </div>

    {#each section.elements as element}
        
        {#if (element instanceof Input)}
        <p>hi!</p>
            <GenericInputForm input={(element as Input)}></GenericInputForm>

        {:else if element instanceof Group}
            <p>groups soon!</p>

        {/if}

    {/each}

    <NewFormOption checked={checked} type={type} confirm={() => {section.addElement(type, checked)}}></NewFormOption>

</div>


