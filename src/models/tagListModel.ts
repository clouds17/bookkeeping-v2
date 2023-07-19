import createId from "@/lib/createId";

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
            const id = createId().toString();
            this.data.push({id, name});
            this.save();
        }
        return name
    },
    update(id: string, name: string) {
        const index = this.data.findIndex(item => item.id === id);
        console.log(id, name, index)
        if (index >= 0) {
            const names = this.data.map(item => item.name);
            if (names.indexOf(name) >= 0) {
                return 'duplicated';
            } else {
                const tag = this.data[index];
                tag.name = name;
                this.save();
                return 'success'; 
            }
            return 'success';
        } else {
            return 'not found';
        }
    },
    save() {
        window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    },
    remove(id) {
        const index = this.data.findIndex(item => item.id === id);
        this.data.splice(index, 1);
        this.save();
        return true;
    }
}

export default tagListModel;