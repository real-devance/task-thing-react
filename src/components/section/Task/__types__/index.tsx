import { TaskModel } from "../../../../database/models/TaskModel";

export type TaskItemType = Omit<TaskModel, "listId">;

export type TaskOptionType = "none" | "edit" | "delete" ;