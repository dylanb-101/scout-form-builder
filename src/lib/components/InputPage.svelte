<script lang="ts">

    import type InputPage from "$lib/InputPage.svelte";
    import Button from "./Button.svelte";
    import PageSectionDisplay from "./PageSection.svelte";
    import TextInput from "./TextInput.svelte";
    import PageSection from "$lib/PageSection.svelte";
    import SwitchInput from "./SwitchInput.svelte";
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
        <SwitchInput title="Cancel Button" bind:val={page.footerButtons.cancel}/>
        <SwitchInput title="Submit Button" bind:val={page.footerButtons.submit}/>
        <SwitchInput title="Next Button" bind:val={page.footerButtons.next}/>
    </div>


    {#each page.sections as section, i}
        <hr class="m-4"/>
        <PageSectionDisplay section={section} destroy={() => {page.sections.splice(i, 1)}}></PageSectionDisplay>
    {/each}

    <Button text="Add Section" click={() => {page.addSection(new PageSection())}}></Button>

</div>