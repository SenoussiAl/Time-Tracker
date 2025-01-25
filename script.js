window.addEventListener('load', () => {
    // Dynamically set the day
    const personalisation = document.getElementById('switch');
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[new Date().getDay()];
    personalisation.innerHTML = `Hi there, happy ${day}!`;

    // Task form elements
    const form = document.querySelector('#task-form');
    const input = document.querySelector('#task-input');
    const listEl = document.querySelector('#tasks');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskName = capitalize(input.value.trim());
        if (!taskName) {
            alert("Please add a task");
            return;
        }

        // Create task element
        const taskEl = document.createElement('div');
        taskEl.classList.add('task');

        const contentEl = createInputElement(taskName);
        const counterEl = createCounterElement();
        const actionsEl = createActionsElement(taskEl, contentEl);

        taskEl.append(contentEl, counterEl, actionsEl);
        listEl.appendChild(taskEl);

        input.value = "";
    });

    // Helper to capitalize the first letter of a string
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Create the input element for tasks
    function createInputElement(taskName) {
        const contentEl = document.createElement('div');
        contentEl.classList.add('content');

        const inputEl = document.createElement('input');
        inputEl.classList.add('text');
        inputEl.type = 'text';
        inputEl.value = taskName;
        inputEl.setAttribute('readonly', 'readonly');

        contentEl.appendChild(inputEl);
        return contentEl;
    }

    // Create the timer counter element
    function createCounterElement() {
        const counterEl = document.createElement('div');
        counterEl.classList.add('counter');

        const timeEl = document.createElement('div');
        timeEl.classList.add('time');
        timeEl.innerText = "00:00:00";

        const controlsEl = createControlButtons(timeEl);

        counterEl.append(timeEl, controlsEl);
        return counterEl;
    }

    // Create start, stop, and reset buttons with functionality
    function createControlButtons(timeEl) {
        const controlsEl = document.createElement('div');
        controlsEl.classList.add('controls');

        let seconds = 0;
        let interval = null;

        const startBtn = createButton('start', "Start", () => {
            if (!interval) interval = setInterval(updateTimer, 1000);
        });

        const stopBtn = createButton('stop', "Stop", () => {
            clearInterval(interval);
            interval = null;
        });

        const resetBtn = createButton('reset', "Reset", () => {
            clearInterval(interval);
            interval = null;
            seconds = 0;
            timeEl.innerText = "00:00:00";
        });

        function updateTimer() {
            seconds++;
            const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
            const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
            const secs = String(seconds % 60).padStart(2, '0');
            timeEl.innerText = `${hrs}:${mins}:${secs}`;
        }

        controlsEl.append(startBtn, stopBtn, resetBtn);
        return controlsEl;
    }

    // Create edit and delete buttons with functionality
    function createActionsElement(taskEl, contentEl) {
        const actionsEl = document.createElement('div');
        actionsEl.classList.add('actions');

        const inputEl = contentEl.querySelector('input');
        const editBtn = createButton('edit', "Edit Task", () => {
            if (editBtn.innerText === "Edit Task") {
                inputEl.removeAttribute('readonly');
                inputEl.focus();
                editBtn.innerText = "Save";
            } else {
                inputEl.setAttribute('readonly', 'readonly');
                editBtn.innerText = "Edit Task";
            }
        });

        const deleteBtn = createButton('delete', "Delete Task", () => {
            taskEl.remove();
        });

        actionsEl.append(editBtn, deleteBtn);
        return actionsEl;
    }

    // Helper to create a button with a class and click handler
    function createButton(className, text, onClick) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.innerText = text;
        button.addEventListener('click', onClick);
        return button;
    }
});
