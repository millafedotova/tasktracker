window.UI = {
    // Tasks list view
    tasksView: function({ tasks, filter, error }) {
        if (error) {
            return `
                <div class="task-list">
                    <h2>Tasks</h2>
                    <div class="error">${error}</div>
                </div>
            `;
        }

        const filteredTasks = tasks.filter(task => {
            if (filter === 'active') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });

        let tasksHtml = filteredTasks.map(task => `
            <div class="task-item ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} data-action="toggle" data-task-id="${task.id}">
                <div>
                    <h3 class="task-title">${task.title}</h3>
                    <p>Priority: ${task.priority} | Created: ${new Date(task.created).toLocaleDateString()}</p>
                </div>
                <div class="task-actions">
                    <a href="#/tasks/${task.id}" class="btn btn-secondary">Details</a>
                    <button class="btn btn-danger" data-action="delete" data-task-id="${task.id}">Delete</button>
                </div>
            </div>
        `).join('');

        if (filteredTasks.length === 0) {
            tasksHtml = '<div class="empty-state">No tasks yet. <a href="#/add">Create your first task!</a></div>';
        }

        return `
            <div class="task-list">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h2>Tasks (${filteredTasks.length})</h2>
                    <a href="#/add" class="btn btn-primary">Add Task</a>
                </div>
                <div class="filters">
                    <button class="filter-btn ${filter === 'all' ? 'active' : ''}" data-filter="all">All</button>
                    <button class="filter-btn ${filter === 'active' ? 'active' : ''}" data-filter="active">Active</button>
                    <button class="filter-btn ${filter === 'completed' ? 'active' : ''}" data-filter="completed">Completed</button>
                </div>
                ${tasksHtml}
            </div>
        `;
    },

    // Single task details view
    detailsView: function({ task, error }) {
        if (error || !task) {
            return `
                <div class="task-list">
                    <h2>Task Not Found</h2>
                    <p>The task you're looking for doesn't exist.</p>
                    <a href="#/tasks" class="btn btn-secondary">Back to Tasks</a>
                </div>
            `;
        }

        return `
            <div class="task-list">
                <h2>${task.title}</h2>
                <div style="background: #f7fafc; padding: 1.5rem; border-radius: 8px; margin: 1.5rem 0;">
                    <p><strong>Status:</strong> ${task.completed ? '✅ Completed' : '⏳ Active'}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                    <p><strong>Created:</strong> ${new Date(task.created).toLocaleDateString()}</p>
                </div>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                    <button class="btn ${task.completed ? 'btn-secondary' : 'btn-primary'}" data-action="toggle" data-task-id="${task.id}">
                        ${task.completed ? 'Mark Active' : 'Mark Complete'}
                    </button>
                    <a href="#/edit/${task.id}" class="btn btn-primary">Edit</a>
                    <button class="btn btn-danger" data-action="delete" data-task-id="${task.id}">Delete</button>
                    <a href="#/tasks" class="btn btn-secondary">Back to List</a>
                </div>
            </div>
        `;
    },

    // Add/Edit form view
    formView: function({ task, error, isEdit = false }) {
        return `
            <div class="task-list">
                <h2>${isEdit ? 'Edit Task' : 'Add New Task'}</h2>
                ${error ? `<div class="error">${error}</div>` : ''}
                <form id="task-form">
                    <div class="form-group">
                        <label for="title">Task Title *</label>
                        <input type="text" id="title" name="title" value="${task?.title || ''}" required maxlength="100">
                    </div>
                    <div class="form-group">
                        <label for="priority">Priority</label>
                        <select id="priority" name="priority">
                            <option value="low" ${task?.priority === 'low' ? 'selected' : ''}>Low</option>
                            <option value="medium" ${task?.priority === 'medium' ? 'selected' : ''}>Medium</option>
                            <option value="high" ${task?.priority === 'high' ? 'selected' : ''}>High</option>
                        </select>
                    </div>
                    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                        <a href="#/tasks" class="btn btn-secondary">Cancel</a>
                        <button type="submit" class="btn btn-primary">${isEdit ? 'Update Task' : 'Add Task'}</button>
                    </div>
                </form>
            </div>
        `;
    }
};
