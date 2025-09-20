/** @type {{id:string, title:string, completed:boolean}[]} */
let items = [
    {id: "1", title: "learn DOM", completed: true},
    {id: "2", title: "render items", completed: false},
    {id: "3", title: "learn javascript", completed: false}
];

const statusEl = document.getElementById("status");
const listEl = document.getElementById("list");

const formEl = document.getElementById("new-todo");
const inputEl = document.getElementById("todo-input");
const addButton = formEl.querySelector("button");
addButton.disabled = true;

inputEl.addEventListener("input", () => {
    addButton.disabled = inputEl.value.trim() === "";
});

formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = inputEl.value.trim();
    if (!title) return;
    items.push({id: crypto.randomUUID(), title, completed: false});
    inputEl.value = "";
    render();
})

document.getElementById("list").addEventListener("change", (e) =>{
    if (e.target.matches('input[type="checkbox"]')){
        const li = e.target.closest("li");
        const id = li.dataset.id;
        const item = items.find(i => i.id === id);
        item.completed = e.target.checked;
        render()
    }
});

function itemToHTML(item) {
    return `
        <li data-id="${item.id}">
            <input type="checkbox" ${item.completed ? "checked " : ""} />
            <div>${item.title}</div>
        </li>
    `;
    
}

function render() {
    listEl.innerHTML = items.map(itemToHTML).join("");

    const remaining = items.filter((i) => !i.completed).length;
    statusEl.textContent = `${remaining} item${remaining !== 1 ? "s" : ""}`;
}

render();




// // render a couple of static items
// listEl.innerHTML = `
//   <li>learn DOM</li>
//   <li>render items</li>
//   <li>learn javascript</li>
// `;
// statusEl.textContent = "3 items";
