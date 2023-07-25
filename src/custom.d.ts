type RecordItem = {
    tags: tag[],
    notes: string,
    type: string,
    amount: number,
    createdAt?: Date
}

type tag = {
    id: string
    name: string,
    pic?: string
}



type state = {
    recordList: RecordItem[]
}

interface Window {
    tagList: tag[];
    createTag: (name: string) => void;
    dayjs: any;
}