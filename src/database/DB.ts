import Dexie, { type EntityTable } from 'dexie';
import dexieCloud from "dexie-cloud-addon";

import { ListModel, TaskModel, NoteModel,UserModel } from './models';


// Initialize Dexie database with a name
const DB = new Dexie("TaskThing", {addons: [dexieCloud]}) as Dexie & {
  // Define types for each table in the database
  LISTS: EntityTable<ListModel, 'id'>; // Table for lists, using 'id' as the primary key
  TASKS: EntityTable<TaskModel, 'id'>; // Table for tasks, using 'id' as the primary key
  NOTES: EntityTable<NoteModel, 'id'>; // Table for notes, using 'id' as the primary key
  USER: EntityTable<UserModel, 'id'>; // Table for user, using 'id' as the primary key
};

// Define database version and specify the schema for each table
DB.version(1).stores({
  LISTS: 'id, createdAt, &title', // LISTS table will have 'id' and 'createdAt' fields
  TASKS: 'id, listId, createdAt', // TASKS table will have 'id', 'listId', and 'createdAt' fields
  NOTES: 'id, createdAt', // NOTES table will have 'id' and 'createdAt' fields
  USER: 'id' // USER table will have 'title' field
});



DB.cloud.configure({
  databaseUrl: import.meta.env.VITE_DATABASE_URL,
  requireAuth: false,
  customLoginGui: true,
  unsyncedTables: ["USER"],

})

// Export the initialized database for use in other parts of the application
export default DB;
