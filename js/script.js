document.addEventListener("DOMContentLoaded", () => {
    const table = document.getElementById("exerciseTable").querySelector("tbody");
    const addRowButton = document.getElementById("addRow");

    let rowIndex = 1;

    const createRow = () => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${rowIndex++}</td>
            <td><input type="text" placeholder="ПІБ"></td>
            <td><input type="number" placeholder="Час (3 км)"></td>
            <td><input type="number" placeholder="Час (100 м)"></td>
            <td><input type="number" placeholder="Кількість підтягувань"></td>
            <td><input type="number" placeholder="Час (6x100)"></td>
            <td>
                <button class="edit">Редагувати</button>
                <button class="delete">Видалити</button>
            </td>
        `;

        // Додати обробники подій
        row.querySelector(".delete").addEventListener("click", () => {
            row.remove();
            updateRowNumbers();
        });

        table.appendChild(row);
    };

    const updateRowNumbers = () => {
        let index = 1;
        table.querySelectorAll("tr").forEach(row => {
            row.querySelector("td:first-child").textContent = index++;
        });
        rowIndex = index;
    };

    addRowButton.addEventListener("click", createRow);
});
        let editingIndex = -1; // Змінна для редагування
    
        // Завантаження збережених даних
        const loadExercises = () => {
            const exercises = JSON.parse(localStorage.getItem("exercises")) || [];
            exercises.forEach((exercise, index) => addRow(exercise, index + 1));
        };
    
        // Додавання нового рядка
        const addRow = (exercise, number) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${number}</td>
                <td>${exercise.name}</td>
                <td>${exercise.km3}</td>
                <td>${exercise.m100}</td>
                <td>${exercise.pullUps}</td>
                <td>${exercise.six100m}</td>
                <td>
                    <button class="action edit">Редагувати</button>
                    <button class="action delete">Видалити</button>
                </td>
            `;
            exerciseTable.appendChild(row);
    
            // Події для кнопок
            row.querySelector(".edit").addEventListener("click", () => editRow(row, exercise));
            row.querySelector(".delete").addEventListener("click", () => deleteRow(row, exercise));
        };
    
        // Збереження даних
        const saveExercises = () => {
            const rows = exerciseTable.querySelectorAll("tr");
            const exercises = Array.from(rows).map((row) => {
                const cells = row.querySelectorAll("td");
                return {
                    name: cells[1].textContent,
                    km3: cells[2].textContent,
                    m100: cells[3].textContent,
                    pullUps: cells[4].textContent,
                    six100m: cells[5].textContent
                };
            });
            localStorage.setItem("exercises", JSON.stringify(exercises));
        };
    
        // Додавання запису
        exerciseForm.addEventListener("submit", (e) => {
            e.preventDefault();
    
            const exercise = {
                name: document.getElementById("name").value,
                km3: document.getElementById("km3").value,
                m100: document.getElementById("m100").value,
                pullUps: document.getElementById("pullUps").value,
                six100m: document.getElementById("six100m").value
            };
    
            if (editingIndex === -1) {
                addRow(exercise, exerciseTable.children.length + 1);
            } else {
                const row = exerciseTable.children[editingIndex];
                row.cells[1].textContent = exercise.name;
                row.cells[2].textContent = exercise.km3;
                row.cells[3].textContent = exercise.m100;
                row.cells[4].textContent = exercise.pullUps;
                row.cells[5].textContent = exercise.six100m;
            }
    
            saveExercises();
            exerciseForm.reset();
            editingIndex = -1;
        });
    
        // Редагування запису
        const editRow = (row, exercise) => {
            editingIndex = Array.from(exerciseTable.children).indexOf(row);
            document.getElementById("name").value = exercise.name;
            document.getElementById("km3").value = exercise.km3;
            document.getElementById("m100").value = exercise.m100;
            document.getElementById("pullUps").value = exercise.pullUps;
            document.getElementById("six100m").value = exercise.six100m;
        };
    
        // Видалення запису
        const deleteRow = (row) => {
            row.remove();
            saveExercises();
        };
    
        loadExercises();
