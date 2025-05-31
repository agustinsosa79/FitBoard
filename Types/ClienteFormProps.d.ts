import type { Clientes, Form } from "./cliente"; 


export type ClienteFormProps = {
    form: Form;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    edit: Clientes | null;
    onCancel: () => void
}