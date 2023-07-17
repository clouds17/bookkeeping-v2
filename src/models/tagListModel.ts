const localStorageKeyName = 'tagList';


const tagListModel:TagListType = {
    data: [],
    fetch() {
        this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
        return this.data;
    },
    create(name) {
        const names = this.data.map(item => item.name)
        if (names.includes(name)) {
            window.alert('当前已有此标签');
        } else {
            this.data.push({id: name, name});
            this.save();
        }
        return name
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    }
}

export default tagListModel;