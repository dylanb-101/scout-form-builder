<script lang="ts">
    import type ToggleInput from "$lib/ToggleInput.svelte";
    import NumberInputComponent from "../NumberInput.svelte";
    import SwitchInput from "../SwitchInput.svelte";

    let { input }: { input: ToggleInput } = $props();

</script>

<SwitchInput val={input.defaultValue} title="Default Value:"></SwitchInput>

