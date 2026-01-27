window.Storage = {
    // Load tasks from localStorage or return empty array
    load: function() {
        const tasksJson = localStorage.getItem('tasks');
        return tasksJson ? JSON.parse(tasksJson) : [];
    },
    
    // Save tasks to localStorage
    save: function(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
};
