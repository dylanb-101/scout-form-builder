<script lang="ts">
    import type ToggleInput from "$lib/ToggleInput.svelte";
    import SwitchInput from "../SwitchInput.svelte";

    let { input }: { input: ToggleInput } = $props();

</script>

<SwitchInput bind:val={input.defaultValue} title="Default Value:"></SwitchInput>

