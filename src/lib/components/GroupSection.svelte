<script lang="ts">
    import type Group from "$lib/Group.svelte";
    import GenericInputForm from "./InputTypeForms/GenericInputForm.svelte";
    import TextInput from "./TextInput.svelte";
    import NewFormOption from "./NewFormOption.svelte";
    import { createInput } from "$lib";
    import Button from "$lib/components/Button.svelte";
    // import { createInput } from "$lib/Input";


    let { group, destroy }: {group: Group, destroy: () => void} = $props();

    $effect(() => {
        console.log(group.img);
    })

    let checked = false;
    let type = $state("text");

    console.log("hi")

    // INPUTS TO DO
    // private _img: string = $state(""); - DONE
    // private _title: string = $state("New Group"); - DONE
    // private _helpText: string = $state(""); - DONE

</script>
<div class="flex flex-col">

<div class="flex flex-row bg-slate-500 flex-wrap">

    
    
    <div class="flex">
        {#if group.img != ""}
        <img src={group.img} alt="what the group is used for" class="w-64 h-64 m-2"/>
        {/if}
        <div class="flex flex-col">
            <Button text={"X"} click={destroy}/>
            <TextInput title="Image URL:" bind:val={group.img}></TextInput>
            <TextInput title="Group Title:" bind:val={group.title}></TextInput>
            <TextInput title="Help Text:" bind:val={group.helpText}></TextInput>
        </div>

    </div>

    {#each group.inputs as input, i}
    <div class="flex bg-slate-600 p-2 rounded-sm m-2 flex-wrap w-min">
        <GenericInputForm input={input} destroy={() => {group.inputs.splice(i, 1)}}></GenericInputForm>
    </div>
    {/each}


    

</div>

<NewFormOption checked={checked} bind:type={type} confirm={() => {group.addInput(createInput(type))}}></NewFormOption>


</div>
