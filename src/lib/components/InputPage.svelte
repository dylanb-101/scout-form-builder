<script lang="ts">

    import type InputPage from "$lib/InputPage.svelte";
    import Button from "./Button.svelte";
    import PageSectionDisplay from "./PageSection.svelte";
    import TextInput from "./TextInput.svelte";
    import PageSection from "$lib/PageSection.svelte";
    let { page }: { page: InputPage } = $props();


    // inputs to do 
    // sections - DONE
    // footer text - DONE
    // footer help text - DONE
    // name - DONE

</script>

<div class="w-11/12 bg-gray-500 rounded-lg p-4 text-white flex flex-col">

    <div class="">
        <TextInput bind:val={page.name} title="Page Name:"></TextInput>
        <TextInput bind:val={page.footerHelpText} title="Footer Help Text:"></TextInput>
        <TextInput bind:val={page.footerText} title="Footer Text:"></TextInput>
    </div>


    {#each page.sections as section}
        <hr class="m-4"/>
        <PageSectionDisplay section={section}></PageSectionDisplay>
    {/each}

    <Button text="Add Section" click={() => {page.addSection(new PageSection())}}></Button>

</div>