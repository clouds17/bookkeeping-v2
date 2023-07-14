const localStorageKeyName = 'tagList';
type TagListType = {
    data: string[]
    fetch: () => string[]
    create: (name: string) => string
    save: () => void
}
const tagListModel:TagListType = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(name) {
        if (this.data.includes(name)) {
            window.alert('当前已有此标签');
        } else {
            this.data.push(name);
            this.save();
        }
        return name
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
}

export default tagListModel;