import DB from "../DB";
import { ListModel } from "../models/ListModel";

const ListActions = {
    add: async (data: ListModel) => await DB.LISTS.add(data),

    get: async (id: string) => await DB.LISTS.get(id),

    getAll: async () => await DB.LISTS.orderBy("createdAt").toArray(),

    update: async (id: string, data: Partial<ListModel>) => await DB.LISTS.update(id, data),

    delete: async (id: string) => await DB.LISTS.delete(id),

    clear: async () => await DB.LISTS.clear(),

    count: async () => await DB.LISTS.count(),

    isListNameExists: async (listName: string) => !!await DB.LISTS.get({ title: listName })


};

export default ListActions;
