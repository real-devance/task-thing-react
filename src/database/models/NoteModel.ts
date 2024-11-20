import { colorKeyType } from "../../constants/colors";

export type NoteModel = {
    id: string;
    title: string;
    description: string;
    color: colorKeyType;
    createdAt: string;
}

