// Addign button ( + )

let addIcon = document.getElementById('add-icon');
let addBar = document.getElementById('add-bar');
let addBarIcon = document.getElementById('add-bar-icon');

addIcon.addEventListener('click', () => {
  addIcon.classList.add('hide_icon');
  addIcon.classList.remove('show_icon');
  addBar.classList.remove('hide_bar');
  addBar.classList.add('show_bar');
});

addBar.addEventListener('click', (event) => {
  event.stopPropagation();
});

document.addEventListener('mousedown', (event) => {
  if (!addBar.contains(event.target) && !addBar.classList.contains('hidden')) {
    addBar.classList.add('hide_bar');
	addBar.classList.remove('show_bar');
    addIcon.classList.remove('hide_icon');
	addIcon.classList.add('show_icon');
  }
});

addBar.addEventListener('mousedown', (event) => {
  event.stopPropagation();
});

addBarIcon.addEventListener('click', () => {
    let text = document.getElementById('add-bar-text').value;
    if (text !== '') {
        let li = document.createElement('li');
        let p = document.createElement('p');
        let checkbox = document.createElement('div');
		let i = document.createElement('i');

		li.classList.add('task');
		li.draggable = true;
        p.textContent = text;
        checkbox.classList.add('checkbox');
		i.classList.add('fa', 'fa-check');
		i.ariaHidden = true;
		checkbox.appendChild(i);

        li.appendChild(p);
        li.appendChild(checkbox);

        let ul = document.getElementById('todo-list-ul');
        ul.appendChild(li);

        document.getElementById('add-bar-text').value = '';

		checkbox.addEventListener('click', () => {
			checkbox.parentNode.classList.toggle('checked');
		});

		li.addEventListener("dragstart", () => {
            setTimeout(() => li.classList.add("dragging"), 0);
            deleteIcon.style.display = "flex";
        });

        li.addEventListener("dragend", (e) => {
            const rect = deleteIcon.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                li.remove();
            }
            li.classList.remove("dragging");
            deleteIcon.style.display = "none";
        });
    }
});

// Draggable sorting

let sortableList = document.querySelector(".todo_list_ul");
let items = sortableList.querySelectorAll(".task");
const deleteIcon = document.querySelector(".delete");
let rectdeleteIcon = deleteIcon.getBoundingClientRect();

items.forEach(item => {
    item.addEventListener("dragstart", () => {
        setTimeout(() => item.classList.add("dragging"), 0);
		deleteIcon.style.display = "flex";
    });

    item.addEventListener("dragend", (e) => {
		const rect = deleteIcon.getBoundingClientRect();
		console.log(e.clientX, rect.left);
		console.log(e.clientX, rect.right);
		console.log(e.clientY, rect.top);
		console.log(e.clientY, rect.bottom);
		if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
			item.remove();
		}
		item.classList.remove("dragging");
		deleteIcon.style.display = "none";
	});
});

const initSortableList = (e) => {
    e.preventDefault();
    const draggingItem = document.querySelector(".dragging");
    let siblings = [...sortableList.querySelectorAll(".task:not(.dragging)")];

    let nextSibling = siblings.find(sibling => {
        return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
    });

    sortableList.insertBefore(draggingItem, nextSibling);
}

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", e => e.preventDefault());

// Checkbox

let checkboxes = document.querySelectorAll('.checkbox');
console.log(checkboxes);

checkboxes.forEach(checkbox => {
	checkbox.addEventListener('click', () => {
		checkbox.parentNode.classList.toggle('checked');
	});
});