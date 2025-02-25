<script lang="ts">
    


</script>

<button onclick={async () => {
    console.log("hi")
    const req = await fetch('/api/input', {
					method: 'PATCH',
					body: JSON.stringify({uid: 1, inputType: "text2", formId: 2, groupId: -1, pageId: 1, sectionIndex: 0, requried: true, questionText: "texting", helpText: "help", defaultValue: "hi", cssId: "input1", textLimit: 99, pillBoxOptions:"" , pillboxValues: "", pillBoxOrientation: -1, numMin: -1, numMax: -1, numIncrement: true}),
					headers: {
						'Content-Type': 'application/json'
					}
				});

    let res = await req.json();
    console.log(res);
}}>Click me!</button>