export const saveTOLocalStorage = (task) => {
    localStorage.setItem('task', JSON.stringify(task))
}