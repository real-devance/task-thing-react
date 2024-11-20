import DB from "../DB";
import { NoteModel } from "../models/NoteModel";


const NoteActions = {
    add: async (data: NoteModel) => await DB.NOTES.add(data),
    
    delete: async (id: string) => await DB.NOTES.delete(id),
    
    update: async (id: string, data: Partial<NoteModel>) => 
        await DB.NOTES.update(id, data),
    
    get: async (id: string) => await DB.NOTES.get(id),
    
    getAll: async () => await DB.NOTES.orderBy("createdAt").reverse().toArray(),
    
    clear: async () => await DB.NOTES.clear(),
    
    where: async <T extends keyof NoteModel>(key: T, value: NoteModel[T]) =>
        await DB.NOTES.where(key).equals(value as any).toArray()
};


export default NoteActions;