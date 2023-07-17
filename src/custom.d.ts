type RecordItem = {
    tags: string[],
    notes: string,
    type: string,
    amount: number,
    createdAt: Date
}

type tag = {
    id: string
    name: string
}

type TagListType = {
    data: tag[]
    fetch: () => tag[]
    create: (name: string) => string
    save: () => void
}