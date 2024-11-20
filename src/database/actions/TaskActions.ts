import DB from "../DB";
import { TaskModel } from "../models/TaskModel";

const TaskActions = {
  add: async (data: TaskModel) => await DB.TASKS.add(data),
  
  delete: async (id: string) => await DB.TASKS.delete(id),

  deleteAll: async (listId: string) => await DB.TASKS.where({ listId }).delete(),
  
  update: async (id: string, data: Partial<TaskModel>) => 
    await DB.TASKS.update(id, data),
  
  get: async (id: string) => await DB.TASKS.get(id),

  getAll: async () => await DB.TASKS.orderBy("createdAt").reverse().toArray(),
  
  getAllTask: async (listId: string) => (await DB.TASKS.where({ listId }).sortBy("createdAt")).reverse(),
  
  count: async (listId: string) => await DB.TASKS.where({ listId }).count(),

  countIncomplete: async () => await DB.TASKS.toArray().then((tasks) => tasks.filter((task) => !task.done).length),
  
  clear: async () => await DB.TASKS.clear(),  
    
};

export default TaskActions;