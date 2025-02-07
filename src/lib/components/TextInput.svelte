<script lang="ts">

    let { val = $bindable(), title }: { val: string, title: string } = $props();

</script>

<label class="text-xl">{title}</label>
<input class="bg-amber-200 p-2 rounded-md text-gray-800 m-4" bind:value={val} type="text"/>