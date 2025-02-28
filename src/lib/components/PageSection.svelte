<script lang="ts">
    import type PageSection from "$lib/PageSection.svelte";
    import GenericInputForm from "./InputTypeForms/GenericInputForm.svelte";
    import NewFormOption from "./NewFormOption.svelte";
    import TextInput from "./TextInput.svelte";
    import Input from "$lib/Input";
    import Group from "$lib/Group.svelte";
    import GroupSection from "./GroupSection.svelte";
    import Button from "./Button.svelte";


    let { section, destroy }: { section: PageSection, destroy: () => void } = $props();

    let checked = $state(false);
    let type = $state("text");

    // forms to add
    // input/group 
    // header text - DONE
    // help text - DONE

</script>


<div class="flex flex-col bg-slate-400 p-4 rounded-md m-2">

    
    <div>
        <Button text={"X"} click={destroy}/>    
        <TextInput bind:val={section.header} title="Header Text:"></TextInput>
        <TextInput bind:val={section.helpText} title="Help Text:"></TextInput>
    </div>

    <div class="flex gap-2 flex-wrap">

    {#each section.elements as element, i}
        <div class="flex bg-slate-600 p-2 rounded-sm m-2 flex-wrap">

            {#if (element instanceof Input)}
                <GenericInputForm input={(element as Input)} destroy={() => {section.elements.splice(i, 1)}}></GenericInputForm>
            
            {:else if element instanceof Group}

                <GroupSection group={element} destroy={() => {section.elements.splice(i, 1)}}></GroupSection>
            
            {/if}
        </div>

    {/each}
</div>


    <NewFormOption bind:checked={checked} bind:type={type} confirm={() => {section.addElement(type, checked)}}></NewFormOption>

</div>


