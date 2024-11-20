import { NoteModel } from "../../../../database/models/NoteModel";

export type NoteType = NoteModel;

export type NoteOptionType = "edit" | "delete" | "none";